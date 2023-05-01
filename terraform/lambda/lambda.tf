#Resource definition of the lambda function itself
resource "aws_lambda_function" "lambda_function" {
  for_each     = { for f in var.functions : f.name => f }
  function_name = each.value.name
  filename     =  each.value.filename
  role         =  aws_iam_role.lambda_execution.arn
  handler      =  each.value.handler
  runtime      =  each.value.language
}

#IAM  basic roles to execute Lambda
resource "aws_iam_role" "lambda_execution" {
  name = "lambda_lusk_execution"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_dynamodb_policy" {
  name = "lambda_dynamodb_policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem",
          "dynamodb:UpdateItem",
          "dynamodb:ListTables"
        ]
       Resource = "arn:aws:dynamodb:*:*:table/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb_policy_attachment" {
  for_each   = { for f in var.functions : f.name => f }
  policy_arn = aws_iam_policy.lambda_dynamodb_policy.arn
  role   = aws_iam_role.lambda_execution.name
}

resource "aws_iam_role_policy_attachment" "lambda_execution_policy_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_execution.name
}

#Permission to allow API Gateway execute Lambda fucntion
resource "aws_lambda_permission" "api_gateway" {
  for_each      = { for f in var.functions : f.name => f }
  statement_id  = "AllowExecutionFromAPIGateway-${each.value.name}"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_function[each.key].function_name
  principal     = "apigateway.amazonaws.com"
}

#Defining API Gateway rest api as a resource
resource "aws_api_gateway_rest_api" "lusk_api" {
  for_each     = { for f in var.functions : f.name => f }
  name = each.value.name
  description = "API auto-generated by Lusk automation for respective Lambda Function"
}

#Defining API Gateway as a resource
resource "aws_api_gateway_resource" "lusk_api_resource" {
  for_each     = { for f in var.functions : f.name => f }
  rest_api_id = aws_api_gateway_rest_api.lusk_api[each.key].id
  parent_id   = aws_api_gateway_rest_api.lusk_api[each.key].root_resource_id
  path_part   = "execution"
}

#Defining the http methpod that will interact with the API
resource "aws_api_gateway_method" "post_method" {
  for_each     = { for f in var.functions : f.name => f }
  rest_api_id   = aws_api_gateway_rest_api.lusk_api[each.key].id
  resource_id   = aws_api_gateway_resource.lusk_api_resource[each.key].id
  http_method   = "POST"
  authorization = "NONE"

  request_parameters = {
    "method.request.header.Authorization" = true
  }
}

#Defining API Gateway integration with Lambda function
resource "aws_api_gateway_integration" "lambda_integration" {
  for_each     = { for f in var.functions : f.name => f }
  depends_on = [aws_lambda_function.lambda_function]
  rest_api_id = aws_api_gateway_rest_api.lusk_api[each.key].id
  resource_id = aws_api_gateway_resource.lusk_api_resource[each.key].id
  http_method = aws_api_gateway_method.post_method[each.key].http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda_function[each.key].invoke_arn
}

#Defining API Gateway deployment
resource "aws_api_gateway_deployment" "api_deployment" {
  for_each     = { for f in var.functions : f.name => f }
  depends_on = [
    aws_api_gateway_integration.lambda_integration
  ]
  rest_api_id = aws_api_gateway_rest_api.lusk_api[each.key].id
  stage_name  = "prod"
}

module "cors" {
  for_each     = { for f in var.functions : f.name => f }
  source = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.3"

  api_id          = aws_api_gateway_rest_api.lusk_api[each.key].id
  api_resource_id = aws_api_gateway_resource.lusk_api_resource[each.key].id
}

#Defining API Gateway URL as output to consume afterwards the creation
output "api_endpoint" {
  value = [
    for deployment_key in keys(aws_api_gateway_deployment.api_deployment) :
      aws_api_gateway_deployment.api_deployment[deployment_key].invoke_url
  ]
}

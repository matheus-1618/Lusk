
resource "aws_lambda_function" "my_lambda_function" {
  function_name = var.function_name
  filename     =  var.filename
  role         =  aws_iam_role.lambda_execution.arn
  handler      =  var.handler
  runtime      =  "python3.8"
}

resource "aws_iam_role" "lambda_execution" {
  name = "lambda_custom_execution"

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

resource "aws_iam_role_policy_attachment" "lambda_execution_policy_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_execution.name
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.my_lambda_function.function_name
  principal     = "apigateway.amazonaws.com"
}

resource "aws_api_gateway_rest_api" "lusk_api" {
  name        = "lusk_api"
  description = "Example API"
}

resource "aws_api_gateway_resource" "example_resource" {
  rest_api_id = aws_api_gateway_rest_api.lusk_api.id
  parent_id   = aws_api_gateway_rest_api.lusk_api.root_resource_id
  path_part   = "example"
}


resource "aws_api_gateway_method" "example_method" {
  rest_api_id   = aws_api_gateway_rest_api.lusk_api.id
  resource_id   = aws_api_gateway_resource.example_resource.id
  http_method   = "POST"
  authorization = "NONE"

  request_parameters = {
    "method.request.header.Authorization" = true
  }
}

resource "aws_api_gateway_integration" "example_integration" {
  depends_on = [aws_lambda_function.my_lambda_function]
  rest_api_id = aws_api_gateway_rest_api.lusk_api.id
  resource_id = aws_api_gateway_resource.example_resource.id
  http_method = aws_api_gateway_method.example_method.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.my_lambda_function.invoke_arn
}

resource "aws_api_gateway_deployment" "example_deployment" {
  depends_on = [
    aws_api_gateway_integration.example_integration
  ]
  rest_api_id = aws_api_gateway_rest_api.lusk_api.id
  stage_name  = "prod"
}


output "api_endpoint" {
  value = aws_api_gateway_deployment.example_deployment.invoke_url
}
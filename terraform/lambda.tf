provider "aws" {
  region     = "us-east-1"
}

resource "aws_lambda_function" "my_lambda_function" {
  function_name = var.function_name
  filename     = var.filename
  role         = aws_iam_role.lambda_execution.arn
  handler      = "lambda_function.lambda_handler"
  runtime      = "python3.8"
}

resource "aws_iam_role" "lambda_execution" {
  name = "lambda_execution"

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

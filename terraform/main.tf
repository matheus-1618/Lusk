provider "aws" {
  region     = "us-east-1"
}

module "lambda" {
  source = "./lambda"
  function_name = var.function_name
  filename     = var.filename
  handler = var.handler
}

output "my_lambda_api_endpoint" {
  value = module.lambda.api_endpoint
}


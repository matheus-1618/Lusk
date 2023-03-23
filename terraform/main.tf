provider "aws" {
  region     = "us-east-1"

}

module "aws_lambda_function" {
  source = "./lambda"
  function_name = var.function_name
  filename     = var.filename
  handler = var.handler
}

output "my_lambda_api_endpoint" {
  value = module.aws_lambda_function.api_endpoint
}


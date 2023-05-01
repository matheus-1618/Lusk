provider "aws" {
  region     = "us-east-1"
}

module "lambda" {
  source = "./lambda"
  functions = var.functions
}

module "dynamodb" {
  source = "./dynamodb"
  name_table = var.name_table
}

module "amplify" {
  source = "./amplify"
  url_repository = var.url_repository
  app_name = var.app_name
  token = var.token
}

output "amplify_url" {
  value = module.amplify.app_url
}

output "my_lambda_api_endpoint" {
  value = module.lambda.api_endpoint
}
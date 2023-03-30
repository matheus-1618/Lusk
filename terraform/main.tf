provider "aws" {
  region     = "us-east-1"
}

module "lambda" {
  source = "./lambda"
  functions = var.functions
}

module "amplify" {
  source = "./amplify"
  url_repository = var.url_repository
  app_name = var.app_name
  token = var.token
}

module "dynamodb" {
  source = "./dynamodb"
  name_table = var.name_table
}

output "my_lambda_api_endpoint" {
  value = module.lambda.api_endpoint
}

output "amplify_url" {
  value = module.amplify.app_url
}


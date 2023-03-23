variable "function_name" {
  type    = string
  default = "my_lambda_function"
}

variable "filename" {
  type    = string
  default = "lambda_function.zip"
}

variable "handler" {
  type    = string
  default = "lambda.handler"
}
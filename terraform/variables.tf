variable "url_repository" {
  type    = string
  default = "www.google.com"
}

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

variable "language" {
  type    = string
  default = "python3.8"
}

variable "app_name" {
  type    = string
  default = "Lusk-App"
}

variable "framework" {
  type    = string
  default = "React"
}

variable "token" {
  type    = string
  default = "None"
}
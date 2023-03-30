variable "functions" {
  type = list(object({
    name        = string
    filename    = string
    handler     = string
    language    = string
    attach_role = bool
  }))
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

variable "attach_policy" {
  default = false
}
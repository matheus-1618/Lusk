variable "url_repository" {
  type    = string
  default = "www.google.com"
}

variable "functions" {
  type = list(object({
    name        = string
    filename    = string
    handler     = string
    language    = string
  }))

  default = []
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

variable "name_table" {
  type    = string
  default = "Lusk_Table"
}

variable "functions" {
  type = list(object({
    name        = string
    filename    = string
    handler     = string
    language    = string
  }))
}

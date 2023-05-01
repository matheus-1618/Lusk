resource "aws_dynamodb_table" "Lusk_Dynamo" {
  name           = var.name_table
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }
}
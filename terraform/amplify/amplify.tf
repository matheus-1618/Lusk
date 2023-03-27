resource "aws_amplify_app" "example_app" {
  name       = "Lusk-app" 
  repository = var.url_repository 
  oauth_token = "" 

}

resource "aws_amplify_branch" "example_branch" {
  app_id       = aws_amplify_app.example_app.id
  branch_name  = "main"
  #build_spec   = file("${path.module}/buildspec.yml")
  enable_auto_build = true
}

output "app_url" {
  value = aws_amplify_app.example_app.default_domain
}
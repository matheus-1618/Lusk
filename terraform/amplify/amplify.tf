resource "aws_iam_role" "amplify_role" {
  name = "amplify_deploy_terraform_role"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "amplify.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy" "amplify_role_policy" {
  name = "amplify_iam_role_policy"
  role = aws_iam_role.amplify_role.id

  policy = file("${path.cwd}/amplify/amplify_role_policies.json")
}

resource "aws_amplify_app" "example_app" {
  name       = "Lusk-app" 
  repository = var.url_repository 
  oauth_token = "" 
  access_token = "" 

  iam_service_role_arn = aws_iam_role.amplify_role.arn

  auto_branch_creation_patterns = [
    "*",
    "*/**",
  ]
  enable_auto_branch_creation = true
  enable_branch_auto_build = true
  enable_branch_auto_deletion = true
  platform = "WEB"

  auto_branch_creation_config {
    enable_pull_request_preview = true
  }

  build_spec = <<-EOF
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install --force
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
EOF

}

resource "aws_amplify_branch" "example" {
  app_id  = aws_amplify_app.example_app.id
  branch_name = "main"
  framework = "React"
  stage = "PRODUCTION"
}

output "app_url" {
  value = aws_amplify_branch.example.app_id
}
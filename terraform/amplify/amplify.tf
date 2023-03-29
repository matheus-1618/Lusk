# Role to Amplify evoke it's resources
resource "aws_iam_role" "amplify_role" {
  name = "amplify_deploy_terraform_role"
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

# Attached policy that amplify will use in the prior Role
resource "aws_iam_role_policy" "amplify_role_policy" {
  name = "amplify_iam_role_policy"
  role = aws_iam_role.amplify_role.id

  policy = file("${path.cwd}/amplify/amplify_role_policies.json")
}

#Amplify App and it's build configurations
resource "aws_amplify_app" "lusk_app" {
  name       = var.app_name
  repository = var.url_repository 
  oauth_token = var.token
  access_token = var.token

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
# Configurations of the branch used in the deploy
resource "aws_amplify_branch" "main_branch" {
  app_id  = aws_amplify_app.lusk_app.id
  branch_name = "main"
  framework = var.framework
  stage = "PRODUCTION"
}

output "app_url" {
  value = aws_amplify_branch.main_branch.app_id
}
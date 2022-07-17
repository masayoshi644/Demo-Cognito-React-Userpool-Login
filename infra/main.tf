resource "aws_cognito_user_pool" "pool" {
  name = "congnito-sample-user-pool"
}

resource "aws_cognito_user_pool_client" "client" {
  name          = "cognito-sample-user-pool-app-client"
  user_pool_id  = aws_cognito_user_pool.pool.id
}

module "test-server" {
  source = "./node-server"

  ami-id   = "ami-062f7200baf2fa504"
  key-pair = aws_key_pair.demo-key.key_name
  name     = "Test Server"

}

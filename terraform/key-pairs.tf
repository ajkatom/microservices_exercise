resource "aws_key_pair" "demo-key" {
  key_name   = "demo-key"
  public_key = file("./keys.pem")

}

resource "aws_eip" "api-getway-eip" {
  instance = module.api-gateway.instance-id
}

module "api-gatway" {
  source = "./node-server"

  ami-id ="ami-0fc61db8544a617ed"
  key-pair = aws_key_pair.demo-key.key_name
  key-pair-key = "./keys.key"
  name = "api-getway"
  subnet-id = aws_subnet.microsevrices-demo-public-subnet.id
  vpc-security-group-id = [
    aws_security_group.allow-http.id,
    aws_security_group.allow-ssh.id,
    aws_security_group.allow-all-outbound.id
  ]
  
}

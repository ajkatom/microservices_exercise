resource "aws_eip" "listing-service-eip" {
  instance = module.listing-service.instance-id
}

module "listing-service" {
  source = "./node-server"

  ami-id     = "ami-0fc61db8544a617ed"
  key-pair   = aws_key_pair.demo-key.key_name
  name       = "listing-service"
  private-ip = "10.0.1.5"
  subnet-id  = aws_subnet.microservices-demo-private-1-subnet.id
  vpc-security-group-ids = [
    aws_security_group.allow-internal-http.id,
    aws_security_group.allow-ssh.id,
    aws_security_group.allow-all-outbound.id
  ]

}

module "listing-service-db" {
  source = "./mysql-db"

  apply-immediately      = true
  db-name                = "db"
  db-subnet-group-name   = aws_db_subnet_group.private.id
  identifier             = "listing-service-db"
  password               = var.listing-service-db-password
  publicly-accessible    = false
  user-name              = var.listing-service-db-username
  vpc-security-group-ids = [aws_security_group.allow-internal-mysql.id]

}


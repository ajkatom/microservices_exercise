resource "aws_eip" "users-service-eip" {
  instance = module.users-service.instance-id
}

module "users-service" {
  source = "./node-server"

  ami-id               = "ami-0fc61db8544a617ed"
  iam-instance-profile = module.users-service-codedeploy.iam-instance-profile
  key-pair             = aws_key_pair.demo-key.key_name
  name                 = "users-service"
  private-ip           = "10.0.1.6"
  subnet-id            = aws_subnet.microservices-demo-private-1-subnet.id
  vpc-security-group-ids = [
    aws_security_group.allow-internal-http.id,
    aws_security_group.allow-ssh.id,
    aws_security_group.allow-all-outbound.id
  ]

}
module "users-service-codedeploy" {
  source = "./codedeploy-app"

  app-name          = "users-service"
  ec2-instance-name = module.users-service.name

}

module "users-service-db" {
  source = "./mysql-db"

  apply-immediately      = true
  db-name                = "db"
  db-subnet-group-name   = aws_db_subnet_group.private.id
  identifier             = "users-service-db"
  password               = var.users-service-db-password
  publicly-accessible    = false
  user-name              = var.users-service-db-username
  vpc-security-group-ids = [aws_security_group.allow-internal-mysql.id]

}


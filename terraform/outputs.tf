output "api-gateway-private-ip" {
  value = module.api-gateway.private-ip
}
output "api-gateway-public-ip" {
  value = aws_eip.api-gateway-eip.public_ip
}

output "aws-region" {
  value = var.aws-region
}


output "listing-service-private-ip" {
  value = module.api-gateway.private-ip
}

output "users-service-private-ip" {
  value = module.api-gateway.private-ip
}

output "listing-service-db-address" {
  value = module.listing-service-db.address
}
output "users-service-db-address" {
  value = module.users-service-db.address
}

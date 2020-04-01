output "api-gateway-privet-ip" {
  value = module.api-gateway.privet-ip
}
output "api-gateway-public-ip" {
  value = aws_eip.api-gateway-eip.public_ip
}

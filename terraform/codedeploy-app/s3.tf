resource "aws_s3_bucket" "deploy-bucket" {
  bucket = "katoms-microservices-demo-${var.app-name}-deployment"

}

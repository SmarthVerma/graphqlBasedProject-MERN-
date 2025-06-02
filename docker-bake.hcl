group "default" {
  targets = ["frontend", "backend"]
}

target "frontend" {
  context = "./frontend"
  dockerfile = "Dockerfile"
  tags = ["sm7rth/expensegraphql:frontend"]
  target = "prod"
  platforms = ["linux/amd64", "linux/arm64"]
}

target "backend" {
  context = "./backend"
  dockerfile = "Dockerfile"
  tags = ["sm7rth/expensegraphql:backend"]
  target = "prod"
  platforms = ["linux/amd64", "linux/arm64"]
}
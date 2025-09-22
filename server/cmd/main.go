package main

import (
	"pond-io-server/config"
	"pond-io-server/infrastructure"
)

func main() {
	config .LoadEnvVariables()

	infrastructure.RunGin(config.CORS())
}
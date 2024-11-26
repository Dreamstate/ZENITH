.PHONY: help
help:	## Shows this help.
	@grep -hE '^[A-Za-z0-9_ \-]*?:.*##.*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: tidy
tidy: ## Tidy runs `go mod tidy` and `go mod vendor`.
	go mod tidy
	go mod vendor

.PHONY: lint
lint: ## Runs the golang-ci linter.
	golangci-lint run

# Database
.PHONY: database-migrate
database-migrate: ## Runs the database migrations using golang-migrate.
	./scripts/migrate.sh up

.PHONY: database-downgrade
database-downgrade: ## Reverts the latest migration using golang-migrate.
	./scripts/migrate.sh down 1
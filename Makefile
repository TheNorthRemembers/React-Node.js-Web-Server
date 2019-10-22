ifeq ($(OS),Windows_NT)
	NF = bash node_modules/.bin/nf
	MARINER = bash node_modules/.bin/mariner
else
	NF = node_modules/.bin/nf
	MARINER = node_modules/.bin/mariner
endif

.PHONY: migration migrate rollback

migration:
	@while [ -z "$$MIGRATION_NAME" ]; do \
		read -r -p "Enter Migration Name: " MIGRATION_NAME; \
	done ; \
	${NF} run $(MARINER) create "$$MIGRATION_NAME"

migrate:
	npm run migrate

rollback:
	npm run rollback

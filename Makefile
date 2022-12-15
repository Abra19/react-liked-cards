install:
	make -C app install

lint:
	make -C app lint

start:
	make -C app start

test:
	make -C app test

build:
	npm run build

deploy:
	make -C app deploy

.PHONY: test build

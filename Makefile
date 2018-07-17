install: install-deps

run:
	npm run babel-node -- 'src/bin/gendiff.js'

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test --watch

lint:
	npm run eslint .

publish:
	npm publish

.PHONY: test

start:
	npm run babel-node -- src/bin/gendiff.js

git:
	git add .
	git status
	git commit -m '$m'
	git push
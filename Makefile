dependencies:
	npm ci

link:
	npm link

install: dependencies link

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -s -- --coverage

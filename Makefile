clone:
	git clone git@github.com:arttzima/backend-project-lvl2.git

dependencies:
	npm ci

link:
	npm link

install: clone dependencies link

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -s -- --coverage

publish:
	npm publish --dry-run

BIN = node_modules/.bin/

# Run all tests in dev environment
test: bfy btest

bfy:
	$(BIN)/browserify -r ./index.js:resizable_iframe -o test/bundle.js

btest:
	open test/index.html

.PHONY: test

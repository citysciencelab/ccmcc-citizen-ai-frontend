ifneq (,$(wildcard ./.env))
    include .env
    export
endif

RSYNC := rsync dist/spa/ $(DEPLOY_TARGET) -cav --delete

LFTP_TARGET := /

lintphpfiles := $(shell ls  *.php)

.PHONY: ${lintphpfiles}
${lintphpfiles}:
	php -l $@

.PHONY: run-php
run-php: ${lintphpfiles}
	ls *.php | \
		entr -r php -S 127.0.0.1:8482 api.php

.PHONY: run-quasar
run-quasar:
	npx quasar dev

.PHONY: run-quasar-api-mock
run-quasar-api-mock: export API_MOCK=1
run-quasar-api-mock:
	npx quasar dev

.PHONY: run-proxy
run-proxy:
	yarn run proxy

.PHONY: build-quasar
build-quasar:
	npx quasar build

favicon_src := public/collaborative_governance.jpg

.PHONY: favicon
favicon:
	convert -verbose $(favicon_src) -resize 16x16 public/favicon.ico
	convert -verbose $(favicon_src) -resize 32x32 public/icons/favicon-32x32.png
	convert -verbose $(favicon_src) -resize 128x128 public/icons/favicon-128x128.png
	convert -verbose $(favicon_src) -resize 96x96 public/icons/favicon-96x96.png
	convert -verbose $(favicon_src) -resize 16x16 public/icons/favicon-16x16.png
	optipng -strip all -o7 public/icons/*.png

.PHONY: data
data:
	./solutions_csv2json.py > ./src/bki-data2.js
	ls -lah ./src/bki-data2.js

.PHONY: rsync-dry
rsync-dry:
	$(RSYNC) -n

.PHONY: rsync-wet
rsync-wet:
	$(RSYNC)

.PHONY: lftp-dry
lftp-dry:
	lftp -u $(LFTP_USER) -e "mirror -v -n -R --no-perms --delete --dry-run ./dist/spa/ $(LFTP_TARGET); exit" $(LFTP_HOST)

.PHONY: lftp-wet
lftp-wet:
	lftp -u $(LFTP_USER) -e "mirror -v -n -R --no-perms --delete           ./dist/spa/ $(LFTP_TARGET); exit" $(LFTP_HOST)

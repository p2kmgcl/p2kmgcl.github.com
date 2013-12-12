install:
	sudo apt-get install ruby
	echo "Check version 1.9.3x or 2.0.0x"
	sudo gem install bundler
	bundle install
	npm install

develop:
	jekyll build -w --config _config.yml,_config_dev.yml

build:
	rm -rf _site
	jekyll build -w --config _config.yml,_config_dev.yml
	node_modules/grunt-cli/bin/grunt

publish:
	rm -rf _site
	jekyll build
	node_modules/grunt-cli/bin/grunt
	rm -rf /tmp/pablomolina_me_tempbuild
	mv _site /tmp/pablomolina_me_tempbuild
	git checkout master
	find . ! -iwholename './.git*' -a ! -iwholename './node_modules*' -delete
	cp -rf /tmp/pablomolina_me_tempbuild/* ./
	rm -rf /tmp/pablomolina_me_tempbuild

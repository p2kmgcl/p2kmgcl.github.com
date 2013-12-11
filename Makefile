install:
	sudo apt-get install ruby
	echo "Check version 1.9.3x or 2.0.0x"
	sudo gem install bundler
	bundle install
	npm install

develop:
	subl ./ &
	google-chrome 0.0.0.0:8080/pablomolina_me/_site/ &
	jekyll build -w --config _config.yml,_config_dev.yml


build:
	rm -rf _site
	jekyll build
	cd _site && rm -rf node_modules Gruntfile.js Makefile README.md package.json Gemfile Gemfile.lock

	node_modules/grunt-cli/bin/grunt

install:
	sudo npm install -g harp

develop:
	harp server app

build:
	rm -rf output
	harp compile app output

publish:
	rm -rf output
	harp compile app output
	rm -rf /tmp/pablomolina_me_tempbuild
	mv output /tmp/pablomolina_me_tempbuild
	cp CNAME /tmp/pablomolina_me_tempbuild/
	git checkout master
	rm -rf *
	cp -rf /tmp/pablomolina_me_tempbuild/* ./
	rm -rf /tmp/pablomolina_me_tempbuild

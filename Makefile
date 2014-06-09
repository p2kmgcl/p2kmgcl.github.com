install:
	sudo npm install -g harp

develop:
	harp server app

develop_c9:
	harp server app --port `node -p process.env.PORT`

build:
	rm -rf output
	harp compile app output

publish:
	rm -rf output
	rm -rf .tmp
	mkdir .tmp
	harp compile app output
	mv output .tmp/pablomolina_me_tempbuild
	cp CNAME .tmp/pablomolina_me_tempbuild/
	git checkout master
	rm -rf *
	cp -rf .tmp/pablomolina_me_tempbuild/* ./
	rm -rf .tmp

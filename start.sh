#!/bin/bash

docker run \
  --rm \
  --publish="4000:4000" \
  --volume="$PWD/public:/srv/jekyll" \
  -it jekyll/jekyll \
  jekyll serve --destination /tmp/jekyll-site

#!/bin/bash

docker run \
  --rm \
  --privileged \
  --publish="4000:4000" \
  --volume="$PWD/public:/srv/jekyll" \
  -it jekyll/jekyll \
  jekyll serve --drafts --destination /tmp/jekyll-site

# Pablo Molina's website

This project is generated on [pablomolina.me](http://www.pablomolina.me) using
the awesome github-pages. If you want to create a project using this code just
fork the repository and start working, but please if you want to copy anything
follow the [LICENSE][1] (not a big deal). However, if you just want to suggest
me any change, I will be extremly grateful.

__(=＾・＾=)__

## Building

### Github Pages and Jekyll

As I said, this page is compiled with github-pages, which uses [jekyll][3]
static site generator in the background. The easiest way of using jekyll on
your computer (for development or production), is installing the ruby
interpreter (>= 2.3) and bundler. Bundler is a tool that installs ruby gems
from a [Gemfile][4], and in my case it just installs the gem `github-pages`.
This gem installs the exact tools with the versions that github-pages uses for
compiling, so no conflict may appear on production. If you plan to use jekyll by
your own, just follow jekyll's installation guide.

> If you need any extra jekyll plugin (there are a lot), you should know that
> github-pages does not provide this functionallity, you will have to compile
> your site manually.

Once you have jekyll installed you can use these simple commands for start
working:

 - `jekyll new [site]` will create a new `[site]` folder with a starting
    boilerplate (not necesary for this project).
 - `jekyll serve` runs your project on a simple web server, `localhost:4000`
    by default.
 - `jekyll build` will deploy your static site, by default on a `_site` folder
    inside your project. Note that most files starting with `_` are jekyll
    _special_ files.

Now you can start editing your [_config.yml][5] file, which you can use for setting
lots of options to jekyll, or even adding global variables. This project is
quite simple, so read jekyll's documentation for further learning.

### Cloud9

I use a [cloud9 workspace][6] for manipulating this projects. If you are one of
those who uses cloud9 (personally I don't know anyone using c9) you can clone or
contribute to the project using that nice machine.

 [1]: https://github.com/p2kmgcl/p2kmgcl.github.com/blob/master/LICENSE.md
 [2]: https://github.com/p2kmgcl/p2kmgcl.github.com/blob/master/CONTRIBUTING.md
 [3]: https://jekyllrb.com/
 [4]: https://github.com/p2kmgcl/p2kmgcl.github.com/blob/master/Gemfile
 [5]: https://github.com/p2kmgcl/p2kmgcl.github.com/blob/master/_config.yml
 [6]: https://c9.io/p2kmgcl/pablomolina_me/
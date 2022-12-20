---
layout: '../../../layouts/EntryRaw.astro'
tags: [post]
title: Freemarker with alternative syntax
language: en
pubDate: 2022-04-20
emoji: 👽
---

<style>
  html {
    background-color: #111;
    color: #f1f1f1;
    font-family: system-ui;
  }

  #main-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    gap: 1em;
    padding: 1em;
  }

  body > a {
    display: block;
    padding: 1em;
  }

  blockquote {
    margin: 0;
    background: #222;
    border: solid thin #444;
    border-radius: 8px;
    min-width: min(40ch, 100%);
    width: auto;
    flex-grow: 1;
    overflow: hidden;
  }

  p {
    font-weight: 600;
    margin: 0;
    background: #333;
    padding: 0.5em 1em;
    border-bottom: solid thin #444;
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin: 1em;
  }

  a,
  a:visited {
    color: #aaa;
  }

  pre {
    border-radius: 8px;
    padding: 1em;
    margin: 1em;
    font-size: 1rem;
    background: #111 !important;
    box-shadow: inset 0 0 0.5em rgba(0, 0, 0, 0.1), inset 0 -1px 0 #333;
  }
</style>

> Useful links
>
> - [Apache tutorial](https://freemarker.apache.org/docs/xgui_imperative_learn.html)
> - [Directive reference](https://freemarker.apache.org/docs/ref_directives.html)
> - [Builtin reference](https://freemarker.apache.org/docs/ref_builtins.html)
> - [Alternative syntax description](https://freemarker.apache.org/docs/dgui_misc_alternativesyntax.html)

> Variables
>
> ```
> <h1>${variable}</h1>
> ```
>
> ```
> <h1>[=variable]</h1>
> ```
>
> ```
> [#assign name = "Pablo"]
> ```

> Conditionals
>
> ```
> [#if 3 == 2]
>   Do things...
> [#elseif 2 == 3]
>   Do other things...
> [#else]
>   Or maybe this...
> [/#if]
> ```

> Loops
>
> ```
> [#list reader.books as book]
>   <span>Item ${book.name}</span>
> [#else]
>   There are no items
> [/#list]
> ```
>
> ```
> [#list reader.books]
>   <ul>
>     [#items as book]
>       <li>Item ${book.name}</li>
>     [/#items]
>   </ul>
> [#else]
>   There are no books.
> [/#list]
> ```
>
> ```
> <ol>
>   [#list 1..10 as i]
>     <li>Item ${i}</li>
>   [/#list]
> </ol>
> ```

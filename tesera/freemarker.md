---
type: cheat-sheet
draft: false
title: Freemarker with alternative syntax
language: en
date: 2022-04-20
emoji: 👽
tags: [experiment]
---

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

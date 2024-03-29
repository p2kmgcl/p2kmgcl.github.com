[![Netlify Status](https://api.netlify.com/api/v1/badges/3b7e4635-295c-4360-8f18-cb8992565b0e/deploy-status)](https://app.netlify.com/sites/pablomolina-me/deploys)

# Pablo Molina's website

Built with [Astro](https://astro.build/), hosted in
[Netlify](https://www.netlify.com/).

### WebP (needs `libwebp-tools`)

```
find public/pablo-molina -type f -name '*.jpg' -print0 \
  | xargs -0n1 -P$(nproc) -i \
      cwebp -q 84 -af '{}' -o '{}'.webp
```

### Avif (needs `libavif-tools`)

```
find public/pablo-molina -type f -name '*.jpg' -print0 \
  | xargs -0n1 -P$(nproc) -i \
      avifenc --codec aom --yuv 420 --min 20 --max 25 '{}' '{}'.avif
```

## Check tools

- [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fpablomolina.me%2F).
- [Google Rich Results Test](https://search.google.com/test/rich-results?utm_campaign=sdtt&utm_medium=url&url=https%3A%2F%2Fpablomolina.me%2Ftesera%2Fentry%2Fsobre-errores-y-detalles%2F&user_agent=1).
- [W3C HTML Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fpablomolina.me%2F).
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fpablomolina.me%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en).

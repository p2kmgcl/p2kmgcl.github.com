(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{3:function(n,o){function t(){return"serviceWorker"in navigator&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}o.install=function(n){n||(n={}),t()&&navigator.serviceWorker.register("sw.js",{})},o.applyUpdate=function(n,o){},o.update=function(){t()&&navigator.serviceWorker.getRegistration().then(function(n){if(n)return n.update()})}}}]);
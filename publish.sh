#!/usr/bin/env zsh
# title: Publish site to family.5jt.com
# author: sjt@5jt.com

DESTN='stephen@lambent.net:/var/www/family.5jt.com'
rsync -ruv site/index.html site/gallery.js site/gallery.css $DESTN
rsync -ruv images/* $DESTN/images
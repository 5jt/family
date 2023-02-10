#!/usr/bin/env zsh
# title: Compile site
# author: sjt@5jt.com

xsltproc -o site/index.html gallery.xsl gallery.xml

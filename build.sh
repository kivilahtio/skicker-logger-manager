#!/bin/bash

VENDORS=`./builder/getVendorsFromPackage.js`


#tsc #It is better to use tsify to preserve source maps to the original typescript-files

#Create the vendor bundle
browserify -o bundle/vendor.js \
           -r jquery -r gsap -r underscore -r log4javascript

#Create source maps pointing to *.ts and compile ts to js
browserify --debug -p tsify \
           -o bundle/app.js -e source/app.ts \
           -x jquery -x gsap -x underscore -x log4javascript


# By default, browserify generates inline source maps as a comment in bundle.js.
# Browserify's README suggests using exorcist if you want to extract them to a separate file:
#     browserify main.js --debug | exorcist bundle.js.map > bundle.js


cp bundle/app.js dist/
cp bundle/vendor.js dist/
cp source/index.html dist/


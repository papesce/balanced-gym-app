#!/bin/bash

rm -rf  ../server/public;
mkdir ../server/public;
cp -a ../server/api-explorer/. ../server/public/api-explorer;
cd build
mv * ../../server/public

#!/bin/bash

rm -rf ../server/public/admin
mkdir -p ../server/public/admin
cd build
cp -a . ../../server/public/admin

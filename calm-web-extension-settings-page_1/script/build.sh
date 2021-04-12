#!/bin/bash

FINAL_DIR=dist/settings
build() {
    echo 'building react'

    rm -r $FINAL_DIR 

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build

    dir -p $FINAL_DIR
    cp -r build/* $FINAL_DIR
    cp -r chrome/ $FINAL_DIR 

    # mv dist/index.html dist/popup.html

}

build

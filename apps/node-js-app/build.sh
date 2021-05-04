#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
CHECK_FILE="dist/sha256sum.txt"
CHECK_FILE_PATH="$DIR/$CHECK_FILE"

function main() {
  sha256sum=`cat "$DIR/src/index.ts" | shasum -a 256`

  if [ -f "$CHECK_FILE_PATH" ]; then
    check_sum=`cat "$CHECK_FILE_PATH"`
    if [ "$sha256sum" == "$check_sum" ]; then
      echo "
      sha256sum of src/index.ts matches already-existing sha256sum; exiting instead of rebuilding

      sha256sum( src/index.js ):
        $sha256sum
      $CHECK_FILE:
        $check_sum
"

      exit 0
    fi
  fi

  yarn tsdx build
  echo "$sha256sum" > "$CHECK_FILE_PATH"
}

main
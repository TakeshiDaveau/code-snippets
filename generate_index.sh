#!/bin/bash

find . -maxdepth 1 -type d -not -name '.' -print0 | while IFS= read -r -d $'\0' dir; do
  dirname=$(basename "$dir")
  echo "# $dirname index" > "$dir/000-index.md"
  find "$dir" -maxdepth 1 -type f -not -name '000-index.md' -print0 | while IFS= read -r -d $'\0' file; do
    filename=$(basename "$file")
    echo "- [$filename]($filename)" >> "$dir/000-index.md"
  done
  echo "" >> "$dir/000-index.md" # Add a newline at the end
done

echo "Indexes created in each subdirectory."
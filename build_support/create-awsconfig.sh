FILE=aws-exports.js
if [ ! -f "./src/$FILE" ]; then
  echo "$FILE does not exist in ./src/, creating blank aws-exports.js"
  touch "./src/$FILE"
fi
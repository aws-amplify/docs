FILE=aws-exports.js
if [ ! -f "./src/$FILE" ]; then
  echo "$FILE does not exist in ./src/, creating aws-exports.js"
  touch "./src/$FILE"
  echo "export default {}" > "./src/$FILE"
fi

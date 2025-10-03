$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$inputFile = Join-Path $scriptDir "show-attendance.js"
$outputFile = Join-Path $scriptDir "show-attendance.min.js"
npx uglify-js $inputFile --compress unused=false -o $outputFile --warn

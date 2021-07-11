// From: https://github.com/kulshekhar/ts-jest/issues/542#issuecomment-700103076

const path = require('path')
const {readFileSync, writeFileSync} = require('fs')

(() => {
  const lcovFile = path.resolve(__dirname, './coverage/lcov.info')
  const rawFile = readFileSync(lcovFile, 'utf8')
  const rebuiltPaths = rawFile.split('\n').map( singleLine => {
    if (singleLine.startsWith('SF:')) {
      return singleLine.replace('SF:', `SF:${__dirname}/`)
    }
    return singleLine
  }).join('\n')
  console.log(rebuiltPaths)
  writeFileSync(lcovFile, rebuiltPaths, 'utf8')
})()

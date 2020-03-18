const fs = require('fs')
const path = require('path')
const argvs = process.argv.slice(2)

const folder = argvs[0]
var size = argvs[1] || '100'

size = Number(size)
console.log(`listing files bigger than ${size}mb:`)
console.log(`folder: "${folder}"`)

size *= 1000000

walkFolder(folder, size)
console.log(`done listing`)

function walkFolder(folderPath, size) {
  let files = fs.readdirSync(folderPath)

  files.forEach((file, i) => {
    let stats = fs.statSync(`${folderPath}/${file}`)
    if (stats.isDirectory()) {
        walkFolder(`${folderPath}/${file}/`, size)
    } else {
        if (stats['size'] >= size) {
            console.log(`${folderPath}/${file} >> ${(stats['size']/1000000).toFixed(2)}mb`)
        }
    }
  })
}

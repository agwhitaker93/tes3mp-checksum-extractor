'use strict'
const fs = require('fs')

const pluginChecksumConstants = {
    'Morrowind.esm': ["0x7B6AF5B9", "0x34282D67"],
    'Tribunal.esm': ["0xF481F334", "0x211329EF"],
    'Bloodmoon.esm': ["0x43DD2132", "0x9EB62F26"]
}

fs.readdirSync('.')
    // filter to log files
    .filter(fileName => fileName.endsWith('.log'))
    // get file contents
    .reduce((accum, fileName) => {
        accum.push([ fileName, fs.readFileSync(fileName).toString() ])
        return accum
    }, [])
    // split file contents on newline
    .map(([fileName, fileContents]) => {
        return [fileName, fileContents.split('\n')]
    })
    // filter file contents to lines starting with idx
    .map(([fileName, fileContents]) => {
        return [fileName, fileContents.filter(line => line.startsWith('idx'))]
    })
    // split lines into idx, checksum and file
    .map(([fileName, fileContents]) => {
        return [fileName, fileContents.map(line => {
            const [idx, checksum, file] = line.split('\t').map(ln => ln.split(': ')[1])
            return {idx, checksum, file}
        })]
    })
    // convert results to requiredDataFiles format
    .map(([fileName, fileContents]) => {
        return [fileName, fileContents.reduce((accum, {checksum, file}) => {
            const plugin = file.split('/').at(-1)
            const checksumConsts = pluginChecksumConstants[plugin]
            if (checksumConsts) {
                accum.push({[plugin]: checksumConsts})
                return accum
            }
            accum.push({[plugin]: [`0x${checksum}`]})
            return accum
        }, [])]
    })
    // write contents to date-specific requiredDataFiles.json
    .forEach(([fileName, fileContents]) => {
        const newFileName = fileName.replace('tes3mp-client-', '').replace('.log', '')
        fs.writeFileSync(`${newFileName}-requiredDataFiles.json`, JSON.stringify(fileContents, null, 2))
    })

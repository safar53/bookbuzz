const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')

const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml')

const xmlParser = new xml2js.Parser({
    trim: true,
    normalize: true,
    explicitRoot: false,
    explicitArray: false,
    ignoreAttrs: true
})

const xmlBuilder = new xml2js.Builder({
    rootName: 'urlset',
    headless: true,
    renderOpts: {
        pretty: true,
        indent: '  ',
        newline: '\n'
    }
})

fs.readFile(sitemapPath, (err, data) => {
    if (err) throw err

    xmlParser.parseString(data, (err, result) => {
        if (err) throw err

        const xml = xmlBuilder.buildObject(result)

        fs.writeFile(sitemapPath, xml, (err) => {
            if (err) throw err
        })
    })
})

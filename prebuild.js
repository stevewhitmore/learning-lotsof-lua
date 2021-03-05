const fse = require('fs-extra')

fse.copy('README.md', './src/assets/README.md', err => {
    if (err) return console.error(err)
    console.log('README file copied to assets folder!')
  })
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const generateToken = (bytes = 256) =>
  crypto.randomBytes(bytes).toString('base64')

const secretsPath = path.join(__dirname, '../now-secrets.json')

fs.readFile(secretsPath, 'utf-8', (err, data = '{}') => {
  if (err && err.code !== 'ENOENT') throw err

  const secrets = {
    '@prisma-secret': generateToken(),
    '@jwt-secret': generateToken(),
    ...JSON.parse(data)
  }

  fs.writeFile(secretsPath, JSON.stringify(secrets, null, 2), 'utf-8', err => {
    if (err) throw err
  })
})

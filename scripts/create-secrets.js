const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

function generateToken(bytes = 256) {
  return crypto.randomBytes(bytes).toString('base64')
}

const SECRETS_PATH = path.join(__dirname, '../now-secrets.json')

fs.readFile(SECRETS_PATH, 'utf-8', (err, data = '{}') => {
  if (err && err.code !== 'ENOENT') throw err

  const secrets = {
    '@prisma-secret': generateToken(),
    '@jwt-secret': generateToken(),
    ...JSON.parse(data)
  }

  fs.writeFile(SECRETS_PATH, JSON.stringify(secrets, null, 2), 'utf-8', err => {
    if (err) throw err
  })
})

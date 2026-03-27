const fs = require('fs')
const path = require('path')

// Load semua command
const commands = {}
const commandFiles = fs.readdirSync(path.join(__dirname,'../command')).filter(f=>f.endsWith('.js'))
for(const file of commandFiles){
  const cmd = require(`../command/${file}`)
  commands[cmd.name] = cmd
}

exports.handle = async (sock, m, db) => {
  const text = m.message?.conversation || m.message?.extendedTextMessage?.text
  if(!text) return

  const prefix = '.'
  if(!text.startsWith(prefix)) return

  const args = text.slice(prefix.length).trim().split(/ +/g)
  const cmdName = args.shift().toLowerCase()

  const cmd = commands[cmdName]
  if(!cmd) return

  await cmd.run(sock, m, { db, args })
}

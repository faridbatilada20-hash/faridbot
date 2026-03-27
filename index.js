const readline = require('readline')
const { default: makeWASocket, useSingleFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const fs = require('fs')

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Masukkan nomor WhatsApp target (contoh: 6281234567890): ', async (number) => {
  if(!number) {
    console.log('❌ Nomor tidak boleh kosong')
    process.exit(0)
  }

  const authFile = `auth_${number}.json`
  const { state, saveState } = useSingleFileAuthState(authFile)

  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true,
    browser: ['PanBot','Chrome','1.0']
  })

  sock.ev.on('creds.update', saveState)

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if(connection === 'close') {
      const reason = new Boom(lastDisconnect?.error).output.statusCode
      console.log('Terputus, reason:', reason)
      process.exit(0)
    } else if(connection === 'open') {
      console.log(`✅ Bot WhatsApp ${number} siap digunakan!`)
    }
  })
})

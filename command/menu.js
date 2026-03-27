const { sendFakeDoc } = require("../lib/fakeDoc")
const config = require("../config")

module.exports = {
  name: "menu",
  run: async (sock, m, { db }) => {
    let user = db[m.sender]

    let date = new Date()
    let hari = date.toLocaleDateString("id-ID", { weekday: "long" })
    let tanggal = date.toLocaleDateString("id-ID")
    let waktu = date.toLocaleTimeString("id-ID")

    let teks = `
╭──❍「 *USER INFO* 」❍
├ Nama : ${m.pushName}
├ Id : @${m.sender.split("@")[0]}
├ User : ${user.user}
├ Limit : ${user.limit}
├ Uang : ${user.uang}
╰─┬────❍

╭─┴─❍「 *BOT INFO* 」❍
├ Nama Bot : ${config.botName}
├ Powered : WhatsApp
├ Owner : ${config.owner}
├ Mode : ${config.mode}
├ Prefix : ${config.prefix}
╰─┬────❍

╭─┴─❍「 *ABOUT* 」❍
├ Date : ${tanggal}
├ Day : ${hari}
├ Time : ${waktu}
╰──────❍

╭──❍「 *MENU* 」❍
│➤ .claim
│➤ .ping
│➤ .speed
│➤ .profile
╰──────❍
`

    await sendFakeDoc(sock, m.chat, teks)
  }
  }

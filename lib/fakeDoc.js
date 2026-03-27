exports.sendFakeDoc = async (sock, jid, text) => {
  const jam = new Date().getHours()
  let ucapan = "Selamat Malam"

  if (jam >= 4 && jam < 10) ucapan = "Selamat Pagi"
  else if (jam >= 10 && jam < 15) ucapan = "Selamat Siang"
  else if (jam >= 15 && jam < 18) ucapan = "Selamat Sore"

  await sock.sendMessage(jid, {
    document: Buffer.from("Fake PDF"),
    mimetype: "application/pdf",
    fileName: ucapan + ".pdf",
    caption: text
  })
    }

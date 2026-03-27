exports.sendFakeDoc = async (sock, jid, text) => {
  const time = new Date().getHours()
  let ucapan = "Selamat Malam"

  if (time >= 4 && time < 10) ucapan = "Selamat Pagi"
  else if (time >= 10 && time < 15) ucapan = "Selamat Siang"
  else if (time >= 15 && time < 18) ucapan = "Selamat Sore"

  return sock.sendMessage(jid, {
    document: { url: "https://example.com/fake.pdf" },
    mimetype: "application/pdf",
    fileName: ucapan,
    caption: text
  })
               }

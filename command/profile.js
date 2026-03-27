module.exports = {
  name: "profile",
  run: async (sock, m, { db }) => {
    let user = db[m.sender]

    try {
      // Ambil foto profil pengguna
      let ppUrl = await sock.profilePictureUrl(m.sender)
      
      // Kirim profile lengkap
      await sock.sendMessage(m.chat, {
        image: { url: ppUrl },
        caption: `
👤 Profile
Nama: ${m.pushName}
Nomor: ${m.sender.split("@")[0]}
Uang: ${user.uang}
Status: ${user.user}
Limit: ${user.limit}
        `
      })
    } catch (err) {
      // Kalau nggak ada foto profil
      await sock.sendMessage(m.chat, {
        text: `
👤 Profile
Nama: ${m.pushName}
Nomor: ${m.sender.split("@")[0]}
Uang: ${user.uang}
Status: ${user.user}
Limit: ${user.limit}

⚠️ Pengguna tidak memiliki foto profil
        `
      })
    }
  }
}

const ONE_DAY = 24 * 60 * 60 * 1000; // 1 hari dalam ms

module.exports = {
  name: "claim",
  run: async (sock, m, { db }) => {
    let user = db[m.sender]

    // Cek lastClaim, kalau belum ada set ke 0
    if (!user.lastClaim) user.lastClaim = 0

    const now = Date.now()
    const diff = now - user.lastClaim

    if (diff < ONE_DAY) {
      // Hitung sisa waktu
      const remaining = ONE_DAY - diff
      const hours = Math.floor(remaining / (60*60*1000))
      const minutes = Math.floor((remaining % (60*60*1000)) / (60*1000))
      const seconds = Math.floor((remaining % (60*1000)) / 1000)

      return sock.sendMessage(m.chat, {
        text: `⏳ Kamu sudah claim hari ini!\nCoba lagi dalam ${hours}h ${minutes}m ${seconds}s`
      })
    }

    // Tambahkan reward
    const reward = 1000
    user.uang += reward
    user.lastClaim = now

    await sock.sendMessage(m.chat, {
      text: `✅ Kamu berhasil claim ${reward} uang 💰\nTotal: ${user.uang}`
    })
  }
  }

module.exports = {
  name: "ping",
  run: async (sock, m) => {
    const start = Date.now() // catat waktu mulai
    // Kirim pesan sementara
    const sentMsg = await sock.sendMessage(m.chat, { text: "Menghitung ping..." })
    const end = Date.now() // catat waktu selesai

    const latency = end - start // hitung ms

    // Edit pesan lama jadi hasil ping
    await sock.sendMessage(m.chat, { text: `🏓 Pong!\nKecepatan: ${latency} ms` })
  }
}

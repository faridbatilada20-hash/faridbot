let db = {}

exports.loadDB = () => db

exports.addUser = (id) => {
  if (!db[id]) {
    db[id] = {
      uang: 0,
      limit: "VIP",
      user: "VIP"
    }
  }
}

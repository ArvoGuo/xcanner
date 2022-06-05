var crypto = require("crypto");

function md5(str) {
  return crypto.createHash("md5").update(String(str)).digest("hex");
}

function blast(options) {
  const { from, to, target } = options;
  if (isNaN(from) || isNaN(to)) {
    throw new Error("from/to should be a number");
  }
  for (let i = from; i < to; i++) {
    if (md5(i).startsWith(target)) {
      return i;
    }
  }
}

module.exports = blast;

// blast(1, 99999999, '8a45ad')

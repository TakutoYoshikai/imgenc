const crypto = require("crypto");
const fs = require("fs");
const encryptor = require("file-encryptor");

function makeHash(buf) {
  return crypto.createHash("sha256").update(buf, "utf8").digest("hex");
}

function makeHashFromFile(filepath) {
  const buf = fs.readFileSync(filepath);
  return makeHash(buf);
}

function encrypt(filepath, password, output) {
  encryptor.encryptFile(filepath, output, password, (err) => {
    if (err) {
      console.error(err);
    }
    process.exit(0);
  });
}

function decrypt(filepath, password, output) {
  encryptor.decryptFile(filepath, output, password, (err) => {
    if (err) {
      console.error(err);
    }
    process.exit(0);
  });
}

const mode = process.argv[2];
const filepath = process.argv[3];
const imgpath = process.argv[4];
const output = process.argv[5];

const password = makeHashFromFile(imgpath);

if (mode === "encrypt") {
  encrypt(filepath, password, output);
} else if (mode === "decrypt") {
  decrypt(filepath, password, output);
}

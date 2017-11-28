const crypto = require("crypto");
const bigi = require("bigi");

// https://en.bitcoin.it/wiki/Secp256k1
const SECP256K1_CURVE_ORDER = bigi.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");

function sha256(buffer) {
    const sha256 = crypto.createHash("sha256");
    sha256.update(buffer);
    return sha256.digest();
}

function ripemd160(buffer) {
    const ripemd160 = crypto.createHash("ripemd160");
    ripemd160.update(buffer);
    return ripemd160.digest();
}

function generateSecp256k1PublicKey(privateKey) {
    const secp256k1 = crypto.createECDH("secp256k1");
    secp256k1.setPrivateKey(privateKey);
    return secp256k1.getPublicKey();
}

module.exports = {
    SECP256K1_CURVE_ORDER: SECP256K1_CURVE_ORDER,
    sha256: sha256,
    ripemd160: ripemd160,
    generateSecp256k1PublicKey: generateSecp256k1PublicKey
}

const nodeCrypto = require("crypto");
const bigi = require("bigi");
const crypto = require("./crypto");

const PRIVATE_KEY_MAX_BIT_SIZE = 256;

// Private key must be between 1 and the secp256k1 curve order
function isValidPrivateKey(privateKey) {
    return privateKey.compareTo(crypto.SECP256K1_CURVE_ORDER) <= 0
        && privateKey.compareTo(bigi.ONE) >= 0;
}

function generatePrivateKey() {
    let privateKey = bigi.ZERO;
    do {
        privateKey = bigi.fromBuffer(nodeCrypto.randomBytes(PRIVATE_KEY_MAX_BIT_SIZE / 8));
    } while (!isValidPrivateKey(privateKey))
    return privateKey.toBuffer();
}

function generatePublicKey(privateKey) {
    return crypto.generateSecp256k1PublicKey(privateKey);
}

function generateAddress(publicKey) {
    return crypto.ripemd160(crypto.sha256(publicKey));
}

module.exports = {
    generatePrivateKey: generatePrivateKey,
    generatePublicKey: generatePublicKey,
    generateAddress: generateAddress,
}

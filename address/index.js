const crypto = require("crypto");
const bigi = require("bigi");
const bs58 = require("bs58");

// https://en.bitcoin.it/wiki/Secp256k1
const CURVE_ORDER = bigi.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
const PRIVATE_KEY_MAX_BIT_SIZE = 256;

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

// Private key must be between 1 and the Curve order
function isValidPrivateKey(privateKey) {
    return privateKey.compareTo(CURVE_ORDER) <= 0
        && privateKey.compareTo(bigi.ONE) >= 0;
}

function generatePrivateKey() {
    let privateKey = bigi.ZERO;
    do {
        privateKey = bigi.fromBuffer(crypto.randomBytes(PRIVATE_KEY_MAX_BIT_SIZE / 8));
    } while (!isValidPrivateKey(privateKey))
    return privateKey.toBuffer();
}

function generatePublicKey(privateKey) {
    const secp256k1 = crypto.createECDH("secp256k1");
    secp256k1.setPrivateKey(privateKey);
    return secp256k1.getPublicKey();
}

function generateAddress(publicKey) {
    return ripemd160(sha256(publicKey));
}

function generateBase58CheckAddress(address) {
    const checkStep1 = sha256(Buffer.concat([Buffer.from([0x00]), address]));
    const checkStep2 = sha256(checkStep1);
    const base58CheckAddress = Buffer.concat([Buffer.from([0x00]), address, checkStep2.slice(0, 4)]);
    return bs58.encode(base58CheckAddress);
}

module.exports = {
    generatePrivateKey: generatePrivateKey,
    generatePublicKey: generatePublicKey,
    generateAddress: generateAddress
}

const privateKey = bigi.fromHex("1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD");
const publicKey = generatePublicKey(privateKey.toBuffer());
const address = generateAddress(publicKey);
console.log("Private hex:", privateKey.toHex());
console.log("Public hex:", bigi.fromBuffer(publicKey).toHex());
console.log("Address hex:", bigi.fromBuffer(address).toHex());
console.log("Base58Check address:", generateBase58CheckAddress(address));

import * as nodeCrypto from "crypto";
import * as bigi from "bigi";
import * as Crypto from "./Crypto";

//const nodeCrypto = require("crypto");
//const bigi = require("bigi");
//const crypto = require("./crypto");

const PRIVATE_KEY_MAX_BIT_SIZE = 256;

// Private key must be between 1 and the secp256k1 curve order
function isValidPrivateKey(privateKey): boolean {
    return privateKey.compareTo(Crypto.SECP256K1_CURVE_ORDER) <= 0
        && privateKey.compareTo(bigi.ONE) >= 0;
}

export function generatePrivateKey(): Buffer {
    let privateKey: bigi = bigi.ZERO;
    do {
        privateKey = bigi.fromBuffer(nodeCrypto.randomBytes(PRIVATE_KEY_MAX_BIT_SIZE / 8));
    } while (!isValidPrivateKey(privateKey))
    return privateKey.toBuffer(0);
}

export function generatePublicKey(privateKey: Buffer): Buffer {
    return Crypto.generateSecp256k1PublicKey(privateKey);
}

export function generateAddress(publicKey: Buffer): Buffer {
    return Crypto.ripemd160(Crypto.sha256(publicKey));
}

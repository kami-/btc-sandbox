import * as bigi from "bigi";
import * as crypto from "crypto";

// https://en.bitcoin.it/wiki/Secp256k1
export const SECP256K1_CURVE_ORDER = bigi.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");

export function sha256(buffer: Buffer): Buffer {
    const sha256 = crypto.createHash("sha256");
    sha256.update(buffer);
    return sha256.digest();
}

export function ripemd160(buffer: Buffer): Buffer {
    const ripemd160 = crypto.createHash("ripemd160");
    ripemd160.update(buffer);
    return ripemd160.digest();
}

export function generateSecp256k1PublicKey(privateKey: Buffer): Buffer {
    const secp256k1 = crypto.createECDH("secp256k1");
    secp256k1.setPrivateKey(privateKey);
    return secp256k1.getPublicKey();
}

export function pbkdf2(secret: string, salt: string, iteration: number, keyLength: number, digest: string): Buffer {
    return crypto.pbkdf2Sync(secret, salt, iteration, keyLength, digest);
}

export function randomBytes(size: number): Buffer {
    return crypto.randomBytes(size);
}

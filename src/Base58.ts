import * as bs58 from "bs58";
import * as Crypto from "./Crypto";

const BASE_58_CHECK_CHECKSUM_BYTE_SIZE = 4
const BASE_58_CHECK_VERSION = {
    ADDRESS: Buffer.from([0x00]),
    PRIVATE_KEY_WIF: Buffer.from([0x80])
};

export function checkEncode(version: Buffer, payload: Buffer): string {
    const versionAndPayload = Crypto.sha256(Buffer.concat([version, payload]));
    const checksum = Crypto.sha256(versionAndPayload);
    const result = Buffer.concat([version, payload, checksum.slice(0, BASE_58_CHECK_CHECKSUM_BYTE_SIZE)]);
    return bs58.encode(result);
}

export function checkEncodeAddress(address: Buffer): string {
    return checkEncode(BASE_58_CHECK_VERSION.ADDRESS, address);
}

export function checkDecodeAddress(encodedAddress: string) {
    const decodedAddress = bs58.decode(encodedAddress);
    const checksumStart = decodedAddress.length - BASE_58_CHECK_CHECKSUM_BYTE_SIZE - 1;
    return {
        version: decodedAddress[0],
        address: Buffer.from(decodedAddress.slice(1, checksumStart)),
        checksum: Buffer.from(decodedAddress.slice(checksumStart))
    };
}

export function checkEncodeWifPrivateKey(privateKey: Buffer): string {
    return checkEncode(BASE_58_CHECK_VERSION.PRIVATE_KEY_WIF, privateKey);
}

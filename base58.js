const bs58 = require("bs58");
const crypto = require("./crypto");

const BASE_58_CHECK_CHECKSUM_BYTE_SIZE = 4
const BASE_58_CHECK_VERSION = {
    ADDRESS: Buffer.from([0x00]),
    PRIVATE_KEY_WIF: Buffer.from([0x80])
};

function checkEncode(version, payload) {
    const versionAndPayload = crypto.sha256(Buffer.concat([version, payload]));
    const checksum = crypto.sha256(versionAndPayload);
    const result = Buffer.concat([version, payload, checksum.slice(0, BASE_58_CHECK_CHECKSUM_BYTE_SIZE)]);
    return bs58.encode(result);
}

function checkEncodeAddress(address) {
    return checkEncode(BASE_58_CHECK_VERSION.ADDRESS, address);
}

function checkDecodeAddress(encodedAddress) {
    const decodedAddress = bs58.decode(encodedAddress);
    const checksumStart = decodedAddress.length - BASE_58_CHECK_CHECKSUM_BYTE_SIZE - 1;
    return {
        version: decodedAddress[0],
        address: Buffer.from(decodedAddress.slice(1, checksumStart)),
        checksum: Buffer.from(decodedAddress.slice(checksumStart))
    };
}

function checkEncodeWifPrivateKey(privateKey) {
    return checkEncode(BASE_58_CHECK_VERSION.PRIVATE_KEY_WIF, privateKey);
}

module.exports = {
    checkEncode: checkEncode,
    checkEncodeAddress: checkEncodeAddress,
    checkDecodeAddress: checkDecodeAddress,
    checkEncodeWifPrivateKey: checkEncodeWifPrivateKey
}

const bs58 = require("bs58");
const crypto = require("./crypto");

const BASE_58_CHECK_VERSION = {
    ADDRESS: Buffer.from([0x00]),
    PRIVATE_KEY_WIF: Buffer.from([0x80])
};

function checkEncode(version, payload) {
    const versionAndPayload = crypto.sha256(Buffer.concat([version, payload]));
    const checksum = crypto.sha256(versionAndPayload);
    const result = Buffer.concat([version, payload, checksum.slice(0, 4)]);
    return bs58.encode(result);
}

function checkEncodeAddress(address) {
    return checkEncode(BASE_58_CHECK_VERSION.ADDRESS, address);
}

module.exports = {
    checkEncode: checkEncode,
    checkEncodeAddress: checkEncodeAddress
}

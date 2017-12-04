const bigi = require("bigi");
const address = require("./src/address");
const base58 = require("./src/base58");

const privateKey = bigi.fromHex("1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD").toBuffer();
const publicKey = address.generatePublicKey(privateKey);
const btcAddress = address.generateAddress(publicKey);
console.log("Private hex:", bigi.fromBuffer(privateKey).toHex());
console.log("Private WIF:", base58.checkEncodeWifPrivateKey(privateKey));
console.log("Public hex:", bigi.fromBuffer(publicKey).toHex());
console.log("Address hex:", bigi.fromBuffer(btcAddress).toHex());

const checkEncodedBtcAddress = base58.checkEncodeAddress(btcAddress);
console.log("Base58Check address:", checkEncodedBtcAddress);
const decodedBtcAddress = base58.checkDecodeAddress(checkEncodedBtcAddress)
console.log("Decoded Base58Check address:", decodedBtcAddress);
console.log("Decoded Base58Check address hex:", bigi.fromBuffer(decodedBtcAddress.address).toHex());

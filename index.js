const bigi = require("bigi");
const address = require("./address");
const base58 = require("./base58");

const privateKey = bigi.fromHex("1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD");
const publicKey = address.generatePublicKey(privateKey.toBuffer());
const btcAddress = address.generateAddress(publicKey);
console.log("Private hex:", privateKey.toHex());
console.log("Public hex:", bigi.fromBuffer(publicKey).toHex());
console.log("Address hex:", bigi.fromBuffer(btcAddress).toHex());
console.log("Base58Check address:", base58.checkEncodeAddress(btcAddress));

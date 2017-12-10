import * as bigi from "bigi";
import * as Address from "./src/Address";
import * as Base58 from "./src/Base58";
import * as Bip39 from "./src/Bip39";

const privateKey = bigi.fromHex("1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD").toBuffer(0);
const publicKey = Address.generatePublicKey(privateKey);
const btcAddress = Address.generateAddress(publicKey);
console.log("Private hex:", bigi.fromBuffer(privateKey).toHex());
console.log("Private WIF:", Base58.checkEncodeWifPrivateKey(privateKey));
console.log("Public hex:", bigi.fromBuffer(publicKey).toHex());
console.log("Address hex:", bigi.fromBuffer(btcAddress).toHex());

const checkEncodedBtcAddress = Base58.checkEncodeAddress(btcAddress);
console.log("Base58Check address:", checkEncodedBtcAddress);
const decodedBtcAddress = Base58.checkDecodeAddress(checkEncodedBtcAddress)
console.log("Decoded Base58Check address:", decodedBtcAddress);
console.log("Decoded Base58Check address hex:", bigi.fromBuffer(decodedBtcAddress.address).toHex());

const words = Bip39.generateWords(24);
console.log("BIP39 generated words: ", words);
console.log("BIP39 words to seed: ", Bip39.wordsToSeed(words));

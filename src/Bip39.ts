import * as EnglishWordlist from "./bip39/EnglishWordlist";
import * as bigi from "bigi";
import * as Crypto from "./Crypto";
import { encode } from "punycode";

export type MNEMONIC_LENGTH = 12 | 15 | 18 | 21 | 24;

const WORD_BIT_LENGTH = 11;
const WORD_BIT_MASK = 0b1111111111100000;
const MNEMONIC_CODES = {
    12: {
        entropy: 128,
        checksum: 4
    },
    15: {
        entropy: 160,
        checksum: 5
    },
    18: {
        entropy: 192,
        checksum: 6
    },
    21: {
        entropy: 224,
        checksum: 7
    },
    24: {
        entropy: 256,
        checksum: 8
    },
};

function leftPad(str: string, pad: string, length: number): string {
    let paddedStr = str;
    while (paddedStr.length < length) {
        paddedStr = pad + paddedStr
    }
    return paddedStr;
}

function bytesToBits(bytes: Buffer): string {
    return [].slice
        .call(bytes)
        .map(b => leftPad(b.toString(2), "0", 8))
        .join("");
}

export function generateWords(numberOfWords: MNEMONIC_LENGTH): string[] {
    const mnemonicCode = MNEMONIC_CODES[numberOfWords];
    const entropy = Crypto.randomBytes(mnemonicCode.entropy / 4);
    const checksum = Crypto.sha256(entropy);
    const bits = bytesToBits(Buffer.concat([entropy, checksum]));
    const words = [];
    for (let i = 0; i < numberOfWords; i++) {
        const wordIdx = parseInt(bits.substr(i * WORD_BIT_LENGTH, WORD_BIT_LENGTH), 2);
        words.push(EnglishWordlist.WORDLIST[wordIdx]);
    }
    return words;
}

export function wordsToSeed(words: string[], passphrase = ""): Buffer {
    return Crypto.pbkdf2(words.join(" "), "mnemonic" + passphrase, 2048, 512 / 8, "sha512");;
}


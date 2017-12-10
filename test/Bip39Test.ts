import * as bigi from "bigi";
import * as Crypto from "../src/Crypto";
import * as Bip39 from "../src/Bip39";

describe("Bip39", () => {
    const ENTROPY_HEX = "0c1e24e5917779d297e14d45f14e1a1a";
    const TEST_WORDS = ["army", "van", "defense", "carry", "jealous", "true", "garbage", "claim", "echo", "media", "make", "crunch"];
    const TEST_SEED_HEX = "5b56c417303faa3fcba7e57400e120a0ca83ec5a4fc9ffba757fbe63fbd77a89a1a3be4c67196f57c39a88b76373733891bfaba16ed27a813ceed498804c0570";
    const TEST_SEED_WITH_PASSPHRASE_HEX = "3b5df16df2157104cfdd22830162a5e170c0161653e3afe6c88defeefb0818c793dbb28ab3ab091897d0715861dc8a18358f80b79d49acf64142ae57037d1d54";

    describe("generateWords", () => {
        it("should generate words correctly", () => {
            spyOn(Crypto, "randomBytes").and.returnValue(bigi.fromHex(ENTROPY_HEX).toBuffer(0));

            const words = Bip39.generateWords(12);

            expect(words).toEqual(TEST_WORDS);
        });
    });

    describe("wordsToSeed", () => {
        it("should generate seed without passphrase correctly", () => {
            const seed = Bip39.wordsToSeed(TEST_WORDS);

            expect(bigi.fromBuffer(seed).toHex()).toBe(TEST_SEED_HEX);
        });

        it("should generate seed with passphrase correctly", () => {
            const seed = Bip39.wordsToSeed(TEST_WORDS, "SuperDuperSecret");

            expect(bigi.fromBuffer(seed).toHex()).toBe(TEST_SEED_WITH_PASSPHRASE_HEX);
        });
    });
});
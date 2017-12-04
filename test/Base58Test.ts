import * as bigi from "bigi";
import * as Base58 from "../src/Base58";

describe("Base58", () => {
    const PRIVATE_KEY_HEX = "3aba4162c7251c891207b747840551a71939b0de081f85c4e44cf7c13e41daa6";

    describe("checkEncodeWifPrivateKey", () => {
        it("should encode private key correctly", () => {
            const privateKeyWif = Base58.checkEncodeWifPrivateKey(bigi.fromHex(PRIVATE_KEY_HEX).toBuffer(0));

            expect(privateKeyWif).toBe("5JG9hT3beGTJuUAmCQEmNaxAuMacCTfXuw1R3FCXig23RQHMr4K");
        });
    });
});
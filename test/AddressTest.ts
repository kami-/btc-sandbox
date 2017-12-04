import * as bigi from "bigi";
import * as Address from "../src/Address";
import * as Base58 from "../src/Base58";

describe("Address", () => {
    const PRIVATE_KEY_HEX = "3aba4162c7251c891207b747840551a71939b0de081f85c4e44cf7c13e41daa6";
    const PUBLIC_KEY_HEX = "045c0de3b9c8ab18dd04e3511243ec2952002dbfadc864b9628910169d9b9b00ec243bcefdd4347074d44bd7356d6a53c495737dd96295e2a9374bf5f02ebfc176";
    const ADDRESS_BASE_58_CHECK = "1thMirt546nngXqyPEz532S8fLwbozud8";

    describe("generatePublicKey", () => {
        it("should generate the correct public key for given private key", () => {
            const publicKey = Address.generatePublicKey(bigi.fromHex(PRIVATE_KEY_HEX).toBuffer(0));

            expect(bigi.fromBuffer(publicKey).toHex()).toBe(PUBLIC_KEY_HEX);
        });
    });

    describe("generateAddress", () => {
        it("should generate the correct address for given public key", () => {
            const addressBuffer = Address.generateAddress(bigi.fromHex(PUBLIC_KEY_HEX).toBuffer(0));
            const addressBase58Check = Base58.checkEncodeAddress(addressBuffer);

            expect(addressBase58Check).toBe(ADDRESS_BASE_58_CHECK);
        });
    });
});
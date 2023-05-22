import { Keypair, Connection, Commitment } from "@solana/web3.js";
import wallet from "../wba-wallet.json";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
} from "@metaplex-foundation/js";
import { readFile } from "fs/promises";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com");

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))
  .use(
    bundlrStorage({
      address: "https://devnet.bundlr.network/",
      providerUrl: "https://api.devnet.solana.com/",
      timeout: 60_000,
    })
  );

(async () => {
  try {
    const img = await readFile("./images/generug.png");
    const metaplex_image = toMetaplexFile(img, "generug.png");
    const uri = await metaplex.storage().upload(metaplex_image);
    console.log("${uri}");

  } catch (error) {
    console.log("Oops, something went wrong: ${error}");
  }
})();

import { Keypair, Connection, Commitment } from "@solana/web3.js";
import wallet from "../wba-wallet.json";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";

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
    const nft = await metaplex.nfts().create({
      uri: "https://arweave.net/fFmAvwO0dVG1SnXr4CQqhft85hEEFmmKikXsKrjTG1g",
      name: "Jiooji's Rug",
      symbol: "JR",
      creators: [
        {
          address: keypair.publicKey,
          share: 100,
        },
      ],
      sellerFeeBasisPoints: 1000,
      isMutable: true,
    });

    console.log(nft.nft.address.toBase58());
  } catch (error) {
    console.log("Oops, something went wrong: ${error}");
  }
})();

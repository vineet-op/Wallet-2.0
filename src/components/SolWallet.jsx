import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { SiSolana } from "react-icons/si";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  return (
    <div className="w-full flex flex-col items-center">
      <button
        className="bg-gray-800 text-white p-4 text-center rounded-lg font-mono"
        onClick={function () {
          const seed = mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey]);
        }}
      >
        Add Solana Wallet
      </button>
      <div className="w-full flex justify-center">
        <ul className="mt-5 w-full text-white flex flex-col justify-center items-center">
          {publicKeys.map((publicKey, index) => (
            <li
              key={index}
              className="bg-gray-700 p-6 rounded-lg mt-3 min-w-96 flex items-center justify-center"
            >
              <SiSolana className="mr-2 text-lg" />
              {publicKey.toBase58()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

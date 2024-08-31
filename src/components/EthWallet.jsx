import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { FaEthereum } from "react-icons/fa";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  return (
    <div className="w-full flex flex-col items-center">
      <button
        className="bg-gray-800 text-white p-4 text-center rounded-lg font-mono"
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet.address]);
        }}
      >
        Add Ethereum Wallet
      </button>
      <div className="w-full flex justify-center">
        <ul className="mt-5 w-full text-white flex flex-col justify-center items-center">
          {addresses.map((p, index) => (
            <li
              key={index}
              className="bg-gray-700 p-6 rounded-lg mt-3 min-w-96 flex items-center justify-center"
            >
              <FaEthereum className="mr-2 text-lg" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

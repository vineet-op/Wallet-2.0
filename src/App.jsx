import { useState } from "react";
import { generateMnemonic } from "bip39";
import "./App.css";
import { SolanaWallet } from "./components/SolWallet";
import { EthWallet } from "./components/EthWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  return (
    <>
      <div className="w-full min-h-screen bg-custom-gradient flex flex-col items-center">
        <div className="flex p-8 text-white justify-center text-center font-semibold text-2xl">
          CRYPTO WALLET 🪙
        </div>
        {mnemonic === "" ? (
          <div className="text-white">No Seed Pharse Created Yet !</div>
        ) : (
          <div className="grid grid-cols-3 gap-2 bg-custom-gradient rounded-lg shadow-lg">
            {mnemonic.split(" ").map((word, index) => (
              <div
                key={index}
                className="bg-white p-6 text-center rounded-lg shadow-sm text-sm font-semibold"
              >
                {word}
              </div>
            ))}
            <div className="col-span-3 flex justify-center items-center">
              <span className="text-white m-6">
                *Note: Keep the seed phrase safe / Don't share with anyone
              </span>
            </div>
          </div>
        )}
        <button
          className="bg-green-600 p-3 m-5 text-white rounded-lg mt-5"
          onClick={async function () {
            const mn = await generateMnemonic();
            setMnemonic(mn);
          }}
        >
          Create
        </button>

        <div className="flex flex-col items-center w-full  space-y-10 mt-10">
          <SolanaWallet mnemonic={mnemonic} />
          <EthWallet mnemonic={mnemonic} />
        </div>
      </div>
    </>
  );
}

export default App;

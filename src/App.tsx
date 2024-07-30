import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadContract, useWriteContract,useSendTransaction } from "wagmi";
import { parseEther } from 'viem'
import { abi } from "./Bank.tsx";
import { contract } from "./ca.tsx";
import { useState } from "react";
import "./index.css";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract } = useWriteContract();
  const { sendTransaction } = useSendTransaction()

  const [num, setNum] = useState('');

  const changeNum = (event) => {
    setNum(event.target.value);
  };
  
  const result = useReadContract({
    abi,
    address: contract,
    functionName: "getCounter",
  });

  function getCounter() {
    alert(result.data);
  }

  function depositMoney(amount : any){
    sendTransaction({
      to: contract,
      value: parseEther(amount),
    })
  }

  return (
    <div className="container">
      <header> 
        <h1>Swapy</h1>
      </header>
     

      <div className="connect">
        <ConnectButton />
      </div>

      
      <div className="top-right">
        <section>
          <button onClick={getCounter}>Click me to see counter</button>
        </section> 
      </div>

      <br />
      <div>
        <label>Deposit</label>
        <input 
          type="text" 
          placeholder="Enter amount to deposit" 
          onChange={changeNum} 
          value={num} 
        />
        <br/>
        <button onClick={() => depositMoney(num)}>Send</button>
      </div>

    </div>
    
  );
}

export default App;
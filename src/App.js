import {useState} from "react";
import {ethers} from 'ethers';
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";

import './App.css';

//const greeterAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const greeterAddress = "0x9d74Dd4C532fdfBEc19Be8D1c31C2223001Aa816";
const tokenAddress = "0x1FA2F83BA2DF61c3d370071d61B17Be01e224f3a";

function App() {

  const [greeting, setGreetingValue] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [amount, setAmount] = useState(0);

  async function requestAccount() {
    await window.ethereum.request( {method: 'eth_requestAccounts' } );
  }

  async function fetchGreeting() {

    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }

  }

  async function getBalance() {

    if(typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method : 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
    
      const balance = await contract.balanceOf(account);

      console.log("Balance: ", ethers.utils.formatUnits(balance.toString(), "ether"));
     
    }

  }

  async function sendCoins() {

    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);

      const transaction = await contract.transfer(userAccount, amount);

      await transaction.wait();

      console.log(`${ethers.utils.formatUnits(amount.toString(), "ether")} Coins successfully sent to ${userAccount}`);
     
    }

  }

  async function setGreeting() {

    if(!greeting) return;

    if(typeof window.ethereum != "undefined") {

      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);

      setGreetingValue("");

      await transaction.wait();
      fetchGreeting();

    }

  }

  return (
    <div className="App">
      <header className="App-header">

        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder = "Set Greeting"
        value={greeting} />

        <br />

        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account Address" />
        <input onChange={e => { 
          
          let value = ethers.utils.parseEther(e.target.value.toString());
          
          setAmount(value)
        }} placeholder="Amount"/>

      </header>
    </div>
  );
}

export default App;

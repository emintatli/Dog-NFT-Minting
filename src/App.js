
import './App.css';
import {useState,useRef,useEffect} from "react";
import Web3 from "web3";
import contractAbi from "./abi.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moralis from "moralis"

function App() {
  const contractAddress="0xd4CC68BdcADeFCFa610Db23D3b0CdfD0a531E0A9";
  const rpcUrl="https://rpc-mumbai.matic.today/"
  const nftPrice="0.000015";
  const [mweb3,setMweb3]=useState();
  const [mintData,setMintData]=useState();
  const [walletAddress,setWallet]=useState();
  const [loading,setLoading]=useState(false);
  const [amountToMint,setAmount]=useState(1);
  const amountInput=useRef();
  const [userNFTs,setUserNFTs]=useState([]);

  useEffect(async()=>{
    const web3 = new Web3(rpcUrl);
    const contract = new web3.eth.Contract(contractAbi,contractAddress);
    const totalMint=await contract.methods.totalMint().call();
    const maxMint=await contract.methods.maxMint().call();
    setMintData({
      totalMint,
      maxMint
    });
  },[])


  const walletConnect=async()=>{
    const address = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    setMweb3(web3);
    setWallet(address[0]);
  }

  const mintHandler=async()=>{
    try{
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const contract = new mweb3.eth.Contract(contractAbi,contractAddress);
      const tx=await contract.methods.awardItem(walletAddress,amountToMint).send({from:walletAddress,value:amountToMint*Web3.utils.toWei(nftPrice, 'ether')});
      if(tx){
        toast.success('🦄 NFT minted successfully.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setMintData({
            ...mintData,
            totalMint:parseInt(mintData.totalMint)+parseInt(amountToMint),
          });
      }
      else{
        toast.error('Someting went wrong.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    }
    catch(err){
      toast.error("Someting went wrong.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }


  }
  return (
<>
      <ToastContainer />
     
      <div className="navbar-main">
      <div className="container-md">
        <div className="navbar">
          <img width={300} src="/logo.png"/>
          <ul className="navmenu">
            <li className="cursor-pointer">
              <a className='no-style' href='#content-2'>ABOUT</a>
            </li>
            <li className="cursor-pointer">
            <a className='no-style' href='#content-3'>ROADMAP</a>
            </li>
            <li className="cursor-pointer">
            <a  className='no-style'href='#content-4'>FAQ</a> 
            </li>
            <li className="cursor-pointer">
            <a className='no-style' href='#content-5'>TEAM</a> 
            </li>
          </ul>
          <div className='social'>
            <img className="m-2" width={40} src="https://static.wixstatic.com/media/aed4d1_f1574e7c6a09409584dcf1ad1c23b1cc~mv2.png"/>
            <img className="m-2" width={40} src="https://static.wixstatic.com/media/aed4d1_e9260e51d60a41c19ca484cbf270e7cc~mv2.png"/>
            <img className="m-2" width={40} src="https://static.wixstatic.com/media/aed4d1_fc508a27242e474ea7e0972c822ccc9e~mv2.png"/>
          </div>
        </div>
      </div>
</div>
<div className="content-1" id='content-1'>
  <div className="content-table-1">
  <h1>CryptoSesame NFT Club</h1>
  <h4>10,000 Golden Retrievers unleashed on the blockchain.</h4>
  <h4>Yes, we’re the ones who let them out.</h4>
  <h3>{mintData&&mintData.totalMint}/{mintData&&mintData.maxMint}</h3>
  {walletAddress?<div onClick={mintHandler} className="mint-button">MINT</div>:<div onClick={walletConnect} className="mint-button">CONNECT</div>}
  </div>
  <img className="content-image" width={300} src="/main-n.png"/>

</div>
<div className='content-2 px-5' id='content-2'>
  <h1 className='mb-3 pt-4'>ABOUT US</h1>
  <p>CryptoSesame is a unique digital collection of Golden Retriever NFTs lying on Polygon Blockchain. Our goal is to spread Animal Rights awareness and bring people together through community, creativity, and adorable art!

As a holder, you'll have access to a community-funded DAO (Sesame Jar), exclusive events, early access to merch, giveaways, and much more!</p>
<div className='nft-samples pb-5'>
  <img className='nft-sample' src="/1.jpg"/>
  <img className='nft-sample' src="/2.jpg"/>
  <img className='nft-sample' src="/3.jpg"/>
  <img className='nft-sample' src="/4.jpg"/>
</div>
</div>
<div className='content-3 px-5' id='content-3'>
<h1 className='mb-3 pt-4'>ROADMAP</h1>
<ul className='list'>
  <li className='mt-5'>
  1. Establish Community Funded DAO. 20% of all secondary sales will be deposited into a community wallet called The Sesame Jar. Holders will be able to propose and vote on things that will affect the whole community!
  </li>
  <li className='mt-5'>
  2. Charitable Donations. Based on the DAO, we will donate money to charities and organizations that spread Animal Rights awareness
  </li>
  <li className='mt-5'>
  3. Access to future collaborations and WL opportunities. Holders will receive exclusive benefits (WL spots, alpha, etc.) to GEN 2 and other projects we decide to collaborate with!
  </li>
  <li className='mt-5'>
  4. Exclusive Giveaways + Future Airdrops. Holders will receive airdrops and access to an alpha channel where exclusive giveaways will be hosted.
  </li>
</ul>
<div className='line mt-3'></div>
<p className='mt-3'>This is a long-term and incredibly fun project that will include community giveaways, live events, collaborations with big brands, Metaverse, and much more! The future of Crypto Sesame is in the hands of the owners — the community will determine the future.</p>
</div>  

<div className='content-4 px-5 pb-5' id='content-4'>
<h1 className='mb-3 pt-4'>FAQ</h1>
<div className='card-main mb-5'>
  <h4>What is the supply & mint price?</h4>
  <p>There will be a total of 10,000 CryptoSesame available.</p>
  <p>- Price TBD on Discord</p>
</div>
<div className='card-main mb-5'>
  <h4>When is the launch date?</h4>
  <p>Allowlist - TBD on Discord</p>
  <p>Public Sale - TBD on Discord</p>
</div>
<div className='card-main mb-5'>
  <h4>What is the utility?</h4>
  <p>Holders of Crypto Sesame will have an exciting piece of art, plus access to our community-funded DAO, exclusive giveaways, contests, priority in future collections, and more!</p>
</div>
<div className='card-main mb-5'>
  <h4>What are NFTs?</h4>
  <p>NFT stands for “non-fungible tokens” which are unique digital items that are stored and encrypted on the blockchain that people can buy, own, and trade. NFTs can simply be digital art but can have various benefits. They can be treated like membership cards where holders get exclusive access to things like websites, events, merchandise, and more.</p>
</div>
<div className='card-main'>
  <h4>How do I buy a Crypto Sesame NFT?</h4>
  <p>1. Sign up for Metamask Wallet and download the extension on your internet browser or mobile device.</p>
  <p>2. Make sure you are connected to Polygon Network</p>
  <p>3. Click on the “mint” button and you will be prompted to sign for your transaction. Please do not adjust this to ensure the transaction completes.</p>
  <p>4. Once you have made your purchase, your CryptoSesame NFTs will appear in your wallet and on OpenSea!</p>
</div>
</div>

<div className='content-5 px-5' id='content-5'>
  <h1 className='mb-3 pt-4'>TEAM</h1>
  <div className='profile-list'>
  <div className='profile'>
  <img className='profile-sample' src="/t1.jpg"/>
  <h4>Nami</h4>
  Ex-Twitter/ CEO
  </div>
  <div className='profile'>
  <img className='profile-sample' src="/t2.jpg"/>
  <h4>Geummy</h4>
  NFT Collector
  </div>
  <div className='profile'>
  <img className='profile-sample' src="/t3.jpg"/>
  <h4>Sherpa</h4>
  Creator
  </div>
  <div className='profile'>
  <img className='profile-sample' src="/t4.jpg"/>
  <h4>BB</h4>
  Developer
  </div>
  </div>
</div>

<div className='content-6 px-5' id='content-6'>
<h4 className='pt-5 pb-2'>© 2022 Crypto Sesame  TERMS & CONDITIONS</h4>
<div className='pb-5 w-100 d-flex align-items-center justify-content-center'>
  <div className='social'>
  <img className="m-2" width={40} src="https://static.wixstatic.com/media/aed4d1_f1574e7c6a09409584dcf1ad1c23b1cc~mv2.png"/>
            <img className="m-2" width={40} src="https://static.wixstatic.com/media/aed4d1_e9260e51d60a41c19ca484cbf270e7cc~mv2.png"/>
            <img className="m-2" width={40} src="https://static.wixstatic.com/media/aed4d1_fc508a27242e474ea7e0972c822ccc9e~mv2.png"/>
  </div>

          </div>
</div>
   
      </>
  );
}

export default App;

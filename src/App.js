
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
          <img width={65} src="/logo.png"/>
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
  <h1>TEXT BLA BLA</h1>
  <h3>{mintData&&mintData.totalMint}/{mintData&&mintData.maxMint}</h3>
  {walletAddress?<div onClick={mintHandler} className="mint-button">MINT</div>:<div onClick={walletConnect} className="mint-button">CONNECT</div>}
  </div>
  <img className="content-image" width={250} src="/main-n.png"/>

</div>
<div className='content-2 px-5' id='content-2'>
  <h1 className='mb-3 pt-4'>ABOUT</h1>
  <p>Dolor eu non laborum minim aute cillum proident quis laboris ut. Mollit mollit aliquip qui culpa est est dolor non consectetur Lorem voluptate nulla. Elit elit pariatur occaecat officia aute sunt magna id cillum aliquip sit dolore. Consectetur aute pariatur irure sit eu qui mollit laboris ipsum tempor. Aliquip id adipisicing ipsum ea ullamco laboris. Nulla adipisicing veniam id consectetur minim exercitation commodo qui deserunt quis sint fugiat consectetur do.</p>
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
    Occaecat mollit sit non irure laborum incididunt dolore velit amet. Nostrud sunt occaecat voluptate minim officia pariatur laboris. Amet minim aliquip non nostrud velit non nulla nostrud et id magna sit pariatur qui. Qui sint cillum cupidatat nisi. Ipsum officia ea elit ut amet anim cillum tempor reprehenderit anim do.
  </li>
  <li className='mt-5'>
    Consequat est aute exercitation laboris consequat minim do irure do eu. Quis pariatur irure et pariatur laborum tempor. Reprehenderit Lorem mollit enim ea pariatur id.
  </li>
  <li className='mt-5'>
    Ad in officia culpa mollit consectetur duis aliquip amet in ipsum enim aliqua. Magna Lorem nostrud amet exercitation consequat eiusmod velit culpa qui commodo elit est. Anim esse ea consequat adipisicing veniam velit eu sit aliquip.
  </li>
  <li className='mt-5'>
    Ad in officia culpa mollit consectetur duis aliquip amet in ipsum enim aliqua. Magna Lorem nostrud amet exercitation consequat eiusmod velit culpa qui commodo elit est. Anim esse ea consequat adipisicing veniam velit eu sit aliquip.
  </li>
</ul>
<div className='line mt-3'></div>
<p className='mt-3'>Pariatur occaecat quis excepteur laborum dolore deserunt esse ex nostrud officia laboris esse. Aliqua est esse labore consectetur ad reprehenderit. Consectetur non ipsum ut mollit minim reprehenderit id occaecat. Cupidatat officia duis minim id qui ea consectetur officia. Tempor ad ullamco cillum in Lorem esse dolor aliquip. Anim sint ad dolore sit in incididunt culpa sunt pariatur laboris cillum.</p>
</div>  

<div className='content-4 px-5 pb-5' id='content-4'>
<h1 className='mb-3 pt-4'>FAQ</h1>
<div className='card-main mb-5'>
  <h4>What is the supply & mint price?</h4>
  <p>Ea adipisicing aliqua adipisicing enim duis adipisicing minim ad. Eiusmod consequat mollit deserunt eu duis deserunt quis dolore sint occaecat laborum culpa consequat. Laboris labore irure proident magna ex dolore officia eu proident ex cupidatat deserunt cupidatat. Excepteur ea exercitation commodo deserunt qui irure ad pariatur aliqua qui amet do ullamco esse.</p>
</div>
<div className='card-main mb-5'>
  <h4>What is the supply & mint price?</h4>
  <p>Ea adipisicing aliqua adipisicing enim duis adipisicing minim ad. Eiusmod consequat mollit deserunt eu duis deserunt quis dolore sint occaecat laborum culpa consequat. Laboris labore irure proident magna ex dolore officia eu proident ex cupidatat deserunt cupidatat. Excepteur ea exercitation commodo deserunt qui irure ad pariatur aliqua qui amet do ullamco esse.</p>
</div>
<div className='card-main mb-5'>
  <h4>What is the supply & mint price?</h4>
  <p>Ea adipisicing aliqua adipisicing enim duis adipisicing minim ad. Eiusmod consequat mollit deserunt eu duis deserunt quis dolore sint occaecat laborum culpa consequat. Laboris labore irure proident magna ex dolore officia eu proident ex cupidatat deserunt cupidatat. Excepteur ea exercitation commodo deserunt qui irure ad pariatur aliqua qui amet do ullamco esse.</p>
</div>
<div className='card-main mb-5'>
  <h4>What is the supply & mint price?</h4>
  <p>Ea adipisicing aliqua adipisicing enim duis adipisicing minim ad. Eiusmod consequat mollit deserunt eu duis deserunt quis dolore sint occaecat laborum culpa consequat. Laboris labore irure proident magna ex dolore officia eu proident ex cupidatat deserunt cupidatat. Excepteur ea exercitation commodo deserunt qui irure ad pariatur aliqua qui amet do ullamco esse.</p>
</div>
<div className='card-main'>
  <h4>What is the supply & mint price?</h4>
  <p>Ea adipisicing aliqua adipisicing enim duis adipisicing minim ad. Eiusmod consequat mollit deserunt eu duis deserunt quis dolore sint occaecat laborum culpa consequat. Laboris labore irure proident magna ex dolore officia eu proident ex cupidatat deserunt cupidatat. Excepteur ea exercitation commodo deserunt qui irure ad pariatur aliqua qui amet do ullamco esse.</p>
</div>
</div>

<div className='content-5 px-5' id='content-5'>
  <h1 className='mb-3 pt-4'>TEAM</h1>
  <div className='profile-list'>
  <div className='profile'>
  <img className='profile-sample' src="/3.jpg"/>
  <h4>NICKNAME</h4>
  Founder
  </div>
  <div className='profile'>
  <img className='profile-sample' src="/4.jpg"/>
  <h4>NICKNAME</h4>
  Founder
  </div>
  </div>
</div>

<div className='content-6 px-5' id='content-6'>
<h4 className='pt-5 pb-2'>© 2022 XXX LLC  TERMS & CONDITIONS</h4>
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

import React, { useState } from "react";
import {
  useContract,
  useActiveListings,
  useContractMetadata,
  ThirdwebNftMedia,
  useAddress,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Theme.module.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useSigner } from "@thirdweb-dev/react";
import { useEffect } from "react";
import axios from 'axios';
import Router from 'next/router'


export default function Listings() {
  const walletaddress=useAddress()
  const signer=useSigner()
  let sdk = new ThirdwebSDK("mumbai");
  const [data, setData] = useState([])
  const abi=[
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "buy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "cancelListing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "createListing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_paymentTokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_feePercentage",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "name": "ListingCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "name": "ListingCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "releasePayment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "SaleCompleted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_feePercentage",
          "type": "uint256"
        }
      ],
      "name": "updateFeePercentage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "FEE_DENOMINATOR",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feePercentage",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nft",
      "outputs": [
        {
          "internalType": "contract IERC721",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paymentToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tokenIdToListing",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  if(walletaddress){

   sdk = ThirdwebSDK.fromSigner(signer);

  }

  const readListings = () => {
    (async()=> {
      try { 
         const data = await axios.get('/api/read_listings');
        //  console.log('data', )
        
         setData(data?.data?.data)
        
          // Send form data to the API endpoint
         
          } catch (err) {
          console.log(err)
          }
    
     })()
   }
   useEffect(()=> {
    readListings()
         
          
    }, [])


   const handleSubmit=(e, id)=>{
    e.preventDefault();
    buyNFT(id)


  }
  async function buyNFT(id){
    const dataShouldMint = data.find(item => item._id ===  id)

    console.log(dataShouldMint)

    console.log("setting allowance to the marketplace contract for rpc token")
    try{
    const tokencontract = await sdk.getContract("0x11aA92231c097409310ab93304137cFC37D114Cd");
    await tokencontract.erc20.setAllowance("0x9650CF55b186ECfcf6cC55B8769AE20ce292ffb8", dataShouldMint?.price);




    const marketplacecontract = await sdk.getContract(
      "0x9650CF55b186ECfcf6cC55B8769AE20ce292ffb8", // The address of your smart contract
      abi,
     
    );


      // console.log(dataShouldMint.metadata.id)
     const data = await marketplacecontract.call("buy",
      
      [dataShouldMint.tokenID]
      
      
      );
    }
      catch(err){
        console.log(err)
        return;
         }
         const {data : deletionResponse}= await  axios({
          method: 'DELETE',
          url: '/api/delete_api',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {id}
        })
        const release={

          tokenID: dataShouldMint.tokenID
        }
        try {
          // Send form data to the API endpoint
          await axios.post('/api/post_releasepayment', release);
         
          } catch (err) {
       
          }

          Router.reload(window.location.pathname);

    }
   return(



    <div>
<>

{data.length && data.map(item =>{

return<>
<form style={{width:500, marginTop:100 }} onSubmit={(e) => handleSubmit(e, item._id)} >
<MediaRenderer style={{width:200}} src = {item.image}/>
<h1 style={{fontSize:20}}>NFT Name: {item.name}</h1>
<h1 style={{fontSize:15}}>Description: {item.description}</h1>
<h1 style={{fontSize:10}}>Price: {item.price/1000000000000000000} Reciprocoin</h1>
<h1 style={{fontSize:15}}>TokenID {item.tokenID}</h1>

<button className={styles.mainButton} style={{width:250, marginTop:50}}
      type="submit" >Buy NFT</button>
{/* <button className={styles.mainButton} onClick={createListing}>List</button> */}


</form>
</>

})}





</>



    </div>
)
}

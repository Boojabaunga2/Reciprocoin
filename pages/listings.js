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

export default function Listings() {
  const walletaddress=useAddress()
  const sdk = new ThirdwebSDK("mumbai");
  const [data, setData] = useState([])

  async function getNFTs(){
    try{         
   
   const contract = await sdk.getContract("0xE98dBFF5EDA0c590d46FBA96A07Da908E9C69Ee4");
   const nfts = await contract.erc721.getOwned(walletaddress);
 
   setData(nfts)
   
   } catch (err) {
       console.log(err)
    
   }
     }
   getNFTs()

   return(



    <div>
<>

{data.length && data.map(item =>{

return<>
<form style={{width:500 }} >
<MediaRenderer style={{width:500, minHeight:700, maxHeight:900}} src={item.metadata.image} />
<h1 style={{fontSize:15, marginLeft:400, marginTop:-400, width:500}}>Name: {item.metadata.name}</h1>
<h1 style={{fontSize:15, marginLeft:400, width:500}}>Description {item.metadata.description}</h1>
<h1 style={{fontSize:15, marginLeft:400, width:500}}>Token ID: {item.metadata.id}</h1>
<h1 style={{fontSize:15, marginLeft:400, width:500}}>Price: {item.metadata.attributes[2].value/1000000000000000000} RPC</h1>
{/* <button className={styles.mainButton} onClick={createListing}>List</button> */}
</form>
</>

})}





</>



    </div>
)
}

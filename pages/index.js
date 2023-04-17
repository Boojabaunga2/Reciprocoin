import React, { useContext, useState } from "react";
import {
      useSDK,
      useContract,
      useAddress,
      
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import { ChainId, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useRef } from "react";
import styles from "../styles/Theme.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useNFT } from "@thirdweb-dev/react";
import axios from 'axios';

const FormExample = () => {
  const walletaddress=useAddress()
  const asdk = ThirdwebSDK.fromPrivateKey("4d0d9d9d4b7cab8986aa90db0c7ed07964a8acf5405bbf746aebd7f1c80e87b6", "mumbai");
  const { contract: nftCollection } = useContract(
    "0xA09677FCDcaF83C5922d4A13E71ffb1C92617996",
    "nft-collection"
  );
  const sdk = useSDK()
  const [file, setFile] = useState();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [savecontractAddress, setContractAddress] = useState("");
  const text_contractaddress="0xA09677FCDcaF83C5922d4A13E71ffb1C92617996"
  const { contract } = useContract(text_contractaddress); //mumbai  
  const { data: nft, isLoading, error } = useNFT(contract, 10 );




  const handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    
    setFormData({

      ...formData,
      [event.target.name]: event.target.value
      
    }
    )
    ;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    DeployContract();

    
  }

  async function DeployContract(){
     const img = await sdk.storage.upload(file);
  const uuid = uuidv4()
  // const metadata = {  
  //   name: formData.nftName,
  //   description: formData.nftDescription,
  //   image: img,
  //   fee_recipient: formData.royaltyfeeaddress,
  //   seller_fee_basis_points: parseInt(formData.royalties),
  //   "attributes": [
  //     {
  //       "trait_type": "type",
  //       "value": "Main-NFT"
  //     },{
  //       "trait_type": "ID",
  //       "value": uuid
  //     },
    
  //   ]
    

  //   }

    const nftContract = await asdk.getContract(
      "0xA09677FCDcaF83C5922d4A13E71ffb1C92617996",
      "nft-collection"
    );

    const address = await nftContract.signature.generate({
      metadata: {
        name: formData.nftName,
        description: formData.nftDescription,
        image: img,
       
      "attributes": [
        {
          "trait_type": "Gig",
          "value": "Reciprocoin"
        },{
          "trait_type": "ID",
          "value": uuid
        },
      
      ]
      },
      to: walletaddress,
      mintStartTime: new Date(0),
    });

    
    const nft = await nftCollection?.signature.mint(address);

    const mintedTokenId = nft.id.toNumber();


    console.log(mintedTokenId);
    setContractAddress(mintedTokenId)
    // setContractAddress(address.id);
    // const value=address.id
    // console.log(parseInt(value._hex))
    // const mainNftData = {
    //   address:walletaddress,
    //   mainNftId: uuid,
    //   name: formData.nftName,
    //   image: img,
    //   tokenID: mintedTokenId,
    //   collectionAddress: text_contractaddress
    // }
    // console.table(mainNftData, address.id, address)
    // await axios.post('/api/main-nfts', mainNftData);






}
const uploadFile = () => {
  if (fileInputRef?.current) {
    fileInputRef.current.click();

    fileInputRef.current.onchange = () => {
      if (fileInputRef?.current?.files?.length) {
        const file = fileInputRef.current.files[0];
        setFile(file);
      }
    };
  }
}

  return (
    <form onSubmit={handleSubmit} >
        <div className={styles.container}>

      <label >
      {file ? (
            <img
              src={URL.createObjectURL(file)}
              style={{ cursor: "pointer", maxHeight: 250, borderRadius: 8 }}
              onClick={() => setFile(undefined)}
            />
          ) : (
            <div
              className={styles.imageInput}
              onClick={uploadFile}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setFile(e.dataTransfer.files[0]);
              }}
            >
              Drag and drop an image here to upload it!
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            id="profile-picture-input"
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <br/>

       
        <input type="text" name="nftName" placeholder="Gig Title"
          required
         className={styles.textInput}             
         style={{ minWidth: "320px",marginTop: 132}}
        onChange={handleChange} />
      </label>
      <br />
      {/* <label>
       
        <input type="text" name="nftContractAddress" placeholder="david property/ being given static atm" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
      </label>
      <label>
       
        <input type="text" name="royalties" placeholder="royalties individual token 500:5%" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
      </label> */}
      <label>
       
        <input type="text" name="nftDescription" placeholder="Gig Description" className={styles.textInput} style={{ minWidth: "520px", minHeight:"200px" }} onChange={handleChange} />
      </label>
         {/* <label>
       
        <input type="text" name="royaltyfeeaddress" placeholder="royalty fee recipient" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
      </label>
      <label> */}
       {/* Properties: 
       <input type="text" name="traittype" placeholder="traittype" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
     </label>
     <label>
       
       <input type="text" name="traitvalue" placeholder="traitvalue" className={styles.textInput} style={{ minWidth: "320px" }} onChange={handleChange} />
     </label> */}
    
     <br />
     <label>
        <input
          name="tokenID"
          type="text"
          value={savecontractAddress}
          readOnly
          className={styles.textInput}
          placeholder="Token ID Generated"
          style={{minWidth:320}}
        />

      </label>
      <br/>
      <button className={styles.mainButton}
      type="submit"
      
      >Submit</button>
     
      </div>
        
    </form>

  );
}

export default FormExample;
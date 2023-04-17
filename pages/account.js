import { useAddress, useSDK } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

export default function getOwned(){
const address=useAddress()
const sdk = new ThirdwebSDK("mumbai");

async function getNfts(){
const contract = await sdk.getContract("0xA09677FCDcaF83C5922d4A13E71ffb1C92617996");
const nfts = await contract.ERC721.getOwned(address);
console.log(nfts);


}
getNfts()


return(



    <div></div>
)
}

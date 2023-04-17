import { useAddress, useDisconnect, ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import styles from "../styles/Theme.module.css";

export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const disconnectWallet = useDisconnect();

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link href="/" passHref>
          <img
            src={`/fiverr.png`}
            alt="Thirdweb Logo"
            className={styles.headerLogo}
            style={{maxWidth:60}}
          />
        </Link>
        <Link href="/listings">
          <a className={styles.headerItem}>Listings</a>
        </Link>
      </div>

      <div className={styles.right}>
      <Link href="/account">
          <a className={styles.headerItem} style={{marginRight:20}}>My NFTs</a>
        </Link>
        {address ? (
          <>
            <a
              className={styles.secondaryButton}
              onClick={() => disconnectWallet()}
            >
             <ConnectWallet accentColor="#5204BF" colorMode="dark" />
            </a>
            
          </>
        ) : (
          <ConnectWallet accentColor="#5204BF" colorMode="dark" />
        )}
      </div>
    </div>
  );
}

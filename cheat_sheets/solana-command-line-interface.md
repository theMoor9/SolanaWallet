# **Solana Command Line Interface ( CLI )**

> Hi, i 'm Kenneth and i will try to guide you through this cheatsheet for an easy way to access the Solana Technology.

##### **Table of contents**

###### [§ Prerequisites](#-Prerequisites-1)
0. [System](#0-System)
1. [Install NVM](#1-Install-NVM)
2. [Rust](#2-rust)
3. [Solana](#3-solana)
4. [Mocha](#4-mocha)
5. [Anchor](#5-anchor)
###### [§ Wallet](#-Wallet-1)
1. [Setup](#1-Setup)
2. [Generate Private Key](#2-generate-private-key)
3. [Derive Public Key](#3-derive-public-key)
4. [Integrate JavaScript functions](#4-integrate-javascript-functions)
5. [Balance](#5-balance)
6. [Network](#6-network)
    - [Localnet](#Localnet)
	- [Devnet](#Devnet)
	- [Testnet](#testnet)
	- [Mainnet](#Mainnet)
###### [§ Test Validator](#-Test-Validator-1)
###### [§ Airdrop](#-Airdrop-1)
-  [JavaScript](#javascript)
###### [§ Token](#-Token-1)
1. [Setup](#1-Setup)
2. [Create](#2-create)
3. [Account](#3-account)
	- [Balance](#balance)
1. [Mint](#4-mint)
	- [Limit Supply](#Limit-Supply)
1. [Send](#Send)
---

## **§ Prerequisites**

>Every nice work needs a nice setup.

### 0. System

🪟 ***Windows*** *Standard Procedure*
We will use the ***Linux*** 🐧 subsystem for ***Windows*** 🪟, meanwhile ***macOS*** 🍎 can skip [here](#1-Install-NVM) and native ***Linux*** 🐧 [here](#Update).

*Install*
```shell
wsl --install
```

*Run subsystem*
```sh
ubuntu
```

*Dependencies*
```sh
# Install Curl
sudo apt-get install curl
```

##### *Update*
```sh
sudo apt-get update && sudo apt-get upgrade && sudo apt-get install -y pkg-config build-essential libudev-dev libssl-dev
```

Restart Ubuntu Terminal after completing the system setup.

### 1. Install NVM

>**NVM (Node Version Manager)** is a tool that allows you to manage multiple versions of **Node.js** a server-side JavaScript runtime environment that enables the execution of JavaScript code outside the browser, used for building scalable and high-performance server-side applications.

*Install*
```sh
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

*Version*
```sh
# Test if nvm exists - this will return "nvm" and not a version number if working correctly!
command -v nvm
```

*Update*
```sh
# Install the latest version of Node.js
nvm install --lts
```

### 2. Rust 🦀

>The **Rust** programming language used to write smart contracts on Solana, known for its safety, speed, and memory management without garbage collection, making it ideal for blockchain development.

*Install*
```sh
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

*Version*
```shell
rustup --version
```
-
```sh
rustc --version
```
-
```sh
cargo --version
```

### 3. Solana

>The most powerful Blockchain technology according my modest opinion

*Install*
```sh
sh -c "$(curl -sSfL https://release.solana.com/v1.9.5/install)"
```

*Version*
```sh
solana --version
```

##### *Local Host Setup*
```sh
solana config set --url localhost
solana config get
```
- Result
``` 
Config File: /Users/your-name/.config/solana/cli/config.yml
RPC URL: http://localhost:8899
WebSocket URL: ws://localhost:8900/ (computed)
Keypair Path: /Users/your-name/.config/solana/id.json
Commitment: confirmed
```

>Later we will setup the `Keypair Path` which now is set to default `/Users/your-name/.config/solana/id.json`
### 4. Mocha ☕

>**Mocha** is a JavaScript testing framework that facilitates running and organizing unit and integration tests for Node.js applications.

*Install*
```sh
npm install -g mocha
```

*Version*
```sh
mocha --version
```

### 5. Anchor ⚓

>**Anchor** is a development framework for the Solana blockchain that simplifies the creation, testing, and deployment of smart contracts.

#### Yarn - JavaScript Dependency

*Install JS dependency* 🍎
```sh
brew install yarn
```

	or

*Install JS dependency* 🐧
```sh
npm install --global yarn
```

	then

*Install*
```sh
cargo install --git https://github.com/project-serum/anchor anchor-cli --locked
```

*Version*
```sh
anchor --version
```

---

## **§ Wallet**

>Creating a wallet is the first step as a base to interact with the network.

### 1. Setup

Folder
```sh
cd path/to/wallet/folder
mkdir mywallet
```

Node package manager
```sh
npm init -y
```

Install package needed to interact with the blockchain network with JavaScript 
```sh
npm install --save @solana/web3.js
```

or

Generate a setup file like i did to run like
```sh
node setup.js
```

You can find the code [here](https://github.com/theMoor9/solana-wallet/blob/main/ioWallet/setup.js) setup.js file.

### 2. Generate Key Pair

>In a nutshell u should consider the Key pair as another way to say Wallet.

For this we will use the Solana CLI which creates a formatted key for you, giving the you the possibility to add a passphrase to lock secure you credentials.

>If you don't need it just press `Enter` when asked, at your own risk.

```sh
solana-keygen new --outfile /path/to/your/new-keypair.json --force
```

Specifying the path for the keygen will allow you to have multiple wallets linked to every project folder, otherwise it will save the key in `/home/user/.config/solana/id.json` as default. 

This is concept can be applied to the [Local Host Setup](#Local-Host-Setup) that we mentioned earlier which you can choose to leave it as a default or set it to a personalized wallet like so

```sh
solana config set --keypair /path/to/other/location/wallet.json
```

### 3. Derive Public Key

> This will return your public key derived from the private to be extra sure.

From path
```sh
solana-keygen pubkey /path/to/your/new-keypair.json
```

*From default `/home/user/.config/solana/id.json`*
```sh
solana address
```

### 4. Wallet.js

You can find the code [here](https://github.com/theMoor9/solana-wallet/blob/main/ioWallet/wallet.js) with a comprehensive set of comments for better understanding of dynamics. 

To run functionality
```sh
node path/to/wallet.js
```

### 5. Balance

>Keeping track of balance as they thought me in Banking, Finance and Financial Markets university is the art key to success.

*From path*
```sh
solana balance /path/to/your/new-keypair.json --url devnet
```

*From default `/home/user/.config/solana/id.json
```sh
solana balance --url devnet
```

### 6. Network

You can check the status of your wallet at https://explorer.solana.com/ by adding your public key to the search bar.

The Solana Network splits in four accessible branches:

- #### Localnet
	Ambiente di rete locale per testare applicazioni Solana senza connettersi alla rete pubblica.
	
```sh
solana balance --url http://localhost:8899

solana balance --url localnet
```

- #### Devnet
	Rete di sviluppo pubblica di Solana per testare applicazioni in un ambiente simile a quello reale ma con fondi non reali.
	
```sh
solana balance --url https://api.devnet.solana.com

solana balance --url localnet
```

- #### Testnet
	Rete di prova di Solana che simula condizioni di Mainnet con token non reali per testare nuove funzionalità e aggiornamenti.
	
```sh
solana balance --url https://api.testnet.solana.com

solana balance --url testnet
```

- #### Mainnet
	La rete principale di Solana dove avvengono le transazioni reali e le operazioni con token veri.
	
```sh
solana balance --url https://api.mainnet-beta.solana.com

solana balance --url mainnet
```

>You can find a way to set the kind of net through JavaScript  from line `90` in the `wallet.js` file  [here](https://github.com/theMoor9/solana-wallet/blob/main/ioWallet/wallet.js).

---

## **§ Test Validator**

>The way to simulate your machine as a "mining" node, or more accurately, a Solana Validator Node.

The CLI functionality will use the credentials specified in the config file set by:

`solana config set --keypair /path/to/other/location/wallet.json` 

or, if not specified, it will default to:

`/home/user/.config/solana/id.json`

When you run the command, it will create a folder with all the necessary tools and data in the directory from which you execute:
```sh
solana-test-validator
```

---

## **§ Airdrop**

>No, we're not dropping bombs... Or, are we?

Airdrop SOL
```sh
# pubkey = 09j982ec92h981uev454y5yb45b45y4
solana airdrop 2 09j982ec92h981uev454y5yb45b45y4 --url devnet
```

### JavaScript

You can find the code [here](https://github.com/theMoor9/solana-wallet/blob/main/ioAirdrop/index.js) with a comprehensive set of comments for better understanding of dynamics. 

> I personally suggest to read the README.md file.

---

## **§ Token**

>Yes, this may be the bomb type. Make sure to create something big ☄️
### 1. Setup

spl-token-cli

### 2. Create
### 3. Account
- ##### Balance
### 4. Mint
- ##### Limit Supply
### 5. Send


---

**Author**: Kenneth Boldrini
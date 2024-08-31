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
1. [Generate Private Key](#1-generate-private-key)
2. [Derive Public Key](#2-derive-public-key)
3. [Integrate JavaScript functions](#3-integrate-javascript-functions)
4. [Network](#4-network)
   - 4.1 [Local Devnet Mainnet](#local-devnet-mainnet)
5. [Balance](#5-balance)
###### [§ Test Validator](#-Test-Validator-1)
- [Test Validator](#-test-validator)
###### [§ Airdrop](#-Airdrop-1)
1. [Solana CLI](#1-solana-cli)
2. [JavaScript](#2-javascript)
###### [§ Token](#-Token-1)
1. [Prerequisites](#1-prerequisites)
2. [Create](#2-create)
3. [Account](#3-account)
   - 3.1[Balance](#balance)
4. [Mint](#4-mint)
   - 4.1 [Limit Supply](#Limit-Supply)
5. [Send](#Send)
---

## **§ Prerequisites**

>Every nice work needs a nice setup.

### 0. System

🪟 ***Windows*** *Standard Procedure*
We will use the ***Linux*** 🐧 subsystem for ***Windows*** 🪟, meanwhile ***macOS*** 🍎 can skip [here](#1-Nodejs) and native ***Linux*** 🐧 [here](#Update).

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

###### *Update*
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

*Local Host Setup*
```sh
solana config set --url localhost
solana config get
```
- Result
``` 
Config File: /Users/nicholas-g/.config/solana/cli/config.yml
RPC URL: http://localhost:8899
WebSocket URL: ws://localhost:8900/ (computed)
Keypair Path: /Users/nicholas-g/.config/solana/id.json
Commitment: confirmed
```

>Later we will setup the `Keypair Path` 
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

###### Yarn - JavaScript Dependency

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

### 1. Generate Private Key
### 2. Derive Public Key
### 3. Integrate JavaScript functions
### 4. Network 
- #### Local Devnet Mainnet
### 5. Balance

---

## **§ Test Validator**

>This will simulate your machine being a mining node.

---

## **§ Airdrop**

>No, we're not dropping bombs... Or, are we?

### 1. Solana CLI
### 2. JavaScript 

---

## **§ Token**

>Yes, this may be the bomb type. Make sure to create something big ☄️

### 1. Prerequisites
### 2. Create
### 3. Account
- ##### Balance
### 4. Mint
- ##### Limit Supply
### 5. Send


---

**Author**: Kenneth Boldrini
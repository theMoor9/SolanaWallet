# Solana Airdrop Wallet Setup

This project is an example of how to create a simulation of a Solana wallet to manage Tokens on Devnet (Devnet is a Solana test network that allows simulation of transactions without using real funds). The script will generate a temporary wallet.

## Prerequisites

### Install Node.js

To run this project, you need to have Node.js installed on your system. Node.js also includes npm, the package manager that we will use to install dependencies.

#### Steps to Install Node.js:

1. Go to the official Node.js website: [nodejs.org](https://nodejs.org/)
2. Download the latest stable version for your operating system.
3. Follow the installation instructions.

To verify that Node.js is installed correctly, open the terminal and run:

```sh
node -v
```

You should see an output indicating the installed version of Node.js (e.g., `v16.14.0`).

## Project Setup

### Steps to Set Up and Run the Project

1. **Clone the repository or download the files**: Ensure you have the `setup.js` and `index.js` files in the same folder on your system.
    
2. **Open the terminal** and navigate to the folder where you saved the files:
    

```sh
cd /percorso/dove/si/trova/index.js
```

3. **Generate `package.json`**: Before running `setup.js`, the user should initialize a Node.js project by running:

```sh
npm init -y
```

	This command generates a `package.json` file with basic configurations.

4. **Run `setup.js`** to install the necessary dependencies:


```sh
node setup.js
```

	This command will check if the libraries are installed and, if not, install it automatically.

5. **Run `index.js`** to create the Solana wallet and operate the functions:


```sh
node index.js
```

	After running, you will see the wallet's public key printed in the console. If configured to do so, you will also see the wallet's balance (initially 0 SOL for a new wallet). and 

## Author

Kenneth Boldrini

## License

This repository is licensed. See the [LICENSE](./LICENSE) file for more details.
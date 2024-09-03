# Solana Stake Wallet Setup

This project is an example of how to create a Solana wallet, to Stake an Manage SOL on Devnet (Devnet is a Solana test network that allows simulation of transactions without using real funds). The script will generate a temporary wallet.

### Note

The Topic code to be taken in consideration is shifted.

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
cd /Path/to/index.js
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


5. **run `get_validators.js`** to se active and unactive validators and check for specific one:

```sh
node get_validators.js
```


6. **Run `wallet_account.js`** to manage the Solana wallet and Stake account:

```sh
node wallet_account.js
```

	After running, you will see the wallet's public key printed in the console. If configured to do so, you will also see the wallet's balance (initially 0 SOL for a new wallet).


7. **run `delegate_stake.js`** to delegate your staking to some validartor that you should trust:

```sh
node delegate_stake.js
```


## Author

Kenneth Boldrini

## License

This repository is licensed. See the [LICENSE](./LICENSE) file for more details.
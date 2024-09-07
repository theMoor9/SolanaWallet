/** 
 * Syntax for importing Solana libraries
 * @module solanaSetup
 * @note `const` : Creates an immutable instance for {}, Solana web3.js library
 */
                const{          
                    Connection,
                    PublicKey,
                    clusterApiUrl,
                    Keypair, 
                } = require('@solana/web3.js'); 
                const fs = require('fs');
                const prompt = require('prompt-sync')();


/** 
 * Declaring global variables for the wallet and the public key
 * @note `let` : Creates a "buffer" instance for the variables, allowing multiple to be generated on it
 * @note `const` : Creates an immutable instance for the path which contains the private key file
 */
                let wallet;
                let publicKey;
                let secretKey;
                const jsonWalletPath = 'wallet.json';

/**
 * Creates a new instance of Keypair, representing a Solana wallet coditional to the existence of 
 * the wallet file which is an alphanumeric array string that represents the private key of the wallet.
 * 
 * @note The wallet.json file, as a suggestion, should be always created via Solana CLI
 * 
 * @function fs.existsSync - Checks if the file exists in the specified path
 * @function fs.readFileSync - Reads the content of the file in the specified path
 * @function JSON.parse - Parses the JSON content into an array
 * @function Uint8Array - Represents an array of 8-bit unsigned integers
 * @function Keypair.fromSecretKey - Creates a new Keypair from the secret key
 * 
 */
                if (fs.existsSync(jsonWalletPath)) {
                    // Uploads the JSON file containing the private key of the wallet
                    const secretKeyArray = JSON.parse(fs.readFileSync(jsonWalletPath, 'utf8'));

                    const secretKeyUint8Array = new Uint8Array(secretKeyArray);

                    // Creates a new wallet with the secret key
                    try {
                        wallet = Keypair.fromSecretKey(secretKeyUint8Array);
                        console.log("Public Key: ", wallet.publicKey.toBase58());
                        publicKey = new PublicKey(wallet.publicKey);
                    } catch (error) {
                        console.error("Error creating Keypair:", error);
                    }

                } else {
                    // Generates a new wallet with a new keypair (It's better via Solana CLI)
                    wallet = new Keypair();

                    // Split the wallet into public and private keys
                    publicKey = new PublicKey(wallet.publicKey);
                    secretKey = wallet.secretKey;

                    // Cyphers the private key of the wallet
                    const encoder = new TextEncoder();
                    const uint8Array = encoder.encode(secretKey);

                    // Converts the private key into a 64-bit array
                    const array64Bit = Array.from(uint8Array);

                    // Saves in a JSON file the private key of the wallet to be use by the CLI
                    fs.writeFileSync('wallet.json', JSON.stringify(array64Bit, null, 2));
                    
                    console.log('Wallet saved to wallet.json');
                    console.log("Public Key: ", wallet.publicKey.toString());   
                }

/**
 * Creates a getConnection object to interact with the Solana blockchain.
 * @constant {Connection} connection - A connection object to interact with the Solana blockchain.
 * @note `async()` : Asynchronous function that returns a Promise resolved to an await call (See later).
 *                   Promise : States of Pending, Fulfilled, Rejected
 * @function parseInt - Converts a string to an integer
 * @function prompt - Reads the user input from the console
 * @function clusterApiUrl() : Function that returns the API URL of the specified Solana network.
 * @argument `devnet` or Connection(https://api.mainnet-beta.solana.com) : Solana test network, allowing simulation of transactions without using real funds.
 * @argument `mainnet` : Solana main network, used for real transactions with real funds.
 * @argument `testnet` : Solana test network, similar to devnet but with some differences.
 * @argument `'confirmed'` : Level of transaction confirmation required to consider an action confirmed.
 */
                const getConnection = async () => {
                    try { // Tryes to execute the following code, otherwise proceeds with the catch block
                        // Asks the user to choose the network
                        console.log("Choose the network: ");
                        console.log("[1] Devnet");
                        console.log("[2] Mainnet");
                        console.log("[3] Testnet");
                        // Reads the network choice from the user
                        const network = parseInt(prompt("Enter the network: "));
                        let connection;
                        // Selects the network based on the user's choice
                        if (network === 1) {
                            console.log("Devnet selected");
                            connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
                        } else if (network === 2) {
                            console.log("Mainnet selected");
                            connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed'); //clusterApiUrl('mainnet')
                        } else {
                            console.log("Testnet selected");
                            connection = new Connection(clusterApiUrl('testnet'), 'confirmed'); 
                        }
                        return connection; // Returns the connection object
                    }catch(error){
                        console.error("Error: ", error);
                    }
                }

/**
 * Creates a getWalletBalance object to obtain the Solana wallet balance.
 * @function getBalance - Asynchronous function to obtain the Solana wallet balance.
 * @note `await` : Awaits the completion of the Promise and returns the result.
 */
                const getWalletBalance = async () => {
                    try {
                        const connectionLink = await getConnection();
                        const balance = await connectionLink.getBalance(publicKey);
                        console.log("Balance: ", balance);
                    }catch(error){
                        console.error("Error: ", error);
                    }
                }

/**
 * Creates the main function to execute operations.
 * @function main - Main function to execute operations.
 * @note main() : Executes the main function to start the program.
 */

                const main = async () => {
                    await getWalletBalance();
                }
                main(); 
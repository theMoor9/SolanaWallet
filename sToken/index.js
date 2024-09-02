/**
 * @file index.js is an example file for creating a Temporary Solana wallet 
 * @note The code can be executed in a Node.js environment directly from the console with the current format.
 * @Note If preferred, documentation can be removed and Shift+Tab can be used to reset to the standard format.
 */

/** 
 * Syntax for importing Solana libraries
 * @module solanaSetup
 * @note `const` : Creates an immutable instance for {}, Solana web3.js library and spl-token library
 */
                        const{          
                            Connection,
                            PublicKey,
                            clusterApiUrl,
                            Keypair, 
                            LAMPORTS_PER_SOL, // Constant for converting SOL value
                        } = require('@solana/web3.js'); 
                        const {
                            Token,
                            TOKEN_PROGRAM_ID,
                        } = require('@solana/spl-token');
                        const prompt = require('prompt-sync')();  

/** 
 * Creates a new instance of Keypair, representing a Solana wallet for testing purpose
 * @constant {Keypair} wallet - A new instance of Keypair representing an immutable wallet
 * @note `let` : Creates a "buffer" instance for the wallet, allowing multiple wallets to be generated on it
 * @note `const` : Creates an instance of a new immutable wallet
 * @note `new` : An object constructor that creates an instance of a specific object type (Keypair from @solana/web3.js)
 */
                        let wallet = new Keypair(); // TEST WALLET
                        let token = null;

/**  
 * Retrieves the public key from the generated wallet
 * @constant {PublicKey} publicKey - The public key associated with this wallet
 * @note `_name` : Indicates the variable property 
 * @note `_` : Convention for indicating a private variable
 * 
 * @Note It is possible to use const publicKey = wallet._keypair.publicKey;
 * @note Avoid direct use of `_keypair` as it is an internal property and may change in future versions of the library.
 * @note Use `wallet.publicKey` to access the public key safely.
 */
                        const publicKey = new PublicKey(wallet.publicKey); 
/** 
 * Retrieves the private key of the wallet.
 * @constant {Uint8Array} secretKey - The private key associated with the wallet.
 * @warning The private key must be kept secret. Anyone who possesses it has full access to the wallet's funds.
 */
                        const secretKey = wallet.secretKey;


/**
 * Prints the public key and the private key of the wallet to the console.
 * @function console.log - Prints the value of the variable to the console
 * @note `console.log` is useful for debugging and displaying values during development.
 */
                        console.log("Public Key: ", publicKey);
                        //console.log("Secret Key: ", secretKey);


// END OF SOLANA WALLET SETUP

/**
 * Creates a getConnection object to interact with the Solana blockchain.
 * @constant {Connection} connection - A connection object to interact with the Solana blockchain.
 * @note `async()` : Asynchronous function that returns a Promise resolved to an await call (See later).
 *                   Promise : States of Pending, Fulfilled, Rejected
 * @function clusterApiUrl() : Function that returns the API URL of the specified Solana network.
 * @argument `devnet` or Connection(https://api.mainnet-beta.solana.com) : Solana test network, allowing simulation of transactions without using real funds.
 * @argument `mainnet` : Solana main network, used for real transactions with real funds.
 * @argument `testnet` : Solana test network, similar to devnet but with some differences.
 * @argument `'confirmed'` : Level of transaction confirmation required to consider an action confirmed.
 */
                        const getConnection = async () => {
                            try { // Try to execute the following code, otherwise proceed with the catch block
                                const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); 
                                return connection; // Returns connection obj
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
/** Creates a mintToken object to create a new token.
 * @function createMint - Asynchronous function to create a new token.
 * @argument connection - The connection object to interact with the Solana blockchain.
 * @argument wallet - The wallet object to sign the transaction that will pay the cost.
 * @argument wallet.publicKey - The public key of the wallet that will own the token.
 * @argument null - The authority of freezing the token, if null, the owner is the authority
 * @argument decimals - The number of decimals for the token.
 * @argument TOKEN_PROGRAM_ID - The standard program ID of the token program.
 */
                        const createToken = async () => {
                            try {
                                const connectionLink = await getConnection();
                                const token = await Token.createMint(
                                    connectionLink,
                                    wallet,
                                    wallet.publicKey,
                                    null,
                                    9, // Decimals, tipically 9 for SOL compatible tokens
                                    TOKEN_PROGRAM_ID
                                );
                                console.log("Token created: ", token);
                            }catch(error){
                                console.error("Error: ", error);
                            }
                        }

/** Creates an object to obtain to mint a certaint quantity of the alrey created token.
 * @function mintTo - Asynchronous function to mint a certain quantity of tokens.
 * @argument wallet.publicKey - The public key of the wallet that will receive the tokens.
 * @argument wallet.publicKey - The public key of the wallet that will have authority to mint the tokens.
 * @argument [] - Other public key of the wallet that will have authority to mint the tokens.
 * @argument 9 - The amount of tokens to mint.
 */

                        const mintToken = async () => {
                            try {
                                await token.mintTo(
                                    wallet.publicKey, 
                                    wallet.publicKey, 
                                    [], 
                                    9
                                );
                                console.log("Token minted");
                            }catch(error){
                                console.error("Error: ", error);
                            }
                        }

/** Creates an object to check the balance of the token.
 * @function getAccountInfo - Asynchronous function to obtain the balance of the token.
 * @argument wallet.publicKey - The public key of the wallet that possesses the tokens.
 */

                        const getTokenBalance = async () => {
                            try {
                                const balance = await token.getAccountInfo(wallet.publicKey);
                                console.log("Token Balance: ", balance.amount);
                            }catch(error){
                                console.error("Error: ", error);
                            }
                        }

/** Creates an object to transfer a certain quantity of tokens to another wallet.
 * @function transfer - Asynchronous function to transfer a certain quantity of tokens to another wallet. 
 * @argument wallet.publicKey - The public key of the wallet that will send the tokens.
 * @argument destination - The public key of the wallet that will receive the tokens.
 * @argument wallet - The wallet object to sign the transaction that will pay the cost.
 * @argument [] - Array of signatories for the transaction.
 * @argument 1 - The amount of tokens to transfer.
 */

                        const transferToken = async () => {
                            try {
                                const destination = new PublicKey(prompt("Enter the destination public key: "));
                                await token.transfer(
                                    wallet.publicKey, 
                                    destination, 
                                    wallet, 
                                    [], 
                                    1
                                );
                                console.log("Token transferred");
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
                            console.log("Select an operation: ");
                            console.log("[1] Create Token");
                            console.log("[2] Mint Token");
                            console.log("[3] Get Token Balance");
                            console.log("[4] Transfer Token");
                            console.log("[5] Exit");
                            const operation = parseInt(prompt("Enter the operation: "));

                            if (operation === 1) {
                                await createToken();
                            } else if (operation === 2) {
                                await mintToken();
                            } else if (operation === 3) {
                                await getTokenBalance();
                            } else if (operation === 4) {
                                await transferToken();
                            } else if (operation === 5) {
                                console.log("Exiting...");
                            } else {
                                console.log("Invalid operation");
                            }
                        }
                        main()
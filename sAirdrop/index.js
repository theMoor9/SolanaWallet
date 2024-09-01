/**
 * @file index.js is an example file for creating a Solana wallet and retrieving the wallet balance.
 * @note The code can be executed in a Node.js environment directly from the console with the current format.
 * @Note If preferred, documentation can be removed and Shift+Tab can be used to reset to the standard format.
 */

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
                            LAMPORTS_PER_SOL, // Constant for converting SOL value
                        } = require('@solana/web3.js'); 

/** 
 * Creates a new instance of Keypair, representing a Solana wallet for testing purpose
 * @constant {Keypair} wallet - A new instance of Keypair representing an immutable wallet
 * @note `let` : Creates a "buffer" instance for the wallet, allowing multiple wallets to be generated on it
 * @note `const` : Creates an instance of a new immutable wallet
 * @note `new` : An object constructor that creates an instance of a specific object type (Keypair from @solana/web3.js)
 */
                        wallet = new Keypair(); // TEST WALLET
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
/** 
 * Creates a getAirdrop object to request an airdrop of funds on the Solana network.
 * @function getAirdrop - Asynchronous function to request an airdrop of funds on the Solana network.
 * @function requestAirdrop : Function that requests an airdrop of funds on the Solana network.
 * @argument `publicKey` : The public key of the wallet to which the funds will be sent.
 * @argument `2 * LAMPORTS_PER_SOL` : The amount of funds requested for the airdrop (2 SOL).
 * @function confirmTransaction : Function that confirms the airdrop transaction.
 */

                        const getAirdrop = async () => {
                            try {
                                const connectionLink = await getConnection();
                                console.log("Requesting 2 SOL Airdrop for: ", publicKey.toBase58());
                                const airdropSignature = await connectionLink.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
                                console.log("Airdrop Request Confirmed, Signature: ", airdropSignature);

                                // Airdrop transaction confirmation sectionp
                                const latestBlockHash = await connectionLink.getLatestBlockhash();

                                await connectionLink.confirmTransaction({
                                  blockhash: latestBlockHash.blockhash,
                                  lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                                  signature: airdropSignature,
                                });   

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
                            await getAirdrop();
                            await getWalletBalance();
                        }
                        main()
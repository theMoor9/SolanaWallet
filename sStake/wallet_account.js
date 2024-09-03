const{          
Connection,
PublicKey,
clusterApiUrl,
Keypair, 
StakeProgram,
Authorized,
Lockup,
sendAndConfirmTransaction,
LAMPORTS_PER_SOL, // Constant for converting SOL value
} = require('@solana/web3.js'); 
const prompt = require('prompt-sync')();  // Import the prompt-sync library to receive user input

// START OF SOLANA WALLET SETUP

/** 
 * We generate a wallet and stake account for the user to interact with the Solana blockchain.
 * @constant wallet - Wallet for the user to pay for transactions.
 * @constant stakeAccount - Stake Account for the user to stake SOL.
 */

                        wallet = new Keypair(); // TEST WALLET
                        stakeAccount = new Keypair(); // STAKE ACCOUNT

                        // Retrieves the public key from the generated wallet

                        const walletPublicKey = new PublicKey(wallet.publicKey); 
                        const stakePublicKey = new PublicKey(stakeAccount.publicKey); 


                        console.log("Wallet Public Key: ", walletPublicKey);
                        console.log("Stake Account Public Key: ", stakePublicKey);



//Creates a getConnection object to interact with the Solana blockchain.
const getConnection = async () => {
    try { // Try to execute the following code, otherwise proceed with the catch block
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); 
        return connection; // Returns connection obj
    }catch(error){
        console.error("Error: ", error);
    }
}

// END OF SOLANA WALLET FUNDING OPERATIONS
/**
 * @param {*} pk publicKey of the wallet
 * @param {*} id id of operation
 */
const getWalletBalance = async (pk, id) => {
    try {
        const connectionLink = await getConnection();
        if (id == "w") {
            const balance = await connectionLink.getBalance(pk);
            console.log(`Total Balance: ${balance / LAMPORTS_PER_SOL } SOL`);
        } else if (id == "s") {
            const balance = await connectionLink.getBalance(pk);
            console.log(`Stake Account Balance:  ${ balance / LAMPORTS_PER_SOL } SOL`);
        }
    }catch(error){
        console.error("Error: ", error);
    }
}

const getAirdrop = async () => {
    try {
        const connectionLink = await getConnection();
        console.log("Requesting 2 SOL Airdrop for: ", walletPublicKey.toBase58());
        const airdropSignature = await connectionLink.requestAirdrop(walletPublicKey, 2 * LAMPORTS_PER_SOL);
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
 * @function minimumRent Calculates and returns the minimum balance required to exempt an account from rent on the Solana blockchain.
 * @note Rent is due unless account have a minimum balance that qualifies them for rent exemption.
 * @argument StakeProgram.space - It is a specific value indicating how much space a staking account occupies on the blockchain.
 */
                        const minimumRent = async () => {
                            try {
                                const connectionLink = await getConnection();
                                const rent = await connectionLink.getMinimumBalanceForRentExemption(StakeProgram.space);
                                console.log("Minimum Rent: ", rent / LAMPORTS_PER_SOL);
                                return rent;
                            }catch(error){
                                console.error("Error: ", error);
                            }
                        }

/** 
 * Handles the ammount request based on the user input and the minimum rent required.
 * @note The amount ha sto be converted to lamports.
 * @note The amount has to be greater than the minimum rent.
 * @note If the amount is greater than the balance, the balance is returned. 
 */
                        const amountToStake = async () => {
                            try {
                                const connectionLink = await getConnection();
                                const amountRequest = parseInt(prompt("Enter the amount of SOL to stake: ")) * LAMPORTS_PER_SOL;
                                console.log("Amount Requested: ", amountRequest / LAMPORTS_PER_SOL);
                                // Checks if the amount requested is less than the minimum rent
                                if (amountRequest < await minimumRent()) {;
                                    console.log("Amount Requested is less than the minimum rent: ", await minimumRent());
                                    return await minimumRent();
                                } else if (amountRequest > await connectionLink.getBalance(walletPublicKey)) {
                                    balance = await connectionLink.getBalance(walletPublicKey)
                                    return balance + await minimumRent();
                                }
                            }catch(error){
                                console.error("Error: ", error);
                            }
                        }

/** 
 * Transaction to create the committment towards the stake activity for the account.
 * @const transaction - Object that rappresents the transaction to be sent to the blockchain.
 * @const SystemProgram - Object that handles the creation of the stake account.
 * @function createAccount - Creates a new account for the stake activity.
 * @param authorized - Public Key of the wallet authorized to delegate the stake and manage the it.
 * @note authorized has two parameters: authorized.staker and authorized.withdrawer
 * @param fromPubKey - Public Key of the wallet that will pay and fund the transaction.
 * @param lamports - Amount of SOL to stake.
 * @param lockup - Lockup period for the stake account. Optional.
 * @note lockup has three parameters: lockup.unixTimestamp, lockup.epoch, lockup.custodian
 * @param stakeAccountPubKey - Public Key of the stake account we want to commit to.
 * @function sendAndConfirmTransaction - Sends the transaction to the blockchain and confirms it.
 * @param connectionLink - Connection object to interact with the Solana blockchain.
 * @param transaction - Transaction object to be sent to the blockchain.
 * @param wallet -  list of signers for the transaction.
 */
                        const commitStakeAccountTx = async () => {
                            try {
                                const connectionLink = await getConnection();
                                const transaction = StakeProgram.createAccount({
                                        fromPubkey: walletPublicKey, // Funding Wallet
                                        stakePubkey: stakePublicKey, // Stake Account
                                        authorized: new Authorized(walletPublicKey, walletPublicKey), // Wallet Authorized to manage the stake account
                                        lamports: await amountToStake(), // Amount to stake
                                        lockup: new Lockup(0, 0, walletPublicKey), // Lockup period
                                });
                                const signature = await sendAndConfirmTransaction(
                                    connectionLink,
                                    transaction,
                                    [wallet,stakeAccount]
                                );
                                console.log("Stake Account Created, Signature: ", signature);
                                await getWalletBalance(stakePublicKey,'s');
                            }catch(error){
                                console.error("Error: ", error);
                                //throw new Error("Insufficent Funds!");
                            }
                        }

/**
 * This function retrieves the status of the stake account.
 * @function getParsedAccountInfo - Retrieves the account information of the stake account.
 * @const StakeAccount - Object that contains the information of the stake account.
 * @note .value?.data?.parsed?.info - parsed means that the data is in a readable format. ? means that the data is optional.
 * @const currentEpoch - Object that contais an Epoch: A period of time in the Solana blockchain.
 * @const activationEpoch - Epoch when the stake account was activated.
 * @const deactivationEpoch - Epoch when the stake account was deactivated.
 */
                        async function getStakeStatus(stakePubkey) {
                            const connectionLink = await getConnection();
                        
                            const accountInfo = await connectionLink.getParsedAccountInfo(stakePubkey);
                            const stakeAccount = accountInfo.value?.data?.parsed?.info;
                        
                            if (!stakeAccount) {
                            console.log("Invalid stake account or no stake account found.");
                            return;
                            }
                        
                            // Get stake status
                            const currentEpoch = await connectionLink.getEpochInfo();
                            const activationEpoch = stakeAccount.stake?.delegation?.activationEpoch;
                            const deactivationEpoch = stakeAccount.stake?.delegation?.deactivationEpoch;
                        
                            let status;
                        
                            if (activationEpoch === 'uninitialized') {
                            status = 'uninitialized';
                            } else if (deactivationEpoch === 'uninitialized') {
                            status = 'active';
                            } else if (currentEpoch.epoch >= deactivationEpoch) {
                            status = 'inactive';
                            } else {
                            status = 'deactivating';
                            }
                        
                            console.log(`Stake status: ${status}`);
                        }

/** 
 * main - Main function to execute the operations.
 * @note for each function look up the documentation to understand the parameters and the return values.
 */

                        const main = async () => {
                            try{
                                await getWalletBalance(walletPublicKey,'w');
                            
                                await getAirdrop();
                                await getWalletBalance(walletPublicKey,'w');

                                await commitStakeAccountTx();
                                await getWalletBalance(walletPublicKey,'w');

                                await getStakeStatus(stakePublicKey); 

                            } catch(error){
                                console.error(error);
                            }
                            
                        }
                        main();
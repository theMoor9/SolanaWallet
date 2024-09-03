const{   
    PublicKey,       
    Connection,
    clusterApiUrl,
    StakeProgram,
    sendAndConfirmTransaction,
} = require('@solana/web3.js'); 
const prompt = require('prompt-sync')();
const { getValidators } = require('./get_validators'); // Import the getValidators function from the get_validators.js file

//Creates a getConnection object to interact with the Solana blockchain.
const getConnection = async () => {
    try { // Try to execute the following code, otherwise proceed with the catch block
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); 
        return connection; // Returns connection obj
    }catch(error){
        console.error("Error: ", error);
    }
}

/**
 * Function to get the balance of a wallet.
 * @const SystemProgram - Object that handles the creation of the stake account.
 * @function delegate - Function that delegates a stake account to a validator.
 * @param stakePublicKey - The public key of the stake account.
 * @param wallet - The wallet that will delegate the stake account.
 * @param votePubkey - The public key of the validator to which the stake account will be delegated.
 * @function sendAndConfirmTransaction - Sends the transaction to the blockchain and confirms it.
 * @param connectionLink - Connection object to interact with the Solana blockchain.
 * @param transaction - Transaction object to be sent to the blockchain.
 * @param wallet -  list of signers for the transaction.
 */
                    const delegateStakeToValidator = async (stakePublicKey,wallet) => {
                        try {
                            const connectionLink = await getConnection();
                            let selectedValidatorPubkey = 0; 

                            if (prompt("Do you want to delegate the stake account to known a validator? (y/n): ") !== 'y') {
                                selectedValidatorPubkey = prompt("Enter the validator's vote account address: ");
                            } else {
                                console.log("Delegating to first active validator");
                                const validators = await getValidators();
                                const selectedValidator = validators.current[0]; // First active validator in the list
                                selectedValidatorPubkey = new PublicKey(selectedValidator.votePubkey);
                            }
                            const transaction = StakeProgram.delegate({
                                stakePubkey: stakePublicKey,
                                authorizedPubkey: wallet.publicKey,
                                votePubkey: selectedValidatorPubkey,
                            });
                            const signature = await sendAndConfirmTransaction(
                                connectionLink,
                                transaction,
                                [wallet]
                            );
                            console.log(`Stake Account Delegated to ${ selectedValidatorPubkey.toBase58() }, Signature: ${signature}`);
                            await getWalletBalance(stakePublicKey,'s');
                        }catch(error){
                            console.error("Error: ", error);
                        }
                    }

/**
 * Deactivate a stake account.
 * @const StakeProgram - Object that handles the creation of the stake account.
 * @function deactivate - Function that deactivates a stake account.
 * @param stakePublicKey - The public key of the stake account to be deactivated.
 * @param wallet - The wallet that has authority over the stake account.
 * @function sendAndConfirmTransaction - Same as above.
 */
                    const deactivateStake = async (stakePublicKey,wallet) => {
                        try {
                            const connectionLink = await getConnection();
                            const transaction = StakeProgram.deactivate({
                                stakePubkey: stakePublicKey,
                                authorizedPubkey: wallet.publicKey,
                            });
                            const signature = await sendAndConfirmTransaction(
                                connectionLink,
                                transaction,
                                [wallet]
                            );
                            console.log(`Stake Account Deactivated, Signature: ${signature}`);
                        }catch(error){
                            console.error("Error: ", error);
                        }
                    }

/**
 * Function to get the stake accounts delegated to a validator.
 * @const STAKE_PROGRAM_ID -This is the program ID on Solana that manages staking accounts.
 * @function getParsedProgramAccounts - Function that returns an array of accounts that meet the specified filter criteria.
 * @param filters - An array of filters to apply to the accounts.
 * @param dataSize - Filters accounts by those that have a data size of 200 bytes, typical for staking accounts.
 * @param memcmp - Filters accounts by comparing a specific portion of the account data (starting at offset 124) 
 *                 with the validator's public key, converted to Base58. This filter is used to find all staking accounts
 *                 delegated to the specified votePubkey.
 */
                    const getDelegations = async (votePubkey) => {
                        const connectionLink = await getConnection();
                        const STAKE_PROGRAM_ID = new PublicKey('Stake11111111111111111111111111111111111111');

                        const stakeAccounts = await connectionLink.getParsedProgramAccounts(STAKE_PROGRAM_ID,{
                            filters: [
                                {dataSize: 200},
                                {
                                    memcmp: {
                                        offset: 124,
                                        bytes: votePubkey.toBase58()
                                    }
                                }
                            ]
                        });
                        console.log(stakeAccounts);
                    }

module.exports = { delegateStakeToValidator, getDelegations, deactivateStake }; // Export functions to be used in other files
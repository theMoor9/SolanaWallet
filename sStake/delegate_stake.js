const{   
    PublicKey,       
    Connection,
    clusterApiUrl,
    StakeProgram,
    sendAndConfirmTransaction,
} = require('@solana/web3.js'); 
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
                    const delegateStake = async (stakePublicKey,wallet) => {
                        try {
                            const connectionLink = await getConnection();
                            const validators = await getValidators();
                            const selectedValidator = validators.current[0]; // First active validator in the list
                            const selectedValidatorPubkey = new PublicKey(selectedValidator.votePubkey);
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
                            console.log(`Stake Account Delegated to ${ selectedValidatorPubkey }, Signature: `, signature);
                            await getWalletBalance(stakePublicKey,'s');
                        }catch(error){
                            console.error("Error: ", error);
                        }
                    }

module.exports = { delegateStake };
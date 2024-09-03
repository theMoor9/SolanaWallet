const{         
    Connection,
    clusterApiUrl,
} = require('@solana/web3.js'); 

/**
 * Retrieves the current validators and all validators on the Solana blockchain.
 * @function getVoteAccounts - Retrieves the current validators and all validators on the Solana blockchain.
 * @note @function getValidators - Retrieves the active validators on the Solana blockchain.
 */

            const getValidators = async () => {
                try {
                    const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');
                    const { current , delinquent } = await connection.getVoteAccounts();
                    console.log("Current Validators: "+ current.length);
                    console.log("All Validators: "+ current.concat(delinquent).length);
                    validatorList =  await connection.getVoteAccounts();
                    return validatorList;
                }catch(error){
                    console.error("Error: ", error);
                }
            }




            const main = async () => {
                await getValidators();
            }
            main();

// Exports the getValidators function to be used in other files.
module.exports = { getValidators };
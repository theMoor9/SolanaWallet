/** 
 * Syntax for importing Solana libraries
 * @module solanaSetup
 * @note `const` : Creates an immutable instance for {}, Solana web3.js library
 */
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
                const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');
                const { current , delinquent } = await connection.getVoteAccounts();
                console.log("Current Validators: "+ current.length);
                console.log("All Validators: "+ current.concat(delinquent).length);
            }


            const main = async () => {
                try {
                    await getValidators();
                }catch(error){
                    console.error("Error: ", error);
                }
            }
            main();
/**
 * @file index.js è un file di esempio per creare un wallet Solana e ottenere il saldo del wallet.
 * @note Il codice può essere eseguito in un ambiente Node.js direttamente dalla console con l'attuale formato.
 * @Note Se lo si preferisce è possibile rimuovere la ducumentazione e Shift+Tab per resettare il format standard.
 */

/** 
 * Sintassi per importare le librerie di Solana
 * @module solanaSetup
 * @note `const` : Genera istanza immutabile per {}, libreria web3.js di Solana
 */
                        const{          
                            Connection,
                            PublicKey,
                            clusterApiUrl,
                            Keypair, 
                            LAMPORTS_PER_SOL, // Costante di scambio per il porzionamento del valore del Sol
                        } = require('@solana/web3.js'); 

/** 
 * Crea una nuova istanza di Keypair, che rappresenta un wallet Solana
 * @constant {Keypair} wallet - Una nuova istanza di Keypair rappresentante un wallet immutabile
 * @note `let` : Crea un istanza "buffer" per il wallet, permettendo di generare più wallet su di essa
 * @note `const` : Crea un istanza di un nuovo wallet assoluto immutabile
 * @note `new` : E' un costruttore di oggetti che crea un'istanza di un tipo di oggetto specifico (Keypair da @solana/web3.js)
 */
                        wallet = new Keypair();

/**  
 * Ottiene la chiave pubblica dal wallet generato
 * @constant {PublicKey} publicKey - La chiave pubblica associata a questo wallet
 * @note `_name` : Indica la proprietà della variabile 
 * @note `_` : è convenzione per indicare una variabile privata
 * 
 * @Note E' possibile const publicKey = wallet._keypair.publicKey;
 * @note Evitare l'uso diretto di `_keypair` poiché è una proprietà interna e potrebbe cambiare in versioni future della libreria.
 * @note Usare `wallet.publicKey` per accedere alla chiave pubblica in modo sicuro.
 */
                        const publicKey = new PublicKey(wallet.publicKey); 
/** 
 * Recupera la chiave privata del wallet.
 * @constant {Uint8Array} secretKey - La chiave segreta associata al wallet.
 * @warning La chiave privata deve essere mantenuta segreta. Chiunque la possieda ha pieno accesso ai fondi del wallet.
 */
                        const secretKey = wallet.secretKey;


/**
 * Stampa la chiave pubblica e la chiave privata del wallet sulla console.
 * @function console.log - Stampa a console il valore della variabile dopo la virgola
 * @note `console.log` è utile per il debugging e per visualizzare i valori durante lo sviluppo.
 */
                        console.log("Public Key: ", publicKey);
                        //console.log("Secret Key: ", secretKey);


// FINE DEL SETUP DEL WALLET SOLANA

/**
 * Crea un oggetto getConnection per interagire con la blockchain Solana.
 * @constant {Connection} connection - Un oggetto connection per interagire con la blockchain Solana.
 * @note `async()` : Funzione asincrona che restituisce una Promise risolta ad una chiamata await (Vedi più tardi).
 *                   Promise : Stato di attesa Pending, Fulfilled, Rejected
 * @function clusterApiUrl() : Funzione che restituisce l'URL API della rete Solana specificata.
 * @argument `devnet` : Rete di test Solana, che consente la simulazione di transazioni senza utilizzare fondi reali.
 * @argument `mainnet` : Rete principale Solana, utilizzata per transazioni reali con fondi reali.
 * @argument `testnet` : Rete di test Solana, simile a devnet ma con alcune differenze.
 * @argument `'confirmed'` : Livello di conferma delle transazioni richiesto per considerare un azione confermata.
 */
                        const getConnection = async () => {
                            try { // Prova a eseguire il codice seguente altrimenti prosegue con il blocco catch
                                const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); 
                                return connection; // Restituisce l'oggetto connection
                            }catch(error){
                                console.error("Error: ", error);
                            }
                        }

/**
 * Crea un oggetto getWalletBalance per ottenere il saldo del wallet Solana.
 * @function getBalance - Funzione asincrona per ottenere il saldo del wallet Solana.
 * @note `await` : Attende il completamento della Promise e restituisce il risultato.
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
 * Crea un oggetto getAirdrop per richiedere un airdrop di fondi sulla rete Solana.
 * @function getAirdrop - Funzione asincrona per richiedere un airdrop di fondi sulla rete Solana.
 * @function requestAirdrop : Funzione che richiede un airdrop di fondi sulla rete Solana.
 * @argument `publicKey` : La chiave pubblica del wallet a cui verranno inviati i fondi.
 * @argument `2 * LAMPORTS_PER_SOL` : La quantità di fondi richiesti per l'airdrop (2 SOL).
 * @function confirmTransaction : Funzione che conferma la transazione di airdrop.
 */

                        const getAirdrop = async () => {
                            try {
                                const connectionLink = await getConnection();
                                const airdropSignature = await connectionLink.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
                                console.log("Airdrop Request Confirmed, Signature: ", airdropSignature);

                                //Sezione di conferma della transazione di airdrop
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
 * Crea il main
 * @function main - Funzione principale per eseguire le operazioni.
 * @note main() : Esegue la funzione principale per avviare il programma.
 */
                        const main = async () => {
                            await getWalletBalance();
                            await getAirdrop();
                            await getWalletBalance();
                        }
                        main()
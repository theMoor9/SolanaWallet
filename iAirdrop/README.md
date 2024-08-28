# Solana Airdrop Wallet Setup

Questo progetto è un esempio di come creare un wallet Solana, ottenere il saldo e richiedere un airdrop simultato su devnet utilizzando Node.js e la libreria `@solana/web3`. (Devnet è una rete di test Solana, che consente la simulazione di transazioni senza utilizzare fondi reali) js`.

## Prerequisiti

### Installare Node.js

Per eseguire questo progetto, è necessario avere Node.js installato sul proprio sistema. Node.js include anche npm, il gestore dei pacchetti che utilizzeremo per installare le dipendenze.

#### Passaggi per Installare Node.js:

1. Vai al sito ufficiale di Node.js: [nodejs.org](https://nodejs.org/)
2. Scarica l'ultima versione stabile per il tuo sistema operativo.
3. Segui le istruzioni di installazione.

Per verificare che Node.js sia installato correttamente, apri il terminale e esegui:

```sh
node -v
```

Dovresti vedere un output che indica la versione di Node.js installata (ad esempio, `v16.14.0`).

## Configurazione del Progetto

### Passaggi per Configurare ed Eseguire il Progetto

1. **Clona la repository o scarica i file**: Assicurati di avere i file `setup.js` e `index.js` nella stessa cartella sul tuo sistema.
    
2. **Apri il terminale** ed entra nella cartella dove hai salvato i file:
    
```sh
cd /percorso/dove/si/trova/index.js
```

3. **Genera `package.json`**: Prima di eseguire `setup.js`, l'utente dovrebbe inizializzare un progetto Node.js eseguendo:

```sh
npm init -y
```

	Questo comando genera un file `package.json` con le configurazioni di base.
	
4. **Esegui `setup.js`** per installare le dipendenze necessarie:
    
```sh
node setup.js
```
    
    Questo comando verificherà se la libreria `@solana/web3.js` è installata e, in caso contrario, la installerà automaticamente.
    
5. **Esegui `index.js`** per creare il wallet Solana e ottenere il saldo:
    
```sh
node index.js
```
    
    Dopo l'esecuzione, vedrai stampata la chiave pubblica del wallet nella console. Se configurato per farlo, vedrai anche il saldo del wallet (inizialmente 0 SOL per un wallet nuovo).


## Author
Kenneth Boldrini

## License

This repository is licensed. See the [LICENSE](./LICENSE) file for more details.

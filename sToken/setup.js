const { execSync } = require('child_process'); // Import the child_process library to run command line commands

//Arry di dipendenze  
const dependencies = [
    '@solana/web3.js',
    '@solana/spl-token',
    'prompt-sync',
];


function checkAndInstall(dependecies) {
    try {
        require.resolve(dependecies);
        console.log(`${dependecies} è già installato.`);
    } catch (e) {
        console.log(`${dependecies} non è installato. Installazione in corso...`);
        try {
            execSync(`npm install ${dependecies}`, { stdio: 'inherit' });
            console.log(`${dependecies} è stato installato con successo.`);
        } catch (installError) {
            console.error(`Errore durante l'installazione di ${dependecies}:`, installError);
            process.exit(1);
        }
    }
}

//Ciclo per installare le dipendenze
dependencies.forEach(checkAndInstall);



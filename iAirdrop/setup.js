const { execSync } = require('child_process'); // Importa la libreria child_process per eseguire comandi da riga di comando

const packageName = '@solana/web3.js'; // Nome dipendenza da installare

function checkAndInstall(packageName) {
    try {
        require.resolve(packageName);
        console.log(`${packageName} è già installato.`);
    } catch (e) {
        console.log(`${packageName} non è installato. Installazione in corso...`);
        try {
            execSync(`npm install ${packageName}`, { stdio: 'inherit' });
            console.log(`${packageName} è stato installato con successo.`);
        } catch (installError) {
            console.error(`Errore durante l'installazione di ${packageName}:`, installError);
            process.exit(1);
        }
    }
}

checkAndInstall(packageName);



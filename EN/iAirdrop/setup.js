const { execSync } = require('child_process'); // Import the child_process library to run command line commands

const packageName = '@solana/web3.js'; // Name of the dependency to install

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



const { execSync } = require('child_process'); // Import the child_process library to run command line commands

//Dependencies  
const dependencies = [
    '@solana/web3.js',
    'prompt-sync',
];

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

//Cicles to install dependencies
dependencies.forEach(checkAndInstall);



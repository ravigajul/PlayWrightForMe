import { FullConfig } from "playwright/test";
import fs from "fs";

async function globalSetup(config: FullConfig) {
    // Check if the environment file exists
    const envFile = process.env.ENV_FILE || 'qa'; // Default to 'qa' if not set
   //onsole.log(`Using environment file: ${envFile}`);
    const envPath = `./.env.${envFile}`;

    if (fs.existsSync(envPath)) {
        // Load the environment variables from the specified file
        require('dotenv').config({ path: envPath });
        console.log(`Using environment file: ${envFile}`);
    } else {
        console.warn(`Warning: Environment file not found: ${envPath}`);
    }
}        
export default globalSetup;

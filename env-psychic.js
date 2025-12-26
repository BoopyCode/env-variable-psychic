#!/usr/bin/env node

// Environment Variable Psychic
// I see dead variables... and missing ones too!

const fs = require('fs');
const path = require('path');

// The crystal ball of environment detection
function psychicScan() {
    console.log('🔮 *waves hands mysteriously* 🔮');
    console.log('Reading your .env aura...\n');
    
    // Look for .env files like a psychic looks for ghosts
    const envPath = path.join(process.cwd(), '.env');
    
    if (!fs.existsSync(envPath)) {
        console.log('💀 SPOOKY: No .env file found! Are you trying to summon bugs?');
        return;
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    
    console.log(`📜 Found ${envLines.length} environment variables in .env:`);
    
    let missingCount = 0;
    let mismatchedCount = 0;
    
    envLines.forEach(line => {
        const [key, expectedValue] = line.split('=').map(s => s.trim());
        const actualValue = process.env[key];
        
        if (actualValue === undefined) {
            console.log(`❌ ${key}: NOT SET (expected: ${expectedValue})`);
            missingCount++;
        } else if (actualValue !== expectedValue) {
            console.log(`⚠️  ${key}: MISMATCH (env: ${actualValue}, .env: ${expectedValue})`);
            mismatchedCount++;
        } else {
            console.log(`✅ ${key}: ${actualValue}`);
        }
    });
    
    // Psychic summary
    console.log('\n🔮 Psychic Diagnosis:');
    if (missingCount === 0 && mismatchedCount === 0) {
        console.log('✨ Your aura is clean! All variables present and correct.');
    } else {
        console.log(`👻 Found ${missingCount} missing and ${mismatchedCount} mismatched variables.`);
        console.log('💡 Tip: Try "source .env" or restart your terminal session.');
    }
}

// Check for .env.example too (optional psychic upgrade)
function checkExample() {
    const examplePath = path.join(process.cwd(), '.env.example');
    if (fs.existsSync(examplePath)) {
        console.log('\n🔍 Bonus psychic vision: Comparing with .env.example...');
        
        const exampleContent = fs.readFileSync(examplePath, 'utf8');
        const exampleLines = exampleContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
        
        exampleLines.forEach(line => {
            const key = line.split('=')[0].trim();
            if (!process.env[key]) {
                console.log(`📝 ${key}: Defined in .env.example but missing in environment`);
            }
        });
    }
}

// Main ritual
if (require.main === module) {
    psychicScan();
    checkExample();
}

module.exports = { psychicScan };

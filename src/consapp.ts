import * as readline from 'readline';
import { Card } from 'models/card';
import hondenData from './data/characters.json';



const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function toonHoofdmenu() {
    console.log('\nWelkom bij de Hondendata Viewer!');
    console.log('1. Toon alle honden');
    console.log('2. Zoek op ID');
    console.log('3. Zoek op ras');
    console.log('4. Zoek op eigenaar ID');
    console.log('5. Afsluiten');
    
    readLine.question('Kies een optie: ', (keuze) => {
        switch (keuze) {
            case '1':
                toonAlleHonden(); 
                break;
            case '2':
                readLine.question('Voer het ID in: ', (id) => {
                    toonHondOpId(parseInt(id));
                });
                break;
            case '3':
                readLine.question('Voer het ras in: ', (ras) => {
                    toonHondenOpRas(ras);
                });
                break;
            case '4':
                readLine.question('Voer het eigenaar ID in: ', (eigenaarId) => {
                    toonHondenOpEigenaar(parseInt(eigenaarId));
                });
                break;
            case '5':
                console.log('Tot ziens!');
                readLine.close();
                break;
            default:
                console.log('Ongeldige keuze. Probeer opnieuw.');
                toonHoofdmenu();
                break;
        }
    });
}

function toonAlleHonden() {
    console.log('\nAlle Honden:');
    hondenData.forEach(hond => {
        console.log(`- ${hond.name} (ID: ${hond.id})`);
        console.log(`  - Ras: ${hond.breedType}`);
        console.log(`  - Leeftijd: ${hond.age}`);
        console.log(`  - Eigenaar ID: ${hond.ownerId}`);
    });
    toonHoofdmenu();
}

function toonHondOpId(id: number) {
    const hond = hondenData.find(h => h.id === id);
    if (hond) {
        console.log(`\n- ${hond.name} (ID: ${hond.id})`);
        console.log(`  - Beschrijving: ${hond.description}`);
        console.log(`  - Leeftijd: ${hond.age}`);
        console.log(`  - Actief: ${hond.isActive ? 'Ja' : 'Nee'}`);
        console.log(`  - Geboortedatum: ${hond.birthDate}`);
        console.log(`  - Ras: ${hond.breedType}`);
        console.log(`  - Hobby's: ${hond.hobbies.join(', ')}`);
        console.log(`  - Eigenaar ID: ${hond.ownerId}`);
        console.log(`  - Geslacht: ${hond.gender}`);
        console.log(`  - Gevaccineerd: ${hond.vaccinated ? 'Ja' : 'Nee'}`);        
        console.log(`  - Energie niveau: ${hond.energyLevel}/10`);
    } else {
        console.log(`Geen hond gevonden met ID ${id}`);
    }
    toonHoofdmenu();
}

function toonHondenOpRas(ras: string) {
    const gefilterdeHonden = hondenData.filter(hond => 
        hond.breedType.toLowerCase().includes(ras.toLowerCase())
    );
    
    if (gefilterdeHonden.length > 0) {
        console.log(`\nHonden van ras '${ras}':`);
        gefilterdeHonden.forEach(hond => {
            console.log(`- ${hond.name} (ID: ${hond.id})`);
            console.log(`  - Leeftijd: ${hond.age}`);
            console.log(`  - Eigenaar ID: ${hond.ownerId}`);
        });
    } else {
        console.log(`Geen honden gevonden van ras '${ras}'`);
    }
    toonHoofdmenu();
}

function toonHondenOpEigenaar(ownerId: number) {
    const gefilterdeHonden = hondenData.filter(hond => hond.ownerId === ownerId);
    
    if (gefilterdeHonden.length > 0) {
        console.log(`\nHonden van eigenaar ID ${ownerId}:`);
        gefilterdeHonden.forEach(hond => {
            console.log(`- ${hond.name} (ID: ${hond.id})`);
            console.log(`  - Ras: ${hond.breedType}`);
            console.log(`  - Leeftijd: ${hond.age}`);
        });
    } else {
        console.log(`Geen honden gevonden voor eigenaar ID ${ownerId}`);
    }
    toonHoofdmenu();
}


toonHoofdmenu();
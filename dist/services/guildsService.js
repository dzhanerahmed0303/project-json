"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGuilds = getAllGuilds;
const guilds = [
    {
        id: 1,
        name: "Order of the Cosmic Veil",
        master: "Celestial Mage",
        foundedYear: 1423,
        motto: "Balance in All, All in Balance",
        members: 87,
        element: "Aether"
    },
    {
        id: 2,
        name: "Circle of the Inferno",
        master: "Inferno Mage",
        foundedYear: 1492,
        motto: "From Ashes to Flame",
        members: 65,
        element: "Fire"
    },
    // Voeg andere guilds toe zoals in je screenshot
];
function getAllGuilds(sortField, sortOrder, search) {
    let result = [...guilds];
    // Filter functionaliteit
    if (search) {
        result = result.filter(guild => guild.name.toLowerCase().includes(search.toLowerCase()) ||
            guild.master.toLowerCase().includes(search.toLowerCase()));
    }
    // Sorteer functionaliteit
    if (sortField && sortOrder) {
        result.sort((a, b) => {
            const aVal = a[sortField];
            const bVal = b[sortField];
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortOrder === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            else if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
            }
            return 0;
        });
    }
    return result;
}

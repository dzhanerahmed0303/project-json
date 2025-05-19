"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCards = getAllCards;
exports.getCardById = getCardById;
// Voorbeeld data - vervang dit met je echte data of database calls
const cards = [
    {
        id: 1,
        name: "Aether Knight",
        guild: "Order of the Cosmic Veil",
        birthDate: "1567-03-05",
        abilities: ["Teleportation", "Energy Manipulation", "Dimensional Travel"],
        rarity: "Legendary",
        active: true,
        age: 457,
        element: "Aether",
        description: "A legendary knight who harnesses the ethereal powers..."
    },
    // Voeg meer cards toe volgens je screenshot
];
function getAllCards(sortField, sortOrder, search) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = [...cards];
        // Filter functionaliteit
        if (search) {
            result = result.filter(card => card.name.toLowerCase().includes(search.toLowerCase()) ||
                card.guild.toLowerCase().includes(search.toLowerCase()));
        }
        // Sorteer functionaliteit
        if (sortField && sortOrder) {
            result.sort((a, b) => {
                const aValue = a[sortField];
                const bValue = b[sortField];
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortOrder === 'asc'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
                }
                return 0;
            });
        }
        return result;
    });
}
function getCardById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return cards.find(card => card.id === id);
    });
}

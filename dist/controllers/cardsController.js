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
const express_1 = require("express");
const cardsService_1 = require("../services/cardsService");
const router = (0, express_1.Router)();
// Haal alle cards op met sorteer- en filterfunctionaliteit
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sort, order, search } = req.query;
        const cards = yield (0, cardsService_1.getAllCards)(sort, order, search);
        res.render('cards/index', {
            cards,
            sortField: sort,
            sortOrder: order,
            search: search || '',
            currentPage: 'cards'
        });
    }
    catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).render('error', {
            message: 'Failed to load cards'
        });
    }
}));
// Haal specifieke card details op
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardId = parseInt(req.params.id);
        const card = yield (0, cardsService_1.getCardById)(cardId);
        if (!card) {
            return res.status(404).render('error', {
                message: 'Card not found'
            });
        }
        res.render('cards/detail', {
            card,
            currentPage: 'cards'
        });
    }
    catch (error) {
        console.error('Error fetching card details:', error);
        res.status(500).render('error', {
            message: 'Failed to load card details'
        });
    }
}));
exports.default = router;

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
const guildsService_1 = require("../services/guildsService");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sort, order, search } = req.query;
        const guilds = yield (0, guildsService_1.getAllGuilds)(sort, order, search);
        res.render('guilds/index', {
            guilds,
            sortField: sort,
            sortOrder: order,
            search: search || ''
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error loading guilds' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sort, order, search } = req.query;
        const guilds = yield (0, guildsService_1.getAllGuilds)(sort, order, search);
        res.render('guilds/index', {
            guilds,
            sortField: sort,
            sortOrder: order,
            search: search || '',
            currentPage: 'guilds'
        });
    }
    catch (error) {
        // error handling
    }
}));
exports.default = router;

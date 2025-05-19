"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cardsController_1 = __importDefault(require("./controllers/cardsController"));
const guildsController_1 = __importDefault(require("./controllers/guildsController"));
const app = (0, express_1.default)();
// Zorg dat dit VOOR je routes komt:
const publicPath = path_1.default.join(__dirname, '..', 'public');
app.use(express_1.default.static(publicPath));
// Debug logging:
console.log('Static files served from:', publicPath);
// Configuratie
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/cards', cardsController_1.default);
app.use('/guilds', guildsController_1.default);
// Home route
app.get('/', (req, res) => res.redirect('/cards'));
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

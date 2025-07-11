const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

const app = express();

// Замени на свой Steam API ключ
const STEAM_API_KEY = 'FC4A1C4FFE08C60E2B00EDF2E76C034D';

// Настройка Steam стратегии
passport.use(new SteamStrategy({
    returnURL: 'https://s6t6n6.com/auth/steam/return ',
    realm: 'https://s6t6n6.com/ ',
    apiKey: STEAM_API_KEY
}, function(identifier, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Подключение статики
app.use(express.static('public'));

// Роуты
app.get('/auth/steam', passport.authenticate('steam'));
app.get('/auth/steam/return', 
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

app.get('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }
    res.status(401).json({ error: 'Не авторизован' });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
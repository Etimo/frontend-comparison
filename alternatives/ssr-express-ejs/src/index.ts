import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { Api } from './api.js';
import { indexFactory } from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const BACKEND_URL = process.env.BACKEND_URL;
const PORT = process.env.PORT;

if (!PORT) { throw new Error('Missing ENV PORT'); }
if (!BACKEND_URL) { throw new Error('Missing ENV BACKEND_URL'); }

const api = new Api({ BACKEND_URL });

app.use(express.static(`${__dirname}/../public`));
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.get('/', indexFactory({ api }));
app.get('/about', async (req, res) => {
	res.render('routes/about.ejs');
});
app.get('/contact', async (req, res) => {
	res.render('routes/contact.ejs');
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});

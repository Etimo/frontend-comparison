import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT;

if (!port) {
	throw new Error('Missing ENV PORT');
}

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.get('/', (req, res, cb) => {
	res.render('routes/index.ejs');
	cb();
});

app.get('/about', (req, res, cb) => {
	res.render('routes/about.ejs');
	cb();
});
app.get('/contact', (req, res, cb) => {
	res.render('routes/contact.ejs');
	cb();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

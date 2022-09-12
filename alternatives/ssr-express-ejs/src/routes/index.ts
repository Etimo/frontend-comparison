import { Request, Response } from 'express';

import { Api } from '../api.js';

export function indexFactory({ api }: { api: Api }) {
	return async (req: Request, res: Response) => {
		const tmplData = {
			products: await api.products(),
			cart: await api.cart(),
		};

		res.render('routes/index.ejs', tmplData);
	};
}

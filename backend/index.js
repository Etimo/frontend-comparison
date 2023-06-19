import express from 'express';
import { readdir } from 'node:fs/promises';

const app = express();
const port = process.env.PORT;

if (!port) {
	throw new Error('Missing ENV PORT');
}

const products = [
  { images: [], id: 'bergshult-hyllplan', name: 'Bergshult', description: 'Hyllplan', price: 111.2 },
  { images: [], id: 'saluding-korg-set-om-2-handgjord-bambu', name: 'Saluding', description: 'Korg set om 2, handgjord bambu', price: 63.2 },
  { images: [], id: 'ekenabben-oeppen-hyllsektion', name: 'Ekenabben', description: 'Öppen hyllsektion', price: 399.2 },
  { images: [], id: 'billy-bokhylla', name: 'Billy', description: 'Bokhylla', price: 479.2 },
  { images: [], id: 'risatorp-korg', name: 'Risatorp', description: 'Korg', price: 159.2 },
];

const cart = {
  items: [],
  sum: 0,
};

console.log("Reading product images from disk");
const productImages = await readdir('../resources/assets/products');
for (let pidx = 0; products.length > pidx; pidx ++) {
  for (let iidx = 0; productImages.length > iidx; iidx++) {
    if (products[pidx].id === productImages[iidx].substring(0, products[pidx].id.length)) {
      products[pidx].images.push(productImages[iidx]);
    }
  }
}

app.use(express.json());

app.get('/cart', (req, res) => res.json(cart));
app.get('/product/:id', (req, res) => res.json(products.find(product => product.id === req.params.id)));
app.get('/products', (req, res) => res.json(products));
app.put('/cart/:prodId', (req, res) => {
  setCartProduct({ prodId: req.params.prodId, qty: req.body.quantity });
  res.json(cart);
});
app.delete('/cart', (req, res) => {
  cart.items = [];
  cart.sum = 0;
  res.json('OK');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

function setCartProduct({ prodId, qty }) {
  const prevIdx = cart.items.indexOf(cart.items.find(item => item.product?.id === prodId));
  if (prevIdx !== -1) {
    cart.items.splice(prevIdx, 1);
  }
  const product = products.find(product => product.id === prodId);
  if (!product) {
    throw new Error('Invalid product id');
  }
  cart.items.push({ product, qty });
  cart.sum = 0;
  for (const item of cart.items) {
    cart.sum += item.product.price * item.qty;
  }
}

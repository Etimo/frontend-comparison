import express from 'express';

const app = express();
const port = process.env.PORT;

if (!port) {
	throw new Error('Missing ENV PORT');
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

const products = [
  { id: '0d71d1a2-6e9b-4010-9e4d-e36fbb311b39', name: 'Laptop', description: 'Awesome computer is awesome with many bells and whistles.', price: 1200 },
  { id: '69175702-7a71-4b6b-bbdf-2ad1c022f103', name: 'Tiger', description: 'Hard to maintain. Illegal in many places.', price: 9500 },
  { id: '5d4149c6-b327-4153-b015-167e15eac6d3', name: 'Glass', description: 'Can contain water. Is often half full or half empty.', price: 2 },
  { id: 'f9e226b2-c844-4922-8e22-91636bc88e6c', name: 'Old bag', description: 'Pretty broken and weathered. Works best as decoration or as a gift for someone you don\'t like.', price: 150 },
];

const cart = {
  items: [],
  sum: 0,
};
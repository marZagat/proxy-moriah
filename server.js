const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');

// TODO: remove hardcoded values
const ADDRESSES = {
  'gallery': 'localhost:3001',
  'overview': 'localhost:3002',
  'sidebar': 'localhost:3003',
  'recommendations': 'localhost:3004',
};

app.use(morgan('dev'));

app.get('/', (req, res) => {
  const randomId = Math.floor(Math.random() * 10000000);
  res.redirect(`/restaurants/${randomId}`);
});

app.use('/restaurants/:id', express.static(path.join(__dirname, 'public')));

app.get('/api/restaurants/:id/:service', ({ params: { id, service } }, res) => {
  if (!ADDRESSES[service]) {
    return res.status(400).send();
  }

  res.redirect(`http://${ ADDRESSES[service] }/api/restaurants/${ id }/${ service }`)
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const services = require('./service-config');

const app = express();
app.use(morgan('dev'));
app.use('/restaurants/:id', express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  const randomId = Math.floor(Math.random() * 10000000);
  res.redirect(`/restaurants/${randomId}`);
});

app.get('/api/restaurants/:id/:serviceName', ({ params: { id, serviceName } }, res) => {
  if (!services[serviceName]) return res.status(400).send();
  res.redirect(`http://${ ADDRESSES[service] }/api/restaurants/${ id }/${ serviceName }`)
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:3000`)
});

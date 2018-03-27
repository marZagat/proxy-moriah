const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { SERVICES, createStaticPage } = require('./server-side-render');

const PAGE_TITLE = 'marZagat';

const app = express();
app.use(morgan('dev'));

app.get('/restaurants/:id', (req, res) => {
  const html = createStaticPage(SERVICES, PAGE_TITLE, req.params.id);
  res.send(html);
})

app.get('/', (req, res) => {
  const randomId = Math.floor(Math.random() * 10000000);
  res.redirect(`/restaurants/${randomId}`);
});

app.get('/api/restaurants/:id/:serviceName', ({ params: { id, serviceName } }, res) => {
  if (!services[serviceName]) return res.status(400).send();
  res.redirect(`http://${ ADDRESSES[service] }/api/restaurants/${ id }/${ serviceName }`)
});

app.listen(3000, () => {
  console.log(`server running at: http://localhost:3000`)
});

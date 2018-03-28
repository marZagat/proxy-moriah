const OVERVIEW_ADDRESS = process.env.OVERVIEW_ADDRESS || 'localhost';

// TODO: remove hardcoded addresses
module.exports = {
  // 'gallery': {
  //   address: 'http://localhost:3001/',
  // },
  'overview': {
    address: `http://${OVERVIEW_ADDRESS}:3002/`,
    reactComponentName: 'Overview',
    clientBundleName: 'app.client.js',
    serverBundleName: 'app.node.js',
  },
  // 'sidebar': {
  //   address: 'http://localhost:3003/',
  // },
  // 'recommendations': {
  //   address: 'http://localhost:3004/',
  // },
};

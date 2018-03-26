const React = require('react');
const ReactDom = require('react-dom/server');
const path = require('path');

// const Layout = require('./templates/layout');
// const App = require('./templates/app');
// const Scripts = require('./templates/scripts');
const SERVICES = require('./microservices/service-config');
const fetchBundleFiles = require('./microservices/service-loader');

// get bundle files for each service, load react components to services object
const clientBundlesFolder = path.resolve(__dirname, '../public/services');
const serverBundlesFolder = path.resolve(__dirname, '../templates/services');

const renderComponentToString = (reactComponent, props = {}) => {
  return ReactDom.renderToString(
    React.createElement(reactComponent, props)
  );
};

const getComponentStrings = (services, props = {}) => {
  const serviceNames = Object.keys(services);
  return serviceNames.map((serviceName) => {
    const { reactComponent } = services[serviceName];
    return renderComponentToString(reactComponent, props);
  });
};

const createStaticPage = (services, pageTitle, id) => {
  const componentStrings = getComponentStrings(services, { id });

  // return Layout(
  //   pageTitle,
  //   App(...componentStringsArr)
  // );
};

module.exports = createStaticPage;


const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');
const path = require('path');
const url = require('url');

const loadServiceReactComponent = (serviceCache, serviceFilePath) => {
  console.log(`caching React component '${serviceCache.reactComponentName}' from ${serviceFilePath}`);
  serviceCache.reactComponent = require(serviceFilePath).default;
};

const fetchFile = (fromAddress, fileName, toPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileUrl = url.resolve(fromAddress, fileName);
      const fileContents = await fetch(fileUrl);
      
      const destination = fs.createWriteStream(toPath);
      fileContents.body.pipe(destination);
      destination.on('close', () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

const fetchBundleFiles = async (clientToFolder, serverToFolder, services) => {
  try {
    const serviceNames = Object.keys(services);
  
    const fileFetchPromises = serviceNames.map(async (serviceName) => {
      const serviceCache = services[serviceName];
      const { address, clientBundleName, serverBundleName } = serviceCache;
      const clientToPath = path.resolve(clientToFolder, `${serviceName}.js`);
      const serverToPath = path.resolve(serverToFolder, `${serviceName}.node.js`);
      
      await Promise.all([
        fetchFile(address, clientBundleName, clientToPath),
        fetchFile(address, serverBundleName, serverToPath),
      ]);
      loadServiceReactComponent(serviceCache, serverToPath);
    });

    await Promise.all(fileFetchPromises);
    return Promise.resolve(services);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = fetchBundleFiles;

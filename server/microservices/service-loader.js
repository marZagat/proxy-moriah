const fs = require('fs-extra'); // promisified fs
const fetch = require('node-fetch');
const Promise = require('bluebird');
const path = require('path');
const url = require('url');

const loadServiceComponent = (serviceCacheObj, serviceFilePath) => {
  console.log(`loading service from ${serviceFilePath}`);
  serviceCacheObj.reactComponent = require(serviceFilePath).default;
};

const fetchFile = (fromAddress, fileName, toFolder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = url.resolve(fromAddress, fileName);
      const fileContents = await fetch(url);
      
      const outputFilePath = path.resolve(toFolder, fileName);
      const destination = fs.createWriteStream(outputFilePath);
      fileContents.body.pipe(destination);
      fileContents.body.on('close', () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

const fetchBundleFiles = (outputFolders, services, needToRequire) => {
  const serviceNames = Object.keys(services);

  serviceNames.forEach((serviceName) => {
    const service = services[serviceName];
    const { address, clientBundleName, serverBundleName } = service;

    await Promise.all([
      fetchBundleFile(address, clientBundleName, outputFolders.client),
      fetchBundleFile(address, serverBundleName, outputFolders.server),
    ]);
    loadServiceComponent(service, path.resolve(outputFolders.server, serverBundleName));
  });
};

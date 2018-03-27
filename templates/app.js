module.exports = (componentStrings) => `
  <div id="container">
    <div id="gallery-app"></div>
    <div id="middle">
      <div id="overview">${componentStrings['overview']}</div>
      <div id="sidebar-app"></div>
    </div>
    <div id="recommendations-app"></div>
  </div>
`;

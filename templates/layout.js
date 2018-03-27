module.exports = (pageTitle, bodyContents, scripts = '') => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="styles.css">
      <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
      <link href="https://fonts.googleapis.com/css?family=Raleway:400,700|Roboto:400,700" rel="stylesheet">
      <link rel="icon" href="http://res.cloudinary.com/madlicorice/image/upload/v1520448614/WeGot-favicon.ico" type="image/x-icon">
      <title>${pageTitle}</title>
    </head>
    <body>
      ${bodyContents}
      ${scripts}
    </body>
  </html>
`;

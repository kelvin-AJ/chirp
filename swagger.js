const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'chirp API',
    description: 'API for chirp'
  },
  host: 'chirp-w3e9.onrender.com',
  schemes: ['https','http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });

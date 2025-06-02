const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Chirp API",
    description: "Chirp is a lightweight social media platform where users can post short messages called 'chirps'. This API allows clients to create, read, update, and delete chirps, as well as manage likes and dislikes. Built with Express and MongoDB."
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

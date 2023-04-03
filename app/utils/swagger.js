
module.exports = {
  swaggerDefinition: {
    info: {
      description: 'Application to find sports partners',
      title: 'My Partner Outdoor',
      version: '1.0.0',
    },
    host: 'localhost:4000',
    basePath: '/',
    produces: [
      'application/json',
    ],
    schemes: ['http'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
    }
    },
    
  },
  basedir: __dirname, // app absolute path
  files: ['../routers/userRouter.js', '../routers/eventRouter.js'], // Path to the API handle folder
};

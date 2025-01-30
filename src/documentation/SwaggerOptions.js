const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Utilisateurs',
        version: '1.0.0',
        description: 'API pour gérer les utilisateurs et l\'authentification',
      },
      servers: [
        {
          url: 'http://localhost:8080',
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',  
          },
        },
      },
      security: [
        {
          BearerAuth: [], 
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  

export default swaggerOptions;
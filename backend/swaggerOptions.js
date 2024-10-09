// swaggerOptions.js
const swaggerOptions = {
  definition: {
    openapi: "3.1.0", // OpenAPI version
    info: {
      title: "SLIM MOM API",
      version: "1.0.0",
      description: "API Documentation for Slim Mom Website",
    },
    components: { // Add the components section here
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional: specify the bearer format (e.g., JWT)
        },
      },
    },
    servers: [
      {
        url: "http://localhost:5000", // Replace with your deployed URL if necessary
        description: "Development server",
      },
      {
        url: "https://slim-mom-fullstack.onrender.com", // Replace with your deployed URL if necessary
        description: "Production server on Render",
      },
    ],
  },
  apis: ["./routes/api/*.js"], // Specify the path to your API route files
};

export default swaggerOptions;
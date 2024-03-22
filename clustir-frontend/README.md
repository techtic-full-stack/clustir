# clustir-frontend Project

Welcome to the clustir-frontend project! This README will guide you through the setup process and provide instructions for running and building the project.

## Setup

1. Navigate to the project directory:

```bash
cd clustir-frontend
```

2. Configure Environment Variables

Before running the project, make sure to configure any necessary environment variables. Create a file named `.env` in the root of your project directory and add your environment-specific variables. For example:

```
API_URL=http://50.116.5.243:4001/api
```

Replace `API_URL` with the appropriate endpoint for your backend API.

## Installation

Next, install the project dependencies:

```bash
npm install
```

This command will install all the required dependencies listed in the `package.json` file.

## Development Server

To run the project in development mode, use the following command:

```bash
npm run dev
```

This will start the development server. You can access the project at [http://localhost:3000](http://localhost:3000) in your web browser. The server will automatically reload whenever you make changes to the source code.

## Production Build

To build the project for production deployment, use the following command:

```bash
npm run build
```

This command will create an optimized production build of your project. The output will be stored in the `.next` directory.

## Running the Production Build

After building the project, you can run it in production mode using the following command:

```bash
npm start
```

This will start the project in production mode. You can access the production build of your application at [http://localhost:3000](http://localhost:3000) in your web browser.



Contributions to this project are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.

Happy coding!
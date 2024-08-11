
# OasisCabs

## Description

Briefly describe what your project does and its purpose.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) or another database if applicable

## Getting Started

### Cloning the Repository

First, clone the repository to your local machine:

```bash
[git clone https://github.com/yourusername/your-repository.git](https://github.com/Vishal5051/OasisCabs.git)
cd your-repository
```

### Installing Dependencies

Navigate to the project directory and install the required Node.js packages:

```bash
npm install
```

### Configuration

Create a `.env` file in the root of your project directory and add the following environment variables:

```dotenv
PORT=your_port_number
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

Replace the placeholders with your actual database configuration details.

### Running the Application

To start the application, use the following command:

```bash
npm start
```

This will run the server on the port specified in the `.env` file.

### Running Tests (If Applicable)

If you have tests set up, you can run them using:

```bash
npm test
```

### Accessing the Application

Open your web browser and navigate to `http://localhost:your_port_number` to access the application.

## API Endpoints

Here are some of the key API endpoints available:

- `GET /`: Serves the homepage.
- `POST /driver-profile-save-data`: Saves driver profile data.
- `POST /passanger-profile-save-data`: Saves passenger profile data.
- `GET /fetch-car-records`: Fetches car records.
- `GET /find-city`: Retrieves distinct cities.
- `GET /find-cars`: Retrieves distinct car types.

For more details on each endpoint, refer to the code or documentation.

## Troubleshooting

If you encounter issues, ensure:

- Your `.env` file is correctly configured.
- The MySQL database is running and accessible.
- All dependencies are properly installed.

## Contributing

If you want to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

Specify the license under which the project is distributed.
### Contact

For any questions or issues, please contact [vkc335524@gmail.com](vkc335524@gmail.com).

This template covers most of the essential information others would need to get your project up and running. Adjust the content based on your specific project details and requirements.

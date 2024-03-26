# College eCommerce Group IV

This repository contains the database design and implementation for an eCommerce platform for a Technical and Vocational Education and Training (TVET) college in Machakos County, Kenya. The platform aims to provide an online presence and marketplace for the college's various entrepreneurial activities, including cafeterias, tuck shops, pharmacies, bookshops, and digital centers across its five locations.

## Project Background

The TVET college seeks to expand its entrepreneurial activities and establish an online presence through an eCommerce web application. This application will allow students, staff, and guests to access and purchase services and products offered by the college's various business ventures, such as cafeterias, tuck shops, pharmacies, bookshops, and digital centers.

## Database Design

The database system has been designed and implemented using PostgreSQL, with at least eight tables to capture the necessary data from the given scenario. The database has been normalized to ensure data integrity, and denormalization techniques have been applied where appropriate for performance optimization.

## Key Features

- **Indexing**: Appropriate indexing has been implemented to optimize query performance and enable efficient data retrieval for the web application.
- **Triggers and Procedures**: Triggers and stored procedures have been created to capture online transactions and perform necessary operations within the database.
- **API Integration**: Swagger has been used as the API integration platform, allowing for seamless integration between the database and the web application.
- **Web Dashboard**: A simple web page with a dashboard has been developed to showcase the functionality of the eCommerce platform and its integration with the database.

## Database Security

The report accompanying this repository discusses the database security considerations implemented using PostgreSQL. It covers topics such as access control, encryption, auditing, and other relevant security measures.

## Transactional Management

The report also addresses the transactional management requirements of the system, ensuring that the database architecture and design align with the business requirements of the TVET college.

## Installation and Usage Guide

Please note that the project is a work in progress and may not run as expected.

### Prerequisites

Before you begin, ensure that you have the following software installed on your machine:

- [Postgres](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/download/)

### Step 1: Clone the Repository and Install Dependencies.

- Open your command prompt and execute the following commands sequentially:

- Navigate to the desktop directory

```bash
cd Desktop
```

- Clone the repository

```bash
git clone https://github.com/BSCNRB595022/college-ecommerce-db-group-iv/
```

- Navigate to the cloned repository

```bash
cd college-ecommerce-db-group-iv
```

- Install the necessary packages using the following command. Note that [Node.js](https://nodejs.org/en/download/) is required for this step.

```bash
npm install bcrypt express jsonwebtoken pg swagger-ui-express swagger
```

### Step 2: Creating the Database by Following the instructions file.

- Refer to the [instructions provided in this link](https://github.com/BSCNRB595022/college-ecommerce-db-group-iv/blob/main/instructions/DB_CREATION.md) to create a database.

### Step 3: Start the Server and navigate to the webapp's dashboard

- Return to your command prompt and execute the following commands:
- Navigate to the repository folder

```bash
cd Desktop/college-ecommerce-db-group-iv
```

- Start the server

```bash
node WEB_APP_2/server
```

### Step 4: Access the Application

- Open your web browser and navigate to the link below to see the dashboard of the webapp

```
localhost:3000/
```

- The API documentation can be found at

```
localhost:3000/api-docs/
```

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

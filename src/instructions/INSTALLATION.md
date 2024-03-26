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

- Refer to the [instructions provided in this link](https://github.com/BSCNRB595022/college-ecommerce-db-group-iv/blob/main/src/instructions/DB_CREATION.md) to create a database.

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

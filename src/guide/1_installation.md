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
git clone https://github.com/BSCNRB595022/college-ecommerce-db-group-vi/
```

- Navigate to the cloned repository

```bash
cd college-ecommerce-db-group-vi
```

- Install the necessary packages using the following command. Note that [Node.js](https://nodejs.org/en/download/) is required for this step.

```bash
npm install bcrypt express jsonwebtoken pg swagger-ui-express swagger
```

- If you are on windows machine, open the server-config file found in this location: `college-ecommerce-db-group-vi/src/web/server-config.js`
- Update the password to match your PostgreSQL database password. You can leave the other fields set to their default values unless you have made modifications to them in PostgreSQL. If you have made changes, be sure to update them here accordingly.

- To quickly edit them through terminal (linux machines only), run this command:

```bash
nano src/web/server-config.js
```

- Edit the file accordingly and then click `ctrl + x`, then `y` to save.

```js
user: 'postgres',
host: 'localhost',
database: 'tvet_college',
password: '38877',
options: '-c search_path=tvet_college_ecommerce'
```

### Step 2: Creating the Database by Following the instructions file.

- Refer to the [instructions provided in this link](https://github.com/BSCNRB595022/college-ecommerce-db-group-vi/blob/main/src/guide/2_db_creation.md) to create a database.

### Step 3: Start the Server and navigate to the webapp's dashboard

- Open a new command prompt and execute the following commands:
- Navigate to the repository folder

```bash
cd Desktop/college-ecommerce-db-group-vi
```

- Start the server

```bash
node src/web/server
```

### Step 4: Access the Application

- Open your web browser and navigate to the link below to see the dashboard of the webapp

```
localhost:3000/login/
localhost:3000/register/
```

- This will allow you to access the user dashboard,
- To access the admin dashboard, go to step 5

### Step 5: Create an Admin account

- To create an admin account, First navigate to the folder you download/cloned:

```bash
cd Desktop/college-ecommerce-db-group-vi
```

- Next, navigate to the `src/web/` folder

```bash
cd src/web
```

- Next paste the command below, make sure to change email and password to your preferred credentials

```bash
node create_admin_account.js "example_name" "example@email.com" "example_password" "admin"
```

- Now, if you login using the above credentials to this url, you will be presented with admin dashboard

```
localhost:3000/login/
```

- The api is Documented here

```
localhost:3000/api-docs/
```

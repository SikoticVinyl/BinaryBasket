# BinaryBasket

This project focuses on building the back end for an e-commerce website using the latest technologies.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Video Walkthrough](#video-walkthrough)
- [Contributing](#contributing)
- [License](#license)

## Description

This Express.js API, configured to use Sequelize to interact with a MySQL database, serves as the back end for an internet retail company. It facilitates functionalities like managing categories, products, and tags, essential for an e-commerce platform.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>```
2. Install dependencies:
   ```bash
   npm install ```
3. Setup Enviornment Variables:
Create an '.env' file and add the following:
```bash
    DB_NAME=your_database_name
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
```
4. Create the Database:
Using MySQL shell commands like so - 
   ```bash
   mysql -u you_username -p
   SOURCE db/schema.sql
   ```

## Usage

You can watch how the app works and is used here:  https://www.youtube.com/watch?v=lHCAMoGj0Yw

First you will want to seed the database with test data
```bash npm run seed```
Then start the application
```bash npm start```
Then you can use Insomnia Core or similar tools to test the API routes for categories, products, and tags.

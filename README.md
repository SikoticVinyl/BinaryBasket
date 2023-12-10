# BinaryBasket

This project focuses on building the back end for an e-commerce website using the latest technologies.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)

## Description

This Express.js API, configured to use Sequelize to interact with a MySQL database, serves as the back end for an internet retail company. It facilitates functionalities like managing categories, products, and tags, essential for an e-commerce platform.

I learned a lot about routes through this project, but I think the biggest thing that stuck with me was the process to seed the database. I was able to get this coded out pretty quickly and understood real well what I was doing however when it was finished I took a break. I recorded the video later on, and it took a few times for me to remember that I had to properly seed my database and I struggled to figure out why the code was no longer working when I had not made changes to it. 

I have learned a lot about making sure MySQL is properly running in services due to this. 

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

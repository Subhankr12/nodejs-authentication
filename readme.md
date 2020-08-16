# Login Auth using PassportJS

> A starter code for creating any new application.

## Technologies Used

1.  Nodejs
2.  Express
3.  EJS view engine
4.  MongoDB for database
5.  Passport JS

## Prerequisites

- MongoDB
- Node.js 10+
- Command Line Tools
- Visual Studio Code

## Installation

##### # Get the latest snapshot

`git clone https://github.com/Subhankr12/nodejs-authentication.git myproject`

##### # Change directory

`cd myproject`

##### # Install NPM dependencies

`npm install`

##### # Then simply start your app

`npm start`

#### # The Server should run at: http://localhost:5500/

## Folder Structure

app <br>
├── assets <br>
│ --- └── css <br>
│ -------- └── layout.css <br>
├── config <br>
│ --- ├── middleware.js <br>
│ --- ├── mongoose.js <br>
│ --- ├── passport-google-strategy.js <br>
│ --- └── passport-local-strategy.js <br>
├── controllers <br>
│ --- ├── home_controller.js <br>
│ --- └── users_controller.js <br>
├── models <br>
│ --- └── user.js <br>
├── routes <br>
│ --- ├── api <br>
│ ----├── └── users.js <br>
│ --- └── index.js <br>
├── views <br>
│ --- ├── \_footer.ejs <br>
│ --- ├── \_header.ejs <br>
│ --- ├── home.ejs <br>
│ --- ├── layout.ejs <br>
│ --- ├── login_page.ejs <br>
│ --- ├── register_page.ejs <br>
│ --- └── reset_password.ejs <br>
├── server.js <br>
├── package.json <br>
├── package-lock.json <br>
└── readme.md <br>

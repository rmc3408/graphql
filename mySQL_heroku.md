# Deploy MySQL and ClearDB to Heroku

## Overview
Summary setup configurations for deploying a Node app to Heroku when using SQL and Redis
* **Option 1:** deploying with MySQL database using ClearDB
https://github.com/howardmann/Tutorials/edit/master/node_deploy_heroku.md

This tutorial will deploy the app we developed in earlier Node sections to Heroku.


### 1. Setup Heroku
* Create a new or cd into existing app directory. From within your root node app folder create your heroku app. Run command in terminal:
```
heroku create howie-node
```

* Create a new file named ```Procfile``` with no extension in your root directory and write the following command to start our node app (note that we called our server file server.js):
```
web: node server.js
```

* In the package.json file add an engine property specifying the current version of node we are using:
```javascript
// package.json
{
  "name": "6-express-hbs",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node server",
    "dev": "nodemon server",
    "bootstrap": "knex migrate:latest && knex seed:run"
  },
  "engines": {
    "node": "6.7.0"
  },
  "dependencies": {
    ...
  }
}
```

* Push to heroku and open the app (terminal command below). Note: the database and Redis will still not work and we will configure this next
```
git push heroku master
heroku open
```

### 2. Configure MySQL
Heroku by default prefers to work with Postgresl databases and not MySQL. However there is a workaround if we choose to use MySQL.

We will need to install a Heroku addon provided by ClearDB which will host our MySQL database.

The steps involved are as follows:

1. Install the addon in Heroku cli and save details of the host, username, password and database name

```
heroku addons:create cleardb:ignite
```

Retrieve your database URL by issuing the following command:
```
heroku config | grep CLEARDB_DATABASE_URL
-----> CLEARDB_DATABASE_URL: mysql://bc6fa5bdca11f5:e6d9f10f@us-cdbr-iron-east-04.cleardb.net/heroku_6ed701c24f9e605?reconnect=true

host: us-cdbr-iron-east-04.cleardb.net
username: bc6fa5bdca11f5
password: e6d9f10f
database: heroku_6ed701c24f9e605
```

2. Go into our app and in our knex file change our production mysql database details to the details in the CLEARDB_DATABASE_URL above

```javascript
// knexfile.js
// Used for database automation
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      database: "auth"
    }
  },
  production: {
    client: "mysql",
    connection: {
      host: "us-cdbr-iron-east-04.cleardb.net",
      user: "bc6fa5bdca11f5",
      password: "e6d9f10f",
      database: "heroku_6ed701c24f9e605"
    }
  }
}
```

3. Commit and push changes to heroku. Then run our bootstrap strip to migrate and seed the database
```
git add.
git commit -m "added cleardb"
git push heroku master

heroku run npm run bootstrap
```

* Note: To check that the database connection worked with cleardb we can pass in the CLEARDB_DATABASE_URL details into our SequelPro GUI desktop to check our database

### 3. Create our CLEARDB 

To create your ClearDB database, simply type the following Heroku command: 
```
heroku addons:add cleardb:ignite --app my_app_name
```
replacing **"my_app_name"** with the name of your Heroku application. 
This will automatically provision your new ClearDB database for you and will return the database URLs to access it. You can also browse the Add-On catalog for ClearDB and simply click "Add" on the ClearDB Heroku Add-On to auto-provision your database for you.


### 4. Create our migration files

1. For database migrations we will rely on the knex library to create our database schema. Generate the migration if not already done so: ```knex migrate:make users```. Then inside the file write the following code to create the table, refer to official knex docs for syntax to create schema

```javascript
// migrations/timestamp_users.js
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('email');
    table.string('password');
    table.string('name');
    table.string('oauth_provider');
    table.string('oauth_id');
    table.boolean('is_admin').defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
```

Seed files remain unchanged from our MySQL example:
```javascript
// seeds/1-users.js
var bcrypt = require('bcrypt-nodejs');

var pass = bcrypt.hashSync("chicken");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return Promise.all([
      // Inserts seed entries
      knex('users').insert({email: 'howie@ga.co', password: pass, name: 'Howie Mann', is_admin: true}),
      knex('users').insert({email: 'hela@ga.co', password: pass, name: 'Hela Mann'}),
      knex('users').insert({email: 'felix@ga.co', password: pass, name: 'Felix Mann'})
    ]);
};
```

### 5. Updating our migration files to database
Upgrading your ClearDB database to a larger plan is as easy as running the following command:

```
heroku addons:upgrade cleardb:punch
Upgrading cleardb:punch to myapp... done.
```


### Bonus: how to seed data associations:
```javascript 
exports.seed = function(knex, Promise) {
  // Initial seed data
  var topics = [
    {name: 'geography'},
    {name: 'movies'},
    {name: 'celebrity'}
  ];

  var questions = [
    {question: 'What is the capital of Poland?', answer: 'Warsaw', topic_id: knex('topics').where({name: 'geography'}).select('id')},
    {question: 'Who won the 2015 oscar for best actor', answer: 'James Bond', topic_id: knex('topics').where({name: 'movies'}).select('id')},
    {question: 'Which famouse celebrity was burgled in Paris', answer: 'Kim Kardashain', topic_id: knex('topics').where({name: 'celebrity'}).select('id')}
  ];

  // Deletes ALL existing entries
  return Promise.join(
    knex('questions').del(),
    knex('topics').del(),

    knex('topics').insert(topics, 'id'),
    knex('questions').insert(questions, 'id')
  )
};
```

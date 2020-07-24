# Deno.js REST API
<img alt="Deno.js Logo" src="./img/deno-logo.png" width="200" height="200" />

This is a simple REST API developed by me using [deno.js](https://deno.land/). It offers a CRUD for a simple 'users' MongoDB database.

In order to run the app, from the root directory run the following command:

```
deno run --allow-net --allow-write --allow-read --allow-plugin --unstable src/app.ts
```

The routes are handled by the [oak](https://deno.land/x/oak) lib and the password encryption is done with the [BCrypt](https://deno.land/x/bcrypt) lib.

# Frontend
It has no frontend for interaction with the API, but I did create a login page with VUE.js that use the '/login/' endpoint for authentication. This frontend repo can be found [here](https://github.com/mtrissi/vue-login-page-for-denojs-app).

# Requests
Description of the possible requests.

### Get all users
A GET request to the '/users/' endpoint will bring an array of JSON's with the data of all users.

### Get a user by ID
A GET request to the '/users/' endpoint followed by the ID of the user. Ex.: GET request to localhost:4000/users/5f1aebdb00aea72200f9290a will bring a JSON with my data.

```JSON
{
    "_id": {
        "$oid": "5f1aebdb00aea72200f9290a"
    },
    "name": "Mateus",
    "email": "mtrissi@gmail.com",
    "password": "$2a$10$Dy32BFYa07jtgdoDIGAQQOtNxrIjgE94fx56HFDseYbOR69bg7f6e"
}
```

### Store a user
A POST request to the endpoint '/users/' with a JSON body with the fields: name, email and password. If the request work, the response will bring the ID of the newly created user.

### Update a user
A PATCH request to the endpoint '/users/', followed by the ID of the user, with a JSON body with, at least, one of the fields: name, email and password.

### Remove a user
A DELETE request to the endpoint '/users/', followed by the ID of the user.

### Login
A POST request to the '/login/' endpoint with a JSON body with the fields: email and password. If there is a user that matches these fields, the response body will bring a token that will expire in 15 minutes.

# Node API for HackerBay

A simple stateless microservice in Nodejs to demonstrate jwt, json patching and thumbnail generation.

## Getting Started
Please follow the guidelines below to set up a copy of this project locally on your machine for development and testing purposes. 

### First steps

Your can get a copy of this project by using the;
* git clone command, or the download zip alternative provided on github

Using the terminal, move into the root folder of this project and then run

```
npm install

```
to install required dependencies.

### Furthermore
A secret variable is required for the token generation at login. Therefore, on your project directory:
* Create an env file
* Inside .env file, type the following : 

```
SECRET="<secret>"
```
*N/B: The secret variable can be any text of your choice*

### Testing
To start the API server run

```
npm start
```
You can then start making requests via postman.

To test the application on your local machine, run

```
npm test
```

To test the application with code-coverage, run

```
npm test-with-coverage
```

A code coverage report will be seen on your console.

## API Endpoints

### Login
* Request Method: POST
* URL: https://localhost:5000/api/login

Request body should contain username and password; the API will return a token for the user which will be used for future requests to the server.
* Sample Request: {
                    "username": "Any name",
                    "password": "Any password"
                }
* Sample Response: {
                    "success": true,
                    "user": "Your username",
                    "token": "The generate web token"   
                }
* Note: Any username/password combination is accepted, since this it just a mock authentication service*

### JSON Patch
* Request Method: PATCH
* URL: http://localhost:5000/api/jsonpatcher?token=token=your_generated_web_token_at_login

This endpoint accepts two parameters (document and patch) which are JSON objects.
* Sample Request: {
                    "document": {
                            "baz": "qux", 
                            "foo": "bar"
                        },
                    "patch": [
                            {
                                "op": "replace", 
                                "path": "/baz", 
                                "value": "julius"
                            }
                        ]
                }
* Sample Response: {
                    "success": true,
                    "data": {
                        "baz": "julius",
                        "foo": "bar"
                    }
                }
* Note: Set token equals the token received at login

### Thumbnail Generation
* Request Method: GET
* URL: https://localhost:5000/api/generatethumbnail?token=your_generated_web_token_at_login&image=imagepath

This endpoint accepts an image url, generates a 50x50 thumbnail image and returns it to the user.

* Sample Request: https://localhost:5000/api/generatethumbnail?token=token=your_generated_web_token_at_login&image=imagepath
* Sample Response: A 50x50 thumbnail image
* Note:  Set token equals the token received at login and image equals to the url/path of the image 

## Modules used

* [mocha](http://mochajs.org) - For automated tests.
* [Istanbul](https://www.istanbul.js.org) - For test coverage.
* [jsonwebtoken](https://www.npmjs.com/package/mysql2) - Token generation and verification.
* [node-thumbnail](https://www.npmjs.com/package/node-thumbnail) - Fast thumbnail generation in Node.
* [should](https://www.npmjs.com/package/should) - Expressive assertion library.
* [supertest](https://www.npmjs.com/package/supertest) - For High level HTTP tests.

## Author

* **Okeke Chekwube Julius** - [Cheks](https://github.com/chekwube)

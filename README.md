# Restful WebAPI for Private Blockchain

RESTful API using a Node.js HAPI framework that interfaces with a private blockchain. 
Functionality that can be consumed by several types of web clients ranging from desktop, mobile, and IoT devices for a private blockchain. 

The API project exposes two endpoints:

GET block 
POST block

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

1. NodeJS - You should have Nodejs v10.13.0 or higher installed
2. NPM - npm version 6.4.1 or higher is recommended


### Installing

A step by step series of examples that tell you how to get a development env running

- Clone this project to your workstation
- Run npm install

## Running the tests

Start the server using the following command
    ``` node app.js
    You should see a message that states  "Server running at: http://localhost:8000"

    The server support 2 endpoints

    #1  - POST method to http://localhost:8000/block  - this is used to add new blocks to the blockchain - here is a postman example
        POST /api/block HTTP/1.1
        Host: localhost:8000
        Content-Type: application/json
        Cache-Control: no-cache
        Postman-Token: 008c6496-aa5b-415b-854e-a568e0589877

        {
            "data":"Block of Data"
        } 
    #2  - Get method to http://localhost:8000/block/{height} - this is used to retrieve a block from the blockchain give a height - there is a postman example
        GET /api/block/0 HTTP/1.1
        Host: localhost:8000
        Content-type: application/json
        Cache-Control: no-cache
        Postman-Token: 008c6496-aa5b-415b-854e-a568e0589877




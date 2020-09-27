# OraanBackend

# Token Based Authentication
Token based authentication is implemented. The Code is pushed into new branch Alpha. 
User does not have to provide userId anymore, User when logging in will recieve a token.
User will use that token to create installments and get savings.

# Token Usage
use 'x-auth-token' in Headers and pass the token in the value.


You can download the project by cloning the Git Repository.

After Cloning the repo, run the following commands.

1. npm install (To install all the packages)
2. npm run server (To run the node.js server)

# API Information
1. /api/user (To Create User)
2. /api/installment (To Create Installment)
3. /api/installment/user (To Get Total Savings)
4. /api/auth (Login)

# Postman Collection
https://www.getpostman.com/collections/d9bc2a28dfa881b59847

Import this URL for Postman API'S
Updated with Token Based Auth


# Mongo URI

mongodb+srv://vinay:vinay.123@nodedb.3q5kx.mongodb.net/NodeDB?retryWrites=true&w=majority

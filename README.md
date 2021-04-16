# Backend Test

Backend Proficiency Test

# Steps to run

1. clone repository
2. run "npm -i"
3. ng serve

# User Sign Up

http://localhost:5252/createuser

Method: POST
Variables: firstName, lastName ,email, password , role (admin, user)

# User Sign in

http://localhost:5252/login

Method: POST
Variables: email, password

# Change user name (First or Last)

http://localhost:5252/userUpdate

Method: POST
Variables: firstName or LastName, header token for authentication

# Add Customer Support Ticket

http://localhost:5252/userUpdate

Method: POST
Variables: message, header token

# Get Customer Support Ticket

http://localhost:5252/getTickets

Method: GET
Variables: check role, header token

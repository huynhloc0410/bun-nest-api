# Bun & Nest.js API

# Install 
`curl -fsSL https://bun.sh/install | bash`

# Check if Bun is installed:
`bun -v`

# Install Dependencies
`bun install`

# Run the API
`bun run start`

### Endpoints
# GET `/calls?type=<callType>`
* Example:
`curl -X GET "http://localhost:3000/calls?type=appointment"`
* Response:
{"type":"appointment","response":{"time":"9:00 AM","location":"Phoenix"}}

* Example:
  `curl -X GET "http://localhost:3000/calls?type=support"`
* Response:
{"type":"support","response":{"technician":[{"id":"1","name":"ba"},{"id":"2","name":"json"}],"duration":"10 minutes","type":"order"}}

# POST `/calls`
* Example:
  `curl -X POST "http://localhost:3000/calls" \
     -H "Content-Type: application/json" \
     -d '{"message": "Can you remind me about my appointment?", "callType": "reminder"}'`
* Response:
  {"clientMessage":"Can you remind me about my appointment?","response":"You have appointment at 9:00 AM"}

########### Update February 9 2025
# Create a simple Analytics service
## Test login tracking
#### This test will create a new Date() to track login time
`curl -X POST "http://localhost:3000/analytics/login/Ba3"`
#### Response:
`{"userId":"Ba3","status":"Login recorded"}%`
#### If userId already login, response will be:
`{"userId":"Ba3","status":"User is already logged in"}%`

## Test logout tracking
#### This test will create a new Date() to track login time
`curl -X POST "http://localhost:3000/analytics/logout/Ba3"`
#### Response:
`{"userId":"Ba3","status":"Logout recorded"}%`

## Test daily login
#### This test will count how many users login today
`curl -X GET "http://localhost:3000/analytics/logins/daily"`
## Test monthly login
#### This test will count how many users login this month
`curl -X GET "http://localhost:3000/analytics/logins/daily"`

## Test yearly login
#### This test will count how many users login this year
`curl -X GET "http://localhost:3000/analytics/logins/daily"`

## Test duration of all users.
#### It will return shortest time, longest time, and average time of all users in database
`curl -X GET "http://localhost:3000/analytics/sessions/duration"`




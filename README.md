# Bun & Nest.js API

# Install 
curl -fsSL https://bun.sh/install | bash

# Check if Bun is installed:
bun -v

# Install Dependencies
bun install

# Run the API
bun run start

### Endpoints
# GET `/calls?type=<callType>`
* Example:
curl -X GET "http://localhost:3000/calls?type=appointment"
* Response:
{"type":"appointment","response":{"time":"9:00 AM","location":"Phoenix"}}

* Example:
  curl -X GET "http://localhost:3000/calls?type=support"    
* Response:
{"type":"support","response":{"technician":[{"id":"1","name":"ba"},{"id":"2","name":"json"}],"duration":"10 minutes","type":"order"}}

# POST `/calls`
* Example:
  curl -X POST "http://localhost:3000/calls" \
     -H "Content-Type: application/json" \
     -d '{"message": "Can you remind me about my appointment?", "callType": "reminder"}'
* Response:
  {"clientMessage":"Can you remind me about my appointment?","response":"You have appointment at 9:00 AM"}




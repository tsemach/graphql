## Examples of GraphQL 

> Before Running Any Example do:

1. **cd server**
2. **npm instal**

### Hello World Example using graphql package
  
#### run
* node src/helloworld/server.js

#### You should get:
````json
{ data: { hello: 'Hello world!' } }
````

### Example Using Express

#### run
* src/express/server.js

#### On the command line run:
````bash
curl -d '{"query": "{ hello }"}' -H "Content-Type: application/json" -X POST http://localhost:4000/graphql
````

#### You should get
````json
{"data":{"hello":"Hello world!"}}
````

#### Also you can open the development console in the browser and run:
````javascript
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: "{ hello }"})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
````

### Roll Dice Example: Passing Aurguments

#### run
````bash
node src/rolldice/rolldice.js
````

#### On commandline run:
````bash
curl -d '{"query": "{ rollDice(numDice: 3, numSides: 6) }"}' -H "Content-Type: application/json" -X POST http://localhost:4000/graphql
````

#### Or from browser development console
````javascript
var dice = 3;
var sides = 6;
var query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
````

#### You should get:
````json
{
  "data": {
    "rollDice": [
      2,
      2,
      6
    ]
  }
}
````

### Basic Types Example

#### run
````bash
node src/basictypes/basictypes.js 
````

#### On command line run
````bash
curl -d '{"query": "{ quoteOfTheDay, random, reeDice }"}' -H "Content-Type: application/json" -X POST http://localhost:4000/graphql
````

#### You should get something similar to this
````json
{"data":{"quoteOfTheDay":"Salvation lies within","random":0.8571880103002791,"rollThreeDice":[1,4,6]}}
````
### Use Object Type Example

#### run
````bash
node src/objecttype/objecttype.js
````

#### Use the query:
````json
{
  getDie(numSides: 6) {
    rollOnce
    roll(numRolls: 3)
  }
}
````

#### On commandline run
````bash
curl -d '{"query": "{ getDie(numSides: 6) { rollOnce roll(numRolls: 3) } }"}' -H "Content-Type: application/json" -X POST http://localhost:4000/graphql
````
#### You should get something like this:
````json
{
  "data": {
    "getDie": {
      "rollOnce": 1,
      "roll": [
        3,
        6,
        6
      ]
    }
  }
}
````

### Mutation with Input Type Example

#### run
````bash
node src/objecttype/objecttype.js
````
#### Use the mutation request:
````json
mutation {
  createMessage(input: {
    author: "andy",
    content: "hope is a good thing",
  }) {
    id
  }
}
````

#### Or on the browser development console run:
````javascript
var author = 'andy';
var content = 'hope is a good thing';
var query = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: {
      input: {
        author,
        content,
      }
    }
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));

````

#### You should get:
````json
{
  "data": {
    "createMessage": {
      "id": "5c365b6f43e91677ef8d"
    }
  }
}
````

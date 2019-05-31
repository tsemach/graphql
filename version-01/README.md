### This version include pure graphql using express-graphql (server side only).

using the query http://localhost:4000/grapql
````
{
  book(id: "1") {
    name
    genre
    id
  }
}
{
  book(id: "2") {
    name
    genre
    id
    author {
      name
    }
  }
}
{
  author(id: 1) {
    name
    age
  }
}
{
	books {
		name
	}
}
{
	authors {
		name
	}
}
````


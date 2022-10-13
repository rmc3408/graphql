// IIFE - This is just to user snippets on chrome and
// make sure we won't have an error like:
// Uncaught SyntaxError: Identifier 'createPost' 

import fetch from 'node-fetch';

// has already been declared
(async () => {
  console.clear(); 

  const execPost = async (variables) => {
    const graphQLUrl = "http://localhost:4000/";
    const query = `
          mutation CREATE_POST(
            $title: String!
            $body: String!
            $userId: String!
          ) {
            createPost(
              data: {
                title: $title
                body: $body
                userId: $userId
              }
            ) {
              id
              title
              body
              user {
                firstName
              }
              indexRef
              createdAt
            }
          }
      `;
    const response1 = await fetch(graphQLUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const newPost1 = await response1.json();
    return newPost1;
  };

  const result1 = await execPost({
    title: "title 1",
    body: "body 1",
    userId: "602",
  });

  console.log(result1);
})();

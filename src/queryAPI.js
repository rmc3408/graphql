// IIFE - This is just to user snippets on chrome and
// make sure we won't have an error like:
// Uncaught SyntaxError: Identifier 'createPost' 
// has already been declared
(async () => {
  console.clear();

  const createPost = async (variables) => {
    const graphQLUrl = "http://localhost:4003/";
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

  const post1 = await createPost({
    title: "title 1",
    body: "body 1",
    userId: "602",
  });

  const post2 = await createPost({
    title: "title 2",
    body: "body 2",
    userId: "",
  });

  console.log(post1);
  console.log(post2);
})();

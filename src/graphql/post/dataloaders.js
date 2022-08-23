import DataLoader from "dataloader";

export const postDataLoader = (getPosts) => new DataLoader(async (ids) => {

  const urlQuery = ids.join('&userId='); // [1,2] => 1&id=2
  const data = await getPosts('/?userId=' + urlQuery);

  const mappedUserIDS = ids.map((id)=> {
    const matchedPost = data.filter(post => post.userId === id)
    return matchedPost;
  })
  console.log(urlQuery)
  return mappedUserIDS;
});
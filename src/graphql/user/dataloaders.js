import DataLoader from "dataloader";

export const userDataLoader = (getUsers) => new DataLoader(async (ids) => {

  const urlQuery = ids.join('&id='); // [1,2] => 1&id=2
  const response = await getUsers('/?id=' + urlQuery);
  const data = await response.json();

  const mappedIDS = ids.map((id)=> {
    const matchedID = data.find(user => user.id === id)
    return matchedID;
  })
  return mappedIDS;
});
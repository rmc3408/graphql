import { AuthenticationError, ValidationError } from "apollo-server";
import { FetchError } from "node-fetch";

export const creatingPostFunction = async (values, dataSource) => {
  const postInfo = await createPostInfo(values, dataSource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError('You have to send title, body and userId');
  }

  return await dataSource.post('', { ...postInfo });
};


const userExists = async (userId, dataSource) => {
  try {
    await dataSource.context.dataSources.userApi.get(userId);
  } catch (e) {
    throw new ValidationError(`User ${userId} does not exist`);
  }
};


const createPostInfo = async (values, dataSource) => {
  const { title, body, userId } = values;

  await userExists(userId, dataSource);

  const indexRefPost = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};


export const updatingPostFunction = async (id, values, dataSource) => {
  //GET CACHE
  //const foundPost = await dataSource.getPost(id); GET CACHE 
  
  if (!id) throw new ValidationError('Missing post Id');
  values['userId'] = await findPostOwner(id, dataSource);
  
  if (values?.userId) await userExists(values.userId, dataSource)

  if (typeof values.title !== 'undefined' || typeof values.body !== 'undefined') {
    if (values.title === '' || values.body === '') {
      throw new ValidationError('Not accept empty in title or Body')
    }
  }

  return await dataSource.patch(id, { ...values });
};

export const deletingPostFunction = async (id, dataSource) => {
  if (!id) throw new ValidationError('Missing post Id');


  const result = await dataSource.delete(id);
  return !!result;
};

async function findPostOwner(postId, dataSource) {
  const foundPost = await dataSource.get(postId, undefined, { cacheOptions: { ttl: 0 }});
  
  if (!foundPost) throw new FetchError('Could not find the post');
  if (foundPost.userId !== dataSource.context.loggedUserID) throw new AuthenticationError('Cannot update from others users');
  
  return foundPost.userId;
}
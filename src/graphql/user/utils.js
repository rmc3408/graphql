export const getUsers = (fetch) => (path = "") => fetch(process.env.USERS_URL + path)
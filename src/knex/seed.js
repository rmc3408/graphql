const { knex } = require('./index');
const data = require('../../db.json');
const { convertISOtoSQL } = require('./dateISO');

const transformedCommentDB = data.comments.map(data => {
  const { comment, userId, postId, createdAt } = data
  return {
    comment: comment,
    user_id: userId,
    post_id: postId,
    created_at: convertISOtoSQL(createdAt)
  }
})
//console.log(transformedCommentDB[0])

// const select = knex.from('comments').limit(1);
// console.log(select.toString())
// select
// .then(data => console.log(data))
// .catch(e => console.log(e.message))
// .finally(()=> knex.destroy());

const insert = knex.into('comments').insert(transformedCommentDB);
console.log(insert.toString())
insert
.then(data => console.log(data))
.catch(e => console.log(e.message))
.finally(()=> knex.destroy());


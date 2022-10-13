import { KnexDatasource } from "../../datasources/sql/sql-datasource";
import { pubSub } from "./resolvers";

export class CommentSQLDataSource extends KnexDatasource {

  restoreDateFromDB(commentRawDB) {
    return {
      id: commentRawDB.id,
      createdAt: new Date(commentRawDB.created_at).toISOString(),
      ...commentRawDB,
    }
  }

  async getAll() {
    return this.db.from('comments');
  }

  async getOne(id) {
    const query = this.db.from('comments').where({ id: id });
    return query;
  }

  async getCommentbyPostId(id) {
    const query = this.db.from('comments').where({ post_id: id });
    const result = await query;
    // need to convert some data.
    const newresult = result.map(com => {
      return {
        id: com.id,
        comment: com.comment,
        user_id: com.user_id,
        createdAt: new Date(com.created_at).toISOString(),
      }
    })
    return newresult;
  }

  async batchCallback(ids) {
    const query = this.db.from('comments').whereIn('post_id', ids);
    const comments = await query;
    const filteredComments = ids.map(postID => {
      return comments.filter(com => String(com.post_id) == String(postID)).map(commment => {
        return {
          id: commment.id,
          comment: commment.comment,
          userId: commment.user_id,
          createdAt: new Date(commment.created_at).toISOString(),
        }
      })
    })
    return filteredComments;
  }

  async createCommentFunction({ userId, postId, comment, postOwner = null }) {
    let partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    };

    const exists = await this.db.from('comments').where({ user_id: userId, comment }).cache(1);
    
    if (exists.length > 0) {
      //console.log('Existing in DB in position=', exists[0])
      partialComment = {
        id: exists[0].id,
        createdAt: exists[0].created_at,
        ...partialComment
      }
      pubSub.publish('ON_EXIST', {
        onCreatedComment: partialComment,
        postOwner: false
      })
      return partialComment;
      //throw new ValidationError('Comment already created');
    }

    const created = await this.db('comments').insert(partialComment);
    //console.log('Created in DB in position=', created)
    const commentReturned = {
      id: created[0],
      createdAt: new Date().toISOString(),
      ...partialComment,
      
    };

    pubSub.publish('ON_CREATED', {
      onCreatedComment: commentReturned,
      postOwner: true
    })
    return commentReturned;
  }

}
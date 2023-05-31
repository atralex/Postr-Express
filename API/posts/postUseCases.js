const Post = require('./post.model');
const db = require('../dbConnection/dbUseCases');

const postUseCase = {
    addPost: async (username, content) => {
        return await db.addPost(username, content);
    },

    getPostByUsername: async (username) => {
        let posts = []
        let rawPosts = await db.getPostByUsername(username)
        console.log(rawPosts)
        rawPosts.map((rawPost)=> {
            let post = new Post(rawPost.id, rawPost.user_id, rawPost.content);
            posts.push(post);
        })
        return posts;
    }
}

module.exports = postUseCase;
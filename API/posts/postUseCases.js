import Post from "./post.model";
export const postUseCase = {
    addPost: async (username, content) => {
        return await db.addPost(username, content);
    },

    getPostByUsername: async (username) => {
        let posts = []
        let rawPosts = db.getPostByUsername(username)
        rawPosts.map((rawPost)=> {
            let post = Post(rawPost[0], rawPost[1], rawPost[2]);
            posts.push(post);
        })
    }
}
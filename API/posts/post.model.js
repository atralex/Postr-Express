class Post {
    id;
    userId;
    content;
    constructor(id, userId, content) {
        this.setId(id);
        this.setUserId(userId);
        this.setContent(content);
    }

    setId(id){
        this.id = id;
    }
    setUserId(userId) {
        this.userId = userId
    }

    setContent(content) {
        this.content = content
    }

    getUserId(){
        return this.userId;
    }
    getContent(){
        return this.content;
    }
    getId(){
        return this.id;
    }

    getPost(){
        return {
            userId: this.getUserId(),
            content: this.getContent()
        }
    }
}

export default Post;
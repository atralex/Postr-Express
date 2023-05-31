var express = require('express');
var router = express.Router();
const daoPost = require('../API/posts/postUseCases');

router.get('/:username', async function (req, res) {
    let posts = await daoPost.getPostByUsername(req.params.username);
    res.send(posts);
})

router.post('/', async function (req, res) {
    const {username, content} = req.body;
    let newPost = await daoPost.addPost(username, content);
    res.send(newPost);
});

module.exports = router;
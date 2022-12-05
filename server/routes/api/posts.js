const express = require('express'); 
const mongodb = require('mongodb');
const router = express.Router();

//Get Posts
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection(); 
    //res.send('hello'); 
    res.send(await posts.find({}).toArray()); 

}); 

//Add posts
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text:req.body.text,
        createdAt: new Date() 
    }) ; 
    res.status(201).send(); 
}); 

//Delete posts 

router.delete('/:id', async(req, res) =>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send(); 

});
async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://abc123:Soccerqueen*14@cluster0.dobdnta.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true
}); 
return client.db('Cluster0').collection('posts'); 
}
module.exports = router; 
const Post = require("../models/postModel")
const asyncHandler = require("express-async-handler")
const Category = require("../models/postCategoryModel")



const getposts = asyncHandler(async(req,res)=>{

    const categoryID = req.params.categoryID

    const posts = await Post.find({category: categoryID})

    if(posts == 0){
        res.status(400)
        throw new Error(`no post found`)
    }

    res.status(200).json(posts)

})
const getpost = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const post = await Post.findById(id)

    if(!post){
        res.status(400)
        throw new Error(`no post found from ID ${id}`)
    }

    res.status(200).json(post)
})
const addpost = asyncHandler(async(req,res)=>{
    const { title, categoryID,description,content } = req.body
    
    const document = req.file
    console.log(document,title, categoryID,description,content)

    if (!document || !title || !description) {
        //res.status(400).json({ message: 'Fill all data' })
        res.status(400)
        throw new Error("Fill all data")
    }

    const documentExist = await Post.findOne({ documentName: document.filename })

    if (documentExist) {
        //res.status(400).json({ message: 'document Already Exist' })
        res.status(400)
        throw new Error('Document Already Exist')
    }


    const newPost = await Post.create({
        title: title,
        documentPath: document.path,
        documentName: document.filename,
        documentType: document.mimetype,
        description: description,
        content:content,
        category: categoryID,
        
    })

    if (!newPost) {
        res.status(400)
        throw new Error("Failed to create Post")
    }

    // Associate the newly created Post with the corresponding category
    await Category.findByIdAndUpdate(categoryID, { $push: { posts: newPost._id } })

    res.status(200).json(newPost)
});

const updatepost = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const { title, description,categoryID,content } = req.body; 
    const document = req.file
    const filePath = currvideo.videoPath;
    
    const currpost = await Post.findById(id);
    if (!currpost) {
        res.status(400)
        throw new Error(`post with id ${req.params.id} not found`);
    }

    
    if (!title || !description) {
        res.status(400)
        throw new Error("Please provide title and description to update");
    }
    
    fs.unlink(filePath, (err) => {
        if (err) {
            throw new Error(`Error deleting video file${err}`);
        } else {
            console.log(`document file ${filePath} deleted successfully`);
        }
    });

    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { 
            title:title,
            documentName: document.filename,
            documentPath: document.path,
            documentType: document.mimetype,
            category:categoryID,
            content:content,
            description:description
        }, 
        { new: true } // Return the updated document
    );
     res.status(200).json(updatedPost)
})

const deletepost = asyncHandler(async (req, res) => {
    const id = req.params.id;

  
    const deletedPost = await Post.findById(id);
    if (!deletedPost) {
        res.status(400)
        throw new Error("no Post found")
    }

    const {_id} = await Post.findByIdAndDelete(id);

    await Category.findByIdAndUpdate(deletedPost.category, { $pull: { posts: id } });

    res.status(200).json(_id);
 
});


module.exports = {
    getposts,
    getpost,
    addpost,
    updatepost,
    deletepost


}
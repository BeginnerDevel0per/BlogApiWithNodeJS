var rethink_db = require("../Data/rethink_db.js");
var lodash = require("lodash");//gelen veriyi filtrelemek için kullanıyorum
var path = require("path");
var uuid = require("uuid");
const db = new rethink_db();




async function GetBlogs(req, res) {
    res.json(await db.GetBlogs());
}
async function GetByIdBlog(req, res) {
    res.json(await db.GetByIdBlog(req.params.id.trim().toString()));
}
async function AddBlog(req, res) {
    req.body.titleImage = await ImageUpload(req.files.image);
    const allowedFields = ['author', 'title', 'content', 'titleImage'];

    res.json(await db.Addblogs(lodash.pick(req.body, allowedFields)));
}
async function RemoveBlog(req, res) {
    console.log(req.params.id);
    res.json(await db.RemoveBlog(req.params.id.trim().toString()));
}
async function UpdateBlog(req, res) {
    if (req.files && req.files.image) {
        req.body.titleImage = await ImageUpload(req.files.image);
    }
    console.log(req.body);
    const allowedFields = ['author', 'title', 'content', 'id', 'titleImage'];
    res.json(await db.UpdateBlog(lodash.pick(req.body, allowedFields)));
}
async function BlogSearch(req, res) {
    res.json(await db.SearchBlog(req.params.keyword));
}

async function ImageUpload(ImageFile) {
    if (ImageFile) {
        ImageFile.name = uuid.v4() + path.extname(ImageFile.name);
        console.log(ImageFile.name);
        const uploadPath = path.join(__dirname, '..', 'public', ImageFile.name);
        await ImageFile.mv(uploadPath);
        return ImageFile.name;
    }
    else {
        res.status(400, "Resim dosyası göndermediniz");
    }
}

module.exports = { GetBlogs, GetByIdBlog, AddBlog, RemoveBlog, UpdateBlog, BlogSearch };
var r = require("rethinkdb");
var fs = require("fs");
var path = require("path");
class rethink_db {

    constructor() {
        this.conn();
    }

    async conn() {
        //bağlantıyı kurmak için oluşturmuş olduğum fonksiyonum
        try {
            this.connection = await r.connect({ host: 'localhost', port: 28015, db: 'Blog_db' });
        } catch (err) {
            console.error('err:', err);
        }
    }

    async Addblogs(Blog) {
        try {
            await r.table("Blogs").insert(Blog).run(this.connection);
            return true;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async GetBlogs() {
        try {
            const Blogs = await r.table("Blogs").run(this.connection);
            return Blogs.toArray();
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async SearchBlog(Keyword) {
        const Blogs = await r.table('Blogs')
            .filter(blogs => blogs("author").match(Keyword)
                .or(blogs("title").match(Keyword)
                )).run(this.connection);
        return Blogs.toArray();
    }
    async GetByIdBlog(Id) {
        try {
            const blog = await r.table('Blogs').get(Id).run(this.connection);
            return blog;
        } catch (error) {
            console.log(error);
            return error;
        }

    }

    async UpdateBlog(Blog) {
        try {
            await r.table('Blogs').update(Blog).run(this.connection);
            return true;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async RemoveBlog(id) {
        try {
            const blog = await r.table('Blogs').get(id).run(this.connection);
            if (blog != null) {
                const ImagePathToRemove = path.join(__dirname, '..', 'public');
                await fs.unlinkSync(ImagePathToRemove + `/${blog.titleImage}`);
                await r.table('Blogs').get(id).delete().run(this.connection);
            }
            return true;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
module.exports = rethink_db;



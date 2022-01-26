const Slugify = require('slugify');
const database = require('../database/config')

class News{
    async findAll(){
        try{
            let news = await database.select(['news.*', 'user.name as user_name','category.name as category_name'])
            .from("news").orderBy('id', 'desc')
            .join('user', 'news.user_id', 'user.id')
            .join('category', 'news.category_id', 'category.id')
            return news;
        }
        catch(error){
            console.log(error)
        }
    }
    
    async findById(id){
        try{
            let news = await database.select(['news.*', 'user.name as user_name','category.name as category_name'])
            .from("news").where('news.id', id)
            .join("user", "news.user_id", "user.id")
            .join("category", "news.category_id", "category.id")
            return news[0]
        }catch(error){
            console.log(error)
            return undefined
        }
    }

    async findBySlug(slug){
        try{
            let news = await await database.select(['news.*', 'user.name as user_name','category.name as category_name'])
            .from("news").where('news.slug', slug)
            .join("user", "news.user_id", "user.id")
            .join("category", "news.category_id", "category.id")
            return news[0]
        }catch(error){
            console.log(error)
            return undefined
        }
    }

    async verifyTitle(title){
        let slug = Slugify(title).toLowerCase()

        try{
            let news = await database.select().table("news").where({slug})
            if(news.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
        }
    }

    async verifyTitleById(id, title){
        let slug = Slugify(title).toLowerCase()

        try{
            let news = await database.select().table("news").where({slug}).whereNot({id})
            if(news.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
        }
    }

    async verifyId(id){
        try{
            let news = await database.select().table("news").where({id})
            if(news.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
            return false
        }
    }

    async create(title, category_id, body){
        let slug = Slugify(title).toLowerCase()

        try{
            await database.insert(
                {title, 
                slug, 
                user_id: 1, 
                category_id: parseInt(category_id), 
                body
            })
            .table("news")

        }catch(error){
            console.log(error)
        }
    }

    async update(id, title, category_id, body){
        let slug = Slugify(title).toLowerCase()

        try{
            await database.update({title, slug, category_id, body, updated_at: new Date()}).table("news").where({id})
        }catch(error){
            console.log(error)
        }
    }

    async deleteById(id){
        try{
            await database.delete().table("news").where({id})
        } catch(error){
            console.log(error)
        }
    }
}

module.exports = new News()
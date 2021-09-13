const Slugify = require('slugify');
const database = require('../database/config')

class News{
    async create(title, category, body){
        let slug = Slugify(title).toLowerCase()

        try{
            await database.insert(
                {title, 
                slug, 
                author: "Lucas", 
                category, 
                body, 
                created_at: new Date()})
                .table("news")

        }catch(error){
            console.log(error)
        }
    }

    async update(id, title, category, body){
        let slug = Slugify(title).toLowerCase()

        try{
            await database.update({title, slug, category, body, updated_at: new Date()}).table("news").where({id})
        }catch(error){
            console.log(error)
        }
    }
    
    async findAll(){
        try{
            let news = await database.select().table("news").orderBy('id', 'desc')
            return news;
        }
        catch(error){
            console.log(error)
        }
    }

    async findByTitle(title){
        let slug = Slugify(title).toLowerCase()

        try{
            let news = await database.select().table("news").where({slug})
            if(news.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
        }
    }

    async findTitleById(id, title){
        let slug = Slugify(title).toLowerCase()

        try{
            let news = await database.select().table("news").where({slug}).whereNot({id})
            console.log(news)
            if(news.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
        }
    }

    async findById(id){
        try{
            let news = await database.select().table("news").where({id})
            if(news.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getById(id){
        try{
            let news = await database.select().table("news").where({id})
            return news[0]
        }catch(error){
            console.log(error)
        }
    }

    async getBySlug(slug){
        try{
            let news = await database.select().table("news").where({slug})
            return news[0]
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
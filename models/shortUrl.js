const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortenedUrl:{
        type:String,
        required:true,
        default:shortId.generate
        
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }
 
})

module.exports = mongoose.model('ShortUrl',shortUrlSchema)
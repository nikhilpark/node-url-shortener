const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl")
const shortId = require('shortid')
const getBaseUrl = require("get-base-url").default
const dotenv = require("dotenv")
dotenv.config()


const cloudURL = process.env.MONGO_URI
mongoose 
  .connect(
    cloudURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true })) ;

app.get("/", async(req,res)=>{
  const data = await ShortUrl.find({})

  res.render("dashboard",{data})
})
app.get("/addurl", (req, res) => {
  
  res.render("addUrl");
});

app.post("/addurl", async (req, res) => {
  const originalUrl = req.body.url
  
  await ShortUrl.create({
    originalUrl:originalUrl,
  })
  res.redirect('/')
 
});
app.post("/deleteUrl",async(req,res)=>{
  const id = req.body.id;
  await ShortUrl.findByIdAndDelete(id);
  res.redirect("/");
})

app.get("/:shortUrl",async (req,res)=>{
  const shortUrl = await ShortUrl.findOne({ shortenedUrl:req.params.shortUrl})
  if(shortUrl == null) return res.sendStatus(404)
  shortUrl.clicks++
  shortUrl.save()

 res.redirect(shortUrl.originalUrl)

})

app.listen(process.env.PORT || 2000, () => {
  console.log("Server is up");
});



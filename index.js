var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Registrations')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/register",(req,res) => {
    var name= req.body.name
    var dept=req.body.dept
    var email=req.body.email
    var contactno=req.body.contactnono
    var ename=req.body.ename
    var date=req.body.date

    var data={
        "name":name,
        "dept":dept,
        "email":email,
        "contactno":contactno,
        "ename":ename,
        "date":date
    }
    db.collection('Bookings').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_successful.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")
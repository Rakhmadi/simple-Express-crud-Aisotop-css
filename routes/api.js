// @ts-nocheck
const ex = require('express');
const mongod =require('mongodb');
const router =ex.Router();
const multer =require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
   
  var upload = multer({ storage: storage })
router.post('/upload',upload.single('image'),async(req,res)=>{ 
  res.send(req.body)
})

router.get('/view',async(req,res)=>{
    const mydata=await load();
    const data = await mydata.find({}).toArray()
    res.render('../view/index',{'datas':data})
    res.end()
})


router.get('/delete/:id',async(req,res)=>{
    const mydata=await load();
    await mydata.deleteOne({_id: new mongod.ObjectID(req.params.id)})
    res.redirect('/view')
})

router.get('/create',async(req,res)=>{  
    res.render('../view/created')
    res.end()
})
router.get('/edit/:id',async(req,res)=>{  
    const data =await load()
    const datas = await data.find({"_id":new mongod.ObjectID(req.params.id)}).toArray()
    console.log(datas)
    res.render('../view/edit',{"data":datas})
    res.end()
})

router.post('/create',async(req,res)=>{ 
    console.log(req.body);
     res.redirect('/view')
    res.end()
   
})

router.get('/',async(req,res)=>{
    const mydata=await load();
    res.send( await mydata.find({}).toArray())
})

router.post('/',async(req,res)=>{
    const mydata=await load();
    await mydata.insertOne({
        name:req.body.name,
        created:new Date()
    })
    res.status(201).send();
})

router.delete('/:id',async(req,res)=>{
    const mydata=await load();
    await mydata.deleteOne({_id: new mongod.ObjectID(req.params.id)})
    res.status(200).send({
        'status':'Sucess'
    })
})
router.put('/:id',async(req,res)=>{
    const mydata=await load();
    await mydata.updateOne({_id:new mongod.ObjectID(req.params.id)},
        {
            $set:{
                name:req.body.name
            }
        }   )
    res.status(200).send({
        'status':'Success'
    })
})
const load =async()=>{
    const client =await mongod.MongoClient.connect('mongodb://localhost:27017/?readPreference=primary&ssl=false',{
        useNewUrlParser:true,
        useUnifiedTopology: true 
    })
    return client.db('qwerty').collection('mydata')
}
module.exports=router

const express = require ('express')
const Donat = require('../models/search')
const Product = require('../models/search')

const router = express.Router()

router.get ('/products' , (req , res) => {
    Product.find({}).then ((products) =>{
        res.status(200).send(products)
    }).catch((e) => {
        res.status(500).send(e)
    })
  })

  router.get('/products/:key',async(req,res) => {

    // traning
    try{
    let data =await Product.find({
      "$or":[
        {DrugName:{$regex:req.params.key}}
      ]
    })
    if(!data.length){
      return res.status(404).send('unable to find')
    }
    res.send(data)
    console.log(data)
  }
  catch(e){
    res.status(400).send(e)
  }
  })

  
////////////////////////////////////////////////////////////////////// post function
router.post ('/products' , (req , res) => {
    console.log(req.body)
  
    const product = new Product (req.body)
  
    product.save()
    .then ((product) => {res.status(200).send(product)})
  
    .catch((e)=>{ res.status(400).send(e)})
  })
  
  /////////////////////////////////////////////////////////////////////////////////
  
     // Put to update data by id 
  
     router.put('/products/:DrugName' , async(req,res)=> {
        try {
           const DrugName = req.params.DrugName 
           const product = await Product.findOneAndUpdate (DrugName , req.body , {
              new : true,
              runValidators : true
           })
           if(!product) {
              return res.status(404).send('No User Founded')
           }
           res.status(200).send(product)
        }
        catch(error) {
           res.status(400).send(error)
        }
     })
  
  
  //////////////////////////////////////////////////////////////////////////////////
  
  // Delete data by id
  router.delete ('/products/:DrugName' , async (req , res) => {
            try {
                 const DrugName = req.params.DrugName
                 const product = await Product.findOneAndDelete(DrugName)
                 if(!product) {
                    return res.status(404).send('UNABLE TO FIND USER')
                 }
                 res.status(200).send(product)
            }
            catch(e){
                res.status(400).send(e)
            }
        })
 module.exports = router 
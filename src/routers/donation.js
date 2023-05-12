const express = require ('express')
const Donat = require('../models/donation')


const router = express.Router()


router.post ('/donate' , (req , res) => {
    console.log(req.body)

    const donat = new Donat (req.body)

    donat.save()
    .then ((donat) => {res.status(200).send(donat)})
    .catch((e)=>{ res.status(400).send(e)})
})

////////////////////////////////////////////////////////////////////////////////////

// Get All Elemnts

  router.get ('/donate' , (req , res) => {
    Donat.find({}).then ((donate) =>{
        res.status(200).send(donate)
    }).catch((e) => {
        res.status(500).send(e)
    })
  })

  /////////////////////////////////////////////////////////////////////////////////
  
  // Get elment by id

  router.get('/donate/:id' , (req,res) => {
    //   console.log(req.params)
      const _id = req.params.id
      Donat.findById(_id).then ((donat) => {
        if(!donat){
          return  res.status(404).send('UNABLE TO FIND')
        }
        res.status(200).send(donat)
      }).catch ((e) => {
        res.status(500).send(e)
      })
  })

/////////////////////////////////////////////////////////////////////////////////

   // Put to update data by id 

   router.put('/donate/:id' , async(req,res)=> {
      try {
         const _id = req.params.id 
         const donat = await Donat.findByIdAndUpdate (_id , req.body , {
            new : true,
            runValidators : true
         })
         if(!donat) {
            return res.status(404).send('No User Founded')
         }
         res.status(200).send(donat)
      }
      catch(error) {
         res.status(400).send(error)
      }
   })


//////////////////////////////////////////////////////////////////////////////////

// Delete data by id
router.delete ('/donate/:id' , async (req , res) => {
          try {
               const _id = req.params.id
               const donat = await Donat.findByIdAndDelete(_id)
               if(!donat) {
                  return res.status(404).send('UNABLE TO FIND USER')
               }
               res.status(200).send(donat)
          }
          catch(e){
              res.status(400).send(e)
          }
      })


      module.exports = router 
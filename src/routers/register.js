const express = require ('express')
const User = require('../models/Register')


const router = express.Router()

router.post('/register', async(req, res) => {
    
    const { FirstName,LastName, Email, Password ,ConfirmPassword } = req.body;
    const newUser = new User({FirstName,LastName, Email, Password ,ConfirmPassword });
    const token = await newUser.generateToken()
   
    if(req.body.Password!=req.body.ConfirmPassword){
      return res.status(400).json({message:"invalid password"})
    }
  
    newUser.save((err, savedUser) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Error creating user: ${err}`);
      } else {
        console.log(`User created: ${savedUser}`);
        
        res.status(201).json({savedUser,token});
      }
    });
   
  })
  
  router.get('/register', (req, res) => {
      User.find((err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Error fetching users: ${err}`);
        } else {
          console.log(`Found ${users.length} users`);
          res.status(200).json(users);
        }
      });
    });
    
    router.get('/register/:userId', (req, res) => {
      User.findById(req.params.userId, (err, user) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Error fetching user: ${err}`);
        } else if (!user) {
          res.status(404).send(`User with id ${req.params.userId} not found`);
        } else {
          console.log(`Found user: ${user}`);
          res.status(200).json(user);
        }
      });
    });
  
    router.put('/register/:id',async(req,res)=>{
      try{
  
          const updates = Object.keys (req.body)
          console.log(updates)
  
          const _id = req.params.id
  
          const user = await User.findById (_id)
          if(!user){
              return res.status(404).send('No user is found')
          }
  
          updates.forEach((ele) => (user[ele] = req.body[ele]))
  
        
         await user.save()
  
  
          res.status(200).send(user)
      }
      catch(error){
          res.status(400).send(error)
      }
  })
  
  
  router.delete('/register/:userId', (req, res) => {
      User.findByIdAndRemove(req.params.userId, (err, deletedUser) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Error deleting user: ${err}`);
        } else if (!deletedUser) {
          res.status(404).send(`User with id ${req.params.userId} not found`);
        } else {
          console.log(`Deleted user with id ${deletedUser._id}`);
          // res.send("deleted successfully")
          res.status(204).end();
        }
      });
    });
  

    //////////////////////////////////////////////////////

    // login : 
router.post('/login',async(req,res)=>{
      try{
          const user = await User.findByCredentials(req.body.Email,req.body.Password)
          const token = await user.generateToken()
          user.status="Online"
          user.save()
          res.status(200).send({user,token})
      }
      catch(e){
          res.status(400).send(e.message)
      }
  })

//////////////////////////////////////////////////

router.post ('/register' , async (req , res) => {
  try {
      const user = new User (req.body)
      const token = await user.generateToken()
      await user.save()
       res.status(200).send({user , token})
  } catch (e) {
      res.status(400).send(e)
  }
})

router.patch ('/logout/:_id' , async (req , res) => {
  try {
    //take the token and  verify it 
    const {_id}=req.params
    // const {_id}=jwt.verify(token,"islam500")
    console.log(_id)
     const findUser=await User.findByIdAndUpdate(_id,{status:"Offline"},{new:true})
       res.status(200).send({findUser})
  } catch (e) {
      res.status(400).send(e)
  }
})

    module.exports = router 
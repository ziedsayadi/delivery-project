const express = require ('express');
const User = require ('../models/userModel');
const { getToken, isAuth } = require ('../util');
const bcrypt = require ('bcryptjs')

const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser)
    });
  } else {
    res.status(404).send({ msg: 'User Not Found' });
  }

});

router.post('/signin', async (req, res) => {

  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)
    });

  } else {
    res.status(401).send({ msg: 'Invalid Email or Password.' });
  }

});

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  // bcrypt.genSalt(10, (err, salt) => {
  //   if (err) throw err;
  //   bcrypt.hash(password, salt, async (err, hash) => {
  //     if (err) throw err;
  //     try {
  //       user.password = hash;
  //       const addResult = await user.save();
  //       res.status(201).json(addResult);
  //     } catch (error) {
  //       res.status(500).json({ errors: error });
  //     }
  //   });
  // });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser)
    })
  } else {
    res.status(401).send({ msg: 'Invalid User Data.' });
  }

})



router.delete("/:id" , isAuth , async (req, res)=>{
  const userId = req.params.id;
  try {
     await User.findByIdAndDelete({_id:userId})
      res.send({message : 'user deleted successfully'})
    
  } catch (error) {
    res.send({message : 'Error in Deletion. !!!'})
  }
 
})

module.exports = router;
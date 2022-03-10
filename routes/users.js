var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { user, password } = require('pg/lib/defaults');
require('dotenv').config()
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR))
const {User, Profile} = require("../models")
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');


router.post('/register', async (req, res) => {
  const {username, password, email} = req.body;
  const hash = bcrypt.hashSync(password, saltRounds)
  const user = await User.create({
    username: username,
    password : hash,
    email: email
  })
  res.json({
    id: user.id,
    username: user.username,
    email: user.email
  })
  // res.redirect(`/profile/${user.id}`);    
})

router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const user = await User.findOne({
    where: {
      username:username
    }
  });

  if(user) {
    const comparePass = bcrypt.compareSync(password, user.password)
    if (comparePass === true) {
      const token = jwt.sign (
        {
          data: user.username,
        },
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
      );
      res.cookie('token', token)
      res.redirect(`/profile/${user.id}`);    
    } else {
      res.send('Sorry, wrong password')
    }
  } else {
    res.send('Sorry, no user found')
  }
})

router.post('/profile', async (req, res) => {
  const {type, item, date, amount, note} = req.body;
  const userdata = await Profile.create({
    type: type,
    item: item,
    date: date,
    amount: amount,
    note: note
  })

  res.send(userdata);
})


// ---------------    Extra Routes for test only --------

/* GET users listing. */
// router.get('/profile/', async (req, res) => {
//   const users = await userData.findAll();
//   res.json(users);
// });


/* GET a user by id. */
// router.get('/:id', async (req, res) => {
//   try{
//       const oneUser = await User.findByPk(req.params.id);
//       res.json(oneUser);
//   } catch (e) {
//       console.log(e);
//       res.status(404).json({
//           message: 'User not found'
//       });
//   }
// });

/* POST a user by text (username). */
// router.post('/search', async (req, res) => {
//   const users = await User.findAll({
//       where: {
//           username: req.body.username,
//       }
//   });
//   res.json(users);
// });

/* POST a user by text (username or email). */
// router.post('/users/search', async (req, res) => {
//   const users = await User.findAll({
//       where: {
//           [Sequelize.Op.or]: [ //in order to define Sequelize, we must reuire it from module as (const Sequelize = require('sequelize');) in line 10. it also was installed in package.json

//               { 
//                   username: req.body.username,
//                   email: req.body.email
//               }
//           ]
//       }
//   });
//   res.json(users);
// });

/* POST a user by text (username or email). */
// router.post('/users/:id', async (req, res) => {
//   const {id} = req.params;
//    // Assuming that `req.body` is limited to
//     // the keys firstName, lastName, and email
//     const updatedUser = await User.update(req.body, {
//       where: {
//         id
//       }
//     })
//     res.json(updatedUser)
// })


/* delete a user */
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   const deletedUser = await User.destroy({
//     where: {
//       id
//     }
//   });
//   res.json(deletedUser)
// })







module.exports = router;

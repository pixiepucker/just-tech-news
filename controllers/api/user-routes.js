const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

//get /api/users
router.get('/', (req, res) => {
  //access User model and run .findAll() method
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
      return;
    });
});

//get /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_url', 'created_at'],
      },
      //comment model here
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title'],
        },
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts',
      },
    ],
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
      return;
    });
});

//post /api/users
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then(dbUserData => {
      req.session.save(() => {
        res.session.user_id = dbUserData.id;
        res.session.username = dbUserData.username;
        res.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
      return;
    });
});

//login route
router.post('/login', (req, res) => {
  //query op
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({
        message: 'No user with that email exists!',
      });
      return;
    }

    //verify user
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: 'That password does not match our records, please try again.',
      });
      return;
    }

    req.session.save(() => {
      //declare session vars
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      res.session.loggedIn = true;

      res.json({
        user: dbUserData,
        message: "You're now logged in!",
      });
    });
  });
});

//logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//put /api/users/1
router.put('/:id', (req, res) => {
  //pass in req.body to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
      return;
    });
});

//delete /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
      return;
    });
});

module.exports = router;

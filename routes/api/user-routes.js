const router = require('express').Router();
const { User } = require('../../models');

//get /api/users
router.get('/', (req,res) => {
    //access User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
            return;
        });
});

//get /api/users/1
router.get('/:id', (req,res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with this id'});
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
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
            return;
        });
});

//put /api/users/1
router.put('/:id', (req,res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with this id'});
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
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
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
const express = require('express');
const router = express.Router();


//generic route handler

const genericHandler = (req, res, next) => {
    res.json({
        status:'success',
        data: req.body
    });
};


//crerate a new teacher or student
router.post('/people', genericHandler);


router.post('/auth/edit', genericHandler);

//accept feee payments for student

router.post('/fees/pay', genericHandler);

module.exports = router;
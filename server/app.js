
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Joi = require('@hapi/joi');


const Routes = require('./routes');
const app = express();

const port = process.env.PORT || 4000;



const messages = require('./db/messages');

//app configurations
app.set('port', port);

//load app middlewares



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// load api routes
app.use('/', Routes);


//joi usage

app.post('/test', (req, res, next) => {

    // require the Joi module

    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({

        // email is required
        // email must be a valid email string
        email: Joi.string().email().required(),

        // phone is required
        // and must be a string of the format XXX-XXX-XXXX
        // where X is a digit (0-9)
        phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),

        // birthday is not required
        // birthday must be a valid ISO-8601 date
        // dates before Jan 1, 2014 are not allowed
        birthday: Joi.date().max('1-1-2004').iso(),

    });

    // validate the request data against the schema
    Joi.validate(data, schema, (err, value) => {

        // create a random number as id
        const id = Math.ceil(Math.random() * 9999999);

        if (err) {
            // send a 422 error response if validation fails
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        } else {
            // send a success response if validation passes
            // attach the random ID to the data response
            res.json({
                status: 'success',
                message: 'User created successfully',
                data: Object.assign({id}, value)
            });

        }

    });

});

//joi usages ends here


app.use(logger('tiny'));
app.use(cors());
app.use(bodyParser.json());



// old routes
app.get('/', (req, res) => {
    res.json({
        message: 'You would be destroyed!'
    });
});

app.get('/messages', (req, res) => {

    messages.getAll().then((messages) => {
        res.json(messages);
    });
});




app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {

        res.json(message);
    }).catch((error) => {
        console.log(error);
        res.status(500);
        res.json(error);
    });
});

//animal rputes

app.get('/animals', (req, res) => {
    res.send([
        {
            id: 1,
            name: 'Lily',
            type: 'Dog',
            image: 'https://placedog.net/550/550',
            description: 'She loves to give kisses and bark at nothing.'
        },

        {
            id: 2,
            name: 'Lovely',
            type: 'Dog',
            image: 'https://placedog.net/500/500',
            description: `A little shy at first, but won't leave your side soon enough.` // note the backticks so we don't have to escape!
        },

        {
            id: 3,
            name: 'Sprinkles',
            type: 'Cat',
            image: 'https://placekitten.com/550/550',
            description: `Needs diabetes shot. Roll the insulin in your hand, don't shake it.`
        },

        {
            id: 4,
            name: 'Garbage',
            type: 'Cat',
            image: 'https://placekitten.com/500/500',
            description: 'A feral barn cat. He loves to eat garbage!'
        }
    ])
});

//animal rputes

app.listen(port, () => {
    console.log(`listening on ${port} http://localhost:4000 `);

});
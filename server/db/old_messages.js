// const Joi = require('@hapi/joi');
const db = require('./connection');


/*const schema = Joi.object().keys({
    username:Joi.string()
        .alphanum()
        .required(),


    subject:Joi.string()
        .required(),



    message:Joi.string()
        .uri({
        scheme:[
            /https?/
        ]
    })
});*/



const old_messages = db.get('messages');

function getAll()  {
    return old_messages.find();
}


function  create(message) {
    if(!message.username) message.username = 'Anonymous';


    const result = Joi.validate(message, schema);


    if (result.error == null) {
        message.created = new Date();
        console.log("hello");

        return old_messages.insert(message);
    }else {
        return Promise.reject(result.error);
    }

}


module.exports = {
    create,
    getAll
};
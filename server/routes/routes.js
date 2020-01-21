//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense')

router.get('/', (request, response) => {
    response.render('index')
})

router.route('/insert').post((request, response) => {
    var expense = new Expense();
    expense.description = request.body.description;
    expense.amount = request.body.amount;
    expense.month = request.body.month;
    expense.year = request.body.year;

    expense.save((error) => {
        if (error) {
            response.send(error);
        }
        response.send('Expense successfully added!')
    })
})

router.route('/update').post((request, response) => {
    const doc = {
        description: request.body.description,
        amount: request.body.amount,
        month: request.body.month,
        year: request.body.year
    };
    console.log(doc);
    Expense.update({ _id: request.body._id }, doc, (error, result) => {
        if (error) {
            response.send(error);
        }
        response.send('Expense successfully updated');
    })
})

router.get('/delete', (request, response) => {
    var id = request.query.id;
    Expense.find({ id: id }).remove().exec((error, expense) => {
        if (error) {
            response.send(error);
        }
        response.send("Expense successfully deleted!");
    })
})

router.get('/getAll', (request, response) => {
    var monthRec = request.query.month;
    var yearRec = request.query.year;

    if (monthRec && monthRec !== "All") {
        Expense.find({ $and: [{ month: monthRec }, { year: yearRec }] },
            (error, expenses) => {
                if (error) {
                    response.send(error);
                }
                response.json(expenses)
            })
    } else {
        Expense.find({ year: yearRec }, (error, expenses) => {
            if (error) {
                response.send(error);
            }
            response.json(expenses);
        })
    
    }    
})

module.exports = router;
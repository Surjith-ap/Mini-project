const { userSignIn } = require('../controllers/auth1');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { userSignUp } = require('../controllers/register');

const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/login',userSignIn )
    .post('/signup',userSignUp)

module.exports = router
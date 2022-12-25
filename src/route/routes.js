const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')
const cardController = require('../controllers/cardController')

router.post('/createCustomer', customerController.createCustomer)

router.get('/getCustomers', customerController.getCustomer)

router.delete('/deleteCustomer/:customerID', customerController.deleteCustomer)

router.post('/createCard', cardController.createCard)

router.get('/getCard', cardController.getCard)

module.exports = router
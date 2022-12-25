const cardModel = require('../models/cardModel')
const customerModel = require('../models/customerModel')
const validations = require('../validations/validation')
const uuid = require('uuid')

const createCard = async function (req, res) {
    try {
        let data = req.body
        let { cardType, customerName, vision, customerID } = data
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: 'data is required' })
        if (!cardType) return res.status(400).send({ status: false, message: 'Card type is required' })
        if (!validations.isValidCardType) return res.status(400).send({ status: false, message: 'Card type can only be REGULAR or SPECIAL' })
        if (!customerName) return res.status(400).send({ status: false, message: 'Customer name is required' })
        if (!validations.isValidName(customerName)) return res.status(400).send({ status: false, message: 'Customer name must be in alphabetical order' })
        if (!vision) return res.status(400).send({ status: false, message: 'Vision is required' })
        if (!uuid.validate(customerID)) return res.status(400).send({ status: false, message: 'customerID is invalid' })
        let customerPresent = await customerModel.findOne({ customerID: customerID, status: 'ACTIVE' })
        if (!customerPresent) return res.status(404).send({ status: false, message: 'Customer not found or is deleted' })
        let cardsPresent = await cardModel.find()
        let noOfCards = cardsPresent.length
        data.cardNumber = `C00${noOfCards + 1}`
        let savedData = await cardModel.create(data)
        return res.status(201).send({ status: true, message: 'Card created successfully', data: savedData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getCard = async function (req, res) {
    try {
        let allCards = await cardModel.find({ status: 'ACTIVE' })
        if (!allCards) return res.status(404).send({ status: false, message: 'No cards found' })
        return res.status(200).send({ status: true, message: 'All cards', data: allCards })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createCard, getCard }
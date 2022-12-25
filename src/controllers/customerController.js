const customerModel = require('../models/customerModel');
const uuid = require('uuid');
const validations = require('../validations/validation');

const createCustomer = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: 'data is required' })
        let { firstName, lastName, mobileNumber, DOB, emailID, address } = data;
        if (!firstName) return res.status(400).send({ status: false, message: 'First name is required' })
        if (!validations.isValidName(firstName)) {
            return res.status(400).send({ status: "false", message: "First name must be in alphabetical order" });
        }
        if (!lastName) return res.status(400).send({ status: false, message: 'Last name is required' })
        if (!validations.isValidName(lastName)) {
            return res.status(400).send({ status: "false", message: "Last name must be in alphabetical order" });
        }
        if (!mobileNumber) return res.status(400).send({ status: false, message: 'Mobile number is required' })
        if (!validations.isValidPhone(mobileNumber)) {
            return res.status(400).send({ status: "false", message: "Mobile number is invalid" });
        }
        if (!DOB) return res.status(400).send({ status: false, message: 'DOB is required' })
        if (!validations.isValidDate(DOB)) {
            return res.status(400).send({ status: "false", message: "Date is invalid. Please provide date in yyyy-mm-dd format for ex: 2014-04-14." });
        }
        if (!emailID) return res.status(400).send({ status: false, message: 'Email ID is required' })
        if (!validations.isValidEmail(emailID)) {
            return res.status(400).send({ status: "false", message: "EmailID is invalid" });
        }
        let emailAndPhone = await customerModel.findOne({ $or: [{ emailID }, { mobileNumber }] })
        if (emailAndPhone) return res.status(400).send({ status: false, message: 'emailID or mobile number already exists' })
        if (!address) return res.status(400).send({ status: false, message: 'Address is required' })
        let uniqueID = uuid.v4()
        data.customerID = uniqueID
        data.status = 'ACTIVE'
        let customerData = await customerModel.create(data)
        return res.status(201).send({ status: true, message: 'Customer created successfully', data: customerData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getCustomer = async function (req, res) {
    try {
        let allCustomers = await customerModel.find({ status: 'ACTIVE' })
        if (!allCustomers) return res.status(404).send({ status: false, message: 'No customers found' })
        return res.status(200).send({ status: true, message: 'All customers', data: allCustomers })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const deleteCustomer = async function (req, res) {
    try {
        let customerID = req.params.customerID
        if (!uuid.validate(customerID)) return res.status(400).send({ status: false, message: 'Customer id is invalid' })
        if (!customerID) return res.status(400).send({ status: false, message: 'customerID is not present' })
        let deleteCustomer = await customerModel.findOneAndUpdate({ customerID: customerID, status: 'ACTIVE' }, { $set: { status: 'INACTIVE' } })
        if (!deleteCustomer) return res.status(404).send({ status: false, message: 'Customer not found or is already deleted' })
        return res.status(200).send({ status: true, message: 'Customer deleted successfully' })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createCustomer, getCustomer, deleteCustomer }
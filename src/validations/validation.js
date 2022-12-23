//Name Validation
const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
};

//Phone Validation
const isValidPhone = function (phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

// Email Validation
const isValidEmail = function (email) {
    const emailRegex =
        /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
    return emailRegex.test(email);
};

// DOB Validation
const isValidDate = function (Date) {
    const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    return regex.test(Date)
}

module.exports = { isValidName, isValidPhone, isValidEmail, isValidDate }
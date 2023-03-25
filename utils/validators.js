const validateName = (name) => {
    let regexName = new RegExp(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/);
    return regexName.test(name);
}

const validateEmail = (email) => {
    let regexEmail = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    return regexEmail.test(email);
}

const validatePassword = (password) => {
    let regexPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    return regexPassword.test(password);
}

module.exports = {validateName, validateEmail, validatePassword}
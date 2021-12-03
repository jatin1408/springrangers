const bcrypt = require('bcrypt');
const User = require('../models/user');

const userType = {
    "SENDER": 0,
    "RECEIVER": 1
};

const generatePasswordHash = (password) => {
    try {
        const saltRounds = 10;
        let passwordHash = bcrypt.hashSync(password, saltRounds);
		passwordHash = passwordHash.replace("$2b$", "$2y$");
		return passwordHash;
    } catch (error) {
        throw new Error(error);
    }
}

const generateRandomString = (length) => {
    try {
        let text = ""
		const possible = "123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ"
		let i = 0
		while (i < length){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
			i++;
        }
		return text;
    } catch (error) {
        throw new Error(error);
    }
}

const comparePassword = async (password, passwordHash) => {
    try {
        passwordHash = passwordHash.replace("$2y$", "$2a$");
        const res = await bcrypt.compare(password, passwordHash);
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

const register = async (options) => {
    try {
        const payload = {
            first_name: options.first_name,
            last_name: options.last_name,
            email: options.email,
            password_hash: generatePasswordHash(options.password),
            status: 1,
            type: userType[options.type.toUpperCase()] || 0,
            mobile_number: options.mobile_number,
            uuid: generateRandomString(6)
        }
        const response = await User.create(payload);
        return {message: "User successfully created."}
    } catch (error) {
        throw new Error(error);
    }
}

const login = async (options) => {
    try {
        const user = await User.findOne({ where: {email: options.email} });
        if(!user) {
            throw new Error({ message: "Invalid user" });
        }

        const isPasswordMatch = await comparePassword(options.password, user.dataValues.password_hash);
        if (isPasswordMatch) {
            const result = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                type: user.type && user.type == 0 ? "Sender": "Buyer",
                uuid: user.uuid,
                mobile_number: user.mobile_number
            }
            return result
        }
        return {}
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    register,
    login
}
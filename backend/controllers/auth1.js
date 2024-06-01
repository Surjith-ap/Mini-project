const Joi = require("joi");
const { User } = require("../models/UserModel");
const bcrypt = require("bcrypt");


exports.userSignIn = async (req, res) => {

    try {
        console.log(req.body);
        const { error } = validate(req.body);
        console.log(error,'errror');
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        console.log(validPassword);
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const token = 1234
        res.status(200).send({ data: token,user:user, message: "logged in successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};
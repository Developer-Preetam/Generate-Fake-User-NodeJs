import userAuth from "../models/userAuth.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Register a new user
export const register =  async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userAuth.findOne({ email });
        if(exists) 
            return res.status(400).json({status: "Bad Request", message: "Email Already Exists"});

        const hashed = await bcrypt.hash(password, 10);
        const user = new userAuth({name, email, password: hashed});
        await user.save()

        res.status(201).json({status: "Response Ok", message: "User Registered Successfully"});
    } catch (error) {
        console.log("Error Registering User", error);
        res.status(500).json({ error: "Server Error" });
    }
};

//Login a new user
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userAuth.findOne({ email });
        if(!user) return res.status(404).json({error: 'User Not Found'});

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) res.status(401).json({ error: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: {name: user.name, email: user.email } });

    } catch (error) {
        res.status(500).json({status: "Server Error"});
    }
}
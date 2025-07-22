import fakeUser from "../models/fakeUser.js";
import { generateUser } from "../utils/generateFakeUsers.js";
import { exportToCsv } from "../utils/exportCsv.js";
import fs from "fs";

export const getUsers = async (req, res) => {
    const { limit = 10, gender } = req.query;
    const query = gender ? { gender } : {};

    try {
        const users = await fakeUser.find(query).limit(Number(limit))
        // console.log("Fetched Users:", users);
        res.json(users);
    } catch (error) {
        res.status(500).json({error: 'Server Error'})
    }
};

//POST /users/Generate
export const generateUsers = async (req, res) => {
    const { count = 10, gender } = req.body;
console.log(req.body)
    try {
        const users = Array.from({ length: count }, () => generateUser(gender));
        console.log("Generated Users: ", users);
        const saved = await fakeUser.insertMany(users);

        fs.writeFileSync('user.json', JSON.stringify(saved, null, 2));
        res.status(201).json(saved)
    } catch (error) {
        res.status(500).json({error: "Failed to generate users"})
    };
};

//GET /users/exports/csv
export const exportUsersCsv = async (req, res) => {
    try {
        const users = await fakeUser.find();
        // const file = await exportUsersCsv(users);
        const file = await exportToCsv(users);
        res.download(file, 'users.csv');
    } catch (error) {
        res.status(500).json({ error: 'CSV export failed' })
    }
};
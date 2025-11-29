import express from "express";

const mainrouter = express.Router();

mainrouter.get('/', (req, res) => {
    let resObj = {
        srNo: 5,
        course: "Web Development",
        creditHours: 3
    }
    res.json(resObj);
})

export default mainrouter;
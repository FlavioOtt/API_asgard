const express = require("express");

const router = express.Router();

router.get("/", (req, res, net) => {
    res.status(200).send(`<h1>API ASGARD RP</h1>`)
})

module.exports = router;
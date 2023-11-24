// Imports & supporting NPM modules
const router = require("express").Router();
const { Tutorials } = require("../../models");

// Route to get all Tutorials
router.get("/", async (req, res) => {
    try {
        const tutorialData = await Tutorials.findAll()
    } catch (err) {
        res.status(500).json(err)
    }
})

// Exports
module.exports = router;

// Imports & supporting NPM modules
const router = require("express").Router();
const { Users } = require("../../models");

// Route to Create a new User
router.post("/", async (req, res) => {
	try {
		const userData = await Users.create(req.body);

		// Saving Session to cookies to persist login
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;

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

// Route to login user if registered
router.post("/login", async (req, res) => {
	try {
		const userData = await Users.findOne({
			where: { username: req.body.username },
		});

		// Checking if username exists or is correct
		if (!userData) {
			res
				.status(400)
				.json({ message: "Incorrect Username or Password, please try again!" });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		// Checking if Password is correct
		if (!validPassword) {
			res
				.status(400)
				.json({ message: "Incorrect Username or Password, please try again!" });
			return;
		}

		// Saving session
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.username = userData.username;
			req.session.logged_in = true;

			console.log("Logged-in User ID: ", req.session.user_id);

			res
				.status(200)
				.json({ user: userData, message: "You are now logged in!" });
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to logout user if logged in
router.get("/logout", (req, res) => {
	// If user is logged in, destroying (deleting) their current session
	if (req.session.logged_in) {
		req.session.destroy(() => {
			// Redirecting user to login page
			res.redirect("/login");
		});
	} else {
		// If user is not logged in, redirecting them to login page as well
		res.redirect("/login");
	}
});

// Exports
module.exports = router;

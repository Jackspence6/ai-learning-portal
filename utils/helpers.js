module.exports = {
	console_log: (context) => {
		console.log(context);
	},
	json: function (context) {
		return JSON.stringify(context);
	},
};

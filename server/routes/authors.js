const express = require("express");
const router = express.Router();

router.get(req, res, next, () => {
	console.log("authors route");
});

router.post(req, res, next, () => {
	console.log("authors post route");
	res.send({ message: "hello world!" });
});

router.put(req, res, next, () => {
	console.log("authors post route");
	res.send({ message: "hello world!" });
});

router.patch(req, res, next, () => {
	console.log("authors post route");
	res.send({ message: "hello world!" });
});

router.delete(req, res, next, () => {
	console.log("authors post route");
	res.send({ message: "hello world!" });
});

module.exports = router;

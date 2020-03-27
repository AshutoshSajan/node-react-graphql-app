const express = require("express");
const router = express.Router();

router.get(req, res, next, () => {
	console.log("books get route");
});

router.post(req, res, next, () => {
	console.log("books get route");
});

router.put(req, res, next, () => {
	console.log("books get route");
});

router.patch(req, res, next, () => {
	console.log("books get route");
});

router.delete(req, res, next, () => {
	console.log("books get route");
});

module.exports = router;

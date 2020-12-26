import express from 'express';

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
    res.json("Hello");
});

export { router as signinRouter };
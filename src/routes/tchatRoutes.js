import { Router } from "express";

const router = Router();

router
.get('/tchat', (req, res) => {
    res.render('tchat');
})

export default router;
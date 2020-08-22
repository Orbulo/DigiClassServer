import express from 'express';
import getClassroom from './getClassroom';
const router = express.Router();

router.get('/', getClassroom);


module.exports = router;

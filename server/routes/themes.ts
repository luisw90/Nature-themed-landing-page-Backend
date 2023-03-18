const express = require("express");
const router = express.Router()
import express, {
  Request, Response,
} from 'express';
import {
  getTheme,
} from '../db/index';

router.get('/:themeid', async (req: Request, res: Response) => {
  const themeid = req.params.themeid.toString();
  const data = await getTheme(themeid);
  return res.status(200).json(data);
})

module.exports = router
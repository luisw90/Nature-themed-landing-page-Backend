const express = require("express");
const router = express.Router()
import express, {
  Request, Response,
} from 'express';
import {
  saveItem, deleteItem, getItems,
} from '../db/index';


router.get('/:userId', async (req: Request, res: Response) => {
  const id = req.params.userId.toString();
  const data = await getItems(id);
  return res.status(200).json(data);
})

router.post('/:userId', async (req: Request, res: Response) => {
  const id = req.params.userId.toString();
  const item = req.body;
  const data = await saveItem(item, id);
  return res.status(200).json(data);
})

router.delete('/:userId', async (req: Request, res: Response) => {
  const userid = req.params.userId.toString();
  const itemid = req.body.itemid;
  const data = await deleteItem(userid, itemid);
  return res.status(200).json(data);
})

module.exports = router
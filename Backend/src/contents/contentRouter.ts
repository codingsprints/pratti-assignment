import express from 'express';
import { contentValidator } from '../common/validation/contentValidator';
import { validate } from '../common/validation/ValidationChain';
import {
  contentCreate,
  deleteContent,
  getContents,
  getSingleContent,
  updateContent,
} from './contentController';

const router = express.Router();

router.post('/', validate(contentValidator), contentCreate);
router.get('/', getContents);
router.get('/:id', getSingleContent);
router.put('/:id', validate(contentValidator), updateContent);
router.delete('/:id', deleteContent);

export default router;

import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/note.controller.js';

const router = express.Router();

router.post('/',createNote);
router.get('/',getNotes);
router.patch('/:id', isAuthenticated, updateNote);
router.delete('/:id', isAuthenticated, deleteNote);

export default router;

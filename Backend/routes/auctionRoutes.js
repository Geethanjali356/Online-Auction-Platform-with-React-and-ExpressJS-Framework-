const express = require('express');
const { deleteAuction } = require('../controllers/auctionController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// DELETE auction by ID
router.delete('/:id', authMiddleware, deleteAuction);

module.exports = router;

const { editAuction } = require('../controllers/auctionController');

// PUT to edit auction details
router.put('/:id', authMiddleware, editAuction);

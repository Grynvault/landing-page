import express from 'express';
import { competitors, matchCompetitors } from '../models/competitors';

const router = express.Router();

// Get all competitors
router.get('/', (req, res) => {
  res.status(200).json(competitors);
});

// Get a specific competitor by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const competitor = competitors.find(c => c.id === id);
  
  if (!competitor) {
    return res.status(404).json({ message: 'Competitor not found' });
  }
  
  res.status(200).json(competitor);
});

// Match competitors based on preferences
router.post('/match', (req, res) => {
  const preferences = req.body;
  const matches = matchCompetitors(preferences);
  
  res.status(200).json({
    count: matches.length,
    matches: matches
  });
});

export default router;
const express = require('express');
const router = express.Router();
const Superhero = require('../models/Superhero');

// @route   GET /api/superheroes
// @desc    Get all superheroes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, alignment, universe } = req.query;
    let query = {};

    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Add filter by alignment
    if (alignment && ['hero', 'villain'].includes(alignment)) {
      query.alignment = alignment;
    }

    // Add filter by universe
    if (universe && ['marvel', 'dc', 'other'].includes(universe)) {
      query.universe = universe;
    }

    const superheroes = await Superhero.find(query).sort({ createdAt: -1 });
    res.json(superheroes);
  } catch (error) {
    console.error('Error fetching superheroes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/superheroes/:id
// @desc    Get superhero by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    
    if (!superhero) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    res.json(superhero);
  } catch (error) {
    console.error('Error fetching superhero:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Superhero not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/superheroes
// @desc    Create a new superhero
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, realName, powers, originStory, imageUrl, alignment, universe } = req.body;

    // Check if superhero with same name already exists
    const existingSuperhero = await Superhero.findOne({ name: name.trim() });
    if (existingSuperhero) {
      return res.status(400).json({ message: 'A superhero with this name already exists' });
    }

    const superhero = new Superhero({
      name: name.trim(),
      realName: realName.trim(),
      powers: powers.map(power => power.trim()).filter(power => power.length > 0),
      originStory: originStory.trim(),
      imageUrl: imageUrl.trim(),
      alignment,
      universe
    });

    const savedSuperhero = await superhero.save();
    res.status(201).json(savedSuperhero);
  } catch (error) {
    console.error('Error creating superhero:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/superheroes/:id
// @desc    Update a superhero
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { name, realName, powers, originStory, imageUrl, alignment, universe } = req.body;

    // Check if another superhero with same name exists (excluding current one)
    const existingSuperhero = await Superhero.findOne({ 
      name: name.trim(), 
      _id: { $ne: req.params.id } 
    });
    if (existingSuperhero) {
      return res.status(400).json({ message: 'A superhero with this name already exists' });
    }

    const superhero = await Superhero.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        realName: realName.trim(),
        powers: powers.map(power => power.trim()).filter(power => power.length > 0),
        originStory: originStory.trim(),
        imageUrl: imageUrl.trim(),
        alignment,
        universe
      },
      { new: true, runValidators: true }
    );

    if (!superhero) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    res.json(superhero);
  } catch (error) {
    console.error('Error updating superhero:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Superhero not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/superheroes/:id
// @desc    Delete a superhero
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findByIdAndDelete(req.params.id);

    if (!superhero) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    res.json({ message: 'Superhero deleted successfully' });
  } catch (error) {
    console.error('Error deleting superhero:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Superhero not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
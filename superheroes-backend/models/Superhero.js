const mongoose = require('mongoose');

const superheroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Superhero name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  realName: {
    type: String,
    required: [true, 'Real name is required'],
    trim: true,
    maxlength: [100, 'Real name cannot be more than 100 characters']
  },
  powers: [{
    type: String,
    required: true,
    trim: true
  }],
  originStory: {
    type: String,
    required: [true, 'Origin story is required'],
    trim: true,
    maxlength: [1000, 'Origin story cannot be more than 1000 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/i.test(v);
      },
      message: 'Please provide a valid image URL'
    }
  },
  alignment: {
    type: String,
    required: [true, 'Alignment is required'],
    enum: {
      values: ['hero', 'villain'],
      message: 'Alignment must be either hero or villain'
    }
  },
  universe: {
    type: String,
    required: [true, 'Universe is required'],
    enum: {
      values: ['marvel', 'dc', 'other'],
      message: 'Universe must be marvel, dc, or other'
    }
  }
}, {
  timestamps: true
});

// Create text index for search functionality
superheroSchema.index({ name: 'text', realName: 'text' });

module.exports = mongoose.model('Superhero', superheroSchema);
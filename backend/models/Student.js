const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  enrollmentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);
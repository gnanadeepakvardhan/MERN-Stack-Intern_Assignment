const express = require('express');
const Student = require('../models/Student');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

// Admin: Get all students
router.get('/', auth, role('admin'), async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Admin: Add student
router.post('/', auth, role('admin'), async (req, res) => {
  const { name, email, course } = req.body;
  try {
    const student = new Student({ name, email, course });
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Admin: Edit student
router.put('/:id', auth, role('admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Admin: Delete student
router.delete('/:id', auth, role('admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json({ msg: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Student: Get own profile
router.get('/me', auth, role('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ msg: 'Profile not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Student: Update own profile
router.put('/me', auth, role('student'), async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ msg: 'Profile not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
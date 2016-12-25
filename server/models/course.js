const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = new Schema({
    name: String,
    students: Array,
    assignments: Array,
    instructor: String,
    instructorID: ObjectId
});

const ModelClass = mongoose.model('course', courseSchema);

module.exports = ModelClass;
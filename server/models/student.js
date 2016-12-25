const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    name: String,
    courses: Array,
    assignments: Array
});

studentSchema.methods.calculateGrade = function (course) {
    if(this.assignments.length > 0) {
        var score = 0;
        var total = 0;
        this.assignments.map((assignment) => {
            if(assignment.course === course){
                score += assignment.grade;
                total += assignment.possibleAmount;
            }
        });
        return total / length;
    }
    return 0;
}

const ModelClass = mongoose.model('student', studentSchema);

module.exports = ModelClass;
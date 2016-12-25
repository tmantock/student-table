const Student = require('../models/student');

exports.getStudents = function (req, res, next) {
    Student.find({ courses: { $elemMatch: { instructor: req.body.instructor }}}, function(err, students) {
        if (err) { 
            console.log(err);
            return next(err); 
        }
        
        if(students.length > 0){
            students.map((student) => {
                student.courses.map((course) => {
                   let courseGrade = student.calculateGrade(course);
                   course.grade = courseGrade;
                });
            });
            res.json({
                success: true,
                students: students
            });
        } else {
            res.json({
                success: false,
                message: "No students enrolled"
            });
        }
    });
    
    
}

exports.addStudent = function (req, res, next) {
    const name = req.body.name;
    const course = req.body.course;
    const instructor = req.body.instructor;

    if(!name || !course) {
        return res.status(422).send({ error: 'You must provide a name and course'});
    }

    Student.findOne({ name: name }, function (err, existingStudent) {
        if (err) { return next(err); }

        courseObj = {
            name: course,
            instructor: instructor
        };

        if(existingStudent) {
            Student.update({ _id: existingStudent._id}, { $addToSet: { courses: courseObj }}, function(err, x) {
                if (err) { 
                    console.log(err);
                    return next(err);
                }
                return res.status(200).json({ success: true, message: `Course added to ${name}`});
            });
        }

        const student = new Student({
            name: name,
            courses: [courseObj],
            assignments: []
        });

        student.save(function (err) {
            if (err) { return next(err); }

            res.json({ success: true, message: `Created student ${name}`});
        })
    })
}
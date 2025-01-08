var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var UniversityError = /** @class */ (function (_super) {
    __extends(UniversityError, _super);
    function UniversityError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "UniversityError";
        return _this;
    }
    return UniversityError;
}(Error));
var University = /** @class */ (function () {
    function University(name) {
        this.courses = [];
        this.groups = [];
        this.people = [];
        this.name = name;
    }
    University.prototype.addCourse = function (course) {
        this.courses.push(course);
    };
    University.prototype.addGroup = function (group) {
        this.groups.push(group);
    };
    University.prototype.addPerson = function (person) {
        this.people.push(person);
    };
    University.prototype.findGroupByCourse = function (course) {
        return this.groups.find(function (group) { return group.course === course; });
    };
    University.prototype.getAllPeopleByRole = function (role) {
        switch (role) {
            case "student":
                return this.people.filter(function (person) { return person.role === "student"; });
            case "teacher":
                return this.people.filter(function (person) { return person.role === "teacher"; });
            default:
                return this.assertNeverRole(role);
        }
    };
    University.prototype.assertNeverRole = function (role) {
        throw new Error("Unhandled role: ".concat(role));
    };
    return University;
}());
var Course = /** @class */ (function () {
    function Course(name, credits, discipline) {
        this.name = name;
        this.credits = credits;
        this.discipline = discipline;
    }
    return Course;
}());
var Group = /** @class */ (function () {
    function Group(name, course, teacher) {
        this.students = [];
        this.name = name;
        this.course = course;
        this.teacher = teacher;
    }
    Group.prototype.addStudent = function (student) {
        if (this.students.includes(student)) {
            throw new UniversityError("Student is already in the group");
        }
        this.students.push(student);
    };
    Group.prototype.removeStudentById = function (id) {
        var index = this.students.findIndex(function (student) { return student.id === id; });
        if (index === -1) {
            throw new UniversityError("Student not found in group");
        }
        this.students.splice(index, 1);
    };
    Group.prototype.getAverageGroupScore = function () {
        if (this.students.length === 0) {
            return 0; // No students in the group, so average score is 0
        }
        var totalScore = this.students.reduce(function (sum, student) { return sum + student.getAverageScore(); }, 0);
        return totalScore / this.students.length;
    };
    Group.prototype.getStudents = function () {
        return __spreadArray([], this.students, true);
    };
    Group.prototype.getStudentById = function (id) {
        if (Array.isArray(id)) {
            return this.students.filter(function (student) { return id.includes(student.id); });
        }
        return this.students.find(function (student) { return student.id === id; });
    };
    return Group;
}());
var Person = /** @class */ (function () {
    function Person(info, role) {
        var firstName = info.firstName, lastName = info.lastName, birthDay = info.birthDay, gender = info.gender, email = info.email, phone = info.phone;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDay = birthDay;
        this.id = Person.nextId++;
        this.gender = gender;
        this.contactInfo = { email: email, phone: phone };
        this.role = role;
    }
    Object.defineProperty(Person.prototype, "fullName", {
        get: function () {
            return $;
            {
                this.lastName;
            }
            $;
            {
                this.firstName;
            }
            ;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "age", {
        get: function () {
            var today = new Date();
            var age = today.getFullYear() - this.birthDay.getFullYear();
            var monthDiff = today.getMonth() - this.birthDay.getMonth();
            if (monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < this.birthDay.getDate())) {
                age--;
            }
            return age;
        },
        enumerable: false,
        configurable: true
    });
    Person.nextId = 1;
    return Person;
}());
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher(info, specializations) {
        if (specializations === void 0) { specializations = []; }
        var _this = _super.call(this, info, "teacher") || this;
        _this.specializations = [];
        _this.courses = [];
        _this.specializations = specializations;
        return _this;
    }
    Teacher.prototype.assignCourse = function (course) {
        this.courses.push(course);
    };
    Teacher.prototype.removeCourse = function (courseName) {
        this.courses = this.courses.filter(function (course) { return course.name !== courseName; });
    };
    Teacher.prototype.getCourses = function () {
        return __spreadArray([], this.courses, true);
    };
    return Teacher;
}(Person));
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(info) {
        var _this = _super.call(this, info, "student") || this;
        _this.academicPerformance = {
            totalCredits: 0,
            gpa: 0,
        };
        _this.enrolledCourses = [];
        _this.status = "active";
        return _this;
    }
    Student.prototype.enrollCourse = function (course) {
        if (this.status !== "active") {
            throw new UniversityError("Cannot enroll: Student is not in active status");
        }
        this.enrolledCourses.push(course);
        this.academicPerformance.totalCredits += course.credits;
    };
    Student.prototype.getAverageScore = function () {
        return this.academicPerformance.gpa;
    };
    Student.prototype.updateAcademicStatus = function (newStatus) {
        this.status = newStatus;
    };
    Student.prototype.getEnrolledCourses = function () {
        return __spreadArray([], this.enrolledCourses, true);
    };
    return Student;
}(Person));
var defaultContact = {
    email: "info@university.com",
    phone: "+380955555555",
};

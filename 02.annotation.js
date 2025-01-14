class UniversityError extends Error {
  constructor(message) {
    super(message);
    this.name = "UniversityError";
  }
}

class University {
  name;
  courses = [];
  groups = [];
  people = [];

  constructor(name) {
    this.name = name;
  }

  addCourse(course) {
    this.courses.push(course);
  }

  addGroup(group) {
    this.groups.push(group);
  }

  addPerson(person) {
    this.people.push(person);
  }

  findGroupByCourse(course) {
    return this.groups.find((group) => group.course === course);
  }

  getAllPeopleByRole(role) {
    switch (role) {
      case "student":
        return this.people.filter((person) => person.role === "student");
      case "teacher":
        return this.people.filter((person) => person.role === "teacher");
      default:
        return this.assertNeverRole(role);
    }
  }

  assertNeverRole(role) {
    throw new Error(`Unhandled role: ${role}`);
  }
}

class Course {
  name;
  credits;
  discipline;

  constructor(name, discipline, credits) {
    this.name = name;
    this.credits = credits;
    this.discipline = discipline;
  }
}

class Group {
  name;
  course;
  teacher;
  students = [];

  constructor(name, course, teacher) {
    this.name = name;
    this.course = course;
    this.teacher = teacher;
  }

  addStudent(student) {
    if (this.students.includes(student)) {
      throw new UniversityError("Student is already in the group");
    }

    this.students.push(student);
  }

  removeStudentById(id) {
    const index = this.students.findIndex((student) => student.id === id);

    if (!~index) {
      throw new UniversityError("Student not found in group");
    }

    this.students.splice(index, 1);
  }

  getAverageGroupScore() {
    if (this.students.length) {
      return 0;
    }

    const totalScore = this.students.reduce(
      (sum, student) => sum + student.getAverageScore(),
      0
    );

    return totalScore / this.students.length;
  }

  getStudents() {
    return [...this.students];
  }
}

class Person {
  static nextId = 1;

  firstName;
  lastName;
  birthDay;
  id;
  gender;
  contactInfo;
  role;

  constructor(info, role) {
    const { firstName, lastName, birthDay, gender, email, phone } = info;

    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDay = birthDay;
    this.id = Person.nextId++;
    this.gender = gender;
    this.contactInfo = { email, phone };
    this.role = role;
  }

  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  }

  get age() {
    const today = new Date();
    let age = today.getFullYear() - this.birthDay.getFullYear();
    const monthDiff = today.getMonth() - this.birthDay.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < this.birthDay.getDate())
    ) {
      age--;
    }

    return age;
  }
}

class Teacher extends Person {
  specializations = [];
  courses = [];

  constructor(info, specializations = []) {
    super(info, "teacher");
    this.specializations = specializations;
  }

  assignCourse(course) {
    this.courses.push(course);
  }

  removeCourse(courseName) {
    this.courses = this.courses.filter((course) => course.name !== courseName);
  }

  getCourses() {
    return [...this.courses];
  }
}

class Student extends Person {
  academicPerformance = {
    totalCredits: 0,
    gpa: 0,
  };
  enrolledCourses = [];
  status;

  constructor(info) {
    super(info, "student");
    this.status = "active";
  }

  enrollCourse(course) {
    if (this.status !== "active") {
      throw new UniversityError(
        "Cannot enroll: Student is not in active status"
      );
    }

    this.enrolledCourses.push(course);
    this.academicPerformance.totalCredits += course.credits;
  }

  getAverageScore() {
    return this.academicPerformance.gpa;
  }

  updateAcademicStatus(newStatus) {
    this.status = newStatus;
  }

  getEnrolledCourses() {
    return [...this.enrolledCourses];
  }
}

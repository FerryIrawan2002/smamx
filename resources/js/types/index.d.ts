export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: string;
    teacher: Teacher;
    student: Student;
}

interface Teacher {
    id: number;
    user_id: number;
    nip: string;
    gender: string;
    phone_number: string;
    education: string;
    photo: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        copy_password: string;
        role: string;
        status: number;
        deleted_at: string | null;
        created_at: string;
        updated_at: string;
    };
}

interface Student {
    id: number;
    user_id: number;
    class_room_id: number;
    nisn: string;
    gender: string;
    entry_year: number;
    phone_number: string;
    deleted_at: null;
    created_at: string;
    updated_at: string;
}
interface Course {
    id: number;
    course_name: string;
    photo: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface Schedule {
    id: number;
    class_teacher_id: string;
    day: string;
    time_start: string;
    time_end: string;
    status: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Learn {
    id: number;
    class_teacher_id: string;
    week: string;
    desc: string;
    status: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    learnfile: LearnFile[];
}

interface LearnFile {
    id: number;
    name: string;
    file: string;
    learn_id: number;
    status: number;
    deleted_at: string;
    created_at: string;
    updated_at: string;
}
interface StudentClass {
    id: string;
    class_room_id: number;
    teacher_id: number;
    course_id: number;
    status: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    teacher: Teacher;
    course: Course;
    schedules: Schedule[];
    learn: Learn[];
    exams: Exam[];
}

export interface Class {
    id: number;
    class_name: string;
    major: string;
    photo: string;
    status: number;
    deleted_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    students: Student[];
}

interface ClassTeacherCourse {
    id: string;
    class_room_id: number;
    teacher_id: number;
    course_id: number;
    status: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    class_room: Class;
    teacher: Teacher;
    course: Course;
    schedules: Schedule[];
    tasks: Task[];
}

interface Task {
    id: number;
    class_teacher_id: string;
    name: string;
    desc: string;
    deadline: string;
    created_at: string;
    updated_at: string;
    status: number;
    task_group: TaskGroup[];
}

interface ClassTask {
    id: number;
    class_teacher_id: string;
    name: string;
    desc: string;
    deadline: string;
    created_at: string;
    updated_at: string;
}

interface ExamGroup {
    id: number;
    exam_id: number;
    student_id: number;
    status: string;
    point: number;
    file_name: string;
    created_at: string;
    updated_at: string;
}
interface Exam {
    id: number;
    class_teacher_id: string;
    name_exam: string;
    exam_date: string;
    url: string;
    status: number;
    created_at: string;
    updated_at: string;
    exam_group: ExamGroup[];
}

interface TaskGroup {
    id: number;
    task_id: number;
    student_id: number;
    status: string;
    point: number;
    file: string;
    file_name: string;
    created_at: string;
    updated_at: string;
}
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    flash: {
        success: string;
        error: string;
    };
    classes: Class[];
    courses: Course[];
    teachers: Teacher[];
    classTeacherCourses: ClassTeacherCourse[];
};

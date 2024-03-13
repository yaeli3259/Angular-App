import { Category } from "./category.model";

export enum LearningMode {
    Frontal = 0,
    Zoom = 1
}

export class Course {
    code: string;
    name: string;
    category: Category;
    lessonCount: number;
    startDate: Date;
    syllabus: string[];
    learningMode: LearningMode;
    instructorCode: string;
    image: string;

    constructor(
        code: string,
        name: string,
        category: Category,
        lessonCount: number,
        startDate: Date,
        syllabus: string[],
        learningMode: LearningMode,
        instructorCode: string,
        image: string
    ) {
        this.code = code;
        this.name = name;
        this.category = category;
        this.lessonCount = lessonCount;
        this.startDate = startDate;
        this.syllabus = syllabus;
        this.learningMode = learningMode;
        this.instructorCode = instructorCode;
        this.image = image;
    }
}

export interface User {
    id?: number;
    username?: string;
    password?: string;
    role?: string;
    deleted?: number;
}

export interface Menu {
    id?: number;
    menuName?: string;
    role?: string;
    path?: string;
}

export interface queryInfo {
    query?: string;
    pageNum?: number;
    pageSize?: number;

}

export interface Laboratory {
    id?: number;
    laboratoryName?: string;
    img?: string;
    peopleAmount?: number;
    machineAmount?: number;
    number?: string;
}

export interface TimeTableQuery {
    id?: number;
    laboratory?: string;
    week?: string;
    weekDay?: number;
    lesson?: number;
}

export interface ResultVO {
    code?: number;
    message?: string;
    data?: Map<string, any>;
}

export interface TimeTable {
    id?: number;
    week?: number;
    weekDay?: number;
    lesson?: number;
    state?: number;
    laboratoryId?: number;
    courseName?: string;
}

export interface Course {
    id?: number;
    weekLength?: number;
    timeLength?: number;
    weekNumber?: number;
    teacherId?: number;
    state?: number;
    courseName?: string;
    summaryTime?: number;
    lessonStartTime?: number[];
    weekStartTime?: number[];
}

export interface CourseSelectList {
    weekDay:number[];
    lesson: number[];
    week: number;
}



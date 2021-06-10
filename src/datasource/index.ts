import {Store, useStore} from "vuex";
import {State} from "../store";
import {computed} from "vue";

export interface User {
    id?: number | null;
    username?: string | null;
    password?: string | null;
    role?: string | null;
    deleted?: number | null;
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
    weekDay: number[];
    lesson: number[];
    week: number;
}





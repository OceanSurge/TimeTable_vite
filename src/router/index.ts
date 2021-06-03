import {createRouter, createWebHashHistory} from "vue-router";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/Login'
        }, {
            path: '/Login',
            component: () => import("@/components/Login.vue")
        }, {
            path: '/Main',
            component: () => import("@/components/Main.vue"),
            redirect: "/welcome",
            children: [
                {
                    path: "/welcome",
                    component: () => import("@/components/Welcome.vue")
                }, {
                    path: "/TeacherManage",
                    component: () => import("@/components/admin/TeacherManage.vue")
                }, {
                    path: "/updateTeacher",
                    component: () => import("@/components/admin/updateTeacher.vue")
                }, {
                    path: "/addTeacher",
                    component: () => import("@/components/admin/addTeacher.vue")
                }, {
                    path: "/TimeTableDetails",
                    component: () => import("@/components/admin/TimeTableDetails.vue")
                }, {
                    path: "/LaboratoryManage",
                    component: () => import("@/components/admin/LaboratoryManage.vue")
                }, {
                    path: "/addLaboratory",
                    component: () => import("@/components/admin/addLaboratory.vue")
                }, {
                    path: "/manageCourse",
                    component: () => import("@/components/teacher/manageCourse.vue")
                }, {
                    path: "/selectCourse",
                    component: () => import("@/components/teacher/selectCourse.vue")
                }, {
                    path: "/addCourse",
                    component: () => import("@/components/teacher/addCourse.vue")
                }, {
                    path: "/teacherTimeTableDetails",
                    component: () => import("@/components/teacher/teacherTimeTableDetails.vue")
                },
            ]
        }
    ]
})

export default router;
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/home/home.vue'

import TestUsers from 'views/test/users/testUsers.vue'
import TestUsersAdd from 'views/test/users/TestUsersAdd.vue'
import TestVideos from 'views/test/videos/testVideos.vue'
import TestLiveRooms from 'views/test/liveRooms/testLiveRooms.vue'

import Course from 'views/courseGrade/course/Course.vue'
import Grade from 'views/courseGrade/grade/Grade.vue'
import CourseGrade from 'views/courseGrade/courseGrade/CourseGrade.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },

  {
    path: "/testuser",
    component: TestUsers
  },
  {
    path: "/testuser/add",
    component: TestUsersAdd
  },
  {
    path: "/testVideos",
    component: TestVideos
  },
  {
    path: "/testLiveRooms",
    component: TestLiveRooms
  },

  {
    path: "/couser",
    component: Course
  },
  {
    path: "/grade",
    component: Grade
  },
  {
    path: "/courseGrade",
    component: CourseGrade
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

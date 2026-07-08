import { createRouter, createWebHistory } from 'vue-router'
import Register from '../Views/Register.vue';
import Home from '../Views/Home.vue';
import Users from '../Views/Users.vue';

const routes = [

 { path: '/Home',          component: Home         },
{path: '/register',          component: Register         },
{path: '/users',          component: Users         }
  //{ path: '/:pathMatch(.*)*', component: NotFound   },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
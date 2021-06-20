import Vue from 'vue'
import Router from 'vue-router'
import Team from "@/components/Team.vue";
import Config from '@/components/ConfigPages/Config.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/team',
      name: 'team-page',
      component: Team
    },
    {
      path: '/',
      name: 'team-page',
      component: Config
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

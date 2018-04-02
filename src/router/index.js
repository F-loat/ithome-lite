import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

export default new Router({
  routes: routes.map(route => {
    const paths = route.path.replace(/^\//, '').split('/')
    route.component = () => import(`@/${paths[0]}/${paths[1]}/${paths[2]}`)
    return route
  }),
  mode: 'history'
})

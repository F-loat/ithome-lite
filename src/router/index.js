import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import * as components from './components'

Vue.use(Router)

export default new Router({
  routes: routes.map(route => {
    const name = route.path
      .replace(/^\//, '')
      .replace(/\/(\w)/g, (match, $1) => $1.toUpperCase())
    return {
      ...route,
      component: components[name]
    }
  }),
  mode: 'history'
})

import RouterComponent from '../components/router.jo'

export let currentRoute = null

export default function Router(routes) {

  const routeChangedCallbacks = []

  this.addRouteChangedCallback = (callback) => {
    routeChangedCallbacks.push(callback)
  }

  this.getRouteFromPath = (path) => {
    for (let route of routes) {
      if (route.url === path) {
        return route
      }
    }
    return null
  }
  
  window.addEventListener('popstate', () => {
    this.routeChangedCallbacks.forEach(callback => {
      let newRoute = this.getRouteFromPath(document.location.pathname)
      currentRoute = newRoute
      callback(newRoute)
    })
  })

  let newRoute = this.getRouteFromPath(document.location.pathname)
  currentRoute = newRoute
  
  window.__elljo_router__ = this
}

Router.prototype.init = (elljo) => {
  elljo.addComponent('Router', RouterComponent)
}
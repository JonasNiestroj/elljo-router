import RouterComponent from '../components/router.jo'

export let currentRoute = null

export default function Router(routes) {

  const routeChangedCallbacks = []
  const parsedRoutes = []

  this.addRouteChangedCallback = (callback) => {
    routeChangedCallbacks.push(callback)
  }

  this.getRouteFromPath = (path) => {
    const splittedPath = path.split("/")
    for (let route of parsedRoutes) {
      if (route.parts.length !== splittedPath.length) {
        continue
      }
      let matchesPath = true
      for (let [index, part] of route.parts.entries()) {
        if (part.part !== splittedPath[index] && !part.paramName) {
          matchesPath = false
        }
      }
      if (matchesPath) {
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
  
  routes.forEach(route => {
    const urlParts = route.url.split("/")
    const parsedRoute = { ...route }
    const parts = []
    urlParts.forEach(part => {
      if (!part.startsWith("{") && !part.endsWith("}")) {
        parts.push({
          part
        })
      } else {
        const paramName = part.replace("{", "").replace("}", "")
        parts.push({
          part,
          paramName
        })
      }
    })
    parsedRoute.parts = parts
    parsedRoutes.push(parsedRoute)
  })

  window.__elljo_router__ = this
}

Router.prototype.init = (elljo) => {
  elljo.addComponent('Router', RouterComponent)
}
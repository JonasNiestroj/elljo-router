function Router(routes) {

  routeChangedCallbacks = [];
  routes = [];
  
  window.addEventListener('popstate', () => {
    this.routeChangedCallbacks.forEach(callback => {
      const newRoute = null;
      routes.forEach(route => {
        if (route.url === document.location.pathname) {
          newRoute = route;
        }
      });
      callback(newRoute);
    });
  });
}

export default Router;

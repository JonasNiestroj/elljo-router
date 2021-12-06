import { EllJoComponent } from 'elljo-runtime';

const elementCache = {};
			elementCache.div = document.createElement("div");
		class router extends EllJoComponent {
			constructor(options, props, events) {
				super(options, props, events);
				this.init(options, props, events);
			}

			update() {
				super.update();
			}

			init(options, props, events) {
				
const router = window.__elljo_router__;

if(!router) {
  // TODO: Add better error
  console.error("no router");
}
const id = Math.random().toString(36).substring(9);
let currentRoute = null;

const routeChanged = (route) => {
  if(currentRoute && currentRoute !== route) {
    currentRoute.teardown();
  }
  if(route) {
    this.oldState.currentRoute = currentRoute; this.updateValue('currentRoute', currentRoute = route);
    window.__elljo__.mount(route.component, '#' + id);
  }
};

router.addRouteChangedCallback(routeChanged);

const render = (target, anchor ) => {
		
		var element_1 = elementCache.div.cloneNode(true);
		element_1["id"] = id;

target.appendChild(element_1);


			window.requestAnimationFrame(() => {
				const callbacks = this.$.afterRender;
				for(let i = 0; i < callbacks.length; i++) {
					callbacks[i]();
				}
			});
			
		return {
			update: () => {
				if(this.idIsDirty) {
								element_1["id"] = id;
							}
			},
			teardown: () => {
				element_1.parentNode.removeChild(element_1);
			}
		}
	};

						

				this.$.mainFragment = render(options.target);
				this.queueUpdate();
			}
		}

let currentRoute = null;

function Router(routes) {

  this.addRouteChangedCallback = (callback) => {
  };

  this.getRouteFromPath = (path) => {
    for (let route of routes) {
      if (route.url === path) {
        return route
      }
    }
    return null
  };
  
  window.addEventListener('popstate', () => {
    this.routeChangedCallbacks.forEach(callback => {
      let newRoute = this.getRouteFromPath(document.location.pathname);
      currentRoute = newRoute;
      callback(newRoute);
    });
  });

  let newRoute = this.getRouteFromPath(document.location.pathname);
  currentRoute = newRoute;
  
  window.__elljo_router__ = this;
}

Router.prototype.init = (elljo) => {
  elljo.addComponent('Router', router);
};

export { currentRoute, Router as default };
//# sourceMappingURL=index.js.map

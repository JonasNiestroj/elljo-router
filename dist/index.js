let currentComponent = null;

const setComponent = (component) => {
  currentComponent = component;
};

const afterRender = (callback) => {
  if (!currentComponent) {
    return
  }
  currentComponent.$.afterRender.push(callback);
};

class EllJoComponent {
  constructor(options, props, events) {
    this.$ = {};
    this.$.afterRender = [];
    this.$.beforeDestroy = [];
    this.$.mounted = [];
    this.$.update = [];
    this.$props = {};
    this.$events = {};
    this.oldState = {};
    this.updating = false;
    setComponent(this);

    if (events) {
      Object.keys(events).forEach((event) => {
        if (!this.$events[event]) {
          this.$events[event] = [events[event]];
        } else {
          this.$events[event].push(events[event]);
        }
      });
    }

    this.$event = (name) => {
      var callbacks = this.$events[name];
      if (callbacks) {
        const args = [];
        for (let i = 1; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        callbacks.forEach((callback) => callback(...args));
      }
    };

    this.utils = {
      diffArray: function diffArray(one, two) {
        if (!Array.isArray(two)) {
          return one.slice();
        }

        var tlen = two.length;
        var olen = one.length;
        var idx = -1;
        var arr = [];

        while (++idx < olen) {
          var ele = one[idx];

          var hasEle = false;
          for (var i = 0; i < tlen; i++) {
            var val = two[i];

            if (ele === val) {
              hasEle = true;
              break;
            }
          }

          if (hasEle === false) {
            arr.push({ element: ele, index: idx });
          }
        }
        return arr;
      },
    };
  }

  updateValue(name, func) {
    currentComponent[name + 'IsDirty'] = true;
    currentComponent.queueUpdate();
  }

  update() {
    const callbacks = this.$.update;
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
    this.updating = false;
    this.$.mainFragment.update();
    this.oldState = {};
  }

  queueUpdate() {
    if (!this.updating) {
      this.updating = true;
      Promise.resolve().then(() => this.update());
    }
  }

  teardown() {
    const callbacks = this.$.beforeDestroy;
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
    this.$.mainFragment.teardown();
    this.$.mainFragment = null;
  }
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const CHARACTERS_LENGTH = CHARACTERS.length;

const generateId = (length) => {
  var result = '';
  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS_LENGTH));
  }
  return result;
};

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
const id = generateId(4);

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

const initRoute = () => {
  routeChanged(router.getRouteFromPath(document.location.pathname));
};

afterRender(initRoute);

const render = (target, anchor ) => {
		
				var element_1 = elementCache.div.cloneNode(true);
			element_1.setAttribute("id", id);

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
								element_1.setAttribute("id", id);
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

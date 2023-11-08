System.register([], function (_export, _context) {
  "use strict";

  var CjsLoader;
  return {
    setters: [],
    execute: function () {
      CjsLoader = class CjsLoader {
        constructor() {
          this._registry = {};
          this._moduleCache = {};
        }
        /**
         * Defines a CommonJS module.
         * @param id Module ID.
         * @param factory The factory.
         * @param resolveMap An object or a function returning object which records the module specifier resolve result.
         * The later is called as "deferred resolve map" and would be invocated right before CommonJS code execution.
         */


        define(id, factory, resolveMap) {
          this._registry[id] = {
            factory,
            resolveMap
          };
        }
        /**
         * Requires a CommonJS module.
         * @param id Module ID.
         * @returns The module's `module.exports`.
         */


        require(id) {
          return this._require(id);
        }

        throwInvalidWrapper(requestTarget, from) {
          throw new Error("Module '" + requestTarget + "' imported from '" + from + "' is expected be an ESM-wrapped CommonJS module but it doesn't.");
        }

        _require(id, parent) {
          var cachedModule = this._moduleCache[id];

          if (cachedModule) {
            return cachedModule.exports;
          }

          var module = {
            id,
            exports: {}
          };
          this._moduleCache[id] = module;

          this._tryModuleLoad(module, id);

          return module.exports;
        }

        _resolve(specifier, parent) {
          return this._resolveFromInfos(specifier, parent) || this._throwUnresolved(specifier, parent);
        }

        _resolveFromInfos(specifier, parent) {
          var _cjsInfos$parent$reso, _cjsInfos$parent;

          if (specifier in cjsInfos) {
            return specifier;
          }

          if (!parent) {
            return;
          }

          return (_cjsInfos$parent$reso = (_cjsInfos$parent = cjsInfos[parent]) == null ? void 0 : _cjsInfos$parent.resolveCache[specifier]) != null ? _cjsInfos$parent$reso : undefined;
        }

        _tryModuleLoad(module, id) {
          var threw = true;

          try {
            this._load(module, id);

            threw = false;
          } finally {
            if (threw) {
              delete this._moduleCache[id];
            }
          }
        }

        _load(module, id) {
          var {
            factory,
            resolveMap
          } = this._loadWrapper(id);

          var vendorRequire = this._createRequire(module);

          var require = resolveMap ? this._createRequireWithResolveMap(typeof resolveMap === 'function' ? resolveMap() : resolveMap, vendorRequire) : vendorRequire;

          factory(module.exports, require, module);
        }

        _loadWrapper(id) {
          if (id in this._registry) {
            return this._registry[id];
          } else {
            return this._loadHostProvidedModules(id);
          }
        }

        _loadHostProvidedModules(id) {
          return {
            factory: (_exports, _require, module) => {
              if (typeof require === 'undefined') {
                throw new Error("Current environment does not provide a require() for requiring '" + id + "'.");
              }

              try {
                module.exports = require(id);
              } catch (err) {
                throw new Error("Exception thrown when calling host defined require('" + id + "').", {
                  cause: err
                });
              }
            }
          };
        }

        _createRequire(module) {
          return specifier => this._require(specifier, module);
        }

        _createRequireWithResolveMap(requireMap, originalRequire) {
          return specifier => {
            var resolved = requireMap[specifier];

            if (resolved) {
              return originalRequire(resolved);
            } else {
              throw new Error('Unresolved specifier ' + specifier);
            }
          };
        }

        _throwUnresolved(specifier, parentUrl) {
          throw new Error("Unable to resolve " + specifier + " from " + parent + ".");
        }

      };

      _export("default", new CjsLoader());
    }
  };
});
//# sourceMappingURL=bfe72779096c71ed4dc3545a580f7065d44c03f9.js.map
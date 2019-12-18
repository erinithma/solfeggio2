/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "973b054bc13085b029fa";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "workPlace";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./js/workPlace.js")(__webpack_require__.s = "./js/workPlace.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/common/index.js":
/*!****************************!*\
  !*** ./js/common/index.js ***!
  \****************************/
/*! exports provided: smWidth, mdWidth, lgWidth, xlWidth, detectTouch, getSize, random, fill, map, build, timeout, getPercents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"smWidth\", function() { return smWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mdWidth\", function() { return mdWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lgWidth\", function() { return lgWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"xlWidth\", function() { return xlWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"detectTouch\", function() { return detectTouch; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSize\", function() { return getSize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"random\", function() { return random; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fill\", function() { return fill; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"map\", function() { return map; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"build\", function() { return build; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timeout\", function() { return timeout; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPercents\", function() { return getPercents; });\nvar smWidth = 576;\nvar mdWidth = 768;\nvar lgWidth = 992;\nvar xlWidth = 1200;\nfunction detectTouch() {\n  return 'ontouchstart' in window || window['DocumentTouch'] && document instanceof DocumentTouch;\n}\nfunction getSize() {\n  if ($(window).width() < smWidth) return \"sm\";else if ($(window).width() < mdWidth) return \"md\";else if ($(window).width() < lgWidth) return \"lg\";else if ($(window).width() < xlWidth) return \"xl\";\n  return \"xl+\";\n}\nfunction random() {\n  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12 * 5 - 1;\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\nfunction fill() {\n  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;\n  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  return new Array(count).fill(value);\n}\nfunction map(clb) {\n  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;\n  return fill(count).map(function (_, i) {\n    return clb(i);\n  });\n}\nfunction build(obj) {\n  Object.keys(obj).forEach(function (v) {\n    if (!obj[v]) obj[v] = v;else obj[v] = [].map.call(obj[v], function (w) {\n      return w === '%' ? v : w;\n    });\n  });\n  return obj;\n}\nfunction timeout(value) {\n  var fnc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  timeout.timers = timeout.timers || [];\n\n  if (fnc) {\n    var t = setTimeout(fnc, value);\n    var index = timeout.timers.push(t) - 1;\n    return index;\n  } else {\n    if (value !== null && timeout.timers[value]) {\n      clearTimeout(timeout.timers[value]);\n      timeout.timers[value] = null;\n    }\n  }\n}\nfunction getPercents(success, total) {\n  var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;\n  return Math.round(100 * success / total) + (sign ? \"%\" : \"\");\n}\n\n//# sourceURL=webpack:///./js/common/index.js?");

/***/ }),

/***/ "./js/common/storage.js":
/*!******************************!*\
  !*** ./js/common/storage.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./js/common/index.js\");\n\nvar NAME = \"so_storage\";\n\nfunction init() {\n  if (!localStorage.getItem(NAME)) localStorage.setItem(NAME, JSON.stringify({\n    common: {\n      total: 10,\n      showInfo: true\n    },\n    modes: {\n      note: {\n        notes: Object(___WEBPACK_IMPORTED_MODULE_0__[\"fill\"])().map(function (_, i) {\n          return [24, 26, 28, 29, 31, 33, 35].includes(i);\n        })\n      }\n    }\n  }));\n}\n\nfunction get() {\n  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n  init();\n  var json = JSON.parse(localStorage.getItem(NAME));\n\n  if (mode === null) {\n    return json.common;\n  } else if (typeof mode === \"string\") {\n    return json.modes[mode] || {};\n  }\n\n  throw \"invalid argument 'mode'\";\n}\n\nfunction set(data) {\n  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  init();\n  var allData = JSON.parse(localStorage.getItem(NAME));\n\n  if (mode === null) {\n    var json = get();\n    json = Object.assign({}, json, data);\n    allData.common = json;\n    localStorage.setItem(NAME, JSON.stringify(allData));\n    return;\n  } else if (typeof mode === \"string\") {\n    var _json = get(mode) || {};\n\n    _json = Object.assign(_json, data);\n    allData.modes[mode] = _json;\n    localStorage.setItem(NAME, JSON.stringify(allData));\n    return;\n  }\n\n  throw \"invalid argument 'mode'\";\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  get: get,\n  set: set\n});\n\n//# sourceURL=webpack:///./js/common/storage.js?");

/***/ }),

/***/ "./js/workPlace.js":
/*!*************************!*\
  !*** ./js/workPlace.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/storage */ \"./js/common/storage.js\");\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ \"./js/common/index.js\");\n\n\nwindow.workPlace = {\n  mode: \"play\",\n  checked: true,\n  note: 0,\n  success: 0,\n  total: 0,\n  limit: _common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get().total,\n  settings: false,\n  removeTimeout: null,\n  resultTimeout: null,\n  now: false,\n  currentOctave: 1,\n  notes: ['До', 'До#', 'Ре', 'Ре#', 'Ми', 'Фа', 'Фа#', 'Соль', 'Соль#', 'Ля', 'Ля#', 'Си'],\n  accordsDur: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'],\n  accordsMin: ['Cm', 'Cm#', 'Dm', 'Dm#', 'Em', 'Fm', 'Fm#', 'Gm', 'Gm#', 'Am', 'Am#', 'Hm'],\n  dispatch: function dispatch(type, payload) {\n    window.store.dispatch({\n      type: type,\n      payload: payload\n    });\n  },\n  showInfoBox: function showInfoBox(text) {\n    workPlace.dispatch('SET_INFO', {\n      info: text\n    });\n  },\n  hideInfoBox: function hideInfoBox() {\n    workPlace.dispatch('SET_INFO', {\n      info: null\n    });\n  },\n  setNote: function setNote(id) {\n    if (typeof this.modules[this.mode] !== \"undefined\" && typeof this.modules[this.mode].setNote !== \"undefined\") this.modules[this.mode].setNote(id);\n  },\n  setLimit: function setLimit(limit) {\n    this.limit = +limit;\n  },\n  setMode: function setMode(mode) {\n    workPlace.hideInfoBox();\n    this.checked = true;\n    this.total = 0;\n    this.success = 0;\n    if (typeof this.modules[this.mode] !== \"undefined\" && typeof this.modules[this.mode].destroy !== \"undefined\") this.modules[this.mode].destroy();\n    this.mode = mode;\n    this.remember();\n    if (typeof this.modules[this.mode] !== \"undefined\" && typeof this.modules[this.mode].select !== \"undefined\") this.modules[this.mode].select();\n  },\n  setSettings: function setSettings() {\n    if (typeof this.modules[this.mode] !== \"undefined\" && typeof this.modules[this.mode].setSettings !== \"undefined\") this.modules[this.mode].setSettings();\n    this.hideSettings();\n  },\n  guess: function guess() {\n    this.dispatch('SET_CHECK', {\n      value: true\n    });\n    if (typeof this.modules[this.mode] !== \"undefined\" && typeof this.modules[this.mode].guess !== \"undefined\") this.modules[this.mode].guess();\n    this.hideSettings();\n  },\n  check: function check(id) {\n    this.setNote(id);\n    if (this.mode === \"play\" || this.checked) return;\n    this.checked = true;\n    this.total++;\n    this.dispatch('REPEAT', {\n      value: false\n    });\n    this.dispatch('INCREMENT_STEP');\n    this.dispatch('SET_CHECK', {\n      value: false\n    });\n    if (typeof this.modules[this.mode].check !== \"undefined\") this.modules[this.mode].check(id);\n\n    if (this.total === this.limit) {\n      this.showTotal();\n    }\n  },\n  clearResult: function clearResult() {\n    workPlace.dispatch('MODE_SET_RESULT', {\n      result: null\n    });\n  },\n  showTotal: function showTotal() {\n    if (this.total === this.limit && this.limit !== 0) {\n      if (window.yaCounter32364810) yaCounter32364810.reachGoal('finished');\n\n      if (typeof this.modules[this.mode].showTotal !== \"undefined\") {\n        this.modules[this.mode].showTotal();\n      }\n    }\n  },\n  showSettings: function showSettings() {\n    if (typeof this.modules[this.mode].showSettings !== \"undefined\") this.modules[this.mode].showSettings();\n  },\n  hideSettings: function hideSettings() {\n    if (typeof this.modules[this.mode].hideSettings !== \"undefined\") this.modules[this.mode].hideSettings();\n  },\n  playNote: function playNote(id) {\n    if (id < 0 || id >= 60) return;\n    window.sound.get(id).play(0, 3);\n  },\n  playAccord: function playAccord(accord) {\n    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n    window.sound.play(accord, time);\n  },\n  remember: function remember() {\n    this.setLimit(_common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get().total);\n    if (typeof this.modules[this.mode] !== \"undefined\" && typeof this.modules[this.mode].remember !== \"undefined\") this.modules[this.mode].remember();\n  },\n  keyPressed: function keyPressed(id) {\n    if (id < 0 || id >= 60) return;\n    if (typeof this.modules[this.mode] !== \"undefined\" && typeof this.modules[this.mode].keyPressed !== \"undefined\") this.modules[this.mode].keyPressed(id);\n  },\n  init: function init() {\n    for (var m in this.modules) {\n      if (typeof this.modules[m].init !== \"undefined\") this.modules[m].init();\n    }\n  },\n  getResult: function getResult() {\n    if (typeof this.modules[this.mode] !== \"undefined\" && typeof this.modules[this.mode].getResult !== \"undefined\") this.modules[this.mode].getResult();\n  },\n  modules: {\n    note: {\n      noteKeys: null,\n      noteKeysCount: function noteKeysCount() {\n        var cnt = 0;\n\n        for (var i = 0; i < this.noteKeys.length; i++) {\n          if (this.noteKeys[i]) cnt++;\n        }\n\n        return cnt;\n      },\n      keyPressed: function keyPressed(id) {\n        workPlace.check(id);\n      },\n      select: function select() {\n        if (window.yaCounter32364810) yaCounter32364810.reachGoal('ноты');\n      },\n      guess: function guess() {\n        if (!workPlace.checked) {\n          workPlace.playNote(workPlace.note);\n          return;\n        }\n\n        workPlace.clearResult(true);\n\n        while (true) {\n          var r = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"random\"])();\n\n          if (this.noteKeysCount() > 2) {\n            if (!this.noteKeys[r]) continue;\n          }\n\n          if (r !== workPlace.note) {\n            workPlace.note = r;\n            break;\n          }\n        }\n\n        workPlace.showInfoBox(\"Выберите ноту на клавиатуре\");\n        workPlace.playNote(workPlace.note);\n        workPlace.checked = false;\n        var result = this.noteKeys.splice();\n        result[workPlace.note] = 'blue';\n      },\n      check: function check(id) {\n        if (id === workPlace.note) workPlace.success++;\n        workPlace.hideInfoBox();\n\n        if (id === workPlace.note) {\n          var result = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"fill\"])(60, false);\n          result[workPlace.note] = 'green';\n          workPlace.dispatch('MODE_SET_RESULT', {\n            result: result\n          });\n        } else {\n          var _result = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"fill\"])(60, false);\n\n          _result[workPlace.note] = 'green';\n          _result[id] = 'red';\n          workPlace.dispatch('MODE_SET_RESULT', {\n            result: _result\n          });\n        }\n      },\n      remember: function remember() {\n        if (!_common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"note\").notes) {\n          this.noteKeys = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"fill\"])(60, false);\n        } else {\n          this.noteKeys = _common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"note\").notes;\n        }\n      },\n      getResult: function getResult() {\n        return [['Результат', \"\".concat(Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"getPercents\"])(workPlace.success, _common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get().total), \" (\").concat(workPlace.success, \" / \").concat(_common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get().total, \")\")]];\n      },\n      showTotal: function showTotal() {\n        workPlace.hideInfoBox();\n        workPlace.dispatch('MODE_SHOW_TOTAL', {\n          result: this.getResult()\n        });\n        setTimeout(function () {\n          workPlace.dispatch('MODE_SET_RESULT', {\n            result: null\n          });\n        }, 2000);\n      }\n    },\n    interval: {\n      interval: 0,\n      intervalValues: null,\n      intervalMode: \"up\",\n      init: function init() {},\n      showSettings: function showSettings() {\n        workPlace.showInfoBox(\"Выберите интервалы, которорые хотите угадывать (не менее 2х)\");\n      },\n      play: function play() {\n        var v = this.intervalMode;\n\n        if (v === \"up\") {\n          workPlace.playAccord([workPlace.note, workPlace.note + this.interval + 1], 0.5);\n        } else if (v === \"down\") {\n          workPlace.playAccord([workPlace.note, workPlace.note + this.interval + 1], -0.5);\n        } else {\n          workPlace.playAccord([workPlace.note, workPlace.note + this.interval + 1]);\n        }\n      },\n      setSettings: function setSettings() {},\n      guess: function guess() {\n        if (!workPlace.checked) {\n          this.play();\n          return;\n        }\n\n        workPlace.clearResult(true);\n\n        while (true) {\n          this.interval = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"random\"])(0, 11);\n\n          if (this.intervalCount() >= 2) {\n            if (!this.intervalValues[this.interval]) continue;\n          }\n\n          var r = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"random\"])(0, 48);\n\n          if (r !== workPlace.note) {\n            workPlace.note = r;\n            break;\n          }\n        }\n\n        this.play();\n        workPlace.checked = false;\n      },\n      intervalCount: function intervalCount() {\n        var cnt = 0;\n\n        for (var i = 0; i < this.intervalValues.length; i++) {\n          if (this.intervalValues[i]) cnt++;\n        }\n\n        return cnt;\n      },\n      remember: function remember() {\n        if (!_common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"interval\").intervals) {\n          this.intervalValues = [];\n\n          for (var i = 0; i <= 12; i++) {\n            this.intervalValues.push(false);\n          }\n        } else {\n          this.intervalValues = _common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"interval\").intervals;\n        }\n\n        if (!_common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"interval\").mode) {\n          this.intervalMode = \"up\";\n        } else {\n          this.intervalMode = _common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"interval\").mode;\n        }\n      },\n      select: function select() {\n        if (window.yaCounter32364810) yaCounter32364810.reachGoal('интервал');\n      },\n      check: function check(id) {\n        if (id === this.interval) workPlace.success++;\n        workPlace.hideInfoBox();\n\n        if (id === this.interval) {\n          var result = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"fill\"])(60, false);\n          result[workPlace.note] = 'green';\n          result[workPlace.note + this.interval + 1] = 'green';\n          workPlace.dispatch('MODE_SET_RESULT', {\n            result: result\n          });\n          workPlace.dispatch('MODE_HIGHLIGHT_OPTIONS', {\n            options: [[this.interval, true]]\n          });\n        } else {\n          var _result2 = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"fill\"])(60, false);\n\n          _result2[workPlace.note] = 'red';\n          _result2[workPlace.note + this.interval + 1] = 'red';\n          workPlace.dispatch('MODE_SET_RESULT', {\n            result: _result2\n          });\n          workPlace.dispatch('MODE_HIGHLIGHT_OPTIONS', {\n            options: [[this.interval, true], [id, false]]\n          });\n        }\n      },\n      hideSettings: function hideSettings() {},\n      getResult: function getResult() {\n        return [['Результат', \"\".concat(Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"getPercents\"])(workPlace.success, _common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get().total), \" (\").concat(workPlace.success, \" / \").concat(_common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get().total, \")\")]];\n      },\n      showTotal: function showTotal() {\n        workPlace.hideInfoBox();\n        workPlace.dispatch('MODE_SHOW_TOTAL', {\n          result: this.getResult()\n        });\n        setTimeout(function () {\n          workPlace.dispatch('MODE_SET_RESULT', {\n            result: null\n          });\n        }, 2000);\n      }\n    },\n    mindur: {\n      mindur: 0,\n      select: function select() {\n        if (window.yaCounter32364810) yaCounter32364810.reachGoal('мажор-минор');\n      },\n      init: function init() {},\n      guess: function guess() {\n        if (!workPlace.checked) {\n          this.play();\n          return;\n        }\n\n        workPlace.clearResult(true);\n\n        while (true) {\n          this.mindur = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"random\"])(0, 1);\n          var r = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"random\"])(0, 60 - 8);\n\n          if (r != workPlace.note) {\n            workPlace.note = r;\n            break;\n          }\n        }\n\n        workPlace.showInfoBox(\"Выберите прозвучавшее трезвучие с помощью кнопок 'Мажор' / 'Минор\");\n        this.play();\n        workPlace.checked = false;\n      },\n      check: function check(id) {\n        workPlace.hideInfoBox();\n\n        if (id === this.mindur) {\n          workPlace.success++;\n          var result = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"fill\"])(60, false);\n          result[workPlace.note] = 'green';\n          result[workPlace.note + 3 + this.mindur] = 'green';\n          result[workPlace.note + 7] = 'green';\n          workPlace.dispatch('MODE_SET_RESULT', {\n            result: result\n          });\n        } else {\n          var _result3 = Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"fill\"])(60, false);\n\n          _result3[workPlace.note] = 'red';\n          _result3[workPlace.note + 3 + this.mindur] = 'red';\n          _result3[workPlace.note + 7] = 'red';\n          workPlace.dispatch('MODE_SET_RESULT', {\n            result: _result3\n          });\n        }\n      },\n      play: function play() {\n        if (this.mindur === 0) {\n          // минор\n          workPlace.playAccord([workPlace.note, workPlace.note + 3, workPlace.note + 7]);\n        } else {\n          //мажор\n          workPlace.playAccord([workPlace.note, workPlace.note + 4, workPlace.note + 7]);\n        }\n      },\n      getResult: function getResult() {\n        return [['Результат', \"\".concat(Object(_common__WEBPACK_IMPORTED_MODULE_1__[\"getPercents\"])(workPlace.success, _common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get().total), \" (\").concat(workPlace.success, \" / \").concat(_common_storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get().total, \")\")]];\n      },\n      showTotal: function showTotal() {\n        workPlace.hideInfoBox();\n        workPlace.dispatch('MODE_SHOW_TOTAL', {\n          result: this.getResult()\n        });\n        setTimeout(function () {\n          workPlace.dispatch('MODE_SET_RESULT', {\n            result: null\n          });\n        }, 2000);\n      }\n    },\n    dictation: {\n      speed: '500',\n      noteCount: 4,\n      img: null,\n      canvas: null,\n      ctx: null,\n      saveMode: 'write',\n      melody: [],\n      notes: [],\n      currentNote: -1,\n      rects: [],\n      timer: null,\n      mode: \"write\",\n      tone: 0,\n      toneRnd: false,\n      select: function select() {\n        $(\"#info\").hide();\n        $(\"#result\").show();\n        this.notes = [];\n        this.melody = [];\n        this.drawKey();\n        this.generate();\n        workPlace.checked = false;\n        workPlace.showInfoBox(\"Чтобы записать ноту, выберите режим 'писать' и нажмите клавишу на клавиатуре виртуального фортепиано сверху\");\n        if (window.yaCounter32364810) yaCounter32364810.reachGoal('диктант');\n      },\n      generate: function generate() {\n        var note = dictant.getFirstNote(this.tone);\n        this.melody.push(note);\n\n        for (var i = 1; i < 7; i++) {\n          note = dictant.getNote(note, this.tone);\n          this.melody.push(note);\n        }\n        /*this.melody.push(7);\r\n        this.melody.push(8);\t\r\n        this.melody.push(-9);*/\n\n      },\n      remember: function remember() {\n        if (common.getStorageVal(\"speed\") == null) {\n          this.speed = \"500\";\n        } else {\n          this.speed = common.getStorageVal(\"speed\");\n        }\n\n        if (common.getStorageVal(\"noteCount\") == null) {\n          this.noteCount = 4;\n        } else {\n          this.noteCount = parseInt(common.getStorageVal(\"noteCount\"));\n        }\n\n        if (common.getStorageVal(\"dictantMode\") == null) {\n          this.mode = this.saveMode = \"play\";\n        } else {\n          this.mode = this.saveMode = common.getStorageVal(\"dictantMode\");\n        }\n\n        if (common.getStorageVal(\"tone\") == null) {\n          this.tone = 0;\n        } else {\n          this.tone = common.getStorageVal(\"tone\") == \"rnd\" ? common.random(0, 3) : common.getStorageVal(\"tone\");\n        }\n\n        this.toneRnd = common.getStorageVal(\"tone\") == \"rnd\";\n        $(\"#dictant-tone\").val(common.getStorageVal(\"tone\") ? common.getStorageVal(\"tone\") : \"0\");\n        $(\"#dictant-speed\").val(this.speed);\n        $(\"#dictant-notes\").val(this.noteCount);\n        $(\"#dictant-mode\").val(this.mode);\n        $(\".dictation-mode .modes > *\").removeClass(\"active\");\n        $(\".dictation-mode .mode-\" + this.mode).addClass(\"active\");\n      },\n      drawKey: function drawKey() {\n        var tone = this.tone;\n        this.canvas = $(\".dictation canvas\")[0];\n        this.ctx = this.canvas && this.canvas.getContext('2d') || null;\n        if (this.ctx == null) return;\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        this.ctx.strokeStyle = 'black';\n        this.ctx.lineWidth = 1;\n\n        for (var i = 0; i < 5; i++) {\n          this.ctx.drawImage(this.img, 0, 280, 1, 1, 0, 20 + 28 + i * 8, this.canvas.width, 1);\n        }\n\n        this.ctx.drawImage(this.img, 0, 0, 50, 85, 0, 14, 50, 85);\n\n        for (var i = 0; i < dictant.tones[tone].sharps.length; i++) {\n          var note = dictant.tones[tone].sharps[i].note + dictant.tones[tone].sharps[i].offset;\n          this.ctx.drawImage(this.img, 126, 0, 25, 50, 40 + i * 10, 20 + (16 - note) * 4, 25, 50);\n        }\n      },\n      drawNote: function drawNote(note, pos, whole, sharp, highlight) {\n        if (note < 8) {\n          for (var i = 5; i < Math.abs(4 - Math.floor(note / 2)) + 5; i++) {\n            this.ctx.drawImage(this.img, 0, 280, 1, 1, pos + 4, 20 + 28 + i * 8, 15, 1);\n          }\n        } else if (note > 17) {\n          for (var i = 0; i < note - 18 + Math.floor(note % 2); i++) {\n            this.ctx.drawImage(this.img, 0, 280, 1, 1, pos + 4, 20 + 28 - i * 8, 15, 1);\n          }\n        }\n\n        if (highlight == \"green\") highlight = 165;else if (highlight == \"red\") highlight = 81;else highlight = 0;\n\n        if (sharp === true) {\n          this.ctx.drawImage(this.img, 126, highlight, 25, 50, pos - 10, 20 + (16 - note) * 4, 25, 50);\n        } else if (sharp === 'bekar') {\n          this.ctx.drawImage(this.img, 150, highlight, 25, 50, pos - 10, 20 + (16 - note) * 4, 25, 50);\n        }\n\n        if (whole === true) this.ctx.drawImage(this.img, 97, highlight, 25, 50, pos, 9 + (17 - note) * 4, 25, 50);else this.ctx.drawImage(this.img, 71, highlight, 25, 50, pos, 9 + (17 - note) * 4, 25, 50);\n      },\n      drawLine: function drawLine(pos) {\n        this.ctx.drawImage(this.img, 0, 280, 1, 1, pos, 20 + 28, 1, 4 * 8);\n      },\n      drawNotes: function drawNotes(values) {\n        var notes = values || this.notes;\n        var offset = 0;\n\n        if (notes == this.notes) {\n          this.rects = [];\n        }\n\n        for (var i = 0; i < notes.length; i++) {\n          if (notes[i] < 0) offset += 12;\n          var sharp = false;\n          var note = notes[i];\n          var tone = this.tone;\n\n          if (note > 0 && dictant.checkSharp(note, tone) && (!i || notes[i - 1] != note)) {\n            sharp = 'bekar';\n            offset += 8;\n          }\n\n          if (note < 0) {\n            if (dictant.checkSharp(note, tone)) {\n              if (i > 0 && notes[i - 1] > 0 && i % 2 == 1 && i > 0 && notes[i - 1] == -notes[i] - 1) {\n                sharp = true;\n              }\n            } else {\n              if (i > 0 && notes[i - 1] != notes[i] || i == 0) {\n                sharp = true;\n              } else {\n                offset -= 12;\n              }\n            }\n\n            note = -note - 1;\n          } else if (note >= 0 && i % 2 == 1 && i > 0 && notes[i - 1] < 0 && -notes[i - 1] - 1 == notes[i]) {\n            sharp = 'bekar';\n            offset += 8;\n          } //}\n\n\n          this.drawNote(note, i * 20 + offset + (this.tone == 0 ? 40 : 70), i == notes.length - 1 && notes.length % 2 == 1, sharp, this.currentNote == i ? \"green\" : false);\n\n          if (notes == this.notes) {\n            this.rects.push({\n              left: i * 20 + offset + (this.tone == 0 ? 40 : 70),\n              right: i * 20 + +(this.tone == 0 ? 40 : 70) + offset + 25,\n              top: 9 + (17 - note) * 4,\n              bottom: 9 + (17 - note) * 4 + 50\n            });\n          }\n\n          if (i != notes.length - 1 && i % 2 != 0) {\n            this.drawLine(i * 20 + offset + 26 + (this.tone == 0 ? 40 : 70));\n            offset += 6;\n          }\n        }\n      },\n      check: function check(id) {\n        var self = this;\n\n        function __check() {\n          for (var i = 0; i < self.notes.length; i++) {\n            if (self.notes[i] != self.melody[i]) {\n              return false;\n            }\n          }\n\n          return true;\n        }\n\n        if (__check()) workPlace.success++;\n        $(\".dictation-mode\").hide();\n        $(\".dictation-mode-checked\").show();\n        var offset = 0;\n        var notes = this.notes;\n        this.drawKey();\n\n        for (var i = 0; i < notes.length; i++) {\n          if (notes[i] < 0) offset += 12;\n          var sharp = false;\n          var note = notes[i];\n          var tone = this.tone;\n\n          if (note > 0 && dictant.checkSharp(note, tone) && (!i || notes[i - 1] != note)) {\n            sharp = 'bekar';\n            offset += 8;\n          }\n\n          if (note < 0) {\n            if (dictant.checkSharp(note, tone)) {\n              if (i > 0 && notes[i - 1] > 0 && i % 2 == 1 && i > 0 && notes[i - 1] == -notes[i] - 1) {\n                sharp = true;\n              } else {\n                offset -= 12;\n              }\n            } else if (i > 0 && notes[i - 1] != notes[i] || i == 0) {\n              sharp = true;\n            }\n\n            note = -note - 1;\n          } else if (note >= 0 && i % 2 == 1 && i > 0 && notes[i - 1] < 0 && -notes[i - 1] - 1 == notes[i]) {\n            sharp = 'bekar';\n            offset += 8;\n          }\n\n          if (self.notes[i] != self.melody[i]) {\n            this.drawNote(note, i * 20 + (this.tone == 0 ? 40 : 70) + offset, i == notes.length - 1 && notes.length % 2 == 1, sharp, \"red\");\n            this.drawNote(self.melody[i] < 0 ? -self.melody[i] - 1 : self.melody[i], i * 20 + (this.tone == 0 ? 40 : 70) + offset, i == notes.length - 1 && notes.length % 2 == 1, sharp, \"green\");\n          } else {\n            this.drawNote(note, i * 20 + (this.tone == 0 ? 40 : 70) + offset, i == notes.length - 1 && notes.length % 2 == 1, sharp, \"green\");\n          }\n\n          if (i != notes.length - 1 && i % 2 != 0) {\n            this.drawLine(i * 20 + (this.tone == 0 ? 40 : 70) + offset + 26);\n            offset += 6;\n          }\n        }\n\n        setTimeout(function () {//$(\"#result\").text([ workPlace.notes[window.note % 12], workPlace.octaves[Math.floor(workPlace.note / 12)] ].join(\" \"));\n          //$(\"#mode-controls .note .play .name\").text(\"Играть след. ноту\");\n        }, 100);\n      },\n      update: function update() {\n        $(\".dictation-mode\").show();\n        $(\".dictation-mode-checked\").hide();\n        $(\".dictation .check\").attr(\"disabled\", \"disabled\");\n        $(\".dictation-mode .modes > *\").removeClass(\"active\");\n        $(\".dictation-mode .mode-\" + this.saveMode).addClass(\"active\");\n        var self = this;\n        self.melody = [];\n        self.notes = [];\n        self.currentNote = -1;\n\n        if (self.toneRnd) {\n          self.tone = common.random(0, 3);\n        } //alert(self.tone);\n\n\n        self.generate();\n        self.drawKey();\n        workPlace.checked = false;\n      },\n      init: function init() {\n        var self = this;\n        this.img = new Image();\n        this.img.src = \"/img/notes2.png\";\n\n        this.img.onload = function () {\n          self.drawKey();\n        };\n\n        $(\"body\").on(\"click\", \"canvas\", function (e) {\n          if (self.mode == \"write\" && self.notes.length == 0) {\n            return;\n          }\n\n          if (self.mode == \"play\") return;\n          var x = Math.floor(e.pageX - $(this).offset().left);\n          var y = Math.floor(e.pageY - $(this).offset().top);\n\n          for (var i = 0; i < self.rects.length; i++) {\n            if (x >= self.rects[i].left && x <= self.rects[i].right && y >= self.rects[i].top && y <= self.rects[i].bottom) {\n              self.currentNote = i;\n              self.drawKey();\n              self.drawNotes();\n              return;\n            }\n          }\n\n          self.currentNote = -1;\n          self.drawKey();\n          self.drawNotes();\n        });\n        $(\"body\").on(\"mousemove\", \"canvas\", function (e) {\n          if (self.mode == \"play\") return;\n          var x = Math.floor(e.pageX - $(this).offset().left);\n          var y = Math.floor(e.pageY - $(this).offset().top);\n\n          for (var i = 0; i < self.rects.length; i++) {\n            if (x >= self.rects[i].left && x <= self.rects[i].right && y >= self.rects[i].top && y <= self.rects[i].bottom) {\n              $(this).css(\"cursor\", \"pointer\");\n              return;\n            }\n          }\n\n          $(this).css(\"cursor\", \"default\");\n        });\n        $(\"body\").on(\"click\", \"#mode-controls .dictation .modes a\", function (e) {\n          e.preventDefault();\n          $(\"#mode-controls .dictation .modes a\").removeClass(\"active\");\n          $(this).addClass(\"active\");\n\n          if ($(this).hasClass(\"mode-write\")) {\n            $(\"#mode-controls .dictation .buttons\").show();\n            $(\"#info\").show().text(\"Выберите ноту на клавиатуре\");\n          } else {\n            $(\"#mode-controls .dictation .buttons\").hide();\n            $(\"#info\").hide();\n            self.currentNote = -1;\n            self.drawKey();\n            self.drawNotes();\n          }\n        });\n        $(\"body\").on(\"click\", \"#mode-controls .dictation .play-melody\", function (e) {\n          e.preventDefault();\n\n          if (self.timer) {\n            clearTimeout(self.timer);\n            self.timer = null;\n            self.currentNote = -1;\n            self.drawKey();\n            self.drawNotes();\n            return;\n          }\n\n          function d(i) {\n            if (i >= self.noteCount) {\n              self.timer = null;\n              return;\n            } //$(\".key[data-note-abs='\"+dictant.noteToKey(self.melody[i])+\"']\").addClass(\"active\");\n\n\n            workPlace.playNote(dictant.noteToKey(self.melody[i]));\n            self.timer = setTimeout(function () {\n              //$(\".key[data-note-abs='\"+dictant.noteToKey(self.melody[i])+\"']\").removeClass(\"active\");\n              d(++i);\n            }, self.speed);\n          }\n\n          d(0);\n        });\n        $(\"body\").on(\"click\", \"#mode-controls .dictation .check\", function (e) {\n          e.preventDefault();\n          workPlace.check(0);\n        });\n        $(\"body\").on(\"click\", \"#mode-controls .dictation .next\", function (e) {\n          e.preventDefault();\n          self.update();\n        });\n        $(\"body\").on(\"click\", \"#mode-controls .dictation .play-user\", function (e) {\n          e.preventDefault();\n\n          if (self.timer) {\n            clearTimeout(self.timer);\n            self.timer = null;\n            self.currentNote = -1;\n            self.drawKey();\n            self.drawNotes();\n            $(\".key\").removeClass(\"active\");\n            return;\n          }\n\n          function d(i) {\n            if (i >= self.notes.length) {\n              self.currentNote = -1;\n              self.drawKey();\n              self.drawNotes();\n              self.timer = null;\n              return;\n            }\n\n            $(\".key[data-note-abs='\" + dictant.noteToKey(self.notes[i]) + \"']\").addClass(\"active\");\n            workPlace.playNote(dictant.noteToKey(self.notes[i]));\n\n            if (!workPlace.checked) {\n              self.currentNote = i;\n              self.drawKey();\n              self.drawNotes();\n            }\n\n            self.timer = setTimeout(function () {\n              $(\".key[data-note-abs='\" + dictant.noteToKey(self.notes[i]) + \"']\").removeClass(\"active\");\n              d(++i);\n            }, self.speed);\n          }\n\n          d(0);\n        });\n        $(\"body\").on(\"click\", \".dictation-mode .mode-play\", function (e) {\n          e.preventDefault();\n          self.mode = 'play';\n        });\n        $(\"body\").on(\"click\", \".dictation-mode .mode-write\", function (e) {\n          e.preventDefault();\n          self.mode = 'write';\n        });\n        $(\"body\").on(\"click\", \".dictation-mode .remove\", function (e) {\n          e.preventDefault();\n\n          if (self.notes.length) {\n            self.notes.pop();\n            self.currentNote = -1;\n            self.drawKey();\n            self.drawNotes();\n            $(\".dictation .check\").attr(\"disabled\", \"disabled\");\n          }\n        });\n        $(\"body\").on(\"click\", \".dictation-mode .dictation-settings\", function (e) {\n          e.preventDefault();\n          $(\"#modalDictantSettings\").modal(\"show\");\n        });\n        $(\"body\").on(\"click\", \"#modalDictantSettings .ok-btn\", function (e) {\n          e.preventDefault();\n          self.speed = $(\"#dictant-speed\").val();\n          common.setStorageVal(\"speed\", self.speed);\n          self.noteCount = parseInt($(\"#dictant-notes\").val());\n          common.setStorageVal(\"noteCount\", self.noteCount);\n          self.saveMode = $(\"#dictant-mode\").val();\n          common.setStorageVal(\"dictantMode\", self.saveMode);\n          var tone = $(\"#dictant-tone\").val(); //alert(tone + \"\" + self.tone);\n\n          if (tone != self.tone || tone == \"rnd\") {\n            self.tone = tone;\n            self.toneRnd = tone == \"rnd\";\n            self.update();\n          }\n\n          common.setStorageVal(\"tone\", tone);\n          if (self.noteCount > self.notes.length) $(\".dictation .check\").attr(\"disabled\", \"disabled\");else {\n            self.notes.splice(-(self.notes.length - self.noteCount), self.notes.length - self.noteCount);\n            self.drawKey();\n            self.drawNotes();\n            $(\".dictation .check\").removeAttr(\"disabled\");\n          }\n        });\n      },\n      keyPressed: function keyPressed(id) {\n        if ($(\"#mode-controls .dictation .modes .mode-write\").hasClass(\"active\")) {\n          if (this.currentNote != -1) {\n            var note = dictant.keyToNote(id);\n            this.notes[this.currentNote] = note;\n            this.drawKey();\n            this.drawNotes();\n          } else if (this.noteCount > this.notes.length) {\n            var note = dictant.keyToNote(id);\n            this.notes.push(note);\n            this.drawKey();\n            this.drawNotes();\n          }\n\n          if (this.noteCount <= this.notes.length) {\n            $(\".dictation .check\").removeAttr(\"disabled\");\n          }\n        }\n      }\n    },\n    education: {\n      img: null,\n      canvas: null,\n      ctx: null,\n      timer: null,\n      note: null,\n      startTime: 0,\n      showTotal: function showTotal() {},\n      destroy: function destroy() {\n        if (this.timer) clearInterval(this.timer);\n        this.timer = null;\n      },\n      select: function select() {},\n      remember: function remember() {},\n      drawKey: function drawKey() {\n        this.canvas = $(\"canvas.graph\")[0]; //alert(this.canvas)\n\n        this.ctx = this.canvas && this.canvas.getContext('2d') || null;\n        if (this.ctx == null) return;\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        this.ctx.strokeStyle = 'black';\n        this.ctx.lineWidth = 1;\n\n        for (var i = 0; i < 5; i++) {\n          this.ctx.drawImage(this.img, 0, 280, 1, 1, 0, 20 + 28 + i * 8, this.canvas.width, 1);\n        }\n\n        this.ctx.drawImage(this.img, 0, 0, 50, 85, 0, 14, 50, 85);\n      },\n      drawNote: function drawNote(note, pos, whole, sharp, highlight) {\n        if (this.ctx == null) return;\n        if (note < 0) note = -note - 1, sharp = true;\n\n        if (note < 8) {\n          for (var i = 5; i < Math.abs(4 - Math.floor(note / 2)) + 5; i++) {\n            this.ctx.drawImage(this.img, 0, 280, 1, 1, pos + 4, 20 + 28 + i * 8, 15, 1);\n          }\n        } else if (note > 17) {\n          for (var i = 0; i < note - 18 + Math.floor(note % 2); i++) {\n            this.ctx.drawImage(this.img, 0, 280, 1, 1, pos + 4, 20 + 28 - i * 8, 15, 1);\n          }\n        }\n\n        if (highlight == \"green\") highlight = 165;else if (highlight == \"red\") highlight = 81;else highlight = 0;\n\n        if (sharp === true) {\n          this.ctx.drawImage(this.img, 126, highlight, 25, 50, pos - 10, 20 + (16 - note) * 4, 25, 50);\n        } else if (sharp === 'bekar') {\n          this.ctx.drawImage(this.img, 150, highlight, 25, 50, pos - 10, 20 + (16 - note) * 4, 25, 50);\n        }\n\n        if (whole === true) this.ctx.drawImage(this.img, 97, highlight, 25, 50, pos, 9 + (17 - note) * 4, 25, 50);else this.ctx.drawImage(this.img, 71, highlight, 25, 50, pos, 9 + (17 - note) * 4, 25, 50);\n      },\n      drawLine: function drawLine(pos) {\n        this.ctx.drawImage(this.img, 0, 280, 1, 1, pos, 20 + 28, 1, 4 * 8);\n      },\n      init: function init() {\n        var self = this;\n        this.img = new Image();\n        this.img.src = \"/img/notes2.png\";\n\n        this.img.onload = function () {\n          self.drawKey();\n        };\n      },\n      keyPressed: function keyPressed(id) {\n        //alert(dictant.keyToNote(id));\n        this.drawKey();\n        this.drawNote(dictant.keyToNote(id), 45, true);\n      }\n    }\n  }\n};\n\n//# sourceURL=webpack:///./js/workPlace.js?");

/***/ })

/******/ });
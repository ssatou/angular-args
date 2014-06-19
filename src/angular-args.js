(function () {
	var angularModule = angular.module;
	angular.module('args', []);
	angular.module = function (name, requires, configFn) {
		var module = angularModule(name, requires, configFn);
		if (requires.indexOf('args') > -1) {
			module.args = function (a, b) {
				var imp, fn;
				var names, reqs;
				if(angular.isFunction(a)){
					imp={};
					fn=angular.isFunction(a) ? a:angular.noop;
				}else if (arguments.length === 1) {
					a || (a = {});
					imp = angular.isObject(a.imp) ? a.imp : {};
					fn = angular.isFunction(a.fn) ? a.fn : angular.noop;
				} else if (arguments.length === 2) {
					imp = angular.isObject(a) ? a : {};
					fn = angular.isFunction(b) ? b : angular.noop;
				}
				angular.isObject(imp)||(imp={});
				angular.isFunction(fn)||(fn=angular.noop);
				names = [] , reqs = [];
				angular.forEach(imp, function (di, name) {
					names.push(name);
					reqs.push(di);
				});
				reqs.push(function () {
					var args = {};
					angular.forEach(arguments || [], function (di, i) {
						args[names[i]] = di;
					});
					return (function (fn,args) {
						return fn(args);
					}.call(this,fn,args));
				});
				return reqs;
			};
		}
		return module;
	};
}());

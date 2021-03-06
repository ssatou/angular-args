(function (angular) {
	if(!angular){
		return;
	}
	var angularModule = angular.module;
	angular.module('args', []);
	angular.module = function (name, requires, configFn) {
		var module = angularModule(name, requires, configFn);
		requires||(requires=[]);
		if (requires.indexOf('args') > -1) {
			module.args = function (a, b) {
				var imp, fn;
				var names, reqs;
				if(angular.isFunction(a)){
					imp={};
					fn=a;
				}else if (arguments.length === 1) {
					a || (a = {});
					imp = a.imp;
					fn = a.fn;
				} else if (arguments.length === 2) {
					imp = a;
					fn = b;
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
}(window.angular||false));

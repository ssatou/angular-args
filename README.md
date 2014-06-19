angular-args
=========
sample
```js
var app=angular.module('app',['args']);
app.factory('sampleService',app.args({
    $q : '$q'
},function(args){
    return {
        getData : function(){
            var defer=args.$q.defer();
            defer.resolve({
                val : 'val1'
            });
            return defer.promise;
        }
    };
}));
app.controller('testService',app.args({
    sample : 'sampleService',
    $scope : '$scope'
},function(args){
    args.sample.getData().then(function(data){
        args.$scope.data=data;
    });
});
```


License
----

MIT

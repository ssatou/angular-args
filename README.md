angular-args
=========
sample
```js
var app=angular.module('app',['args']);
app.factory('teteService',app.args({
    $q : '$q'
},function(args){
    return {
        getData : function(){
            var defer=args.$q.defer();
            defer.resolve({
                tete : 'tete'
            });
            return defer.promise;
        }
    };
}));
app.controller('teteCtrl',app.args({
    tete : 'teteService',
    $scope : '$scope'
},function(args){
    args.getData().then(function(data){
        args.$scope.data=data;
    });
});
```


License
----

MIT

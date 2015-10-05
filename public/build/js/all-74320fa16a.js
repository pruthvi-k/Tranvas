/**
 * Created by amitav on 9/30/15.
 */
var myApp = angular.module('myApp', [
    'ngRoute',
    'ui.grid',
    'ui.grid.pagination',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'angularModalService',
    'angular.snackbar',
    'angular-loading-bar'
]);

myApp.factory('httpFact', ['$http', function ($http) {
    var httpFact = {};

    httpFact.getRequest = function (url) {
        return $http.get(url).then(function (data) {
            console.log('Server response', data);
            return data;
        });
    };

    httpFact.postRequest = function (data, url, headers) {
        return $http({
            headers: headers,
            method: "POST",
            url: url,
            data: data
        }).then(function (response) {
            console.log('Server response', response);
            return response;
        });
    };

    return httpFact;
}]);
//# sourceMappingURL=all.js.map

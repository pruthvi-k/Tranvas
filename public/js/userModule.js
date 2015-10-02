/**
 * Created by amitav on 10/2/15.
 */

myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/user', {
        templateUrl: baseUrl + 'ng_templates/users/user-list.html',
        controller: 'userController'
    });

    $routeProvider.when('/user/add', {
        templateUrl: baseUrl + 'ng_templates/users/user-add.html',
        controller: 'userController'
    });

    $routeProvider.otherwise('/');
}]);
/**
 * Created by amitav on 10/2/15.
 */
myApp.controller('userController', ['$scope', 'userFact', function ($scope, userFact) {
    userFact.getUserList().then(function (response) {
        $scope.userList = response.data;
    });

    /*Variables*/
    angular.extend($scope, {});

    /*Methods*/
    angular.extend($scope, {});
}]);

myApp.factory('userFact', ['httpFact', '$http', function (httpFact, $http) {
    var user = {};

    user.allUser = '';

    user.getUserList = function () {
        return this.allUser === '' ? this.fetchUserList() : this.allUser;
    };

    user.fetchUserList = function () {
        this.allUser = $http.get(baseUrl + 'api/user/list').then(function (data) {
            return data;
        });
        return this.allUser;
    };

    return user;
}]);

myApp.factory('httpFact', ['$http', function ($http) {
    var httpFact = {};

    httpFact.getRequest = function (url) {
        return $http.get(url).then(function (data) {
            return data;
        });
    };

    return httpFact;
}]);
//# sourceMappingURL=userModule.js.map

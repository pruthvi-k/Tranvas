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
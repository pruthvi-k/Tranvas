/**
 * Created by amitav on 10/2/15.
 */

myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/user', {
        templateUrl: baseUrl + 'ng_templates/users/user-list.html',
        controller: 'userController',
        title: 'User management'
    });

    $routeProvider.when('/user/add', {
        templateUrl: baseUrl + 'ng_templates/users/user-add.html',
        controller: 'userController',
        title: 'Add new user'
    });

    $routeProvider.otherwise('/');
}]);

myApp.run(["$rootScope", "$location",
    function ($rootScope, $location) {
        $rootScope.$on("$routeChangeStart",
            function (event, next, current) {
                if (next.$$route.title) {
                    /*Setting the window title*/
                    document.title = next.$$route.title;
                }
            });
    }
]);
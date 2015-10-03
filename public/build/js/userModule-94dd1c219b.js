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
 * Created by amitav on 10/3/15.
 */
myApp.factory('userFact', ['$rootScope', 'httpFact', function ($rootScope, httpFact) {
    var user = {};

    user.allUser = '';

    /**
     * Call this function to get the user list.
     * Internally it will call the fetch function if the object is not set already
     *
     * @returns {string|*}
     */
    user.getUserList = function () {
        return this.allUser === '' ? this.fetchUserList() : this.allUser;
    };

    /**
     * This function will always make an ajax request to fetch the list of users
     * from the database. This should not be called directly.
     *
     * @returns {string|*}
     */
    user.fetchUserList = function () {
        var url = baseUrl + 'api/user/list';

        this.allUser = httpFact.getRequest(url).then(function (response) {
            return response;
        });

        return this.allUser;
    };

    /**
     * Save a new user to the database by calling the post url
     *
     * @param userObj
     * @returns {*}
     */
    user.saveNewUser = function (userObj) {
        var saveUrl = baseUrl + 'api/user/save';

        var headers = {
            'Content-type': 'application/json'
        };

        return httpFact.postRequest(userObj, saveUrl, headers).then(function (response) {
            $rootScope.$broadcast('newUserAdded', response.data);
            return response.data;
        });
    };

    /**
     * Delete the user by passing id
     *
     * @param id
     * @returns {*}
     */
    user.deleteUser = function (id) {
        var deleteUrl = baseUrl + 'api/user/delete';

        var headers = {
            'Content-type': 'application/json'
        };

        return httpFact.postRequest(id, deleteUrl, headers).then(function (response) {
            return response;
        });
    };

    return user;
}]);
/**
 * Created by amitav on 10/2/15.
 */
myApp.controller('userController', ['$scope', '$location', 'userFact',
    function ($scope, $location, userFact) {

        /*Setting the users after getting data from factory*/
        userFact.getUserList().then(function (response) {
            $scope.userList = response.data;
        });

        /*Update the user list of factory broadcast*/
        $scope.$on('newUserAdded', function (event, data) {
            $scope.userList.push(data);
        });

        /*Variables*/
        angular.extend($scope, {
            newUser: {
                name: 'Amitav',
                email: 'reachme@amitavroy.com',
                password: 'password',
                cPassword: 'password'
            },
            errorMessages: []
        });

        /*Methods*/
        angular.extend($scope, {

            /*Save the new user after validations*/
            saveNewUser: function (userAddForm) {
                if ($scope.newUser.password != $scope.newUser.cPassword) {
                    $scope.errorMessages.push('The two passwords do not match');
                    return false;
                }

                $scope.errorMessages = [];

                userFact.saveNewUser($scope.newUser).then(function (response) {
                    $location.path('/user');
                }).catch(function (data, status, header) {
                    console.log(data, status);
                    if (status == 403) {
                        //alert('validation failed');
                        angular.forEach(data, function (value, key) {
                            $scope.errorMessages.push(value.toString());
                        });
                    }
                });
            }
        });
    }]);
//# sourceMappingURL=userModule.js.map

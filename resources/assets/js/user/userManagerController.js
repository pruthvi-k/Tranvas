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
/**
 * Created by amitav on 10/2/15.
 */
myApp.controller('userController', ['$scope', '$location', '$q', 'userFact',
    function ($scope, $location, $q, userFact) {

        /*Setting the users after getting data from factory*/
        userFact.getUserList().then(function (response) {
            $scope.userNgGrid.data = response.data;
        });

        /*Update the user list of factory broadcast*/
        $scope.$on('newUserAdded', function (event, data) {
            $scope.userNgGrid.data.push(data);
        });

        /*Variables*/
        angular.extend($scope, {
            newUser: {
                name: 'Amitav',
                email: 'reachme@amitavroy.com',
                password: 'password',
                cPassword: 'password'
            },
            errorMessages: [],
            userNgGrid: {
                paginationPageSizes: [10, 20, 30],
                paginationPageSize: 10,
                enableFiltering: true,
                columnDefs: [
                    {field: 'id', maxWidth: '90', enableCellEdit: false},
                    {field: 'name', displayName: 'Display name'},
                    {field: 'email', enableSorting: false, enableCellEdit: false},
                    {
                        field: 'status', maxWidth: '120',
                        editableCellTemplate: 'ui-grid/dropdownEditor',
                        editDropdownOptionsArray: [
                            {name: 'Active', value: 'Active'},
                            {name: 'Inactive', value: 'Inactive'}
                        ],
                        editDropdownIdLabel: 'value',
                        editDropdownValueLabel: 'name',
                    },
                    {
                        name: 'Ops',
                        sort: false,
                        maxWidth: 100,
                        cellTemplate: '<p style="text-align: center"><i class="fa fa-ban" ng-click="grid.appScope.deleteRow(row)"></i></p>'
                    }
                ],
                saveRow: $scope.saveRow,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
                }
            }
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
            },
            /*Updating the user row*/
            saveRow: function (rowEntity) {
                var promise = userFact.updateUser(rowEntity);
                $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise);
                return promise;
            },
            /*Delete the user row*/
            deleteRow: function (row) {
                var data = {id: row.entity.id};
                userFact.deleteUser(data).then(function (response) {
                    alert('User deleted');
                    var index = $scope.userNgGrid.data.indexOf(row.entity);
                    $scope.userNgGrid.data.splice(index, 1);
                }).catch(function (data, status, header) {
                    if (status == 403) {
                        angular.forEach(data, function (value, key) {
                            $scope.errorMessages.push(value.toString());
                        });
                    }
                });
            }
        });
    }]);
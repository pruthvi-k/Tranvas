myApp.config(["$routeProvider", "$locationProvider", function (e, t) {
    e.when("/user", {
        templateUrl: baseUrl + "ng_templates/users/user-list.html",
        controller: "userController"
    }), e.when("/user/add", {
        templateUrl: baseUrl + "ng_templates/users/user-add.html",
        controller: "userController"
    }), e.otherwise("/")
}]), myApp.factory("userFact", ["$rootScope", "httpFact", function (e, t) {
    var r = {};
    return r.allUser = "", r.getUserList = function () {
        return "" === this.allUser ? this.fetchUserList() : this.allUser
    }, r.fetchUserList = function () {
        var e = baseUrl + "api/user/list";
        return this.allUser = t.getRequest(e).then(function (e) {
            return e
        }), this.allUser
    }, r.saveNewUser = function (r) {
        var a = baseUrl + "api/user/save", n = {"Content-type": "application/json"};
        return t.postRequest(r, a, n).then(function (t) {
            return e.$broadcast("newUserAdded", t.data), t.data
        })
    }, r.deleteUser = function (e) {
        var r = baseUrl + "api/user/delete", a = {"Content-type": "application/json"};
        return t.postRequest(e, r, a).then(function (e) {
            return e
        })
    }, r.updateUser = function (e) {
        var r = baseUrl + "api/user/update", a = {"Content-type": "application/json"};
        return t.postRequest(e, r, a).then(function (e) {
            return e
        })
    }, r
}]), myApp.controller("userController", ["$scope", "$location", "$q", "userFact", "modalFact", function (e, t, r, a, n) {
    a.getUserList().then(function (t) {
        e.userNgGrid.data = t.data
    }), e.$on("newUserAdded", function (t, r) {
        e.userNgGrid.data.push(r)
    }), angular.extend(e, {
        newUser: {
            name: "Amitav",
            email: "reachme@amitavroy.com",
            password: "password",
            cPassword: "password"
        },
        modal: {title: "Action Success", body: "This action is successful"},
        errorMessages: [],
        userNgGrid: {
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            enableFiltering: !0,
            columnDefs: [{field: "id", maxWidth: "90", enableCellEdit: !1}, {
                field: "name",
                displayName: "Display name"
            }, {field: "email", enableSorting: !1, enableCellEdit: !1}, {
                field: "status",
                maxWidth: "120",
                editableCellTemplate: "ui-grid/dropdownEditor",
                editDropdownOptionsArray: [{name: "Active", value: "Active"}, {name: "Inactive", value: "Inactive"}],
                editDropdownIdLabel: "value",
                editDropdownValueLabel: "name"
            }, {
                name: "Ops",
                sort: !1,
                maxWidth: 100,
                cellTemplate: '<p style="text-align: center"><i class="fa fa-ban" ng-click="grid.appScope.deleteRow(row)"></i></p>'
            }],
            saveRow: e.saveRow,
            onRegisterApi: function (t) {
                e.gridApi = t, t.rowEdit.on.saveRow(e, e.saveRow)
            }
        }
    }), angular.extend(e, {
        saveNewUser: function (r) {
            return e.newUser.password != e.newUser.cPassword ? (e.errorMessages.push("The two passwords do not match"), !1) : (e.errorMessages = [], void a.saveNewUser(e.newUser).then(function (e) {
                t.path("/user")
            })["catch"](function (t, r, a) {
                console.log(t, r), 403 == r && angular.forEach(t, function (t, r) {
                    e.errorMessages.push(t.toString())
                })
            }))
        }, saveRow: function (t) {
            var r = a.updateUser(t);
            return e.gridApi.rowEdit.setSavePromise(t, r), n.confirmModal("userController"), r
        }, deleteRow: function (t) {
            var r = {id: t.entity.id};
            a.deleteUser(r).then(function (r) {
                n.confirmModal("userController");
                var a = e.userNgGrid.data.indexOf(t.entity);
                e.userNgGrid.data.splice(a, 1)
            })["catch"](function (t, r, a) {
                403 == r && angular.forEach(t, function (t, r) {
                    e.errorMessages.push(t.toString())
                })
            })
        }
    })
}]);
//# sourceMappingURL=userModule.js.map

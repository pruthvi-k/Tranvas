var myApp = angular.module("myApp", ["ngRoute", "ui.grid", "ui.grid.pagination", "ui.grid.edit", "ui.grid.rowEdit", "ui.grid.cellNav", "angularModalService"]);
myApp.factory("httpFact", ["$http", function (e) {
    var r = {};
    return r.getRequest = function (r) {
        return e.get(r).then(function (e) {
            return console.log("Server response", e), e
        })
    }, r.postRequest = function (r, t, n) {
        return e({headers: n, method: "POST", url: t, data: r}).then(function (e) {
            return console.log("Server response", e), e
        })
    }, r
}]);
//# sourceMappingURL=all.js.map

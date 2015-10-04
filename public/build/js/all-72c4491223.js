var myApp = angular.module("myApp", ["ngRoute", "ui.grid", "ui.grid.pagination", "ui.grid.edit", "ui.grid.rowEdit", "ui.grid.cellNav"]);
myApp.factory("httpFact", ["$http", function (e) {
    var t = {};
    return t.getRequest = function (t) {
        return e.get(t).then(function (e) {
            return console.log("Server response", e), e
        })
    }, t.postRequest = function (t, r, n) {
        return e({headers: n, method: "POST", url: r, data: t}).then(function (e) {
            return console.log("Server response", e), e
        })
    }, t
}]);
//# sourceMappingURL=all.js.map

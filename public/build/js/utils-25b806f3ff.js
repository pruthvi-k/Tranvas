myApp.factory("modalFact", ["ModalService", function (o) {
    var l = {};
    return l.confirmModal = function (l) {
        return o.showModal({
            templateUrl: baseUrl + "ng_templates/utils/confirmModal.html",
            controller: l
        }).then(function (o) {
            o.element.modal(), o.close.then(function (o) {
                console.log(o)
            })
        })
    }, l
}]), myApp.controller("ModalController", function (o, l) {
    o.close = function (o) {
        l(o, 500)
    }
});
//# sourceMappingURL=utils.js.map

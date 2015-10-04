/**
 * Created by amitav on 10/4/15.
 */
myApp.factory('modalFact', ['ModalService', function (ModalService) {
    var modal = {};

    modal.confirmModal = function (controllerName) {
        return ModalService.showModal({
            templateUrl: baseUrl + 'ng_templates/utils/confirmModal.html',
            controller: controllerName
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                console.log(result);
            });
        });
    };

    return modal;
}]);

myApp.controller('ModalController', function ($scope, close) {
    $scope.close = function (result) {
        close(result, 500);
    }
});
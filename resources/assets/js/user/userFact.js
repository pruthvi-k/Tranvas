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
(function () {
    'use strict';

    var serviceId = 'authService';
    angular.module('arcana').factory(serviceId, ['$rootScope', '$http', '$q', authService]);

    function authService($rootScope, $http, $q) {
        var service = {
            login: login,
            logout: logout,
            register: register,
            getCurrentUser: getCurrentUser
        };

        return service;

        function getCurrentUser() {
            var deferred = $q.defer();
            var url = '/api/auth/user';

            $http.get(url).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function login(loginModel) {
            var deferred = $q.defer();
            var url = '/api/auth/login';

            $http.post(url, loginModel).then(function (response) {
                $rootScope.user = { name: loginModel.UserName };
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            var url = '/api/auth/logout';

            $http.post(url).then(function () {
                $rootScope.user = { name: '' };
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function register(registerModel) {
            var deferred = $q.defer();
            var url = '/api/auth/register';

            $http.post(url, registerModel).then(function (response) {
                $rootScope.user = { name: registerModel.UserName };
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }        
    }    
})();
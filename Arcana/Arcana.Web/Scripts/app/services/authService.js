(function () {
    'use strict';

    var serviceId = 'authService';
    angular.module('arcana').factory(serviceId, ['$rootScope', '$http', '$q', 'ipCookie', authService]);

    function authService($rootScope, $http, $q, ipCookie) {
        var service = {
            login: login,
            logout: logout,
            register: register,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin
        };

        return service;

        function isLoggedIn(user) {
            if (user === undefined) {
                user = $rootScope.user;
            }

            return user.role === 'User' || user.role === 'Admin';
        }

        function isAdmin(userRole) {
            if (userRole === undefined) {
                userRole = $rootScope.user.role;
            }

            return userRole === 'Admin';
        }

        function login(loginModel) {
            var deferred = $q.defer();
            var url = '/api/auth/login';

            $http.post(url, loginModel).then(function (response) {
                var user = {
                    name: response.data.Username,
                    role: response.data.Role
                };

                $rootScope.user = user;
                ipCookie('user', user, { expires: 30, path: '/' });
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function logout() {
            ipCookie.remove('user');
            $rootScope.user = {
                name: '',
                role: 'Anon'
            };

            //var deferred = $q.defer();
            //var url = '/api/auth/logout';

            //$http.post(url).then(function () {
            //    $rootScope.user = { name: '' };
            //    deferred.resolve();
            //}, function (error) {
            //    deferred.reject(error);
            //});

            //return deferred.promise;
        }

        function register(registerModel) {
            var deferred = $q.defer();
            var url = '/api/auth/register';

            $http.post(url, registerModel).then(function (response) {
                var user = {
                    name: response.data.Username,
                    role: response.data.Role
                };

                $rootScope.user = user;
                ipCookie('user', user, { expires: 30, path: '/' });
                deferred.resolve();
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }
})();
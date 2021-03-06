//@* author Ravi Choudhary <ravichoudhary294@gmail.com>*@

(function () {
    var app = angular.module('SessionApp', ['ngIdle']);
    app
        .controller('EventsCtrl', function ($scope, Idle) {
            //.controller('MyController', function ($scope, Idle) {
            $scope.events = [];
            // $scope.idle = 18 * 60;  // 18 minute
            //  $scope.timeout = 2 * 60;  // 2 minute
            // For testing
            $scope.idle = 1 * 10;  // 1 minute
            $scope.timeout = 1 * 9;  // 9 secods

            $scope.$on('IdleStart', function () {
                //addEvent({ event: 'IdleStart', date: new Date() });
                //$scope.closeModals();

                //$scope.warning = $uibModal.open({
                //    templateUrl: '../scripts/AutoSession/warning-dialog.html',
                //    backdrop: 'static'
                //});
                $('#session-timeout-popup').modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                });
            });

            $scope.$on('IdleEnd', function () {
                // addEvent({ event: 'IdleEnd', date: new Date() });
            });

            $scope.$on('IdleWarn', function (e, countdown) {
                // addEvent({ event: 'IdleWarn', date: new Date(), countdown: countdown });
            });

            $scope.$on('IdleTimeout', function () {
                //addEvent({ event: 'IdleTimeout', date: new Date() });
                //alert("your time has expired.")
                $("button#stay-login").hide();
            });

            $scope.$on('Keepalive', function () {
                // addEvent({ event: 'Keepalive', date: new Date() });
            });

            function addEvent(evt) {
                $scope.$evalAsync(function () {
                    $scope.events.push(evt);
                })
            }

            $scope.reset = function () {
                Idle.watch();
                popclose();
            }

            $scope.$watch('idle', function (value) {
                if (value !== null) Idle.setIdle(value);
            });

            $scope.$watch('timeout', function (value) {
                if (value !== null) Idle.setTimeout(value);
            });
        })
        .config(function (IdleProvider, KeepaliveProvider) {
            KeepaliveProvider.interval(10);
            IdleProvider.windowInterrupt('focus');
        })
        .run(function ($rootScope, Idle, $log, Keepalive) {
            Idle.watch();

            //$log.debug('app started.');
        });

}());

function popclose() {
    $('#session-timeout-popup').modal('hide');
}

function signout() {
    popclose();
    //window.location.href = '/account/logout';
    // account part isn't include in this project so for testing go to home page.
    window.location.href = '/home/index';
}


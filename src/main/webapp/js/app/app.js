var app = angular.module("PlantaAPP", ['nvd3ChartDirectives', 'n3-line-chart']);
app.controller("PruebaSinCargaController", [
    "$scope", "$http", "$interval",
    function ($scope, $http, $interval) {
        $scope.Added = [];
        $scope.now = [];
        $scope.Poller = {};
        $scope.values = [
            {key: "L1", values: []}
        ];
        $scope.RefreshTime = 5;      
        $scope.RefreshTimes = [1, 5, 30, 60];
        $scope.Estatus = {
            Waiting: {text: "En espera", value: 0, color: 'green'},
            Running: {text: "Corriendo...", value: 1, color: 'blue'},
            Error: {text: "Error", value: 2, color: 'red'}
        };
        $scope.Estado =  $scope.Estatus.Waiting;
        $scope.AccumulateTime = 0;
        $scope.intervalTime = 1;        

        $scope.Start = function () {           
            $scope.Estado =  $scope.Estatus.Running;
            $scope.data = [];
            $scope.Poller = $interval(function () {
                $http.get('/PlantaSelmec/GetValues')
                        .success(function (response) {
                            $scope.now = response;
                            $scope.values[0].values.push([$scope.AccumulateTime, $scope.now.L1N]);
                            $scope.data.push({x: $scope.AccumulateTime, val_0: $scope.now.L1N, val_1: $scope.now.L2N, val_2: $scope.now.L3N});
                        });
                $scope.AccumulateTime += $scope.RefreshTime;
            }, $scope.RefreshTime * 1000);
        };

        $scope.Stop = function () {
            $scope.Estado = $scope.Estatus.Waiting;
            $interval.cancel($scope.Poller);
        };
            $scope.xFunction = function () {
                return function (d) {
                    return d[0];
                };
            };
            $scope.yFunction = function () {
                return function (d) {
                    return d[1];
                };
            };

        $scope.data = [];

        $scope.options = {
            series: [
                {
                    y: "val_0",
                    label: "L1-N",
                    color: "#ff0000",
                    type: "line",
                    thickness: "1px"
                }, {
                    y: "val_1",
                    label: "L2-N",
                    color: "#64c900",
                    type: "line",
                    thickness: "1px"
                }, {
                    y: "val_2",
                    label: "L3-N",
                    color: "#64c900",
                    type: "line",
                    thickness: "1px"
                }
            ],
            axes: {x: {type: "linear", key: "x"}, y: {type: "linear"}},
            lineMode: "linear",
            tension: 0.7,
            tooltip: {mode: 'axes', interpolate: false}
        };

        //$scope.Start();
    }]);
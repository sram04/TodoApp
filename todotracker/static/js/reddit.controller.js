(function (){
    'use strict';

    angular
        .module('todotracker')
        .controller('RedditController', ['$scope', '$http', '$window','$interval','Login','NavigationBar', RedditController]);

    function RedditController($scope, $http, $window, $interval, Login, NavigationBar){

        $scope.home = NavigationBar.home;
        $scope.alltasks = NavigationBar.allTasks;
        $scope.archived = NavigationBar.archived;
        $scope.userDetails = NavigationBar.userDetails;
        $scope.logout = Login.logout;
        $scope.isLoggedIn = Login.isLoggedIn();
        $scope.readRedditSoccer = NavigationBar.readRedditSoccer;

        $scope.date = new Date();

        $interval(function(){
            $scope.date = new Date();
        }, 1000);

        $scope.navigateToReddit = function(post)
        {
            $window.open(post.data.url, '_blank');
        }

        $http.get('https://www.reddit.com/r/soccer/hot/.json').then(function(response){
            $scope.posts = response.data.data.children;
        });
    }

})();


var confirmation=0;
angular.module('myApp', ['ngRoute','myApp.services','myApp.directives','myApp.controllers','ngMessages','ngIdle','ngResource','ngStorage','ui.router','ui.bootstrap'])
.run(function($rootScope) {
    $rootScope.names = [];
})
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'templates/login.html',
    controller:''
  })
  .state('whatWeDo', {
    url: '/whatWeDo',
    templateUrl: 'templates/whatWeDo.html',
    controller:''
  })
  .state('aboutUs', {
    url: '/aboutUs',
    templateUrl: 'templates/aboutUs.html',
    controller:''
  })
  .state('FAQs', {
    url: '/FAQs',
    templateUrl: 'templates/FAQs.html',
    controller:''
  })
  .state('whyFino', {
    url: '/whyFino',
    templateUrl: 'templates/whyFino.html',
    controller:''
  })
  .state('pricing', {
    url: '/pricing',
    templateUrl: 'templates/Pricing.html',
    controller:''
  })
  .state('getStarted', {
    url: '/getStarted',
    templateUrl: 'templates/getStarted.html',
    controller:''
  })
  .state('mfDisplay', {
    url: '/mfDisplay',
    templateUrl: 'templates/mfDisplay.html',
    controller:''
  })
  .state('cart', {
    url: '/cart',
    templateUrl: 'templates/cart.html',
    controller:''
  })
;   
});



var confirmation=0;
angular.module('myApp', ['ngRoute','myApp.services','myApp.directives','myApp.controllers','ngMessages','ngIdle','ngResource','ngStorage','ui.router','ui.bootstrap','angularSpinner'])
.run(function($rootScope,$sessionStorage) {
  if($sessionStorage.names == undefined){
    $sessionStorage.names = [];
  }
  if($sessionStorage.comboCartItems == undefined){
    $sessionStorage.comboCartItems = [];
  }
  if($sessionStorage.combo == undefined){
    $sessionStorage.combo = [];
  }

})
.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
  
  /*Pre Log in */

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
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

  /* Post Log in */

  .state('summary', {
    url: '/summary',
    templateUrl: 'templates/summary.html',
    controller:''
  })
  .state('invest', {
    url: '/invest',
    templateUrl: 'templates/invest.html',
    controller:''
  })
  .state('benchmark', {
    url: '/benchmark',
    templateUrl: 'templates/benchmark.html',
    controller:''
  })
  .state('funds', {
    url: '/funds',
    templateUrl: 'templates/funds.html',
    controller:''
  })
  .state('performance', {
    url: '/performance',
    templateUrl: 'templates/performance.html',
    controller:''
  })

  /*Log in  Sign up flow */

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller:''
  })
  .state('questions', {
    url: '/questions',         
    templateUrl: 'templates/questions.html',
    controller: ''     
  })
  .state('bank', {
  url: '/bank',         
    templateUrl: 'templates/bank.html',
    controller: ''     
  }) 
  .state('panImage', {
    url: '/panImage',         
    templateUrl: 'templates/panImage.html'

  })  
  .state('selfiImage', {
    url: '/selfiImage',         
    templateUrl: 'templates/selfiImage.html'

  })  
  .state('addressFrontImage', {
    url: '/addressFrontImage',         
    templateUrl: 'templates/addressFrontImage.html'

  })  
  .state('addressBackImage', {
    url: '/addressBackImage',         
    templateUrl: 'templates/addressBackImage.html'

  })  
  .state('signature', {
    url: '/signature',         
    templateUrl: 'templates/signature.html'

  })  

/*  success pages */

 .state('inactiveClient', {
    url: '/inactiveClient',         
        templateUrl: 'templates/inactiveClient.html'
  })

  .state('status', {
    url: '/status',
    templateUrl: 'templates/status.html',
  })
      
  .state('activeClientStatus', {
    url: '/activeClientStatus',         
    templateUrl: 'templates/activeClientStatus.html'
  })

; 
$locationProvider.html5Mode({
 enabled: true,
 requireBase: false
});
});

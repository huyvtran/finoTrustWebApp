
angular.module('myApp.controllers', [])
    
.controller('serchFilter', function($scope,$http) {
  $scope.funds=['Reliance Mf','Money Manager','Treasury Plan','Cash Plan'];
  $http.get('data/combo.json').then(function(res){
    $scope.combo = res.data; 
    console.log($scope.combo[1].ComboName);
  });

})
.controller('mfFilter', function($scope,$http,$timeout) {
  $scope.yearhide=true;
  $http.get('data/singleSchemes.json').then(function(res){
    $scope.singleScheme = res.data; 
    console.log($scope.singleScheme[1].AmcName);

  //Client-side pagination example
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.totalPages = 0;
    $scope.pagedData = [];
    $scope.data = [1,2,3,4,5,6,7,8,9,10,11,12];
    $scope.pageButtonDisabled = function(dir) {
      if (dir == -1) {
      return $scope.currentPage == 0;
      }
    return $scope.currentPage >=  $scope.singleScheme.length/$scope.pageSize - 1;
    }

    $scope.paginate = function(nextPrevMultiplier) {
      //loadSpin.showSpin($scope.spinneractive );
      $timeout(function() {
        $scope.currentPage += (nextPrevMultiplier * 1);
        $scope.pagedData =  $scope.singleScheme.slice($scope.currentPage*$scope.pageSize);
      }, 1200);
    }

    function init() {
      $scope.totalPages = Math.ceil( $scope.singleScheme.length/$scope.pageSize);
      $scope.pagedData =  $scope.singleScheme;
    }
$timeout(function() {
   init();
}, 20);
   
  });

})
.controller('datePickCrl', function($scope,psMfOrderDetailService,$timeout,$state) {
    $scope.test= function(){
      console.log($scope.HorizonID);
      var bank = JSON.parse(JSON.stringify({}));
            //bank.kyphCode="CRN23919";
            bank.spCode= "psFilter" //pan number
            bank.RiskId= "0" //bank account number
            bank.AmcId= "0"
            bank.AssetFamilyId= "0"
            bank.MFClassficationID= "0"
            bank.RecoId= "0"
            bank.HorizonID= $scope.HorizonID;
            bank=JSON.stringify(bank);
            console.log(bank);
            psMfOrderDetailService.save(bank,function(data){
            $timeout(function(){
              //$state.go('mfDisplay')
            },1000);
            },function(error){
            $timeout(function(){
              //$state.go('mfDisplay')
            },1000);
        //$ionicLoading.hide();
          },1500);



    }
  //disable typing in date picker input
  $('#dpd1,#dpd2,#dpdFlight1,#dpdFlight2,#start_date,#end_date').keydown(function(e) {
     e.preventDefault();
     return false;
  });
  //disable typing in date picker input end

  //main date picker
  var nowTemp = new Date();
  var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
  var checkin = $('#dpd1,#dpdFlight1').datepicker({
    startDate: now,
    autoclose: true,
    orientation: 'top left'
  })
  .on('changeDate', function(e){  
    selStartDate = e.date;
    var nextDay = new Date(e.date);
    nextDay.setDate(nextDay.getDate() + 1);
    $('#dpd2,#dpdFlight2').datepicker('setStartDate', nextDay);
    if(checkout.val() == '') checkout.focus();  

    if (checkout.datepicker('getDate') == 'Invalid Date') {
      var newDate = new Date(e.date)
      newDate.setDate(newDate.getDate() + 1);
      checkout.datepicker('update',newDate);
      checkout.focus(); 
    }

  });     

  var checkout = $('#dpd2,#dpdFlight2').datepicker({
    startDate: now,
    autoclose: true,
    orientation: 'top'
  })
  .on('changeDate', function(e){     
    var dateDiff= (new Date(checkout.val()) - new Date(checkin.val()))/(60*60*24000);
    if(dateDiff>=0 && dateDiff<8){$scope.HorizonID='1';}
    else if(dateDiff>=8 && dateDiff<16){$scope.HorizonID=2;}
    else if(dateDiff>=16 && dateDiff<31){$scope.HorizonID=3;}
    else if(dateDiff>=31 && dateDiff<91){$scope.HorizonID=4;}
    else if(dateDiff>=91 && dateDiff<183){$scope.HorizonID=5;}
    else if(dateDiff>=183 && dateDiff<366){$scope.HorizonID=6;}
    else if(dateDiff>=366 && dateDiff<1096){$scope.HorizonID=7;}
    else if(dateDiff>=1096 && dateDiff<1827){$scope.HorizonID=8;}
    else if(dateDiff>=1827 && dateDiff<3653){$scope.HorizonID=9;}
    else if(dateDiff>=3653){$scope.HorizonID=10;}
  }); 
  //main date picker end

	})



.controller('AuthSigninCtrl', function($scope,$state,$sessionStorage,$http,$localStorage,$timeout, $rootScope,loginInfoService) {
 $sessionStorage.SessionClientCode="none";
 $sessionStorage.stepCount=0;
 $scope.mobileNumber=$localStorage.loginData;
  $scope.signIn = function(form,loginForm) {
    if(form.$valid) {
      if($scope.rememberMe){ $localStorage.loginData=$scope.mobileNumber;}
      else{$localStorage.loginData='';}
      //$ionicLoading.show({templateUrl:"templates/loadingNormal.html"});
      $scope.loginDetails=JSON.parse(JSON.stringify({}));
      $scope.loginDetails.login=$scope.mobileNumber;
      $scope.loginDetails.password=$scope.digitPin;
      console.log($scope.loginDetails);
      $sessionStorage.loginData=$scope.loginDetails;
      console.log($localStorage.loginData);
      $scope.sendSignIn();
    }
    else{      
      $timeout(function(){
        loadSpin.stopSpin($scope.spinneractive );
      },1500);
    }
  }

    
    $scope.forgotPin=function(signinformData){
    console.log(signinformData);
    if(signinformData.$valid){
      $sessionStorage.forgotPinPhone = $scope.mobileNumber;
      var ph=$sessionStorage.forgotPinPhone;
      $http.get('https://finotrust.com/WealthWeb/ws/clientFcps/forgotPassword?mobileNumber='+ph); //sending the otp to the phone number
      $state.go('forgot_pin');
    }
    else{
      $scope.message="Please enter your mobile number to reset PIN";
      $timeout(function(){
        $scope.message="";
      },3000)

    }
  }

  $scope.sendSignIn=function() {
    loginInfoService.getJsonId($sessionStorage.loginData).then(function(data){

      if(data.responseCode=="Cali_SUC_1030"){
        $sessionStorage.SessionIdstorage = data.msg;
        $sessionStorage.SessionPortfolio =data.jsonStr[0].pfolioCode;
        $sessionStorage.SessionStatus =data.jsonStr[0].activeStatus;
        $sessionStorage.SessionClientName =data.jsonStr[0].clientName;
        $sessionStorage.SessionClientCode =data.jsonStr[0].clientCode;
        $sessionStorage.SessionMobNo =data.jsonStr[0].mobileNo;
        $sessionStorage.SessionFolioNums =(data.jsonStr[0].folioNums).length;
        $sessionStorage.clientActive = data.jsonStr[0].clientActive;
        $sessionStorage.nachStatus=data.jsonStr[0].nachStatus;
        console.log($sessionStorage.SessionFolioNums);
        $sessionStorage.folioNums = data.jsonStr[0].folioNums[0];
        $sessionStorage.clientType= data.jsonStr[0].clientType;
    $sessionStorage.docStatus=data.jsonStr[0].docStatus;
    console.log($sessionStorage.docStatus + "docStatus");


          //clevertap integration for user login
          clevertap.onUserLogin.push({
              "Site": {
                  "Name": $sessionStorage.SessionClientName,            // String
                  "ClientStatus": $sessionStorage.clientActive,        // string(char)
                  "Phone":$sessionStorage.SessionMobNo,               // Phone
                  "DocStatus":$sessionStorage.docStatus,             //string
                  "ActiveStatus":$sessionStorage.SessionStatus,     //string
                  "ClientType":$sessionStorage.clientType,         // string(char)
              }
          });

 
        $state.go('tabsController');
        }
        else if(data.responseCode=="Cali_ERR_9002") {
                $timeout(function(){
        loadSpin.stopSpin($scope.spinneractive );
      },1500);
        $scope.passwordError="Password not valid";
    $timeout(function(){
    $scope.passwordError="";
  },3000)
       }
        else if(data.responseCode=="Cali_ERR_1969") {
                $timeout(function(){
        loadSpin.stopSpin($scope.spinneractive );
      },1500);
        $scope.passwordError="Password not valid";
    $timeout(function(){
    $scope.passwordError="";
  },3000)
       }
        else{
        $scope.passwordError="Signin failed, Please try again later";
              $timeout(function(){
        loadSpin.stopSpin($scope.spinneractive );
      },1500);
    $timeout(function(){
    $scope.passwordError="";
  },3000)
       }

        },function(error){
        $scope.serverError = "Entered Credentials did not validate";
              $timeout(function(){
        loadSpin.stopSpin($scope.spinneractive );
      },1500);
    $timeout(function(){
    $scope.serverError="";
  },3000)
    });

  }
    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
    })
  .controller('cartController', function($scope,$sessionStorage,$rootScope){
    $scope.names = $rootScope.names;
    $scope.addDate = function(l) {
        $scope.names.push(new Date());
        console.log($scope.names);
        $sessionStorage.funds=$scope.names;
    };
    $scope.remove = function(index) {
        $scope.names.splice(index, 1);
    };
  })
  .controller('cartController2', function($scope,$sessionStorage){
    $scope.names = $sessionStorage.funds;
    $scope.addDate = function(l) {
        $scope.names.push(new Date());
        console.log($scope.names);
    };
    $scope.remove = function(index) {
        $scope.names.splice(index, 1);
    };
  })
;


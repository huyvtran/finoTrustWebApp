
angular.module('myApp.controllers', [])
    
.controller('psLOV', function($scope,$http,$sessionStorage,psMfOrderDetailService,$timeout) {
    $scope.getComboData= function(id,ComboName, Risk){
          //bank.kyphCode="CRN23919";
      var psLov = JSON.parse(JSON.stringify({}));
      psLov.spCode= "psLov" //pan number "spCode":"psCombo","ComboId":"12" 
      psLov=JSON.stringify(psLov);
      psMfOrderDetailService.save(comboData,function(data2){
        if(data2.responseCode=="Cali_SUC_1030"){

        }
      },function(error){
      },1500);
     }

})    
.controller('comboDetails', function($scope,$http,$sessionStorage,psMfOrderDetailService,$timeout) {
$scope.comboMf=[];
var len= ($sessionStorage.combo).length;
console.log(len);

    $scope.getComboData= function(id,ComboName, Risk){
          //bank.kyphCode="CRN23919";
      var comboData = JSON.parse(JSON.stringify({}));
      comboData.spCode= "psCombo" //pan number "spCode":"psCombo","ComboId":"12" 
      comboData.ComboId= id //pan number "spCode":"psCombo","ComboId":"12" 
      comboData=JSON.stringify(comboData);
      psMfOrderDetailService.save(comboData,function(data2){
        if(data2.responseCode=="Cali_SUC_1030"){
          var comboMf = JSON.parse(JSON.stringify({}));
          comboMf.id= id //pan number "spCode":"psCombo","ComboId":"12" 
          comboMf.comboName= ComboName //pan number "spCode":"psCombo","ComboId":"12" 
          comboMf.risk= Risk //pan number "spCode":"psCombo","ComboId":"12" 
          comboMf.amount= $sessionStorage.totalAmount //pan number "spCode":"psCombo","ComboId":"12" 
          comboMf.mfData= data2.jsonStr;
          $scope.comboMf.push(comboMf);
          console.log($scope.comboMf);
        }
      },function(error){
      },1500);
     }

$scope.selectCombo = [];
for (var i = 0; i < len; i++) {
    $scope.selectCombo.push(false);
    console.log("once");
    $scope.getComboData($sessionStorage.combo[i].Id, $sessionStorage.combo[i].ComboName, $sessionStorage.combo[i].Risk);
}
$sessionStorage.comboMf=$scope.comboMf;
})
.controller('mfFilter', function($scope,$http,$timeout,$sessionStorage,psMfOrderDetailService) {
  $scope.totalAmount=$sessionStorage.totalAmount;
  console.log($scope.totalAmount);
  $scope.combo=$sessionStorage.combo;
  $scope.comboMfs=$sessionStorage.comboMf;
  $sessionStorage.SessionClientCode='';
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
.controller('datePickCrl', function($scope,psMfOrderDetailService,$timeout,$state,$sessionStorage) {

    if ($sessionStorage.totalAmount == undefined) {$sessionStorage.totalAmount=0;}

    $scope.test= function(){
      $sessionStorage.totalAmount=$scope.totalAmount;
      console.log($scope.totalAmount);
      console.log($scope.HorizonID);
      if($scope.HorizonID==undefined){$scope.HorizonID=0;}
      var psFilter = JSON.parse(JSON.stringify({}));
            //bank.kyphCode="CRN23919";
            psFilter.spCode= "psFilter" //pan number
            psFilter.RiskId= "0" //bank account number
            psFilter.AmcId= "0"
            psFilter.AssetFamilyId= "0"
            psFilter.MFClassficationID= "0"
            psFilter.RecoId= "0"
            psFilter.HorizonID= $scope.HorizonID;
            psFilter=JSON.stringify(psFilter);
            console.log(psFilter);
            psMfOrderDetailService.save(psFilter,function(data){
            if(data.responseCode=="Cali_SUC_1030"){
              $sessionStorage.combo=data.jsonStr;
              $timeout(function(){
                //$state.go('mfDisplay')
                    var psMf = JSON.parse(JSON.stringify({}));
                    psMf.spCode= "psMf" //pan number
                    psMf.RiskId= "0" //bank account number
                    psMf.AmcId= "0"
                    psMf.AssetFamilyId= "0"
                    psMf.MFClassficationID= "0"
                    psMf.RecoId= "0"
                    psMf.HorizonID= $scope.HorizonID;
                    psMf=JSON.stringify(psMf);
                    console.log(psMf);
                    psMfOrderDetailService.save(psMf,function(data2){
                      $sessionStorage.singleScheme=data.jsonStr;
                      $timeout(function(){
                        $state.go('mfDisplay')  
                        //{"spCode":"psMf","RiskId":"0","AmcId":"0","AssetFamilyId":"0","MFClassficationID":"0","RecoId":"0","HorizonID":"0"}
                      },1000);
                      },function(error){
                        $timeout(function(){
                          //$state.go('mfDisplay')
                        },1000);
                  //$ionicLoading.hide();
                    },1500);
              },1000);
            }
            else{
              console.log("error");
            }
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



.controller('AuthSigninCtrl', function($scope,$state,$sessionStorage,$http,$localStorage,$timeout, $rootScope,loginInfoService,loadSpin,usSpinnerService) {
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
      console.log($localStorage.loginData);
      $scope.sendSignIn($scope.loginDetails);
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

  $scope.sendSignIn=function(loginData) {
    loginInfoService.getJsonId(loginData).then(function(data){

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
        $state.go('cart');
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

   .controller('AuthSignUpCtrl', function($scope, $state,signUpService,usSpinnerService,$sessionStorage, $rootScope,loadSpin,$timeout) {

        $scope.signUp = function(form,searchText2,signupForm) {

            $sessionStorage.SessionClientName=signupForm.fName+' '+signupForm.lName;
            $sessionStorage.SessionMobNo=signupForm.mobileNumber;
            if(angular.equals(signupForm.pin,searchText2))
            {
                if( signupForm.mobileNumber==signupForm.referral) {
          console.log("same number");
          form.referral.$dirty=false;
          console.log( form.referral.$dirty+ " in cont");
          $scope.error_referal="Entered mobile number and referral number should be different";
        }
        else{

          if(form.$valid) {
            console.log("not same number");
            //$ionicLoading.show({templateUrl:"templates/loadingNormal.html"});
            loadSpin.showSpin($scope.spinneractive );
            $sessionStorage.signUpData = (signupForm);
            $scope.addUserInfo();
          }
        }
            }
            else{
                $scope.error_pin="Entered password didn't match";
            }
        }

        $scope.addUserInfo=function(){
          loadSpin.showSpin($scope.spinneractive );
            signUpService.sendSignUp($sessionStorage.signUpData).then(function(data){
        //$sessionStorage.

                if(data.responseCode!="Cali_SUC_1030"){
                  if(data.responseCode=="Cali_ERR_2050" || data.responseCode=="Cali_ERR_2066" ){
                    $scope.mobileError="Mobile number in use";
                  }
                  else if(data.responseCode=="Cali_ERR_1838" || data.responseCode=="Cali_ERR_1838" ){
                    $scope.serverError="Please enter your full name";
                  }
                  else{
                    $scope.serverError="Sign Up failed, please try again";
                  }
                }
                else {
                  $sessionStorage.SessionStatus='I';
                  $sessionStorage.SessionPortfolio=(JSON.parse(data.jsonStr)).portfolioCode;
                  $sessionStorage.SessionClientCode=(JSON.parse(data.jsonStr)).clientCode;
                  $sessionStorage.clientType=(JSON.parse(data.jsonStr)).clientType;
                  $sessionStorage.stepCount=0;
                  //$state.go('sliders');    // new sign upflow
                }
            },function(error){
        //$ionicLoading.hide();
            $timeout(function(){
              loadSpin.stopSpin($scope.spinneractive );
            },1500);
                $scope.serverError="Sign Up failed, please call us";
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


.controller('cartController', function($scope,$sessionStorage,$rootScope,$state){
    $scope.names = $sessionStorage.names;
    var comboValue=0;
    $scope.comboCartItems = $sessionStorage.comboCartItems;
    $rootScope.schemeLen= $sessionStorage.names.length ;
    $rootScope.comboLen= $sessionStorage.comboCartItems.length;
    $rootScope.cartLength= $rootScope.schemeLen + $rootScope.comboLen;
    $scope.yearhide=false;
    $scope.cartLength = function() {
      return $rootScope.schemeLen + $rootScope.comboLen;
    }
    $scope.addCombo = function(comboId) {
        $sessionStorage.comboCartItems.push($sessionStorage.comboMf[comboId]);
        console.log($sessionStorage.comboCartItems);
        $rootScope.comboLen=$sessionStorage.comboCartItems.length;
          $scope.comboSchemeAmount();        
    };
    $scope.comboSchemeAmount = function() {
        var len= ($sessionStorage.comboCartItems[$rootScope.comboLen-1].mfData).length;
        for(i=0; i<len; i++){
          var percent = $sessionStorage.comboCartItems[$rootScope.comboLen-1].mfData[i].Prcnt ;
          $sessionStorage.comboCartItems[$rootScope.comboLen-1].mfData[i].Prcnt = (percent * $sessionStorage.totalAmount)/100;
          comboValue= comboValue+ $sessionStorage.comboCartItems[$rootScope.comboLen-1].mfData[i].Prcnt ;
          $scope.comboValue=comboValue;
        }
          $sessionStorage.comboCartItems[$rootScope.comboLen-1].amount=$scope.comboValue;
    };
    $scope.removeCombo = function(index) {
        $sessionStorage.comboCartItems.splice(index, 1);
        $rootScope.comboLen=$sessionStorage.comboCartItems.length;
    };
    $scope.editCombo= function(parent,oldValue){
        var len= ($sessionStorage.comboCartItems[parent].mfData).length;
        for(i=0; i<len; i++){
          var percent = $sessionStorage.comboCartItems[parent].mfData[i].Prcnt ;
          $sessionStorage.comboCartItems[parent].mfData[i].Prcnt = (percent * $sessionStorage.totalAmount)/100;
          comboValue= comboValue+ $sessionStorage.comboCartItems[parent].mfData[i].Prcnt ;
          $scope.comboValue=comboValue;
        }
          $sessionStorage.comboCartItems[parent].amount=$scope.comboValue;
    };
    $scope.editComboScheme= function(updateAmount, parent, child,oldValue){
      console.log(updateAmount, parent, child,oldValue);
      $sessionStorage.comboCartItems[parent].mfData[child].Prcnt= updateAmount;
      $sessionStorage.comboCartItems[parent].amount=$sessionStorage.comboCartItems[parent].amount + updateAmount - oldValue; 

    };
    $scope.addScheme = function(schemeName, amount, AssetFamily) {
        console.log(schemeName, amount, AssetFamily);
        var cartItem= JSON.parse(JSON.stringify({}));
        cartItem.schemeName= schemeName, //pan number
        cartItem.amount= amount, //bank account number
        cartItem.AssetFamily= AssetFamily,
        cartItem.date= new Date()
        cartItem=JSON.parse(JSON.stringify(cartItem));
        console.log(cartItem);
        $sessionStorage.names.push(cartItem);
        console.log($sessionStorage.names[0].RiskId);
        $rootScope.names = $sessionStorage.names;
        $rootScope.schemeLen=$sessionStorage.names.length;
    };
    $scope.removeScheme = function(index) {
        $sessionStorage.names.splice(index, 1);
        $rootScope.schemeLen=$sessionStorage.names.length;
    };
    $scope.cartValue = function() {
        var schemeTotal=0;
        var comboTotal=0;
        var total=0;
        for(i=0; i<$rootScope.schemeLen; i++){
          schemeTotal= schemeTotal+$sessionStorage.names[i].amount;
        }
        for(i=0; i<$rootScope.comboLen; i++){
          comboTotal= comboTotal+($sessionStorage.comboCartItems[i].amount);
        }
        return schemeTotal+comboTotal;
    };
    $scope.loginCheck= function(){
      var login;
      console.log('$sessionStorage.SessionClientCode   ' + $sessionStorage.SessionClientCode);
      if($sessionStorage.SessionClientCode== undefined || $sessionStorage.SessionClientCode== ''){
        console.log("not login" ); 
        login=false;
      }
      else{login = true;}
      
      if(login == false){
        console.log("not login" + login); 
          $state.go('login');
      }
      else{
        console.log("not login" + login); 
        $state.go('home');
      }
    }
})




;


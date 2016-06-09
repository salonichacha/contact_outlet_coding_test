angular.module('myApp',[])
.controller('myAppController',function($scope,$http){
 var outletdata, contactsdata;
 $scope.order = 'contacts[0].firstName';
 $scope.reverse = false;
 $scope.perPage = 25;
    $scope.currentPage = 1;
 $scope.offset = 0;
 
 $.when(
     $.getJSON('outletdata.json', function(data) {
         outletdata = data;
     }),
     $.getJSON('contactsdata.json', function(data) {
         contactsdata = data
     })

 ).then(function() {
     for(var i = 0 ; i < outletdata.length ; i++){
   outletdata[i].contacts = [];
      for(var j = 0 ; j < contactsdata.length ; j++){
       if(outletdata[i].id === contactsdata[j].outletId){
        outletdata[i].contacts.push(contactsdata[j])
       }

      }   
     }
  $scope.finalData = outletdata;
  $scope.setPages();
  $scope.$apply();
 });
 
 $scope.orderBy = function(field){
  if($scope.order == field){
   if($scope.reverse){
    $scope.reverse = false;
   }else{
    $scope.reverse = true;
   } 
  }else{
   $scope.reverse = false;
  }
  $scope.order = field;
  
 };
 $scope.changePage = function (page) {
        $scope.currentPage = page.pageNo;
        $scope.offset = ($scope.currentPage - 1) * $scope.perPage;
    }

    $scope.setPages = function () {
        $scope.pages = [];
        var startPage = 1;
  $scope.totalPage = Math.ceil($scope.finalData.length / $scope.perPage);
  var endPage = $scope.totalPage;
        if ($scope.currentPage > 3) {
            startPage = $scope.currentPage - 3;
            $scope.pages.push({'class': '', 'pageNo': 1, 'label': "<<"});
        }
        if ($scope.totalPage > $scope.currentPage + 3) {
            endPage = $scope.currentPage + 3;
        }
        for (var i = startPage; i <= endPage; i++) {
            if (i == $scope.currentPage) {
                $scope.pages.push({'class': 'active', 'pageNo': i, 'label': i});
            } else {
                $scope.pages.push({'class': '', 'pageNo': i, 'label': i});
            }
        }

        if ($scope.totalPage > $scope.currentPage + 3) {
            $scope.pages.push({'class': '', 'pageNo': $scope.totalPage, 'label': ">>"});
        }
  
    };
});
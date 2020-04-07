angular.module('pinCodes')
.controller('HomeCtrl', ['$scope', '$http' ,
    function($scope , $http) {
        $scope.ListOfCodes = [];
        $scope.items = []; 
        let counter = 10;
        $scope.selectedCode;

        //get list of zipcodes
        $scope.getAllcodes = function() {
            $http.get("http://localhost:3000/zipcodes").then(function (response) {
                $scope.items = response.data;
               for (var i = 0, len = 10; i < len; i++){
                $scope.ListOfCodes.push($scope.items[i]);
                }
               $scope.getMapData();
               $scope.loadMore();
            },function (error){
                console.log(error, 'Error in getting data.');
            });
        }
        setTimeout(function(){ 
            $scope.getAllcodes();
        }, 2000);
       
        //load more data on scroll
        $scope.loadMore = function() {
            let nextData = [];
            if($scope.items.length  >  0){
                nextData =  $scope.items.splice(counter, 10);
                for (var i = 0, len = nextData.length; i < len; i++){
                    $scope.ListOfCodes.push(nextData[i]);
                }
                counter += 10;
            }
        };
        
        // Search based on zipcode
       $scope.searchZip = function($event){
           if($scope.search.length > 4){
                $scope.selectedCode = $scope.items.filter(item => item.fields.zip == $scope.search);
                let data  = $scope.selectedCode[0];
                let myOptions = {
                    zoom: 9,
                    center: new google.maps.LatLng(data.fields.latitude, data.fields.longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: false
                };
                $scope.Map.setOptions(myOptions);

                let marker = new google.maps.Marker({
                    map: $scope.Map,
                    draggable: true,
                    title: data.fields.city,
                    animation: google.maps.Animation.DROP,
                    position: {lat: data.fields.latitude, lng: data.fields.longitude}
                  });
           }
           if($scope.search.length == ""){
                let myOptions = {
                    zoom: 3,
                    center: new google.maps.LatLng($scope.items[0].fields.latitude, $scope.items[0].fields.longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                };
                $scope.Map.setOptions(myOptions); 
           }
       } 

       // Plot data on map
       $scope.getMapData = function(){
             //Setting the Map options.
        $scope.MapOptions = {
            center: new google.maps.LatLng($scope.items[0].fields.latitude, $scope.items[0].fields.longitude),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

         //Initializing the InfoWindow, Map and LatLngBounds objects.
         $scope.InfoWindow = new google.maps.InfoWindow();
         $scope.Latlngbounds = new google.maps.LatLngBounds();
         $scope.Map = new google.maps.Map(document.getElementById("dvMap"), $scope.MapOptions);

                //Looping through the Array and adding Markers.
            for (var i = 0; i < $scope.items.length; i++) {
                let data = $scope.items[i];
                let myLatlng = new google.maps.LatLng(data.fields.latitude, data.fields.longitude);

                //Initializing the Marker object.
                let marker = new google.maps.Marker({
                    position: myLatlng,
                    map: $scope.Map,
                    title: data.fields.city
                });

                //Plotting the Marker on the Map.
                $scope.Latlngbounds.extend(marker.position);
            }
            //Adjusting the Map for best display.
            $scope.Map.setCenter($scope.Latlngbounds.getCenter());
            $scope.Map.fitBounds($scope.Latlngbounds);
       } 
    
    }
]);

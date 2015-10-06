sampleApp.controller('MapCtrl', function ($scope) {
    $scope.howTo = 0;
    $scope.about = 0;

    var lat = null;
    var lng = null;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                var locationMarker = null;
                if (locationMarker){
                    // return if there is a locationMarker bug
                    return;
                }

                lat = position.coords["latitude"];
                lng = position.coords["longitude"];

                // calls PubNub
                pubs();
                // calls main method
                main();
            },
            function(error) {
                console.log("Error: ", error);
            },
            {
                enableHighAccuracy: true
            }
        );
    }

    function pubs() {
        pubnub = PUBNUB.init({
            publish_key: 'pub-c-cc10c64c-9dbb-4872-902a-7e327add326d',
            subscribe_key: 'sub-c-7060ad7e-64c6-11e5-bad4-02ee2ddab7fe'
        })
        pubnub.subscribe({
            channel: "mymaps",
            message: function(message, channel) {
                console.log(message)
                lat = message['lat'];
                lng = message['lng'];
                map.setView([lat, lng]);
                map_line.addLatLng([lat,lng]);
                marker.setLatLng(L.latLng(lat, lng));
            },
            connect: function() {console.log("pubnub connected")}
        })
    }

    //allow pubs to see map_line polyline
    var map_line;
    var map;
    var marker;

    function main() {
        // Provide your access token
        L.mapbox.accessToken = 'pk.eyJ1IjoiamVuYW5tYW5uZXR0ZSIsImEiOiJjaWY0aHBxdm8wOGF5eDRrc2xjM2tyY3RpIn0.A-RsYps9bEry6sumH97vZQ'
        // Create a map in the div #map
        map = L.mapbox.map('map', 'jenanmannette.cif4csujt00u1xdkst1y7jsf6');
        map.setView([lat, lng], 17);

        marker = L.marker([lat, lng], {
            icon: L.mapbox.marker.icon({
                'marker-color': '#f86767'
            })
        });

        map_line = L.polyline([], {color: 'blue'}).addTo(map);

        marker.addTo(map);
    }


    $scope.showAbout = function(){
        if ($scope.about === 0) {
            $scope.about = 1;
            $scope.howTo = 0;
        } else {
            $scope.about = 0;
        }
    };
});


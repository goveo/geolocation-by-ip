var app = new Vue({
    el: '#app',
    data: {
        map: {},
        service: {},
        ipToSearch: null,
        searchUrl: 'http://ip-api.com/json/?callback=?',
        location: {
            lat: 0,
            lng: 0
        }
    },
    methods: {
        initMap: function () {
            console.log('map creating');
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: this.location,
                zoom: 17
            });
            this.service = new google.maps.places.PlacesService(this.map);

            this.search();
        },
        search: function () {
            console.log('search started');
            $.getJSON(this.searchUrl, function (received) {
                console.log('received: ', received);
                if (received.status == 'fail') {
                    console.log('fail');
                    
                    app.searchUrl = 'http://ip-api.com/json/?callback=?';
                    app.search();
                } else if (received.status == 'success') {
                    console.log('success');
                    app.location.lat = received.lat;
                    app.location.lng = received.lon;
                    console.log('data.lat: ', received.lat);
                    console.log('data.lon: ', received.lon);
                    app.map.setCenter(new google.maps.LatLng(received.lat, received.lon));
                    console.log('map centered');
                }
            });
        }
    }
});
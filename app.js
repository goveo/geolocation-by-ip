var app = new Vue({
    el: '#app',
    data: {
        map: {},
        service: {},
        ipToSearch: null,
        searchUrl: 'http://ip-api.com/json/127.0.0.1?callback=?',
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
            $.getJSON(this.searchUrl, function (data) {
                console.log('data: ', data);
                if (data.status == 'fail') {
                    app.searchUrl = 'http://ip-api.com/json/?callback=?';
                    app.search();
                } else {
                    app.location.lat = data.lat;
                    app.location.lng = data.lon;
                    
                }
            });
        }
    }
});
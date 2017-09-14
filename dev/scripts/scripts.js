var bikeApp = {};

bikeApp.stations = [];

bikeApp.events = function () {

    $.ajax({
        url: 'http://api.citybik.es/v2/networks/toronto',
        method: 'GET',
        dataType: 'json',
        data: {
            format: 'json'
        }
    }).then(function (res) {
        let bikeData = res.network.stations;
        bikeApp.populateList(bikeData);
    });

    $('#bikeResponse').css('display', 'none');

}

bikeApp.populateList = function (bikeData) {
    bikeData.forEach(function (station) {
        options.data.push(station.name);

        bikeApp.stations.push(station);
    });

};

bikeApp.formEvent = function (station) {

    console.log('hi');

    $('form').on('submit', function (e) {

        var usersInput = $('.usersLocay').val();

        e.preventDefault();

        bikeApp.displayData(usersInput);


    });

    $('.submitBtn').click(function () {

        let geoLocay = bikeApp.stations.filter(function (bikestop) {
            return bikestop.name === $('.usersLocay').val();
        })

        console.log(geoLocay);

        let googleCoord = {
            lat: geoLocay[0].latitude,
            lng: geoLocay[0].longitude
        }

        console.log(googleCoord);

        $('#landingPage').css('display', 'none');

        $('#bikeResponse').css('display', 'block');

        let googleProps = {
            center: googleCoord,
            zoom: 19
        }

        let map;
        map = new google.maps.Map(document.getElementById('map'), googleProps)
        let marker = new google.maps.Marker({
            position: googleCoord,
            map: map,
            title: geoLocay.name,
        });

        $('#map').append(map)
    });

}


bikeApp.displayData = function (usersInput, e) {

    var usersInput = usersInput;

    bikeApp.stations.forEach(function (station, ) {

        if (usersInput === station.name) {

            $('.choosenStation').html(`${station.name}`);

            $('.freeBikes').html(`${station.empty_slots}`);

            $('.emptySlots').html(`${station.free_bikes}`);
        }
    });

    bikeApp.resetBtnFunction();

}

bikeApp.resetBtnFunction = function () {

    $('.findAnother').click(function () {

        $('#landingPage').css('display', 'block');

        $('#bikeResponse').css('display', 'none');
    });

}

var options = {
    data: [],
    list: {
        match: {
            enabled: true
        }
    }
};

$("#match").easyAutocomplete(options);


bikeApp.init = function () {
    bikeApp.events();
    bikeApp.formEvent();
};



$(function () {
    bikeApp.init();
});
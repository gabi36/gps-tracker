function getPositions() {
    var criteria = new Criteria();
    let requestParam = $.param(criteria);
    sendRequest("GET",  requestParam, null, getPositionsSuccessHandler, getPositionsErrorHandler);
}

function Criteria() {
    var deviceId = $('#deviceId').val().trim(); // select data from input and trim it
    if (deviceId.length > 0) {
        this.terminalId = deviceId;
    }

    var startDate = $('#startDate').val().trim(); // select data from input and trim it
    if (startDate.length > 0) {
        this.startDate = startDate;
    }

    var endDate = $('#endDate').val().trim(); // select data from input and trim it
    if (endDate.length > 0) {
        this.endDate = endDate;
    }
}

function getPositionsSuccessHandler(respData) {
    $("#result").append("<br>" + JSON.stringify(respData));
    console.log(respData)
    respData.map(position=> {
        let coord = {
            lat: parseInt(position.latitude),
            lng: parseInt(position.longitude)
        };
        addStaticMarker1(coord)
    })
    //console.log(respData[0].latitude)
    //$("#result").text(respData); // appends the json to the 'result' div. see index.html
}

function getPositionsErrorHandler(status) {
    alert("err response: " + status); // popup on err.
}

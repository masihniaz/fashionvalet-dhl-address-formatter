function convertAddress() {
    baseURL = window.location.href;
    console.log('BASE URL: ', baseURL);
    let address = document.getElementById("address").value;

    let body = {
        address: address
    };

    $.ajax({
        type: 'POST',
        // url: 'https://fashionvalet-dhl-add-formatter.herokuapp.com/parse-address',
        url: baseURL + 'parse-address',
        data: body,
        success: function(data) {
            document.getElementById("line1").value = data.address[0];
            document.getElementById("line2").value = data.address[1];
            document.getElementById("line3").value = data.address[2];
        },
        error: function(jqXHR, exception) {
            console.log(jqXHR);
            if(jqXHR.status == 400) {
                alert(jqXHR.responseText);
            };
        }
    });

};
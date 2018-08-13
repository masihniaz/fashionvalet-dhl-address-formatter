function convertAddress() {
    let address = document.getElementById("address").value;

    let body = {
        address: address
    };

    $.ajax({
        type: 'POST',
        // url: 'http://localhost:4000/parse-address',
        url: 'https://fashionvalet-dhl-add-formatter.herokuapp.com/parse-address',
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
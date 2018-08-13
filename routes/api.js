const express = require('express'),
      router = express.Router();

router.post('/parse-address', function(req, res,) {

    // Remove whitespaces from start and end of the requested address and initialize our local variables.
    let address = req.body.address.trim(),
        addressArray = [],
        line1 = [],
        line2 = [],
        line3 = [],
        line1String = '',
        line2String = '',
        line3String = '',
        length = 0;

    // Check bad requests
    if(!address) {
        res.status(400).json({status: 'fail', message: 'Address cannot be empty.'});
        return;
    } else if(address.split(' ').length < 3) {
        res.status(400).json({status: 'fail', message: 'Address cannot be less than 3 words.'});
        return;
    } else if(address.length > 90) {
        res.status(400).json({status: 'fail', message: 'Address is too long.'});
        return;
    };

    // An exceptional case if the address length is exactly 90 characters
    if(address.length == 90) {
        addressArray = splitAddress(address);
        res.status(200).json({status: 'success', address: addressArray});
        return;
    };
    
    // if address is below 61 characters
    if(address.length < 61 ) {
        let wordsLength = address.split(' ').length;
        console.log(wordsLength);
        let splittedAddress = address.split(' ');
        // if words splitted by space is completely divisble by 3 line, distribute words equally
        if(wordsLength % 3 == 0) {
            for(let i = 0; i < wordsLength; i++) {
                if(i < wordsLength / 3) {
                    line1String += (splittedAddress[i] + ' ');
                } else if(i < ((wordsLength / 3) * 2)) {
                    line2String += (splittedAddress[i] + ' ');
                } else if(i < (wordsLength / 3)  * 3) {
                    line3String += (splittedAddress[i] + ' ');
                };
            };

            // push the splitted lines into addressArray
            addressArray.push(line1String);
            addressArray.push(line2String);
            addressArray.push(line3String.substring(0, line3String.length - 1)); // remove the whitespace at the end added by word concatination.
            res.status(200).json({
                status: 'success',
                address: addressArray
            });
            return;
            
        // If words are not divisble evenly
        // lenght / lineNumber          line 1 words    line 2 words        Reminder( (line1 + line2) - wordsLenght)
        // 4/3                   =           1               1                                  2
        // 5/3                   =           1               1                                  3
        // 7/3                   =           2               2                                  3
        // 8/3                   =           2               2                                  4
        // 10/3                  =           3               3                                  4
        // 11/3                  =           3               3                                  5
        // 13/3                  =           4               4                                  5
        // 14/3                  =           4               4                                  6
        } else {
            firstAndSecondLineLength = Math.floor(wordsLength / 3); // round it!  because we don't want to pass it as fraction into the index of array. For example array[1.33]
            thirdLineLength = (firstAndSecondLineLength * 2) - wordsLength;
            for(let i = 0; i < firstAndSecondLineLength; i++) {
                line1String += splittedAddress[i] + ' ';
            };
            for(let i = firstAndSecondLineLength; i < firstAndSecondLineLength * 2; i++) {
                line2String += splittedAddress[i] + ' ';
            };
            for(let i = firstAndSecondLineLength * 2; i < wordsLength; i++) {
                line3String += splittedAddress[i] + ' ';
            };
            addressArray.push(line1String);
            addressArray.push(line2String);
            addressArray.push(line3String.substring(0, line3String.length - 1)); // remove the whitespace at the end added by word concatination
            res.status(200).json({
                status: 'success',
                address: addressArray
            });
            return;
        };
    };
    
    // Split the address by "space" and try to accommodate it into 3 lines without breaking a word, when the address lenght is more than 60 characters.
    // the following code pushes the splitted words into every line as long as the length of every line does not excced 30 characters, and the last line also does not excced 90 characters.
    address.split(' ').forEach(word => {
        let currentLenght = length + word.length + 1;
        if(currentLenght <= 30 && address.length > 60) {
            length += word.length + 1;
            line1.push(word + ' ');
        } else if (currentLenght <= 60 && address.length > 60) {
            length += word.length + 1;
            line2.push(word + ' ');
        } else if (currentLenght <= 90 && address.length > 60) {
            length += word.length + 1;
            line3.push(word + ' ');
        } else if (currentLenght > 90) {
            addressArray = splitAddress(address);
            res.status(200).json({
                status: 'success',
                address: addressArray
            });
            return;
        };
    });
    
    // loop through array of each line, concatenate the words and push it to it's respective line
    line1.forEach(word => {
        line1String += word;
    });
    line2.forEach(word => {
        line2String += word;
    });
    line3.forEach(word => {
        line3String += word;
    });
    addressArray.push(line1String);
    addressArray.push(line2String);
    addressArray.push(line3String.slice(0, line3String.length - 1)); // remove the whitespace at the end added by word concatination

    res.status(200).json({
        status: 'success',
        address: addressArray
    });
    return;
});

// export router
module.exports = router;

// splits address into "30, 30, remaining" characters.
function splitAddress(address) {
    let addressArray  = [];
    addressArray.push(address.substring(0, 30));
    addressArray.push(address.substring(30, 60));
    addressArray.push(address.substring(60, address.length - 1));
    return addressArray;
};
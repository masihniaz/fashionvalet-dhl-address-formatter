DHL Address Formatter
=====================



Explaination
============

* An API that splits 90 characters line address into 3 lines, acceptable by DHL API.

* The API is written in Express JS a Node JS framework and deployed to Heroku Cloud.

* The live demo is developed using HTML5, CSS, Bootstrap and jQuery.


Installition
============
To setup the project in your local machine follow the steps below:

1. Install Node JS.
2. Clone the repository to your machine.
3. run npm install in the projects root directory.


Live Demo
=========

[Link] (https://fashionvalet-dhl-add-formatter.herokuapp.com/)

Sometimes it might take a little longer to open the demo page, because it's living on a free dyno and it sleeps after 30 minutes of inactivity.


API Usage
=========

```
POST request to /parse-address
Type: JSON

Sample Post:
{
    address: "Jalan Jelatek, Kementah, 54200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur"
}

Sample Response:
{
    status: 'success',
    address: [
        'Jalan Jelatek, Kementah, ',
        '54200 Kuala Lumpur, Wilayah ',
        'Persekutuan Kuala Lumpur'
    ]
}

Error Response:
1. Empty Address
{
    status: 'fail',
    message: 'Address cannot be empty'
}
2. Short Address
{
    status: 'fail',
    message: 'Address cannot be less than 3 words.'
}
3. Long Address
{
    status: 'fail',
    message: 'Address is too long.'
}

```

Integration Test
================

* Supertest, Mocha and Chai is used for Integration Testing.

To execute the test script, type npm test in the project's root directory.


HOW IT WORKS
============

* If address lenght is exactly 90 characters then we divide it equally by 30 characters each line, and we can't help the word break.

* If the address lenght is less than 61 characters
    * Check if words are equally divisible by 3 line, then distrubute them equally and return;
    * Otherwise, If words are not divisble evenly distrubute them in the following manner
        ```
        lenght / lineNumber          line 1 words    line 2 words        line 3 words = ( (line1 + line2) - wordsLenght)
        4/3                   =           1               1                                  2
        5/3                   =           1               1                                  3
        7/3                   =           2               2                                  3
        8/3                   =           2               2                                  4
        10/3                  =           3               3                                  4
        11/3                  =           3               3                                  5
        13/3                  =           4               4                                  5
        14/3                  =           4               4                                  6
        ```
* If address length is bigger than 60, Split the address by "space" and try to accommodate it into 3 lines without breaking a word, when the address lenght is more than 60 characters.
    * If the lenght of last line exceeded, then just divide by 30, 30 and remaining characters.


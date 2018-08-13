var app = require('../server');
var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

    describe('Homepage', function() {
        it('Renders the homepage with status 200 ', function(done) {
            request(app).get('/')
            .end(function(err, res) {
            expect(res.statusCode).to.be.equal(200);
            done();
            });
        });
    });

    describe('Bad Request', function() {

        describe('Address Cannot be empty.', function() {
            it('Response should be an error object', function(done) {
                request(app).post('/parse-address')
                    .send({address: ''})
                    .end(function(err, res) {
                        expect(res.statusCode).to.be.equal(400);
                        let body = JSON.parse(res.text);
                        console.log('RESPONSE:: ', res.text);
                        expect(body).to.have.property('status', 'fail');
                        expect(body).to.have.property('message', 'Address cannot be empty.');
                        done();
                    });
            });

        });

        describe('Bad Request', function() {

            describe('Address cannot be less than 3 words.', function() {
                it('Response should be an error object', function(done) {
                    request(app).post('/parse-address')
                        .send({address: 'Kuala Lumpur'})
                        .end(function(err, res) {
                            expect(res.statusCode).to.be.equal(400);
                            let body = JSON.parse(res.text);
                            console.log('RESPONSE:: ', res.text);
                            expect(body).to.have.property('status', 'fail');
                            expect(body).to.have.property('message', 'Address cannot be less than 3 words.');
                            done();
                        });
                });
            });
    
        });

        describe('Bad Request', function() {

            describe('Address is too long.', function() {
                it('Response should be an error object.', function(done) {
                    request(app).post('/parse-address')
                        .send({address: 'Malaysia, Kuala Lumpur, 53100, Gombak, International Islamic University Malaysia, Mahallah Siddiq, Block C, 4.1'})
                        .end(function(err, res) {
                            expect(res.statusCode).to.be.equal(400);
                            let body = JSON.parse(res.text);
                            console.log('RESPONSE:: ', res.text);
                            expect(body).to.have.property('status', 'fail');
                            expect(body).to.have.property('message', 'Address is too long.');
                            done();
                        });
                });
            });

        });

    });
    

    describe('Successful Addres parsing', function() {
        let addresses = [
            "Jalan Jelatek, Kementah, 54200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
            "23, Jalan Pahang, 50586 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
            "Persiaran Bestari, Cyber 11, 63000 Cyberjaya, Selangor"
        ];
        addresses.forEach(address => {
            it('Response should be an object with address key as an array with 3 formatted lines', function(done) {
                request(app).post('/parse-address')
                    .send({address: address})
                    .end(function(err, res) {
                        expect(res.statusCode).to.be.equal(200);
                        body = JSON.parse(res.text)
                        console.log('RESPONSE:: ', body.address);
                        expect(body).to.have.property('status', 'success');
                        expect(body.address).to.have.length(3);
                        done();
                    });
            });
        });
    });



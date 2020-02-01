let should = require('should');
let app = require('../../app');
let request = require("supertest");

describe('Login Endpoint test', ()=>{
    it('should ensure login works properly', (done) => {
       request(app)
       .post('/api/login')
       .set("Connection", "keep alive")
       .set("Content-Type", "application/json")
       .send({username: "hackerBayTest", password: "0000"})
       .expect(200)
        .end((err, res) => {
            if (err) done(err);
            res.body.should.have.property('token');
            res.body.should.have.property('user', "hackerBayTest");
        });
        done();
    });
    afterEach('To ensure everything is cleaned up', (done) => {
        done();
    });
});

describe('Protected Endpoint Test', ()=>{
    let token;
    beforeEach('verify token', (done)=>{
        request(app)
        .post('/api/login')
        .set("Connection", "keep alive")
        .set("Content-Type", "application/json")
        .send({username: "hackerBayTest", password: "0000"})
        .expect(200)
        .end((err, res) => {
            if (err) done(err);
            res.body.should.have.property('token');
            res.body.should.have.property('user', "hackerBayTest");
            token = res.body.token;
            done();
        });
    });

    let document = {"baz": "qux", "foo": "bar"},
        patch = [{"op": "replace", "path": "/baz", "value": "julius"}];

    it('should ensure json patch works properly',(done) => {
        request(app)
        .patch(`/api/jsonpatcher?token=${token}`)
        .set("Connection", "keep alive")
        .set("Content-Type", "application/json")
        .send({document, patch})
        .end((err, res) => {
            if (err) done(err);
            
            res.body.should.have.property('data');
            res.body.should.have.property('data',  {baz: 'julius', foo: 'bar'} );
            done();
        });
    });

});

describe('Protected Endpoint Test', ()=>{
    let token;
    beforeEach('verify token', (done)=>{
        request(app)
        .post('/api/login')
        .set("Connection", "keep alive")
        .set("Content-Type", "application/json")
        .send({username: "hackerBayTest", password: "0000"})
        .expect(200)
        .end((err, res) => {
            if (err) done(err);
            res.body.should.have.property('token');
            res.body.should.have.property('user', "hackerBayTest");
            token = res.body.token;
            done();
        });
    });

    it('should ensure thumbnail generator works properly', (done) => {
        request(app)
        .get(`/api/generatethumbnail?token=${token}`)
        .set("Connection", "keep alive")
        .set("Content-Type", "image")
        .buffer(true)
        .end((err, res) => {
            if (err) done(err);
            res.header.should.have['Content-Type', 'image']
            done();
        });
    });

});
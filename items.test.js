process.env.NODE_ENV="test";

const { hasUncaughtExceptionCaptureCallback } = require('process');
const request=require('supertest');
let items=require('./fakeDb');
const app=require('./app');


let snack = {"name":"cheerios", "price": 3.40};


beforeEach(function(){
    items.push(snack);
});

afterEach(function(){
    items.length = 0;
});

describe('Get /items', () => {

    test("Gets all items", async () => {
       const res = await request(app).get('/items');
       expect(res.statusCode).toBe(200);
       expect(res.body).toEqual([{"name":"cheerios", "price": 3.40}]);

    });


});


describe('Get /items/:name', () => {

    test("Gets item by name", async () => {
       const res = await request(app).get(`/items/${snack.name}`);
       expect(res.statusCode).toBe(200);
       expect(res.body).toEqual({"name":"cheerios", "price": 3.40});

    });

    test("Responds with 404", async () => {
        const res = await request(app).get('/items/sfdsdfsdf');
        expect(res.statusCode).toBe(404);
       
 
     });


});


describe('POST /items', () => {

    test("Makes an items", async () => {
       const res = await request(app).post('/items').send({name: "hotdog", price: "1.50"});
       expect(res.statusCode).toBe(201);
       expect(res.body).toEqual({"added": {name: "hotdog", price: "1.50"} });

    });

    test("Throws a 404 error if no name defined", async () => {
        const res = await request(app).post('/items').send({ price: "1.50"});
        expect(res.statusCode).toBe(404);
       
 
     });

     test("Throws a 404 error if no price defined", async () => {
        const res = await request(app).post('/items').send({ name: "hiii"});
        expect(res.statusCode).toBe(404);
       
 
     });


});

describe('PATCH /items/:name', () => {

    test("Updates an item", async () => {
       const res = await request(app).patch(`/items/${snack.name}`).send({name: "cheerioZ", price: "3.40"});
       expect(res.statusCode).toBe(200);
       expect(res.body).toEqual({"updated": {name: "cheerioZ", price: "3.40"} });

    })

    test("Responds with 404", async () => {
        const res = await request(app).patch(`/items/nmnlklknlkn`).send({name: "cheerioZ", price: "3.40"});
        expect(res.statusCode).toBe(404);
        // expect(res.body).toEqual({"updated": {name: "cheerioZ", price: "3.40"} })
 
     });


});

describe('DELETE /items/:name', () => {

    test("Deletes an item", async () => {
       const res = await request(app).delete(`/items/${snack.name}`);
       expect(res.statusCode).toBe(200);
       expect(res.body).toEqual({ message: "Deleted" });

    });

    test("Responds with 404", async () => {
        const res = await request(app).delete(`/items/nmnlklknlkn`);
        expect(res.statusCode).toBe(404);
        // expect(res.body).toEqual({"updated": {name: "cheerioZ", price: "3.40"} })
 
     });


});

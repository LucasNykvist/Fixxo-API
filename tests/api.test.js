const request = require("supertest")
const app = require("../server")

test('GET / should return a list of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toContainEqual({
        "name": "NIKE AIR JORDAN 1 RETRO LOW",
        "__v": 0,
        "_id": "638df9617e2002adedc6f355",
        "category": "Sneakers",
        "description": "",
        "imageName": "https://es.kicksmaniac.com/zdjecia/2021/09/23/309/32/NIKE_AIR_JORDAN_1_RETRO_LOW_SE_BRUSHSTROKE_SWOOSH_PAINT_SPLATTERs-mini.jpg?mini",
        "name": "NIKE AIR JORDAN 1 RETRO LOW",
        "tag": "Featured",
        "price": 240
    });
});

// npm test för att köra testet



import 'mocha';
import {use, expect} from 'chai';
import chaiHttp from 'chai-http';

const chai = use(chaiHttp);
describe('Callback write and read Tests', () => {

  describe('Mongoose Express Tests', () => {
    it('Deberia obtener todas las cartas de la base de datos con GET', (done) => {
      chai.request('http://localhost:3000').get('/cards').end((_, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.deep.members([
          {
            "_id": "6628d11f4c8f1c5546581fe7",
            "id": 3,
            "name": "test3",
            "text": "hello",
            "color": "blue",
            "type": "land",
            "rarity": "common",
            "price": 8,
            "cost": 3,
            "__v": 0
          },
          {
            "_id": "6628d25395545de020f3301b",
            "id": 2,
            "name": "test2",
            "text": "hello twice",
            "color": "red",
            "type": "spell",
            "rarity": "rare",
            "price": 10,
            "cost": 3,
            "__v": 0
          },
          {
            "_id": "6628d65bd1bb6155440f4b2e",
            "name": "Test One",
            "text": "Now this is a test",
            "color": "red",
            "type": "land",
            "rarity": "mythic",
            "price": 20,
            "cost": 10,
            "__v": 0
          }
        ]);
      done();
      });
    });

    it('Deberia obtener todas las cartas de la base de datos con GET', (done) => {
      chai.request('http://localhost:3000').get('/cards?id=3').end((_, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.deep.eq([
          {
            "_id": "6628d11f4c8f1c5546581fe7",
            "id": 3,
            "name": "test3",
            "text": "hello",
            "color": "blue",
            "type": "land",
            "rarity": "common",
            "price": 8,
            "cost": 3,
            "__v": 0
          }
        ]);
      done();
      });
    });

    it('Debería devolver una respuesta satisfactoria si se pide añadir una carta', (done) => {
      chai.request('http://localhost:3000').post('/cards')
      .send(
        {
          "id": 4,
          "name": "test4s",
          "text": "hello",
          "color": "blue",
          "type": "land",
          "rarity": "common",
          "price": 8,
          "cost": 3
        }
      )
      .end((_, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.eq('New card added to the collection!');
        done();
      });
    });

    it('Debería devolver una respuesta satisfactoria se pide actualizar una carta', (done) => {
      chai.request('http://localhost:3000').patch('/cards?id=4')
      .send(
        {
          "price": 20,
        }
      )
      .end((_, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.eq('Card updated in the collection!');
        expect(response.body.card.price).to.eq(20);
      done();
      });
    });

    it('Debería devolver una respuesta satisfactoria si se pide borrar una carta con id en la query string', (done) => {
      chai.request('http://localhost:3000').delete('/cards?id=4').end((_, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.eq('Card deleted from the collection!');
        done();
      });
    });

  });

});
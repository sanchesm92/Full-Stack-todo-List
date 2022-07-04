
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);
describe('taks testes', () => {
  it('Testando retorno das tasks /GET', (done) => {
    chai.request('http://localhost:3001')
        .get('/todo')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
          done();
  });
})
  it('Testando criar uma task /POST',  (done) => {
    chai.request('http://localhost:3001')
        .post('/todo')
        .send({task: "lalalala"})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
        done();
        });
      })

      it('Testando update Task /PUT', (done) => {
        let id = 0;
        chai.request('http://localhost:3001').get('/todo').end((err, res) => {
          id = res.body[0]._id
        });
        chai.request('http://localhost:3001')
            .put('/todo/' + id)
            .send({task: "teste"})
            .end((err, res) => {
              res.should.have.status(200);
            done();
            });
          })
      it('Testando deletar uma task /DELETE',  (done) => {
        let id = 0;
        chai.request('http://localhost:3001').get('/todo').end((err, res) => {
          id = res.body[0]._id
        });
        chai.request('http://localhost:3001')
            .delete('/todo/' + id)
            .send({task: "teste"})
            .end((err, res) => {
              res.should.have.status(200);
            done();
            });
      })
    })

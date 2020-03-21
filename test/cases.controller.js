import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

describe('Examples', () => {
  it('should get would work', () =>
    request(Server)
      .get('/api/v1/cases')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an.an('array')
          .of.length(2);
      }));

  it('should get a brief', () =>
    request(Server)
      .post('/api/v1/cases/brief')
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should get latest cases', () =>
    request(Server)
      .get('/api/v1/cases/latest')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal('test');
      }));
});

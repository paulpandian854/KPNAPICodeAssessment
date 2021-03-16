const helperClassService = require('../helperClass/helperClass');
const request = require('supertest');
const stations = require('../models/stations');

const fs = require('fs');
const mockValue = JSON.parse(fs.readFileSync('_tests/departure-mock.json', 'utf8'));
describe('Helper Class/JwtLib spec', () => {
  test('Validate helper Class', () => {
    expect(helperClassService).toBeDefined();
  })

  test('Validate Prepare Response Method', async () => {
    const res = await helperClassService.prepareResponse(200, 'Payload Testing')
    expect(res).toHaveProperty('code');
    expect(res).toHaveProperty('message');
    expect(res.code).toEqual(200);
  }, 99999)

  test('Validate Prepare Error Response Method', async () => {
    const res = await helperClassService.prepareErrorResponse(401, 'Payload Testing')
    expect(res).toHaveProperty('code');
    expect(res).toHaveProperty('message');
    expect(res.code).toEqual(401);
  }, 99999)

  test('Validate generation of JWT Token', async () => {
    const res = jest.spyOn(helperClassService, 'generateJWT').mockImplementation(() => { message: 'jwt' })
    expect(res).toHaveBeenCalledTimes(0);
    expect(res).toBeDefined();
  }, 99999)

  test('Validate JWT Token', async () => {
    const res = await helperClassService.validateJWT()
    expect(res).toBeDefined();
  }, 99999)

})
const departmentService = require('../service/departure-details.service');
const request = require('supertest');
const departures = require('../models/departures');

const fs = require('fs');
const mockValue = JSON.parse(fs.readFileSync('_tests/departure-mock.json', 'utf8'));
describe('Departure details spec', () => {
  test('Validate Test', () => {
    expect(departmentService).toBeDefined();
  })

  test('should bring departure details', async () => {
    const res = await jest.spyOn(departmentService, 'departure').mockImplementation(() => mockValue)
    expect(res).toBeDefined();
  }, 99999)


  test('should fake call departure model', async () => {
    const res = await jest.spyOn(departures, 'getDepartures').mockImplementation(() => mockValue)
    expect(res).toBeDefined();
    expect(res).toHaveBeenCalledTimes(0);// Fake call
  }, 99999)

  test('validate Departure URL', async () => {
    const url = process.env.departure_url;
    expect(url).toEqual('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures');
  }, 99999)

  
})
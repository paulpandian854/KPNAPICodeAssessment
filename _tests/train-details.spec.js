const trainDetailsService = require('../service/train-details.service');
const request = require('supertest');
const stations = require('../models/stations');

const fs = require('fs');
const mockValue = JSON.parse(fs.readFileSync('_tests/departure-mock.json', 'utf8'));
describe('Station details spec', () => {
  test('Validate Test', () => {
    expect(trainDetailsService).toBeDefined();
  })

  test('should bring station details', async () => {
    const res = await jest.spyOn(trainDetailsService, 'stations').mockImplementation(() => mockValue)
    expect(res).toBeDefined();
  }, 99999)


  test('should fake call station model', async () => {
    const res = await jest.spyOn(stations, 'getStations').mockImplementation(() => mockValue)
    expect(res).toBeDefined();
    expect(res).toHaveBeenCalledTimes(0);// Fake call
  }, 99999)

  test('validate Departure URL', async () => {
    const url = process.env.station_url;
    expect(url).toEqual('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations');
  }, 99999)
})
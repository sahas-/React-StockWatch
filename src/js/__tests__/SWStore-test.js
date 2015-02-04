jest.dontMock('../stores/SWStore.js');
jest.dontMock('../stores/SWGetSymbolStore.js');

describe('Stock Watch Store Tests', function() {
  it('call to getStockList should return latest stocklist', function() {
    var SWStore = require('../stores/SWStore');

    function dummyCallback() {}
    var result=getStockList(dummyCallback);

    expect(result.length).toEqual(1);
  });
});
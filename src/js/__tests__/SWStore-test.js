jest.dontMock('../stores/SWStore.js');
jest.dontMock('../stores/SWGetSymbolStore.js');
var SWStore = require('../stores/SWStore');



describe('Stock Watch Store Tests', function() {
  it('call to getStockList should return latest stocklist', function() {

    function dummyCallback() {}
    var result=SWStore.getStockList(dummyCallback);

    expect(result.length).toEqual(1);
  });
});
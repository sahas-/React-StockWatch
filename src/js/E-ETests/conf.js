exports.config = {
  job_id:"Demo test",
  sauceUser: 'fos-platform',
  sauceKey: '36a39cdd-078b-4302-915b-0c186d07d074',

  capabilities: {
    'browserName': 'chrome'
  },

  specs: ['StockWatchIndextests_spec.js'],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
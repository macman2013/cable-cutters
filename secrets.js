const secrets = {
  'db_uri': 'mongodb://localhost/cabledb',
};

module.exports = {
  requestSecret: function(s) {
    return secrets[s];
  },
};

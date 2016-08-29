function KarmaSpec() {
  $.extend(this, new Spec('.specs__karma'));

  var spec = this;
  spec.describe('.constructor', function() {
    spec.it('intializes Karma object', function() {
      var karma = new Karma();

      expect(karma).to.have.property('class', 'Karma');
      expect(karma).to.have.property('status');
      expect(karma.status).to.have.property('karma', 0);
      expect(karma).to.have.property('history');
      expect($.isEmptyObject(karma.history)).to.equal(true);
    });
  });

  spec.describe('.update', function() {
    spec.it('creates a status if it does not exist', function() {
      var key = 'status';
      var change = 2;
      var logMessage = 'this is a message';
      var today = '3-SP-1';
      var karma = new Karma();

      expect(karma.status).to.not.have.property(key);
      karma.update(key, change, logMessage, today);
      expect(karma.status).to.have.property(key, change);
    });

    spec.it('logs a message when updating', function() {
      var key = 'status';
      var change = 2;
      var logMessage = 'this is a message';
      var today = '3-SP-1';
      var karma = new Karma();
      karma.log = sinon.spy();

      karma.update(key, change, logMessage, today);
      expect(karma.log).to.have.property('callCount', 1);
      expect(karma.log.getCall(0).args[0]).to.equal(logMessage);
    });
  });

  spec.describe('.log', function() {
    spec.it('logs the message', function() {
      var logMessage = 'this is a message';
      var today = '3-SP-1';
      var karma = new Karma();

      karma.log(logMessage, today);
      expect(karma.history).to.have.property(today);
      expect(karma.history[today][0]).to.equal(logMessage);
    });
  });
}

var karmaSpec = new KarmaSpec();
karmaSpec.run();
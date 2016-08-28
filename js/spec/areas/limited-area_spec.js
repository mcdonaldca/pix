function LimitedAreaSpec() {
  $.extend(this, new Spec('.areas__limited-area'))

  var spec = this;
  spec.describe('.constructor', function() {
    spec.it('correctly sets up LimitedArea object', function() {
      var fullName = 'Test Area';
      var hours = ['Text hours', [[6, 18], [6, 18], [6, 18], [], [6, 18], [6, 18], [6, 18]]];
      var exitTo = 'other-area';

      var limitedArea = new LimitedArea(5, 5, 'test', fullName, hours, exitTo);
      expect(limitedArea).to.have.property('class', 'LimitedArea');
      expect(limitedArea).to.have.property('fullName', fullName);
      expect(limitedArea).to.have.property('hoursText', hours[0]);
      expect(limitedArea).to.have.property('hours', hours[1]);
      expect(limitedArea).to.have.property('exitTo', exitTo);
    });
  });

  spec.describe('.hoursMessage', function() {
    spec.it('returns a Message object', function() {
      var limitedArea = new LimitedArea(5, 5, 'test', 'Test Area', ['Text hours', []], 'other-area');

      var hoursMessage = limitedArea.hoursMessage();
      expect(hoursMessage).to.have.property('class', 'Message');
    });

    spec.it('displays expected message content', function() {
      var fullName = 'Test Area';
      var hours = ['Text hours', []];
      var limitedArea = new LimitedArea(5, 5, 'test', fullName, hours, 'other-area');

      var hoursMessage = limitedArea.hoursMessage();
      expect(hoursMessage.content[0]).to.equal('TEST AREA');
      expect(hoursMessage.content[1]).to.equal(hours[0]);
    });
  });

  spec.describe('.isOpen', function() {
    spec.it('returns true when during operating hours', function() {
      var hours = ['Text hours', [[6, 18], [6, 18], [6, 18], [], [6, 18], [6, 18], [6, 18]]];
      var limitedArea = new LimitedArea(5, 5, 'test', 'Test Area', hours, 'other-area');

      expect(limitedArea.isOpen(0, 6)).to.equal(true);
      expect(limitedArea.isOpen(1, 12)).to.equal(true);
      expect(limitedArea.isOpen(5, 17)).to.equal(true);
    });

    spec.it('returns false when not during operating hours', function() {
      var hours = ['Text hours', [[6, 18], [6, 18], [6, 18], [], [6, 18], [6, 18], [6, 18]]];
      var limitedArea = new LimitedArea(5, 5, 'test', 'Test Area', hours, 'other-area');

      expect(limitedArea.isOpen(0, 5)).to.equal(false);
      expect(limitedArea.isOpen(3, 12)).to.equal(false);
      expect(limitedArea.isOpen(5, 18)).to.equal(false);
    });
  });

  spec.describe('.isClosed', function() {
    spec.it('returns true when not during operating hours', function() {
      var hours = ['Text hours', [[6, 18], [6, 18], [6, 18], [], [6, 18], [6, 18], [6, 18]]];
      var limitedArea = new LimitedArea(5, 5, 'test', 'Test Area', hours, 'other-area');

      expect(limitedArea.isClosed(0, 5)).to.equal(true);
      expect(limitedArea.isClosed(3, 12)).to.equal(true);
      expect(limitedArea.isClosed(5, 18)).to.equal(true);
    });

    spec.it('returns false when during operating hours', function() {
      var hours = ['Text hours', [[6, 18], [6, 18], [6, 18], [], [6, 18], [6, 18], [6, 18]]];
      var limitedArea = new LimitedArea(5, 5, 'test', 'Test Area', hours, 'other-area');

      expect(limitedArea.isClosed(0, 6)).to.equal(false);
      expect(limitedArea.isClosed(1, 12)).to.equal(false);
      expect(limitedArea.isClosed(5, 17)).to.equal(false);
    });
  });

  spec.describe('.closingTime', function() {
    spec.it('returns the correct closing time', function() {
      var hours = ['Text hours', [[6, 10], [6, 7], [6, 18], [], [6, 18], [6, 16], [6, 18]]];
      var limitedArea = new LimitedArea(5, 5, 'test', 'Test Area', hours, 'other-area');

      expect(limitedArea.closingTime(0)).to.equal(10);
      expect(limitedArea.closingTime(1)).to.equal(7);
      expect(limitedArea.closingTime(3)).to.equal(0);
      expect(limitedArea.closingTime(5)).to.equal(16);
    });
  });
}

var limitedAreaSpec = new LimitedAreaSpec();
limitedAreaSpec.run();
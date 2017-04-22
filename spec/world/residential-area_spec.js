function ResidentialAreaSpec() {
  $.extend(this, new Spec('.world__residential-area'))

  var spec = this;
  spec.describe('.constructor', function() {
    spec.it('correctly sets up ResidentialArea object', function() {
      var residents = ['alice', 'bob'];
      var exitTo = 'another-area';
      var residentialArea = new ResidentialArea(5, 5, 'test', residents, exitTo);

      expect(residentialArea).to.have.property('class', 'ResidentialArea');
      expect(residentialArea).to.have.property('residents');
      expect(residentialArea.residents[0]).to.equal(residents[0]);
      expect(residentialArea.residents[1]).to.equal(residents[1]);
      expect(residentialArea).to.have.property('exitTo', exitTo);
    });
  });

  spec.describe('.residentsPresent', function() {
    spec.it('returns true when resident is present', function() {
      var residentialArea = new ResidentialArea(5, 5, 'test', ['alice'], 'another-area');
      residentialArea.addNPC(new NPC('alice'));

      expect(residentialArea.residentsPresent()).to.equal(true);
    });

    spec.it('returns true when one of the residents is present', function() {
      var residentialArea = new ResidentialArea(5, 5, 'test', ['alice', 'bob'], 'another-area');
      residentialArea.addNPC(new NPC('bob'));

      expect(residentialArea.residentsPresent()).to.equal(true);
    });

    spec.it('returns false when no residents present', function() {
      var residentialArea = new ResidentialArea(5, 5, 'test', ['alice', 'bob'], 'another-area');

      expect(residentialArea.residentsPresent()).to.equal(false);
    });
  });

  spec.describe('.residentsAbsent', function() {
    spec.it('returns true when no residents present', function() {
      var residentialArea = new ResidentialArea(5, 5, 'test', ['alice', 'bob'], 'another-area');

      expect(residentialArea.residentsAbsent()).to.equal(true);
    });

    spec.it('returns false when resident is present', function() {
      var residentialArea = new ResidentialArea(5, 5, 'test', ['alice'], 'another-area');
      residentialArea.addNPC(new NPC('alice'));

      expect(residentialArea.residentsAbsent()).to.equal(false);
    });

    spec.it('returns false when one of the residents is present', function() {
      var residentialArea = new ResidentialArea(5, 5, 'test', ['alice', 'bob'], 'another-area');
      residentialArea.addNPC(new NPC('bob'));

      expect(residentialArea.residentsAbsent()).to.equal(false);
    });
  });
}

var residentialAreaSpec = new ResidentialAreaSpec();
residentialAreaSpec.run()
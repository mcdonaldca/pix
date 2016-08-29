  function PlayerSpec() {
  $.extend(this, new Spec('.specs__player'));

  var spec = this;
  spec.describe('.controller', function() {
    spec.it('correctly sets up Player object', function() {
      var player = new Player();

      expect(player).to.have.property('class', 'Player');
      expect(player.wallet).to.have.property('class', 'Wallet');
      expect(player.karma).to.have.property('class', 'Karma'); 
      expect(player).to.have.property('job', 'unemployed');
      expect(player).to.have.property('salary', 0);
    });
  });

  spec.describe('.employ', function() {
    spec.it('successfully sets new job and salary', function() {
      var player = new Player();
      var job = 'job';
      var salary = 20;
      player.employ(job, salary);

      expect(player).to.have.property('job', job);
      expect(player).to.have.property('salary', salary);
    });
  });

  spec.describe('.getJob', function() {
    spec.it("gets player's job", function() {
      var player = new Player();
      var job = 'job';
      player.employ(job, 20);

      expect(player.getJob()).to.equal(job);
    });
  });

  spec.describe('.work', function() {
    spec.it('adds money to the player wallet', function() {
      var player = new Player();
      var hours = 4;
      var salary = 20;
      player.employ('job', salary);
      player.wallet.add = sinon.stub();

      player.work(hours);
      expect(player.wallet.add).to.have.property('callCount', 1);
      expect(player.wallet.add.getCall(0).args[0]).to.equal(hours * salary);
    });
  });

  spec.describe('.getLibraryCard', function() {
    spec.it('gives player library access', function() {
      var player = new Player();
      expect(player).to.have.property('libraryAccess', false);
      player.getLibraryCard();
      expect(player).to.have.property('libraryAccess', true);
    });
  });

  spec.describe('.hasLibraryCard', function() {
    spec.it('gives player library access', function() {
      var player = new Player();
      expect(player.hasLibraryCard()).to.equal(false);
      player.getLibraryCard();
      expect(player.hasLibraryCard()).to.equal(true);
    });
  });
}

var playerSpec = new PlayerSpec();
playerSpec.run();
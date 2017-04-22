function WorldSpec() {
  $.extend(this, new Spec('.world__world'))

  var spec = this;
  spec.describe('.constructor', function() {
    spec.it('correctly sets up World object', function() {
      var world = new World();

      expect(world).to.have.property('class', 'World');
      expect(world).to.have.property('areas');
      expect(world.areas).to.deep.equal({});
      expect(world).to.have.property('currentArea');
      expect(world.currentArea).to.equal(undefined);
    });
  });

  spec.describe('.addArea + .getArea', function() {
    spec.it('adds and gets new areas', function() {
      var world = new World();
      var area1 = new Area(3, 3, 'area1');
      var area2 = new Area(3, 3, 'area2');

      world.addArea(area1);
      world.addArea(area2);

      expect(world.getArea('area1')).to.deep.equal(area1);
      expect(world.getArea('area2')).to.deep.equal(area2);
    });
  });

  spec.describe('.setCurrentArea + .getCurrentArea', function() {
    spec.it('sets and gets the current area', function() {
      var world = new World();
      var area = new Area(3, 3, 'area');

      expect(world.getCurrentArea()).to.be.equal(undefined);

      world.setCurrentArea(area);

      expect(world.getCurrentArea()).to.deep.equal(area);
    });
  });

  spec.describe('.updateDuskLevel', function() {
    spec.it('updates dusk levels when outside', function() {
      var world = new World();
      var area = new Area(3, 3, 'area');
      area.setIsOutside(true);
      world.setCurrentArea(area);
      world.areaShadowEl.css = sinon.spy();

      world.updateDuskLevel(0);
      expect(world.areaShadowEl.css).to.have.property('callCount', 1);
      expect(world.areaShadowEl.css.getCall(0).args[1]).to.equal('0');

      world.updateDuskLevel(1);
      expect(world.areaShadowEl.css).to.have.property('callCount', 2);
      expect(world.areaShadowEl.css.getCall(1).args[1]).to.equal('.4');

      world.updateDuskLevel(2);
      expect(world.areaShadowEl.css).to.have.property('callCount', 3);
      expect(world.areaShadowEl.css.getCall(2).args[1]).to.equal('.6');

      world.updateDuskLevel(7);
      expect(world.areaShadowEl.css).to.have.property('callCount', 3);
    });

    spec.it('does not update dusk levels when inside', function() {
      var world = new World();
      var area = new Area(3, 3, 'area');
      world.setCurrentArea(area);
      world.areaShadowEl.css = sinon.spy();

      world.updateDuskLevel(0);
      expect(world.areaShadowEl.css).to.have.property('callCount', 1);
      expect(world.areaShadowEl.css.getCall(0).args[1]).to.equal('0');
    });
  });
}

var worldSpec = new WorldSpec();
worldSpec.run()
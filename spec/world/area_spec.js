function AreaSpec() {
  $.extend(this, new Spec('.world__area'))

  var spec = this;
  spec.describe('.constructor', function() {
    spec.it('correctly sets up Area object', function() {
      var width = 10;
      var height = 9;
      var svgName = 'test';
      var area = new Area(width, height, svgName); 

      expect(area).to.have.property('class', 'Area');
      expect(area).to.have.property('height', height);
      expect(area).to.have.property('width', width);
      expect(area).to.have.property('svgName', svgName);
    });
  });
  


  spec.describe('.build', function() {
    spec.it('correctly builds area div (height, width, background image)', function() {
      var width = 10;
      var height = 9;
      var svgName = 'test';
      var area = new Area(width, height, svgName); 
      area.build();

      var strHeight = String(height * BLOCK * MULT) + 'px';
      var strWidth = String(width * BLOCK * MULT) + 'px';
      expect(area.areaEl.css('height')).to.equal(strHeight);
      expect(area.areaEl.css('width')).to.equal(strWidth);
      expect(area.areaEl.css('background-image')).to.contain('img/areas/' + svgName + '.svg');
    })
  });



  spec.describe('.setPlacementLimits', function() {
    spec.it('correctly calculates placement limits when width and height are less than the size of the screen', function() {
      var area = new Area(5, 5, 'test'); 
      expect(area).to.have.property('maxX', 3);
      expect(area).to.have.property('minX', 3);
      expect(area).to.have.property('maxY', 3);
      expect(area).to.have.property('minY', 3);
    });

    spec.it('correctly calculates placement limits when width is less than the size of the screen', function() {
      var area = new Area(14, 5, 'test'); 
      expect(area).to.have.property('maxX', 0);
      expect(area).to.have.property('minX', -3);
      expect(area).to.have.property('maxY', 3);
      expect(area).to.have.property('minY', 3);
    });

    spec.it('correctly calculates placement limits when height is less than the size of the screen', function() {
      var area = new Area(5, 14, 'test'); 
      expect(area).to.have.property('maxX', 3);
      expect(area).to.have.property('minX', 3);
      expect(area).to.have.property('maxY', 0);
      expect(area).to.have.property('minY', -3);
    });
  });



  spec.describe('.createGridAndPaths', function() {
    // TODO
  });



  spec.describe('.build', function() {
    spec.it('creates divs and sets css values', function() {
      var area = new Area(5, 7, 'test');
      expect(area.areaEl.is('div')).to.equal(true);
      expect(area.areaEl.css('width')).to.equal((area.width * BLOCK * MULT).toString() + 'px');
      expect(area.areaEl.css('height')).to.equal((area.height * BLOCK * MULT).toString() + 'px');
      expect(area.areaEl.css('background-image')).to.equal('url("img/areas/test.svg")');
    });
  });



  spec.describe('.updateAreaPosition', function() {
    spec.it('correctly calculates translation when player is not at screen limits', function() {
      var area = new Area(15, 15, 'test');
      area.updateAreaPosition(7, 8);
      var expectedX = (-2 * BLOCK * MULT).toString() + 'px';
      var expectedY = (-3 * BLOCK * MULT).toString() + 'px';
      expect(area).to.have.property('computedXOffset', expectedX);
      expect(area).to.have.property('computedYOffset', expectedY);
    });

    spec.it('correctly calculates translation when player is at X min limit', function() {
      var area = new Area(15, 15, 'test');
      area.updateAreaPosition(4, 8);
      var expectedX = '0px';
      expect(area).to.have.property('computedXOffset', expectedX);
    });

    spec.it('correctly calculates translation when player is at X max limit', function() {
      var area = new Area(15, 15, 'test');
      area.updateAreaPosition(13, 8);
      var expectedX = area.minX.toString() * BLOCK * MULT + 'px';
      expect(area).to.have.property('computedXOffset', expectedX);
    });

    spec.it('correctly calculates translation when player is at Y min limit', function() {
      var area = new Area(15, 15, 'test');
      area.updateAreaPosition(8, 4);
      var expectedY = '0px';
      expect(area).to.have.property('computedYOffset', expectedY);
    });

    spec.it('correctly calculates translation when player is at Y max limit', function() {
      var area = new Area(15, 15, 'test');
      area.updateAreaPosition(8, 13);
      var expectedY = area.minY.toString() * BLOCK * MULT + 'px';
      expect(area).to.have.property('computedYOffset', expectedY);
    });
  });



  spec.describe('.pathBetween', function() {
    // TODO
  });



  spec.describe('.getEl', function() {
    spec.it('returns the areaEl element', function() {
      var area = new Area(5, 5, 'test');
      var areaEl = area.getEl();

      expect(area.areaEl).to.equal(areaEl);
    });
  });



  spec.describe('.space', function() {
    spec.it('returns a valid space when coordinates are valid', function() {
      var area = new Area(5, 5, 'test');
      var space = area.space(3, 3);
      expect(space).to.have.property('class', 'space');
    });

    spec.it('returns undefined when coordinates are invalid', function() {
      var area = new Area(5, 5, 'test');
      var space = area.space(6, 6);
      expect(space).to.equal(undefined);
    });
  });




  spec.describe('.validZone', function() {
    spec.it('returns true when valid zone', function() {
      var area = new Area(5, 5, 'test');
      expect(area.validZone(0, 0)).to.equal(true);
      expect(area.validZone(1, 1)).to.equal(true);
      expect(area.validZone(2, 3)).to.equal(true);
      expect(area.validZone(4, 4)).to.equal(true);
    });

    spec.it('returns false when not a valid zone', function() {
      var area = new Area(5, 5, 'test');
      expect(area.validZone(5, 5)).to.equal(false);
      expect(area.validZone(-1, 1)).to.equal(false);
      expect(area.validZone(3, 5)).to.equal(false);
    });
  });



  spec.describe('.addItem', function() {
    // TODO
  });



  spec.describe('.addInteraction', function() {
    // TODO
  });



  spec.describe('.addNPC', function() {
    // TODO
  });



  spec.describe('.removeNPC', function() {
    // TODO
  });



  spec.describe('.hasNPC', function() {
    // TODO
  });



  spec.describe('.addEventZone', function() {
    // TODO
  });



  spec.describe('.addExit', function() {
    // TODO
  });



  spec.describe('.addPositionData', function() {
    // TODO
  });



  spec.describe('.getPositionData', function() {
    // TODO
  });



  spec.describe('.getItem', function() {
    // TODO
  });



  spec.describe('.getName', function() {
    // TODO
  });



  spec.describe('.append', function() {
    // TODO
  });



  spec.describe('.setVisited', function() {
    // TODO
  });



  spec.describe('.isVisited', function() {
    // TODO
  });



  spec.describe('.isLimited', function() {
    // TODO
  });



  spec.describe('.isResidential', function() {
    // TODO
  });
}

var areaSpec = new AreaSpec();
areaSpec.run();
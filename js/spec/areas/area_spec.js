function AreaSpec() {
  $.extend(this, new Spec('.areas__area'))

  var spec = this;
  spec.describe('Area#constructor', function() {
    spec.it('correctly sets height, width, and svg image name', function() {
      var width = 10;
      var height = 9;
      var svgName = 'test';
      var area = new Area(width, height, svgName); 

      expect(area).to.have.property('height', height);
      expect(area).to.have.property('width', width);
      expect(area).to.have.property('svgName', svgName);
      expect(area.grid).to.have.property('length', width);
      expect(area.grid[0]).to.have.property('length', height);
    });

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
      expect(area.areaEl.css('background-image').indexOf('img/areas/' + svgName + '.svg')).to.not.equal(-1);
    });

    spec.it('correctly sets height, width, and svg image name', function() {
      var width = 10;
      var height = 9;
      var svgName = 'test';
      var area = new Area(width, height, svgName); 

      expect(area).to.have.property('height', height);
      expect(area).to.have.property('width', width);
      expect(area).to.have.property('svgName', svgName);
      expect(area.grid).to.have.property('length', width);
      expect(area.grid[0]).to.have.property('length', height);
    });
  });
  
  spec.describe('Area#build', function() {
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

  spec.describe('Area#setPlacementLimits', function() {
    spec.describe('when width and height are less than the size of the screen', function() {
      spec.it('correctly calculates placement limits', function() {
        var area = new Area(5, 5, 'test'); 
        expect(area).to.have.property('maxX', 3);
        expect(area).to.have.property('minX', 3);
        expect(area).to.have.property('maxY', 3);
        expect(area).to.have.property('minY', 3);
      });
    });

    spec.describe('when width is less than the size of the screen', function() {
      spec.it('correctly calculates placement limits', function() {
        var area = new Area(14, 5, 'test'); 
        expect(area).to.have.property('maxX', 0);
        expect(area).to.have.property('minX', -3);
        expect(area).to.have.property('maxY', 3);
        expect(area).to.have.property('minY', 3);
      });
    });

    spec.describe('when height is less than the size of the screen', function() {
      spec.it('correctly calculates placement limits', function() {
        var area = new Area(5, 14, 'test'); 
        expect(area).to.have.property('maxX', 3);
        expect(area).to.have.property('minX', 3);
        expect(area).to.have.property('maxY', 0);
        expect(area).to.have.property('minY', -3);
      });
    });
  });

  spec.describe('Area#space', function() {
    spec.it('returns a space valid when coordinates are valid', function() {
      var area = new Area(5, 5, 'test');
      var space = area.space(3, 3);
      expect(space).to.not.equal(undefined);
    });

    spec.it('returns undefined when coordinates are invalid', function() {
      var area = new Area(5, 5, 'test');
      var space = area.space(6, 6);
      expect(space).to.equal(undefined);
    });
  });
}

var areaSpec = new AreaSpec();
areaSpec.run();
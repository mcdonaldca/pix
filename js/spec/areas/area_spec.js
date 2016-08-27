function AreaSpec() {
  $.extend(this, new Spec(".areas__area"))
}

AreaSpec.prototype.declare = function() {
  this.tests.push({ method:
    this.test(function() {
      var width = 10;
      var height = 9;
      var svgName = "test";
      var area = new Area(width, height, svgName); 

      chai.expect(area).to.have.property("height", height);
      chai.expect(area).to.have.property("width", width);
      chai.expect(area).to.have.property("svgName", svgName);
      chai.expect(area.grid).to.have.property("length", width);
      chai.expect(area.grid[0]).to.have.property("length", height);
    }),
    desc: "Correctly sets height, width, and svg image name",
  });

  this.tests.push({ method:
    this.test(function() {
      var width = 10;
      var height = 9;
      var svgName = "test";
      var area = new Area(width, height, svgName); 
      area.build();

      var strHeight = String(height * BLOCK * MULT) + "px";
      var strWidth = String(width * BLOCK * MULT) + "px";
      chai.expect(area.areaEl.css("height")).to.equal(strHeight);
      chai.expect(area.areaEl.css("width")).to.equal(strWidth);
      chai.expect(area.areaEl.css("background-image").indexOf("img/areas/" + svgName + ".svg")).to.not.equal(-1);
    }),
    desc: "Correctly builds area div (height, width, background image)",
  });

  this.tests.push({ method:
    this.test(function() {
      var area = new Area(5, 5, "test"); 
      chai.expect(area).to.have.property("maxX", 3);
      chai.expect(area).to.have.property("minX", 3);
      chai.expect(area).to.have.property("maxY", 3);
      chai.expect(area).to.have.property("minY", 3);
    }),
    desc: "Placement limits calculated correctly when width and height are less than the size of the screen",
  });

  this.tests.push({ method:
    this.test(function() {
      var area = new Area(14, 5, "test"); 
      chai.expect(area).to.have.property("maxX", 0);
      chai.expect(area).to.have.property("minX", -3);
      chai.expect(area).to.have.property("maxY", 3);
      chai.expect(area).to.have.property("minY", 3);
    }),
    desc: "Placement limits calculated correctly when width is less than the size of the screen",
  });

  this.tests.push({ method:
    this.test(function() {
      var area = new Area(5, 14, "test"); 
      chai.expect(area).to.have.property("maxX", 3);
      chai.expect(area).to.have.property("minX", 3);
      chai.expect(area).to.have.property("maxY", 0);
      chai.expect(area).to.have.property("minY", -3);
    }),
    desc: "Placement limits calculated correctly when height is less than the size of the screen",
  });
}

var areaSpec = new AreaSpec();
areaSpec.run();
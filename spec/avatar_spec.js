function AvatarSpec() {
  $.extend(this, new Spec('.specs__avatar'));

  var spec = this;
  spec.describe('.constructor', function() {
    spec.it('correctly sets up Avatar object with no params', function() {
      var avatar = new Avatar();

      expect(avatar).to.have.property('class', 'Avatar');
      expect(avatar).to.have.property('isPlayer', false);
      expect(avatar).to.have.property('name', 'no-name');
      expect(avatar).to.have.property('img', 'characters/test-char');
      expect(avatar).to.have.property('shadow', undefined);
    });

    spec.it('correctly sets up Avatar object with params', function() {
      var isPlayer = false;
      var name = 'name';
      var sprite = 'characters/adele';
      var shadow = 'shadow-sm.svg';
      var avatar = new Avatar(isPlayer, name, sprite, shadow);

      expect(avatar).to.have.property('class', 'Avatar');
      expect(avatar).to.have.property('isPlayer', isPlayer);
      expect(avatar).to.have.property('name', name);
      expect(avatar).to.have.property('img', sprite);
      expect(avatar).to.have.property('shadow', shadow);
    });

    spec.it('sets isPlayer to true', function() {
      var isPlayer = true;
      var avatar = new Avatar(isPlayer, 'name');

      expect(avatar).to.have.property('class', 'Avatar');
      expect(avatar).to.have.property('isPlayer', isPlayer);
    });
  });

  spec.describe('.build', function() {
    spec.it('creates divs', function() {
      var isPlayer = false;
      var name = 'name';
      var sprite = 'characters/adele';
      var shadow = 'shadow-sm.svg';
      var avatar = new Avatar(isPlayer, name, sprite, shadow);

      expect(avatar.avatarEl.is('div')).to.equal(true);
      expect(avatar.spriteEl.is('div')).to.equal(true);
      expect(avatar.reactionEl.is('div')).to.equal(true);
      expect(avatar.avatarEl.children()).to.have.property('length', 3);
    });

    spec.it('does not create shadow div when not provided', function() {
      var isPlayer = false;
      var name = 'name';
      var sprite = 'characters/adele';
      var avatar = new Avatar(isPlayer, name, sprite);

      expect(avatar.avatarEl.children()).to.have.property('length', 2);
    });

    spec.it('uses correct divs when avatar is player', function() {
      var isPlayer = true;
      var name = 'name';
      var sprite = 'characters/adele';
      var shadow = 'shadow-sm.svg';
      var avatar = new Avatar(isPlayer, name, sprite, shadow);

      expect(avatar.avatarEl.attr('id')).to.equal('avatar');
      expect(avatar.spriteEl.attr('id')).to.equal('sprite');
      expect(avatar.reactionEl.attr('id')).to.equal('reaction');
    });
  });

  spec.describe('.show', function() {
    spec.it('displays avatar', function() {
      var avatar = new Avatar();

      expect(avatar.avatarEl.css('display')).to.equal('');
      avatar.show();
      expect(avatar.avatarEl.css('display')).to.equal('block');
    });
  });

  spec.describe('.hide', function() {
    spec.it('hides avatar', function() {
      var avatar = new Avatar();

      expect(avatar.avatarEl.css('display')).to.equal('');
      avatar.hide();
      expect(avatar.avatarEl.css('display')).to.equal('none');
    });
  });

  spec.describe('.react', function() {
    spec.it('adds and removes react class after duration', function() {
      var avatar = new Avatar();
      avatar.react('surprise');

      expect(avatar.reactionEl.attr('class')).to.contain('react-surprise');
      setTimeout( function() {
        expect(avatar.reactionEl.attr('class')).to.not.contain('react-surprise');
      }, avatar.REACTION_DURATIONS['surprise'])
    });
  });

  spec.describe('.setLeft', function() {
    spec.it('calls `setPosition` with new X value', function() {
      var avatar = new Avatar();
      avatar.setPosition(6, 6);
      avatar.setPosition = sinon.spy();

      avatar.setLeft(5);
      expect(avatar.setPosition).to.have.property('callCount', 1);
      expect(avatar.setPosition.getCall(0).args[0]).to.equal(5);
      expect(avatar.setPosition.getCall(0).args[1]).to.equal(6);
    });
  });

  spec.describe('.setBottom', function() {
    spec.it('calls `setPosition` with new Y value', function() {
      var avatar = new Avatar();
      avatar.setPosition(6, 6);
      avatar.setPosition = sinon.spy();

      avatar.setBottom(5);
      expect(avatar.setPosition).to.have.property('callCount', 1);
      expect(avatar.setPosition.getCall(0).args[0]).to.equal(6);
      expect(avatar.setPosition.getCall(0).args[1]).to.equal(5);
    });
  });

  spec.describe('.setPosition', function() {
    spec.it('sets x and y and z-index correctly', function() {
      var avatar = new Avatar();
      avatar.x = 6;
      avatar.y = 6;

      avatar.setPosition(5, 7);
      expect(avatar).to.have.property('x', 5);
      expect(avatar).to.have.property('y', 7);
      expect(avatar.avatarEl.css('z-index')).to.equal('80');
      expect(avatar.reactionEl.css('z-index')).to.equal('81');
    });

    spec.it('sets x and y and z-index correctly for player', function() {
      var avatar = new Avatar(true);
      avatar.x = 6;
      avatar.y = 6;

      avatar.setPosition(5, 7);
      expect(avatar).to.have.property('x', 5);
      expect(avatar).to.have.property('y', 7);
      // No idea why query doesn't get this value correctly ):
      expect(avatar.avatarEl.get(0).style.zIndex).to.equal('81');
      expect(avatar.reactionEl.get(0).style.zIndex).to.equal('82');
    });
  });

  spec.describe('.faceDir', function() {
    spec.it("sets the sprite's direction", function() {
      var avatar = new Avatar();

      expect(avatar).to.have.property('face', DIR.DW);
      avatar.faceDir(DIR.UP);
      expect(avatar).to.have.property('face', DIR.UP);
      avatar.faceDir(DIR.RT);
      expect(avatar).to.have.property('face', DIR.RT);
    });
  });

  spec.describe('.walk', function() {
    spec.it('adds the correct class to the sprite', function() {
      var avatar = new Avatar();

      avatar.walk('lf');
      expect(avatar.spriteEl.attr('class')).to.contain('walk-left');
      avatar.walk('up');
      expect(avatar.spriteEl.attr('class')).to.contain('walk-up');
      avatar.walk('rt');
      expect(avatar.spriteEl.attr('class')).to.contain('walk-right');
      avatar.walk('dw');
      expect(avatar.spriteEl.attr('class')).to.contain('walk-down');
    });
  });

  spec.describe('.stopWalking', function() {
    spec.it('removes all walking classes', function() {
      var avatar = new Avatar();

      avatar.walk('lf');
      avatar.stopWalking();
      expect(avatar.spriteEl.attr('class')).to.equal('sprite');
    })
  });

  spec.describe('.setBackgroundImage', function() {
    spec.it('sets background image on sprite', function() {
      var avatar = new Avatar();
      avatar.spriteEl.css = sinon.spy();

      avatar.setBackgroundImage('url');
      expect(avatar.spriteEl.css).to.have.property('callCount', 1);
      expect(avatar.spriteEl.css.getCall(0).args[1]).to.equal('url(url)');
    });
  });

  spec.describe('.getEl', function() {
    spec.it('returns the avatarEl', function() {
      var avatar = new Avatar();

      expect(avatar.getEl()).to.equal(avatar.avatarEl)
    });
  });
}

var avatarSpec = new AvatarSpec();
avatarSpec.run();
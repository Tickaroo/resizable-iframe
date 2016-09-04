var jsdomDocument = require('jsdom').jsdom();
global.navigator = { userAgent: 'x' };
global.document = jsdomDocument;
document.documentElement.getBoundingClientRect = function() {
  return { bottom: 0, height: 754, left: 0, right: 0, top: 0, width: 1024 };
};
global.window = document.defaultView;
// fake parent window
global.parent = {
  postMessage: function() {
    this.messages.push(arguments);
  }
};

var expect = require('chai').expect;
var ResizableIframe = require('../index.js');

beforeEach('reset messages', function () {
  parent.messages = [];
});

describe('ResizableIframe', function(){
  it('should start and post message', function() {
    new ResizableIframe();

    expect(parent.messages.length).to.equal(1);

    var obj = JSON.parse(parent.messages[0][0]);
    expect(obj.iframeName).to.equal('nodejs');
    expect(typeof obj.iframeHeight).to.equal('number');
    expect(obj.iframeHeight).to.not.equal(0);

    expect(parent.messages[0][1]).to.equal('*');
  });

  it('should use name options', function() {
    new ResizableIframe({
      nameKey: 'myTest',
      heightKey: 'fooRoo'
    });

    var obj = JSON.parse(parent.messages[0][0]);
    expect(obj.myTest).to.equal('nodejs');
    expect(typeof obj.fooRoo).to.equal('number');
  });

  it('should use interval', function(done) {
    new ResizableIframe({
      intervalDuration: 5
    });

    setTimeout(done, 20);
  });

  it('should stop', function(done) {
    var ri = new ResizableIframe({
      intervalDuration: 2
    });

    setTimeout(function(){
      ri.stop();
      setTimeout(done, 8);
    }, 8);
  });
});

var resizable_iframe = require('resizable_iframe');

afterEach('reset messages', function () {
  parent.messages = [];
});

describe('resizable', function() {
  it('should start on new', function(done) {
    var instance = new resizable_iframe();
    
    console.log(parent.messages);
    expect(parent.messages.length).to.equal(1);
    
    var obj = JSON.parse(parent.messages[0][0])
    expect(obj.tikEmbedIframeName).to.equal('');
    expect(obj.tikEmbedIframeHeight).to.equal(1325);
        
    expect(parent.messages[0][1]).to.equal('*');
    
    done();
  });
})
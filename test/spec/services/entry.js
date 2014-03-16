'use strict';

describe('Service: entryService', function () {

  // load the service's module
  beforeEach(module('graphCmsApp'));

  // instantiate service
  var entryService;
  beforeEach(inject(function (_Entry_) {
    entryService = _Entry_;
  }));

  it('should do something', function () {
    expect(!!entryService).toBe(true);
  });

});

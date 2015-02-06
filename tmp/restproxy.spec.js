var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

describe('Service', function() {
  beforeEach(function() {
    var MenuItemService;
    MenuItemService = (function(_super) {
      __extends(MenuItemService, _super);

      function MenuItemService() {
        return MenuItemService.__super__.constructor.apply(this, arguments);
      }

      return MenuItemService;

    })(Service);
    this.mService = new MenuItemService;
    spyOn(this.mService, 'get');
    spyOn(this.mService, 'update');
    spyOn(this.mService, 'delete');
    return spyOn(this.mService, 'create');
  });
  it('must call the create function ', function() {
    this.mService.run('POST', 'url', {});
    return expect(this.mService.create).toHaveBeenCalled();
  });
  it('must call the get function ', function() {
    this.mService.run('GET', 'url', {});
    return expect(this.mService.get).toHaveBeenCalled();
  });
  it('must call the update function ', function() {
    this.mService.run('PUT', 'url', {});
    return expect(this.mService.update).toHaveBeenCalled();
  });
  return it('must call the delete function ', function() {
    this.mService.run('DELETE', 'url', {});
    return expect(this.mService["delete"]).toHaveBeenCalled();
  });
});

describe('RestProxy', function() {
  beforeEach(function() {
    this.serviceDetector = jasmine.createSpyObj('serviceDetector', ['getService']);
    return this.restProxy = new RestProxy({
      serviceDetector: this.serviceDetector
    });
  });
  describe('constructor', function() {
    it('must have reference to notify reference', function() {
      return expect(this.restProxy.notify).toEqual($.notify);
    });
    it('must have reference to Offline reference', function() {
      return expect(this.restProxy.offline).toEqual(window.Offline);
    });
    return it('must have reference to serviceDetector reference', function() {
      return expect(this.restProxy.serviceDetector).toEqual(this.serviceDetector);
    });
  });
  describe('_verifyMethodName', function() {
    it('must return true', function() {
      return $.each(['post', "GET", "DELETE", 'put'], (function(_this) {
        return function(index, method) {
          return expect(_this.restProxy._verifyMethodName(method)).toBeTruthy();
        };
      })(this));
    });
    return it('must return false', function() {
      return $.each(['posts', "GEaT", "DELETEsss", ''], (function(_this) {
        return function(index, method) {
          return expect(_this.restProxy._verifyMethodName(method)).toBeFalsy();
        };
      })(this));
    });
  });
  return describe('makeCall', function() {
    return describe('valid call', function() {
      beforeEach(function() {
        var ServicesContainer, service;
        service = {
          callMethod: function() {
            return $.Deferred();
          }
        };
        ServicesContainer = (function() {
          function ServicesContainer() {}

          ServicesContainer.prototype.getService = function() {};

          return ServicesContainer;

        })();
        spyOn(ServiceDetector.prototype, 'getService').and.callFake(function() {
          return service;
        });
        return this.result = this.restProxy.makeCall('post', 'url', 'resource', {});
      });
      xit('must return a deferred object', function() {
        return expect(this.result.done).toEqual(jasmine.any(Function));
      });
      return xit('must call getService function of service detector', function() {
        return expect(this.serviceDetector.getService).toHaveBeenCalledWith('resource');
      });
    });
  });
});

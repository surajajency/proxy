var RestProxy, Service, ServicesContainer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Service = (function() {
  function Service() {}

  Service.prototype.get = function(url, options) {
    var defaults;
    if (options == null) {
      options = {};
    }
    defaults = {
      dataType: 'json',
      url: url,
      type: 'GET'
    };
    $.extend(options, defaults);
    return $.ajax(options);
  };

  Service.prototype.create = function(url, options) {};

  Service.prototype.update = function(url, options) {};

  Service.prototype["delete"] = function(url, options) {};

  Service.prototype.run = function(methodName, url, options) {
    methodName = methodName.toUpperCase();
    if (methodName === 'POST') {
      this.create(url, options);
    }
    if (methodName === 'GET') {
      this.get(url, options);
    }
    if (methodName === 'PUT') {
      this.update(url, options);
    }
    if (methodName === 'DELETE') {
      return this["delete"](url, options);
    }
  };

  return Service;

})();

ServicesContainer = (function() {
  function ServicesContainer() {}

  ServicesContainer.prototype.services = {};

  ServicesContainer.prototype.getService = function(name) {
    var serviceName;
    serviceName = this._getServiceName(name);
    if (!this.services[serviceName]) {
      return false;
    }
    return this.services[serviceName];
  };

  ServicesContainer.prototype._getServiceName = function(name) {
    return name.charAt(0).toUpperCase() + string.slice(1) + 'Service';
  };

  ServicesContainer.prototype.addService = function(name, service) {
    if ((service instanceof Service) !== true) {
      throw new Error('Invalid service instance');
    }
    return this.services[name] = service;
  };

  return ServicesContainer;

})();

RestProxy = (function() {
  RestProxy.prototype.baseUrl = '';

  RestProxy.prototype.setBaseUrl = function(url) {
    return this.baseUrl = url;
  };

  function RestProxy(options) {
    if (options == null) {
      options = {};
    }
    this.beforeRejectPromise = __bind(this.beforeRejectPromise, this);
    this.beforeResolvePromise = __bind(this.beforeResolvePromise, this);
    this.serviceDetector = options.serviceDetector;
    this.notify = $.notify;
    this.offline = window.Offline;
  }

  RestProxy.prototype._verifyMethodName = function(methodName) {
    var methodNames;
    methodNames = ['POST', 'PUT', 'GET', 'DELETE'];
    methodName = methodName.toUpperCase();
    return methodNames.indexOf(methodName) !== -1;
  };

  RestProxy.prototype._generateUrl = function(url) {
    return "" + this.baseUrl + "/" + url;
  };

  RestProxy.prototype.makeCall = function(methodName, url, resource, options) {
    var deferred, service, serviceDeferred;
    if (this._verifyMethodName(methodName) === false) {
      throw new Error('Invalid request method name');
    }
    service = this.serviceDetector.getService(resource);
    if (service === false) {
      throw new Exception('Service not defined');
    }
    url = this._generateUrl(url);
    serviceDeferred = service.run(methodName, url, options);
    deferred = new $.Deferred();
    serviceDeferred.done((function(_this) {
      return function(response, xhr, textStatus) {
        var args;
        args = _this.beforeResolvePromise(response, xhr, textStatus);
        return deferred.resolve(args);
      };
    })(this)).fail((function(_this) {
      return function(jqXHR, textStatus) {
        var args;
        args = _this.beforeRejectPromise(jqXHR, textStatus);
        return deferred.reject(args);
      };
    })(this));
    return deferred.promise();
  };

  RestProxy.prototype.beforeResolvePromise = function(response, xhr, textStatus) {
    return response = args[0];
  };

  RestProxy.prototype.beforeRejectPromise = function(xhr, textStatus) {};

  return RestProxy;

})();

// Generated by CoffeeScript 1.7.1
var MenuItemService, menuItemsService, proxy, servicesContainer, xhr,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MenuItemService = (function(_super) {
  __extends(MenuItemService, _super);

  function MenuItemService() {
    return MenuItemService.__super__.constructor.apply(this, arguments);
  }

  return MenuItemService;

})(Service);

menuItemsService = new MenuItemService;

servicesContainer = new ServicesContainer;

servicesContainer.addService('menuitemservice', menuItemsService);

proxy = new RestProxy({
  servicesContainer: servicesContainer
});

proxy.setBaseUrl('http://localhost/phoenix/api/v1');

xhr = proxy.makeCall('POST', '', 'menuItem', {});

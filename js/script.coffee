class MenuItemService extends Service
menuItemsService = new MenuItemService

servicesContainer = new ServicesContainer
servicesContainer.addService 'menuitemservice', menuItemsService

proxy = new RestProxy servicesContainer : servicesContainer
proxy.setBaseUrl 'http://localhost/phoenix/api/v1'


xhr = proxy.makeCall 'POST', '', 'menuItem', {}

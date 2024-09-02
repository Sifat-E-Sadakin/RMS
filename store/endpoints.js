export const endpoints = {
  //////////////////////// Authentication Endpoints ////////////////////////
  login: "/authentication/v1/login/",

  //////////////////////// Restaurant Endpoints ////////////////////////
  restaurantList: "/restaurant/v1/restaurant",
  addRestaurant: "/restaurant/v1/restaurant/",
  deleteRestaurant: "/restaurant/v1/restaurant",
  editRestaurant: "/restaurant/v1/restaurant",

  //////////////////////// Owner Endpoints ////////////////////////
  ownerList: "/user/v1/list",

  //////////////////////// Menu Endpoints ////////////////////////
  menuList: "/restaurant/v1/menu",
  addMenu: "/restaurant/v1/menu/",
  editMenu: "/restaurant/v1/menu",
  deleteMenu: "/restaurant/v1/menu",

  //////////////////////// Menu Item Endpoints ////////////////////////
  menuItemList: "/restaurant/v1/menu_item",
  menuItemDetails: "/restaurant/v1/menu_item",
  deleteMenuItem: "/restaurant/v1/menu_item",
  addMenuItem: "/restaurant/v1/menu_item/",
  editMenuItem: "/restaurant/v1/menu_item",

  //////////////////////// Employee Endpoints ////////////////////////
  employeeList: "/restaurant/v1/employee",
  addEmployee: "/restaurant/v1/employee/",
  deleteEmployee: "/restaurant/v1/employee",
  editEmployee: "/restaurant/v1/employee",
};

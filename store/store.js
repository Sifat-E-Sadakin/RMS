import { endpoints } from "./endpoints";
import {
  useCustomMutation,
  useCustomMutationDelete,
  useCustomMutationPut,
  useCustomQuery,
} from "./queryHooks";

export const useGetRestaurantListQuery = (id = "") => {
  return useCustomQuery("restaurant list", endpoints.restaurantList, id);
};

export const useGetMenuListQuery = (id = "") => {
  return useCustomQuery("menu list", endpoints.menuList, id);
};

export const useGetMenuItemListQuery = (id = "") => {
  return useCustomQuery("menu item list", endpoints.menuItemList, id);
};

export const useLoginMutation = () => {
  return useCustomMutation(endpoints.login, "login");
};

export const useAddRestaurantMutation = () => {
  return useCustomMutation(endpoints.addRestaurant, "add restaurant");
};

export const useAddMenuMutation = () => {
  return useCustomMutation(endpoints.addMenu, "add menu");
};

export const useGetOwnerListQuery = (id = "") => {
  return useCustomQuery("owner list", endpoints.ownerList, id);
};

export const useEditRestaurantMutation = id => {
  return useCustomMutationPut(endpoints.editRestaurant, "edit restaurant", id);
};

export const useEditMenuMutation = id => {
  return useCustomMutationPut(endpoints.editMenu, "edit menu", id);
};

export const useDeleteRestaurantMutation = id => {
  return useCustomMutationDelete(
    endpoints.deleteRestaurant,
    "delete restaurant",
    id
  );
};

export const useDeleteMenuMutation = id => {
  return useCustomMutationDelete(endpoints.deleteMenu, "delete menu", id);
};

export const useGetMenuItemDetailsQuery = id => {
  return useCustomQuery("menu item details", endpoints.menuItemDetails, id);
};

export const useDeleteMenuItemMutation = id => {
  return useCustomMutationDelete(
    endpoints.deleteMenuItem,
    "delete menu item",
    id
  );
};

export const useAddMenuItemMutation = () => {
  return useCustomMutation(endpoints.addMenuItem, "add menu item");
};

export const useEditMenuItemMutation = id => {
  return useCustomMutationPut(endpoints.editMenuItem, "edit menu item", id);
};

export const useGetEmployeeListQuery = (id = "") => {
  return useCustomQuery("employee list", endpoints.employeeList, id);
};

export const useAddEmployeeMutation = () => {
  return useCustomMutation(endpoints.addEmployee, "add employee");
};

export const useDeleteEmployeeMutation = id => {
  return useCustomMutationDelete(
    endpoints.deleteEmployee,
    "delete employee",
    id
  );
};

export const useEditEmployeeMutation = id => {
  return useCustomMutationPut(endpoints.editEmployee, "edit employee", id);
};

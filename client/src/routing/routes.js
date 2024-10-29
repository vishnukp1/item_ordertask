import { ItemCreate, ItemList, PurchaseOrderList, SuppliersList } from "../pages";
import CreateSupplier from "../pages/CreateSupplier";


import { createItem, items, purchaseorder, supplier ,supplierlist} from "./route.constant";

const routes = [
  {
    path: createItem,
    component: ItemCreate,
    exact: true,
  },
  {
    path: items ,
    component: ItemList,
    exact: true,
  },
  {
    path: purchaseorder,
    component: PurchaseOrderList,
    exact: true,
  },
  {
    path: supplier,
    component: CreateSupplier,
    exact: true,
  },
  {
    path: supplierlist,
    component: SuppliersList,
    exact: true,
  },

];

export default routes;
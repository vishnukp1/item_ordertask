import { lazy } from "react";

const ItemCreate=lazy(()=>import("./ItemCreate.jsx"))
const ItemList = lazy(() => import("./ItemList.jsx"));
const PurchaseOrderList= lazy(()=>import("./PurchaseOrderList.jsx"))
const SuppliersList= lazy(()=>import("./SuppliersList.jsx"))

export { ItemCreate,ItemList,PurchaseOrderList,SuppliersList};
import { createHashRouter, RouterProvider } from "react-router-dom";
import { CartPage } from "./pages/Cart";
import { ProductsPage } from "./pages/Products";
import { KitDetailsPage } from "./pages/KitDetails";
import { HomePage } from "./pages/Home";
import { MainLayout } from "./layouts/MainLayout";

const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <KitDetailsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

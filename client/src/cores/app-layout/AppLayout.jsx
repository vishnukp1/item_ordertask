import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../../routing";
import { AppHeader } from "..";

const AppLayout = () => {
  return (
    <>
      <main>
        <AppHeader />
        <section>
          <Suspense fallback={<div></div>}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Suspense>
        </section>
      </main>
    </>
  );
};

export default AppLayout;

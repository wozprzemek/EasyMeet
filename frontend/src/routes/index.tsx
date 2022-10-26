import { MainLayout } from "components/MainLayout/MainLayout";
import { HeroPage } from "components/HeroPage/HeroPage";
import { Outlet, useRoutes } from "react-router";

const App = () => {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  };

export const protectedRoutes = [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <HeroPage /> },
      ],
    },
  ];

export const AppRoutes = () => {
    const routes = protectedRoutes

    const element = useRoutes([...routes]);
    return <>{element}</>
}    
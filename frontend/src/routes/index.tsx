import { MainLayout } from "components/MainLayout/MainLayout";
import { StartPage } from "components/StartPage/StartPage";
import { Availability } from "features/Availability/routes/Availability";
import { CreateMeeting } from "features/CreateMeeting/routes/CreateMeeting";
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
        { path: '/', element: <StartPage /> },
        { path: '/create', element: <CreateMeeting /> },
        { path: '/meetings/:id', element: <Availability /> },
      ],
    },
  ];

export const AppRoutes = () => {
    const routes = protectedRoutes

    const element = useRoutes([...routes]);
    return <>{element}</>
}    
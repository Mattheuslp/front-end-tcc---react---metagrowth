import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/AppLayout";
import { AuthLayout } from "./pages/_layouts/AuthLayout";
import { Signin } from "./pages/auth/Sign-in";
import { Home } from "./pages/app/home/Home";
import { Goals } from "./pages/app/goals/Goals";
import { Feedbacks } from "./pages/app/Feedbacks/Feedbacks";
import { Management } from "./pages/app/management/Management";
import { UserEdit } from "./pages/app/management/UserEdit";
import { TeamEdit } from "./pages/app/management/TeamEdit";
import { ManagerLayout } from "./pages/_layouts/ManagerLayout";
import { GoalEdit } from "./pages/app/goals/GoalEdit";
import { FeedbackEdit } from "./pages/app/Feedbacks/FeedBackEdit";
import { MemberLayout } from "./pages/_layouts/MemberLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/metas", element: <Goals /> },
      { path: "/feedbacks", element: <Feedbacks /> },
      {
        element: <MemberLayout />,
        children: [
          { path: "/edicao/usuario/:userId", element: <UserEdit /> },
          { path: "/edicao/goal/:goalId/:userId", element: <GoalEdit /> },
          { path: "/edicao/feedback/:feedbackId/:userId", element: <FeedbackEdit /> },
        ],
      },
      {
        element: <ManagerLayout allowedRoles={["MANAGER"]} />,
        children: [
          { path: "/gestao", element: <Management /> },
          { path: "/edicao/usuario/:userId", element: <UserEdit /> },
          { path: "/edicao/equipe/:teamId", element: <TeamEdit /> },
          { path: "/edicao/goal/:goalId/:userId", element: <GoalEdit /> },
          { path: "/edicao/feedback/:feedbackId/:userId", element: <FeedbackEdit /> },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "/auth/login", element: <Signin /> }],
  },
]);

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  LandingPage,
  ProfilePage,
  AllPosts,
  SavedPosts,
  RegisterPage,
  JobsHome,
  JobDetailsPage,
  NotificationHome,
  SinglePost,
  MessageHome,
} from "../pages";
import { NewsArticles, Navbar } from "../components";
import ProtectedRoute from "./ProtectedRoute";
import { Auth_Entry_Point } from "./GoogleRoute";



// function Route({user}) {
function Route({user}) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <GuestRoute user = {user}>
        <LandingPage />
        // </GuestRoute>
      ),
    },
    {
      path: "/register",
      element: (
        // <GuestRoute user = {user}>
        <RegisterPage />
        // </GuestRoute>
      ),
    },
    {
      element: <Navbar />,
      children: [
        {
          path: "/feed",
          element: (
            <Auth_Entry_Point>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Auth_Entry_Point>
          ),
        },
        {
          path: "/profile/:username",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/all-posts/:username",
          element: (
            <ProtectedRoute>
              <AllPosts />
            </ProtectedRoute>
          ),
        },
        {
          path: "/post/:postId",
          element: (
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          ),
        },
        {
          path: "/jobs",
          element: (
            <ProtectedRoute>
              <JobsHome />
            </ProtectedRoute>
          ),
        },
        {
          path: "/job/:jobId",
          element: <JobDetailsPage />,
        },
        {
          path: "/saved-posts",
          element: (
            <ProtectedRoute>
              <SavedPosts />
            </ProtectedRoute>
          ),
        },
        {
          path: "/messages",
          element: <MessageHome />,
        },
        {
          path: "/article",
          element: <NewsArticles />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Route;

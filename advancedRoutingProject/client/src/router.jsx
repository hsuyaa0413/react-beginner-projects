import RootLayout from "./layouts/RootLayout"
import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom"
import { postListRoute } from "./pages/PostList"
import { userListRoute } from "./pages/UserList"
import { todoListRoute } from "./pages/TodoList"
import { postRoute } from "./pages/Post"
import { userRoute } from "./pages/User"
import { newPostRoute } from "./pages/NewPost"
import { editPostRoute } from "./pages/EditPost"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorMessage />,
        children: [
          { index: true, element: <Navigate to="/posts" /> },
          {
            path: "posts",
            children: [
              { index: true, ...postListRoute },
              {
                path: ":postId",
                children: [
                  { index: true, ...postRoute },
                  { path: "edit", ...editPostRoute },
                ],
              },
              {
                path: "new",
                ...newPostRoute,
              },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, ...userListRoute },
              { path: ":userId", ...userRoute },
            ],
          },
          { path: "todos", ...todoListRoute },
          { path: "*", element: <ErrorMessage /> },
        ],
      },
    ],
  },
])

function ErrorMessage() {
  const error = useRouteError()

  return (
    <>
      <h1>Error! Something went wrong.</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  )
}

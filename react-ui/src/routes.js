import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";

const routes = [
  {
    path: '/',
    key: 'index',
    component: Index,
    protected: true,
  },
  {
    path: '/landing-page',
    key: 'landing',
    component: Landing,
    protected: true,
  },
  {
    path: '/login-page',
    key: 'login',
    component: Login,
  },
  {
    path: '/profile-page',
    key: 'profile',
    component: Profile,
    protected: true,
  },
  {
    path: '/register-page',
    key: 'register',
    component: Register,
  }
]

export default routes;
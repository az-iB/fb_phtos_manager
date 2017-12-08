define([
  '../component/home',
  '../component/login',
  '../component/signup'
  ], function(Home, Login, Signup){
    return [
      {
        path:'/',
        component: Home,
      },
      {
      	path:'/login',
      	component: Login
      },
      {
      	path:'/signup',
      	component: Signup
      }
    ]
  });
require([
	'vue',
	'vue_router',
	'routes/home'
	], function(Vue, VueRouter, AppRoutes){
  
	Vue.use(VueRouter);

  var router = new VueRouter({
    mode: 'history',
    routes: AppRoutes
  });
 
  new Vue({
    el: '#app',
    router: router
  });
  	
});

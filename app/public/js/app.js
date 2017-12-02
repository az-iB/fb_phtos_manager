require([
	'vue',
	'vue_router',
	'routes/home'
	], function(Vue, VueRouter, AppRoutes){
  
	Vue.use(VueRouter);

  var router = new VueRouter({
    mode: 'hash',
    routes: AppRoutes
  });
 
  new Vue({
    el: '#app',
    router: router
  });
  	
});

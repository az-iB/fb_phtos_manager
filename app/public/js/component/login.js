define([
  'vue'
  ], function(Vue){
  return Vue.extend({
    template: `
     <div class="row auth">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-login">
          <div class="panel-heading">
            <div class="row">
              <div >
                <a href="#" class="active" id="login-form-link">Login</a>
              </div>
            </div>
            <hr>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-12">
                <form id="login-form" action="/login" method="post" role="form" style="display: block;">
                  <div class="form-group">
                    <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username"  v-model="username">
                  </div>
                  <div class="form-group">
                    <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" v-model="password">
                  </div>
                  
                  <div class="form-group">
                    <div class="row">
                      <div class="col-sm-6 col-sm-offset-3">
                        <div class="col-sm-6">
                          <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In">.
                        </div>
                        <div class="col-sm-6">
                          <a class="form-control btn btn-login" href="/oauth/facebook" tabindex="5">Use Facebook</a>
                        </div>
                      </div>
                      <div class="col-sm-6 col-sm-offset-3">
                       
                        <a class="form-control btn btn-register" href="/signup" tabindex="5">Sign up</a>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="text-center">
                      
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
    name: 'Login',
    data (router) {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      
    }
  });
});
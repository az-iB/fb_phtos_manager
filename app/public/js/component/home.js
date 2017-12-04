define([
  'vue'
  ], function(Vue){
  return Vue.extend({
    template: `

      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">

        <div class="row placeholders">
            <div class="  placeholder">
              <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="100" height="100" class="img-responsive" alt="Generic placeholder thumbnail">
              <h4>Label</h4>
             
            </div>
            
          </div>
        <ul class="nav nav-sidebar">
          <li><a href="#">Export</a></li>
        </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    
          <h2 class="sub-header">Section title</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>lorem</td>
                  <td>Lorem</td>
                  <td>lorem</td>
                  <td>lorem</td>
                  <td>lorem</td>
                </tr>                
              </tbody>
            </table>
          </div>
        </div>
      </div>

    `,
    name: 'Home',
    data (router) {
      return {}
    },
    methods: {
      
    }
  });
});
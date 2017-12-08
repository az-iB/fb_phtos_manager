define([
  'vue'
  ], function(Vue){
  return Vue.extend({
    template: `
    <div>
    <h2 class="sub-header">Albums</h2>
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
    `
  });
});
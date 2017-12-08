define([
  'vue',
  'axios',
  './views/albums'
  ], function(Vue, axios, albums){
  return Vue.extend({
    template: `

      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">

        <div class="row placeholders">
            <div class="  placeholder">
              <img :src= "user.avatar" width="100" height="100" class="img-responsive" alt="Generic placeholder thumbnail">
              <h4>{{user.username}}</h4>             
            </div>
            
          </div>
        <ul class="nav nav-sidebar">
          <li><a href="#">Export</a></li>
        </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <div v-if='hasAccess'>
            <div v-if='synced'>
              <albums></albums>
            </div>
            <div v-else>
              <p>your are connected to your facebook all you need is to import your albums  </p>
              <button @click='syncAcount'>import</button>
            </div>
            
          </div>
        </div>
      </div>

    `,
    name: 'Home',
    data () {
      return {
        user : {},
        synced: false,
        hasAccess: false
      }
    },
    mounted () {
      this.getUser();
    },
    methods: {
      getUser: function(){
        axios.get('/user')
          .then(response => {
           
            this.user = response.data;
            this.synced = response.data.synced;
            this.hasAccess = response.data.hasAccess
          })
            .catch(e => {
            this.errors.push(e)
          })
      },
      syncAcount: function(){
        
        axios.get('/sync')
        .then(response => {
          this.getUser();
        })
      }
      
    },
    components: {
      'albums': albums
    }
  });
});
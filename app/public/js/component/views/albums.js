define([
  'vue',
  'axios'
  ], function(Vue, axios){
  return Vue.extend({
    template: `
    <div>
    <h2 class="sub-header">Albums</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Cover</th>
            <th>Name</th>
            <th>Creation date</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="album in albums" :key="album._id">
          <td >
            <button  type="button" class="btn btn-default btn-sm">
              <span class="glyphicon glyphicon-eye-open"></span> Open Album
            </button>
          </td>
          <td>
            <img :src= "album.cover_photo.url" width="100" height="100" class="img-responsive radios" alt="" ></td>
          <td>{{ album.name }}</td>
          <td>{{ album.created_time }}</td>
        </tr>              
        </tbody>
      </table>
    </div>
    </div>
    `,
     name: 'Albums',
    data () {
      return {
        albums: [],
        photos:[]
      }
    },
    mounted () {
      this.getAlbums();
    },
    methods: {
      getAlbums: function(){
        axios.get('/albums/'+this.$parent.user.id)
        .then(response => {
          this.albums = response.data.albums;
        })
          .catch(e => {
          this.errors.push(e)
        })
      },
         
    }
  });
});
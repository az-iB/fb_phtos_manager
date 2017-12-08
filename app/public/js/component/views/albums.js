define([
  'vue',
  'axios'
  ], function(Vue, axios){
  return Vue.extend({
    template: `
    <div>
    <h2 v-if="section === 'albumsSection'" class="sub-header">Albums</h2>
    <h2 v-else-if="section === 'photosSection'" class="sub-header">Photos in {{ albumName }}</h2>
    <div class="table-responsive">
      <table v-if="section === 'albumsSection'" class="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Cover</th>
            <th>Name</th>
            <th>Creation date</th>
          </tr>
        </thead>
        <tbody>
        <tr v-if="section === 'albumsSection'" v-for="album in albums">
          <td >
            <button @click="getAlbumPhotos(album)" type="button" class="btn btn-default btn-sm">
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

      <table v-else-if="section === 'photosSection'" class="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>Creation date</th>
          </tr>
        </thead>
        <tbody>
         <tr v-for="photo in photos" >
          <td >
            <button  type="button" class="btn btn-default btn-sm">
              <span class="glyphicon glyphicon-eye-open"></span> Open Album
            </button>
          </td>
          <td>
            <img :src= "photo.photos.url" width="100" height="100" class="img-responsive radios" alt="" ></td>
          <td>{{ photo.photos.name }}</td>
          <td>{{ photo.photos.created_time }}</td>
        </tr>              
        </tbody>
      </table>
    </div>
    </div>
    `,
     name: 'Albums',
    data () {
      return {
        section:'albumsSection',
        albums: [],
        albumName:'',
        photos:[],
        errors:[]
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
      getAlbumPhotos: function (album){
        axios.get('/photos/'+album.id)
        .then(response => {
          this.section ='photosSection';
          this.albumName = album.name;
          this.photos = response.data;
        })
          .catch(e => {
          this.errors.push(e)
        })
      }     
    }
  });
});
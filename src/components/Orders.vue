<template>
  <div >
    <ul>
      
      <li><router-link to='/'> Home </router-link></li>
      <li><router-link to='/orders'> Orders </router-link></li>
      <li><router-link to='/dashboard'> Dashboard </router-link></li>

    </ul>
    <ul >
        <li v-for="(order,idx) in orders" :key="idx">
          <div id='moddel'>
            
            <button v-bind:id="order[0]" v-on:click="deleteItem($event)"> delete </button>
            <button v-bind:id="order[0]" v-on:click="route($event)"> modify </button>

          </div>

           <div v-for="(quantity, dish) in order[1]" v-bind:key="dish" id="orderInfo">
             {{dish}}: {{quantity}}
           </div>
           
        </li>
    </ul>
  </div>
</template>

<script>
import database from '../firebase.js'
export default {

  data(){

    return{
      orders:[],
    }
  },

  methods:{

    fetchItems: function() {
            database.collection('orders').get().then((querySnapShot) => {
        querySnapShot.forEach(doc => {
          this.orders.push([doc.id,doc.data()])
        });
    });
          },
    deleteItem: function(event){
      let doc_id = event.target.getAttribute("id");
      database.collection('orders').doc(doc_id).delete().then(() => location.reload());
    },
    route: function(event){
      
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ name: 'modify', params: { id: doc_id } })

    }

  },
  created(){
    this.fetchItems()
  }
  
}
</script>

<style scoped>

#moddel{

  float:right;
  width:50%;
  text-align: center;

}
#orderInfo{
  width:50%;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>

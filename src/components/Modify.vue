<template>
  <div id="app">
    <ul>
        <li v-for="(quantity,dish,index) in datapacket" v-bind:key="index">
            {{dish}}: {{quantity}}
            <br>
            <br>
            <input v-bind:id=index placeholder=0 type="number" min=0>
            <br>
            <br>
        </li>
        <button v-on:click="updateOrder"> Update Order </button>
    </ul>


    

  </div>
</template>

<script>
import database from '../firebase.js'
export default {
    name: 'Modify',
    props:{
        id: {
            type: String,
            default:'no'
        }

    },
    data(){
        return{
            datapacket:{}
        }
    },
    methods:{

    fetchItems: function() {
        database.collection('orders').doc(this.id).get().then(snapshot =>{
            this.datapacket = snapshot.data()
        });
          },
    updateOrder: function(){
        var newOrder = {}
        for(var dish in this.datapacket){
            newOrder[dish] = dish.value
        }
        var counter = 0;
        for(var item in newOrder){
            var curr_val = document.getElementById(counter).value;
            if(curr_val != ''){
                newOrder[item] = curr_val;
            }else{
                newOrder[item] = 0;
            }
            counter++;

        }
        database.collection('orders').doc(this.id).update(newOrder).then(this.$router.push('orders'))
    }

    },
    created(){

        this.fetchItems()
    
    }


}
</script>

<style scoped>
h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 20px;
  padding: 20px;
  font-size:40px;
  background-color:lightcyan;
}
ul{
    list-style-type:none;
}
button {
    background-color: #f7cac9;
    border-radius: 10px;
    border-width: 1px;
    padding: 10px;
    font-size:20px;
}
</style>

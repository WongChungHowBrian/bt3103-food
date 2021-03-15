<template>
  <div>
      <span>Menu</span>
      <div>
        <ul>
            <li v-for="item in itemsSelected" :key="item[0]">

            {{item[0]}} x {{item[1]}}

            </li>
        </ul>
        <button v-on:click="findTotal(); sendOrder();"> Count Total </button>
      </div>
        <p v-show="calculate"> Subtotal: ${{total}} </p>
        <p v-show="calculate"> Grand Total: ${{totalGST}}</p>
  </div>
</template>

<script>
import database from '../firebase.js'
export default {
    name: 'Basket',
    props:{
        itemsSelected: {
            type: Array
        },
        basket: {
            type: Object,
            required: true
        }

    },
    data(){
        return{
            total:0,
            calculate:false,
        }
        
    },
    methods:{
        findTotal:function(){
            for(let i = 0; i < this.itemsSelected.length; i++){
                var curr_item = this.itemsSelected[i];
                this.total = this.total + (curr_item[1]*curr_item[2]);
            }
            this.calculate = true;
        },
        sendOrder:function(){
            for(let i = 0; i < this.itemsSelected.length; i++){
                var curr_item = this.itemsSelected[i]

                this.basket[curr_item[0]] = curr_item[1]

            }
            database.collection('orders').add(this.basket).then(() => location.reload())
            
        }
    },
    computed:{
        totalGST: function(){
            var gst = this.total*1.07;
            return gst.toFixed(2);
        }
    }
}
</script>

<style scoped>

button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding:5px;
  margin:10px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;

}

</style>


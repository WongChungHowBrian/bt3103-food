<template>
  <div id="itemsList">
    <ul>
      
      <li><router-link to='/'> Home </router-link></li>
      <li><router-link to='/orders'> Orders </router-link></li>
      <li><router-link to='/dashboard'> Dashboard </router-link></li>

    </ul>
    <ul> 
        <li v-for="item in itemsList" :key="item.id">

          {{item.name}}
          <br>
          <img v-bind:src="item.imageURL">
          <br>
          ${{item.price}}
          <qc v-on:counter="onCounter" v-bind:curr_item=item></qc>

        </li>
    </ul>
    <bk v-bind:itemsSelected=itemsSelected v-bind:basket=emptyBasket id="shoppingBasket"></bk>
  </div>
</template>

<script>
import database from '../firebase.js'
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
export default {
    data(){
        return{
            itemsSelected:[

            ],
            itemsList: [

            ],
            emptyBasket:{
              
            }
        }
    },
    components:{

        'qc':QuantityCounter,
        'bk':Basket

    },
    methods: {
      fetchItems: function() {
        database.collection('menu').get().then((querySnapShot) => {
    querySnapShot.forEach(doc => {
      this.itemsList.push(doc.data())
      this.$set(this.emptyBasket, doc.data().name, 0)
    });
});
      },
      onCounter: function (item, count) {
          if (this.itemsSelected.length === 0 && count > 0) {
              //If there is nothing in items selected, push the ORDER in
              this.itemsSelected.push([item.name, count, item.price]);
          } else {

              var updated = false;
              // Loop through everything to check what is not in the basket
              for (let i = 0; i < this.itemsSelected.length; i++) {
              const curr_item = this.itemsSelected[i];
              const item_name = curr_item[0];

              // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
              if(item_name == item.name){

                  if(count > 0) {
                      curr_item[1] = count
                      this.$set(this.itemsSelected,i,curr_item);
                  } else {
                  // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                      this.itemsSelected.splice(i,1);
                  }
                  updated = true;
                  break;

              }

              }
              // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.

              if(!updated){
                  this.itemsSelected.push([item.name, count, item.price]);
              }
          }
      }
    },
    created(){
      this.fetchItems()
    }
    

}
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 80%; 
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 250px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 27%;
  left: 80%;
}

</style>

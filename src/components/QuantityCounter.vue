<template>
  <div >
    <button v-on:click="subtract" class="plusminus">-</button>
    <span>{{count}}</span>
    <button v-on:click="add" class="plusminus">+</button>
  </div>
</template>

<script>
export default {
    name: 'QuantityCounter',
    props:{
        curr_item:{
            type: Object,
            required: true
        }
    },
    data(){
        return{
            count:0
        }
    },
    methods:{
        add:function(){
            if(this.count < 10) {
                this.count++;
            }else{
                alert("You cannot buy more than 10 items")
            }
            this.$emit('counter', this.curr_item, this.count);
        },
        subtract:function(){
            if(this.count > 0){
                this.count--;
                this.$emit('counter', this.curr_item, this.count);
            }

        }
    }

}
</script>

<style scoped>
button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #f7cac9;
  font-size:30px;
  width:50px;
  margin:10px;
  border-radius: 10px;
  border-width: 1px;
}
</style>

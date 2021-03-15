<template>
  <div >
      <ul>
      
        <li><router-link to='/'> Home </router-link></li>
        <li><router-link to='/orders'> Orders </router-link></li>
        <li><router-link to='/dashboard'> Dashboard </router-link></li>

        </ul>
    <h1> Line Chart </h1>
    <lc></lc>
    <h1> Bar Chart </h1>
    <bc></bc>
    

  </div>
</template>

<script>
import bchart from './charts/BarChart'
import lchart from './CallAPI'
export default {

  data(){

    return{
      orders:[],
    }
  },
  components:{

      'bc' : bchart,
      'lc' : lchart

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
  color:orchid;
  background-color: lightslategray;
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

</style>

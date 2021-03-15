import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Number of orders",
                backgroundColor: ["#00ccff", "#cc66ff", "#00cc66", "#ff9999", "#cc3300", "#ffff99"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                yAxes:[{
                    ticks:{
                        beginAtZero: true
                    }
                }]
            }
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
            let json = doc.data()
            if(this.datacollection.labels.length == 0) {
                Object.keys(json).forEach((dish) =>{
                    this.datacollection.labels.push(dish)
                    this.datacollection.datasets[0].data.push( Number(json[dish]) )

                })
            }else {

                Object.keys(json).forEach((dish) => {

                    var index = this.datacollection.labels.indexOf(dish);
                    this.datacollection.datasets[0].data[index] = 
                    this.datacollection.datasets[0].data[index] + Number(json[dish]);
                })

            }

        })

        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}
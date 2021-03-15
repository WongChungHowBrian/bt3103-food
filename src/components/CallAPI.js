import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [
                
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            var zonePointer = {}
            console.log(response.data['items'][0])
            var colors = ["#00ccff", "#cc66ff", "#00cc66", "#ff9999", "#cc3300", "#ffff99"]
            response.data['region_metadata'].forEach(data => { 
                var sample = {
                    data:[],
                    label:data['name'],
                    fill:false,
                    borderColor: colors[this.datacollection.datasets.length]
                }
                zonePointer[data['name']] = this.datacollection.datasets.length
                this.datacollection.datasets.push(sample)
            })
            response.data['items'].forEach(data =>{

                this.datacollection.labels.push(data['timestamp'])
                var readings = data['readings']['psi_twenty_four_hourly']
                Object.keys(readings).forEach(zone =>{

                    var curr_dataset = this.datacollection.datasets[zonePointer[zone]]
                    curr_dataset.data.push(readings[zone])

                })


            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}
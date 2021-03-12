<script>
import { Doughnut } from 'vue-chartjs'
// import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

export default {
  extends: Doughnut,
  props: {
    toyTypes: {
      type: Array,
      default: null
    },
    toyPrices: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      chartdata: {
        labels: this.toyTypes,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#f87979', "#41B883", "#E46651", "#00D8FF"],
            data: this.toyPrices,
          }
        ],
        
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          mode: 'percentage',
          precision: 1,
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options)

  },
  created() {
    console.log('toyPrices', this.toyPrices);
    console.log('toyTypes', this.toyTypes);

  },
}
</script>
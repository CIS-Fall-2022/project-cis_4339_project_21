<template>
  <main>
    <div>
  <!-- hello message -->
      <h1 class="font-bold text-5xl text-red-700 tracking-widest text-center mt-12">Greetings!</h1>
    </div>
    
  <!-- creating bar chart declarations -->
    <Bar
    :chart-data="chart_Data"
    :chart-id="chart_Id"
    :chart-options="chart_Options"
    :dataset-id-key="dataset_Id_Key"
    :plugins="plugins"
    :css-classes="css_Classes"
    :styles="styles"
    :width="width"
    :height="height"
   />


<!-- setting up text visual format for text  -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-12">
        <h2 class="italic">Count of Events by Client</h2>
        <h3 class="italic"># of Clients Signed For Each Event</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-2 text-left">The Event Name</th>
              <th class="p-2 text-left"># of Clients Signed Up</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="event in queryData">
            <td class="p-2 text-left">{{ event.eventName }}</td>
            <td class="p-2 text-left">{{ event.number_of_clients_signed_up }}</td>
      </tr>
    </tbody>
  </table>
</div>
    </div >
  </main>
</template>
<script>
  import axios from "axios";
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  export default {
      
  name: 'BarChart',
  components: { Bar },
  props: {
    chart_Id: {
      type: String,
      default: 'bar-chart'
    },
    dataset_Id_Key: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 60
    },
    css_Classes: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },     
  data() {
    return {
      queryData: [],
      chart_Data: {
        labels: [],
        datasets: [ { data: [], label: 'Show or Hide Here' ,backgroundColor: '#FF0000',} ]
      },
      chart_Options: {
        responsive: true,
        scales: {
        y: {
            min: 1,
            max: 20,
        }
    }
      }
    };
  },    
  // using axios get methods to retrieve responses
  mounted() {
    let apiURL = import.meta.env.VITE_ROOT_API + `/eventdata/clientsByEvents`;
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
      this.chart_Data.labels = resp.data.map(value => value.eventName);
      this.chart_Data.datasets[0].data = resp.data.map(value => value.number_of_clients_signed_up);
    });
    window.scrollTo(0, 0);
  },
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

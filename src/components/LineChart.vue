<script setup lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import {computed} from "vue";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const props = defineProps<{
    data: any,
}>()

const dataset = computed((): any => {
    return {
        labels: Object.keys(props.data),
            backgroundColor: 'white',
        datasets: [
        {
            data: Object.values(props.data),
            borderColor: 'black',
            borderWidth: 1,
            pointRadius: 2,
            fill: {
                target: 'origin',
                above: 'rgba(255, 255, 255, 0.5)',
            },
            tension: 0.4,
            pointBackgroundColor: 'black',

        }
    ]
    }
})

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                color: 'white'
            },
            ticks: {
                color: 'white',
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: 'white'
            },
            ticks: {
                color: 'white',
            }
        }
    }
}
</script>

<template>
    <div class="chart-container">
        <Line :data="dataset" :options="options" />
    </div>
</template>

<style lang="scss" scoped>
.chart-container {
    min-width: 60rem;
    min-height: 15rem;

    @media (max-width: $mobile-breakpoint) {
        min-width: 100%;
    }
}
</style>
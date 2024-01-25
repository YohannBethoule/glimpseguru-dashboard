<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

defineProps<{
    data: any,
}>()

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
            labels: {
                color: "black"
            }
        },
        tooltip: {
            callbacks: {
                label: function (context: any) {
                    let label = context.label || '';
                    if (context.parsed) {
                        label = Number.parseFloat(context.parsed).toFixed(2) + ' %';
                    }
                    return label;
                }
            }
        }
    }
} as any
</script>

<template>
    <div class="chart-container">
        <Pie :data="data" :options="options" />
    </div>
</template>

<style scoped>
.chart-container {
    min-width: 250px !important;
    min-height: 250px !important;
}
</style>
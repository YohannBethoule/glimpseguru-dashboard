<script setup lang="ts">
defineProps<{
    title: string,
    rows: {
        [key: string]: number;
    }
}>()
</script>

<template>
    <div class="metric-content">
        <p class="title">{{title}}</p>
        <table class="table">
            <tr v-for="value in Object.entries(rows)">
                <td class="value">{{value[1]}}</td>
                <td class="label">{{value[0]}}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped lang="scss">
.metric-content {
    text-align: left;
}
.title {
    color: black;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.value {
    font-size: 2.5rem;
    font-weight: 700;
    padding-right: 2rem;
    text-align: right;
}

.label {
    color: black;
    font-size: 1.5rem;
}
</style>
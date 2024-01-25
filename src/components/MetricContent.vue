<script setup lang="ts">

defineProps<{
    title: string,
    label: string
}>()
</script>

<template>
    <div class="metric-content">
        <p class="title">{{title}}</p>
        <p class="label">{{label}}</p>
    </div>
</template>

<style lang="scss" scoped>
.metric-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    font-size: 2rem;
    font-weight: bold;
}

.label {
    font-size: 1.5rem;
    color: black;
}
</style>
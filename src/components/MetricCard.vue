<script setup lang="ts">

</script>

<template>
<article class="metric-card">
    <slot name="icon"></slot>
    <slot class="metric-content"></slot>
</article>
</template>

<style lang="scss" scoped>
.metric-card {
    background-color: $orange;
    box-shadow: $brutal-shadow;
    padding: 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    width: fit-content;
}
</style>
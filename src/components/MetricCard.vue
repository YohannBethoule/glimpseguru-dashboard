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
    border: 2px solid black;
    padding: 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-around;
    min-width: 250px;
    width: fit-content;
    height: fit-content;

    @media (max-width: $mobile-breakpoint) {
        width: 100%;
    }
}
</style>
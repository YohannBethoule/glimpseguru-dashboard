<script setup lang="ts">

</script>

<template>
    <button class="brutal-btn">
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
.brutal-btn {
    border: 1px solid black;
    box-shadow: $brutal-shadow;
    padding: 0.5rem;
    font-size: 1rem;
    background: $cyan;
    color: black;
}

.brutal-btn:hover {
    box-shadow: 6px 6px 0 black;
}
</style>
<script setup lang="ts">

</script>

<template>
    <div class="loader"><div></div><div></div><div></div></div>
</template>

<style scoped lang="scss">
.loader {
    display: inline-block;
    position: relative;
    width: 160px;
    height: 140px;
}
.loader div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 32px;
    background: $cyan;
    animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.loader div:nth-child(1) {
    left: 16px;
    animation-delay: -0.24s;
}
.loader div:nth-child(2) {
    left: 64px;
    animation-delay: -0.12s;
}
.loader div:nth-child(3) {
    left: 112px;
    animation-delay: 0s;
}
@keyframes loader {
    0% {
        top: 8px;
        height: 128px;
    }
    50%, 100% {
        top: 24px;
        height: 64px;
    }
}

</style>
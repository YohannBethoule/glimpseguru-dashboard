<script setup lang="ts">
defineProps<{
    placeholder: string
    modelValue: string|number
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', payload: string): void;
}>()
</script>

<template>
<input type="text" class="text-input" :placeholder="placeholder" :value="modelValue" @change="emit('update:modelValue', ($event.target as HTMLInputElement).value)"/>
</template>

<style lang="scss" scoped>
.text-input {
    border: 1px solid black;
    box-shadow: $brutal-shadow;
    padding: 0.5rem;
    font-size: 1rem;
    background: $yellow;
    color: black;
}
</style>
<script setup lang="ts">
defineProps<{
    options: {
        value: string|number
        label: string
    }[],
    modelValue: string|number
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', payload: string): void;
}>()
</script>

<template>
    <select class="brutal-dropdown" @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
        <option v-for="option in options" :value="option.value" :selected="option.value === modelValue">{{ option.label }}</option>
    </select>
</template>

<style scoped lang="scss">
.brutal-dropdown {
    border: 1px solid black;
    box-shadow: $brutal-shadow;
    padding: 0.5rem;
    font-size: 1rem;
    background: $beige;
    color: black;
}
</style>
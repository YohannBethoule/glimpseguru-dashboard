<script setup lang="ts">
import TextInput from "@/components/TextInput.vue";
import BrutalBtn from "@/components/BrutalBtn.vue";
import BurgerIcon from "@/assets/images/icons/burger.svg";
import Datepicker from "@vuepic/vue-datepicker";
import {AnalyticsData} from "@/types/analytics.ts";
import {ref} from "vue";

const emit = defineEmits<{
    (event: 'update:analytics', payload: AnalyticsData[]): void;
    (event: 'update:loading', payload: boolean): void;
}>()

const isOpen = ref(true)

let apiKey = window.localStorage.getItem('apiKey') || ''

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
const dateRange = ref([sevenDaysAgo, new Date()]);

const handleError = (error: string) => {
    alert(error)
    emit('update:analytics', [])
}

const getUserAnalytics = (event: SubmitEvent) => {
    event.preventDefault()
    if (!apiKey || !dateRange.value) return;
    emit('update:loading',true);
    dateRange.value[0].setHours(0,0,0,0)
    dateRange.value[1].setHours(23,59,59,59)
    const startTime = Math.floor(dateRange.value[0].getTime() / 1000)
    const endTime = Math.floor(dateRange.value[1].getTime() / 1000)
    fetch(`${import.meta.env.VITE_API_URL}/userAnalytics?start_time=${startTime}&end_time=${endTime}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': apiKey,
        },
    })
        .then(res => res.json())
        .then((data: AnalyticsData[] | {error: string}) => {
            if ('error' in data) {
                handleError(data.error)
                return
            }
            emit('update:analytics', data)
            window.localStorage.setItem('apiKey', apiKey)
            isOpen.value = false
        })
        .catch(err => {
            handleError(err.message)
        })
        .finally(() => emit('update:loading',false))
}
</script>

<template>
    <a href="#" class="open" @click="isOpen = true"><BurgerIcon /></a>
    <Transition name="menu">
        <aside class="sidebar" v-if="isOpen">
            <a href="#" class="close" @click="isOpen = false">x</a>
            <form class="inputs">
                <TextInput id="api-key" name="api-key" type="password" placeholder="API key" v-model="apiKey" required />
                <Datepicker class="datepicker" v-model="dateRange" :max-date="new Date()" :enable-time-picker="false" range auto-apply prevent-min-max-navigation required />
                <BrutalBtn class="submit" type="submit" href="#" @click="getUserAnalytics">Get analytics</BrutalBtn>
            </form>
        </aside>
    </Transition>
</template>

<style scoped lang="scss">
.sidebar {
    width: fit-content;
    z-index: 50;
    background: white;
    position: fixed;
    top: 0;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    padding: 8rem 2rem;
    gap: 2rem;
    justify-content: center;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.open {
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: $beige;
    &:hover {
        color: black;
    }
}

.close {
    position: absolute;
    top: 0;
    right: 1rem;
    text-decoration: none;
    color: $beige;
    font-size: 2rem;

    &:hover {
        color: black;
        text-decoration: underline;
        vertical-align: top;
    }
}

.datepicker {
    width: fit-content;
    border: 1px solid black;
    border-radius: 0;
    box-shadow: $brutal-shadow;
    --dp-background-color: #e9c46a;
    --dp-border-radius: 0;
    --dp-border-color: black;
    --dp-icon-color: black;
    --dp-text-color: black;
}

.submit {
    margin-top: 1.5rem;
}

.menu-enter-active,
.menu-leave-active {
    transition: all .5s ease;
}

.menu-enter-from,
.menu-leave-to {
    transform: translateX(-100%);
}
</style>
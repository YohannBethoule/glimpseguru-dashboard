<script setup lang="ts">
import {computed, ref} from 'vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {AnalyticsData} from "@/types/analytics.ts";
import WebsiteDashboard from "@/components/WebsiteDashboard.vue";
import TextInput from "@/components/TextInput.vue";
import BrutalBtn from "@/components/BrutalBtn.vue";

let apiKey = window.localStorage.getItem('apiKey') || ''

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const dateRange = ref([sevenDaysAgo, new Date()]);
const userAnalytics = ref<AnalyticsData[]>([])
const selectedWebsiteId = ref("")
const loading = ref(false)

const selectedWebsiteAnalytics = computed(() => {
    return userAnalytics.value.find((analytics: AnalyticsData) => analytics.website.websiteID == selectedWebsiteId.value)
})

const websites = computed(() => {
    return userAnalytics.value.map(website => website.website)
})

const getUserAnalytics = () => {
    loading.value = true;
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
        .then((data: AnalyticsData[]) => {
            userAnalytics.value = data
            window.localStorage.setItem('apiKey', apiKey)
            selectedWebsiteId.value = data[0].website.websiteID
            loading.value = false;
        })
        .catch(err => console.log(err))
}
</script>

<template>
    <div class="dashboard">
        <div class="inputs">
            <TextInput id="api-key" name="api-key" type="password" placeholder="API key" v-model="apiKey" />
            <Datepicker class="datepicker" v-model="dateRange" @update:model-value="getUserAnalytics" :max-date="new Date()" :enable-time-picker="false" range auto-apply prevent-min-max-navigation />
            <BrutalBtn @click="getUserAnalytics">Get analytics</BrutalBtn>
        </div>


        <WebsiteDashboard v-if="selectedWebsiteId || loading" :analytics="selectedWebsiteAnalytics" :websites="websites" :loading="loading" v-model="selectedWebsiteId"/>
    </div>
</template>

<style lang="scss" scoped>

.dashboard {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    @media screen and (max-width: $mobile-breakpoint) {
        flex-direction: column;
    }
}

.inputs {
    display: flex;
    flex-direction: column;
    height: 60vh;
    padding: 8rem 2rem;
    margin: 1rem;
    gap: 2rem;
    width: fit-content;
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
</style>
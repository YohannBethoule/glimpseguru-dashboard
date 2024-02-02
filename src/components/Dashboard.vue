<script setup lang="ts">
import {computed, ref} from 'vue'
import '@vuepic/vue-datepicker/dist/main.css';
import {AnalyticsData} from "@/types/analytics.ts";
import WebsiteDashboard from "@/components/WebsiteDashboard.vue";
import Inputs from "@/components/Inputs.vue";

const userAnalytics = ref<AnalyticsData[]>([])
const selectedWebsiteId = ref("")
const loading = ref(false)

const selectedWebsiteAnalytics = computed(() => {
    if (!userAnalytics.value.length) {
        return
    }
    return userAnalytics.value.find((analytics: AnalyticsData) => analytics.website.websiteID == selectedWebsiteId.value)
})

const websites = computed(() => {
    if (!userAnalytics.value) {
        return []
    }
    return userAnalytics.value.map(website => website.website)
})

const handleAnalyticsUpdate = (analytics: AnalyticsData[]) => {
    userAnalytics.value = analytics
    if (!userAnalytics.value.length) {
        return
    }
    selectedWebsiteId.value = analytics[0].website.websiteID
}
</script>

<template>
    <div class="dashboard">
        <Inputs @update:analytics="handleAnalyticsUpdate" @update:loading="(isLoading: boolean) => loading = isLoading"/>
        <WebsiteDashboard v-if="selectedWebsiteId || loading" :analytics="selectedWebsiteAnalytics" :websites="websites" :loading="loading" v-model="selectedWebsiteId"/>
    </div>
</template>

<style lang="scss" scoped>

.dashboard {
    display: flex;
    align-items: center;
    background: $navy;
    width: 100dvw;
    min-height: 100dvh;
}


</style>
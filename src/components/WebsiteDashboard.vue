<script setup lang="ts">
import {AnalyticsData, WebsiteInfo} from "../types/analytics.ts";
import MetricCard from "./MetricCard.vue";
import EyeIcon from "@/assets/images/icons/eye.svg";
import UserIcon from "@/assets/images/icons/user.svg";
import TimeIcon from "@/assets/images/icons/time.svg";
import BranchingIcon from "@/assets/images/icons/branching.svg";
import DeviceIcon from "@/assets/images/icons/device.svg";
import NumberMetric from "@/components/NumberMetric.vue";
import DonutChart from "@/components/DonutChart.vue";
import {computed} from "vue";
import BrutalDropdown from "@/components/BrutalDropdown.vue";
import Loader from "@/components/Loader.vue";
import TableMetric from "@/components/TableMetric.vue";
import LineChart from "@/components/LineChart.vue";

const props = defineProps<{
    analytics: AnalyticsData | undefined,
    websites: WebsiteInfo[],
    modelValue: string,
    loading: boolean,
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', payload: string): void;
}>()

const handleWebsiteChange = (newValue: string) => {
    emit('update:modelValue', newValue);
};

const deviceChartData = computed(() => {
    if (!props.analytics) return {}
    return {
        labels: ['Desktop', 'Mobile'],
        datasets: [
            {
                label: '%',
                data: [props.analytics.deviceType.desktop, props.analytics.deviceType.mobile],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                ],
                hoverOffset: 4
            }
        ]
    }
})

const originChartData = computed(() => {
    if (!props.analytics) return {}
    return {
        labels: ['Direct', 'Internal', 'Referral', 'Search'],
        datasets: [
            {
                label: '%',
                data: [props.analytics.sourceType.direct, props.analytics.sourceType.internal, props.analytics.sourceType.referral, props.analytics.sourceType.search],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#5cc03b',
                ],
                hoverOffset: 4
            }
        ]
    }
})

</script>

<template>
    <section class="website-dashboard" v-if="!loading && !!analytics">
        <BrutalDropdown id="website-selector" v-if="websites?.length > 0" :model-value="modelValue"
                        :options="websites.map(website => {return {label: website.websiteName, value: website.websiteID}})" @update:modelValue="handleWebsiteChange" />
        <div class="content">
            <div class="metrics charts">
                <MetricCard>
                    <template #icon>
                        <DeviceIcon class="icon" alt="device icon"/>
                    </template>
                    <DonutChart :data="deviceChartData"></DonutChart>
                </MetricCard>
                <MetricCard>
                    <template #icon>
                        <BranchingIcon class="icon" alt="branching path icon"/>
                    </template>
                    <DonutChart :data="originChartData"/>
                </MetricCard>
            </div>
            <div class="metrics numbers">
                <div class="numbers-row">
                    <MetricCard>
                        <template #icon>
                            <EyeIcon class="icon" alt="eye icon"/>
                        </template>
                        <NumberMetric :title="analytics.viewCount.toString()" label="views"></NumberMetric>
                    </MetricCard>
                    <MetricCard>
                        <template #icon>
                            <UserIcon class="icon" alt="user icon"/>
                        </template>
                        <NumberMetric :title="analytics.sessionCount.toString()" label="sessions"></NumberMetric>
                    </MetricCard>
                    <MetricCard>
                        <template #icon>
                            <TimeIcon class="icon" alt="time icon"/>
                        </template>
                        <NumberMetric :title="analytics.sessionTime.mean + 'min'"
                                      label="session time"></NumberMetric>
                    </MetricCard>
                </div>
                <div class="numbers-row">
                    <MetricCard  v-if="Object.keys(analytics.customEvents)?.length > 0">
                        <TableMetric title="Custom events" :rows="analytics.customEvents"></TableMetric>
                    </MetricCard>
                    <MetricCard v-if="Object.keys(analytics.pagesViews)?.length > 1">
                        <TableMetric title="Views per page" :rows="analytics.pagesViews"></TableMetric>
                    </MetricCard>
                    <MetricCard v-if="Object.keys(analytics.viewsHistogram)?.length > 0">
                        <LineChart :data="analytics.viewsHistogram" />
                    </MetricCard>
                </div>
            </div>
        </div>
    </section>
    <section class="website-dashboard loader-container" v-else-if="loading">
        <Loader></Loader>
    </section>
</template>

<style lang="scss" scoped>
.website-dashboard {
    box-shadow: 0 0 0.5rem rgba(155, 155, 155, 0.5);
    padding: 0 1rem 2rem 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 2rem;
    min-height: 100vh;

    @media (max-width: $mobile-breakpoint) {
        margin: 0;
        border-radius: 0;
        height: fit-content;
        padding: 3rem 1rem 2rem 1rem;
    }
}

.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-auto-rows: minmax(100px, auto);
    flex-direction: column;
    gap: 2rem;
    justify-content: space-evenly;

    @media (max-width: $tablet-breakpoint) {
        grid-template-columns: 1fr;
        grid-auto-rows: minmax(100px, auto);
        gap: 1rem;
    }
}

.metrics {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    @media (max-width: $mobile-breakpoint) {
        flex-direction: column;
        width: 100%;
    }
}

.numbers {
    flex-direction: column;
}

.numbers-row {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;

}

.charts {
    & > * {
        flex-shrink: 1;
        max-width: 90dvw;
    }

    @media (max-width: $tablet-breakpoint) {
        grid-row-start: 2;

    }
}

.icon {
    width: 4rem;
    height: 4rem;
    color: black;
    flex-shrink: 0;
}

#website-selector {
    margin: 1rem 2rem 2rem auto;
    padding: 1rem;
    font-size: 2rem;

    @media (max-width: $mobile-breakpoint) {
        margin: 1rem auto 2rem auto;
    }
}
</style>
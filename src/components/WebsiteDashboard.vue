<script setup lang="ts">
import {AnalyticsData, WebsiteInfo} from "../types/analytics.ts";
import MetricCard from "./MetricCard.vue";
import eyeIcon from "@/assets/images/icons/eye.svg";
import userIcon from "@/assets/images/icons/user.svg";
import timeIcon from "@/assets/images/icons/time.svg";
import branchingIcon from "@/assets/images/icons/branching.svg";
import deviceIcon from "@/assets/images/icons/device.svg";
import MetricContent from "@/components/MetricContent.vue";
import DonutChart from "@/components/DonutChart.vue";
import {computed} from "vue";
import BrutalDropdown from "@/components/BrutalDropdown.vue";
import Loader from "@/components/Loader.vue";

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
            <div class="metrics numbers">
                <MetricCard>
                    <template #icon>
                        <img :src="eyeIcon" class="icon" alt="eye icon"/>
                    </template>
                    <MetricContent :title="analytics.viewCount.toString()" label="vues"></MetricContent>
                </MetricCard>
                <MetricCard>
                    <template #icon>
                        <img :src="userIcon" class="icon" alt="user icon"/>
                    </template>
                    <MetricContent :title="analytics.sessionCount.toString()" label="sessions"></MetricContent>
                </MetricCard>
                <MetricCard>
                    <template #icon>
                        <img :src="timeIcon" class="icon" alt="time icon"/>
                    </template>
                    <MetricContent :title="analytics.sessionTime.mean + 'min'"
                                   label="Temps de session"></MetricContent>
                </MetricCard>
            </div>
            <div class="metrics charts">
                <MetricCard>
                    <template #icon>
                        <img :src="deviceIcon" class="icon" alt="device icon"/>
                    </template>
                    <DonutChart :data="deviceChartData"></DonutChart>
                </MetricCard>
                <MetricCard>
                    <template #icon>
                        <img :src="branchingIcon" class="icon" alt="branching path icon"/>
                    </template>
                    <DonutChart :data="originChartData"/>
                </MetricCard>
            </div>

        </div>

    </section>
    <section class="website-dashboard loader-container" v-else>
        <Loader></Loader>
    </section>
</template>

<style lang="scss" scoped>
.website-dashboard {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(155, 155, 155, 0.5);
    padding: 1rem;
    margin: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 2rem;
    height: 90vh;

    @media (max-width: $mobile-breakpoint) {
        width: 100%;
        margin: 0;
        border-radius: 0;
        height: fit-content;
    }
}

.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;

}

.content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: space-evenly;
    align-items: center;
    flex-grow: 1;


}

.metrics {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;

    @media (max-width: $mobile-breakpoint) {
        flex-direction: column;
        width: 100%;
        & > * {
            width: 100%;
            max-width: 100%;
            justify-content: center
        }
    }
}

.charts {
    flex-wrap: nowrap;
    & > * {
        flex-shrink: 1;
    }
}

.icon {
    width: 4rem;
    height: 4rem;
    color: white;
}

#website-selector {
    margin: 1rem auto 2rem 2rem;
    padding: 1rem;
    font-size: 2rem;

    @media (max-width: $mobile-breakpoint) {
        margin: 1rem auto 2rem auto;
    }
}
</style>
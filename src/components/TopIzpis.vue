<script setup>
import TopStat from '../components/TopStat.vue'
import IconDarkMatter from '../components/icons/IconDarkMatter.vue'
import IconDarkEnergy from './icons/IconDarkEnergy.vue';
</script>

<template>
    <div class="ti">
        <TopStat>
            <template #stat>
                {{ dm.toFixed(3) }}
            </template>
            <template #icon>
                <IconDarkMatter></IconDarkMatter>
            </template>
        </TopStat>
        <TopStat>
            <template #stat>
                {{ Math.floor(h) }}
            </template>
            <template #icon>
                <IconDarkEnergy></IconDarkEnergy>
            </template>
        </TopStat>
    </div>
</template>

<script>
    export default {
        name: "TopIzpis",
        props: {
            dm:{
                type: Number,
                required: true,
            },
            h:{
                type: Number,
                required: true,
            },
        }
    }
</script>

<style scoped>
.ti{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
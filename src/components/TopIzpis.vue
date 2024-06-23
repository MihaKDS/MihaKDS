<script setup>
import TopStat from '../components/TopStat.vue'
import icnDM from '../../assets/d-matter.png'
import icnDe from '../../assets/d-energy.png'
</script>

<template>
    <div class="ti">
        <TopStat>
            <template #stat>
                {{ 1 }}
            </template>
            <template #icon>
                <icnDM></icnDM>
            </template>
        </TopStat>
        <TopStat>
            <template #stat>
                {{ 1 }}
            </template>
            <template #icon>
                <icnDE></icnDE>
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
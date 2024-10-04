<template>

    <div class="employees">
        <div class="employees__inner border border-solid border-b-0 border-[#D9D9D9] mb-[16px]">
            <div :class="['grid grid-cols-4 content-center', borderClass]">
                <span>Сотрудник</span>
                <span>Должность</span>
                <span>Email</span>
                <span>С нами в команде</span>
            </div>
            <NuxtLink 
                v-for="item in employees" 
                :key="item.id" 
                :class="['grid grid-cols-4 items-center', borderClass]"
                :to="{path: `/employees/${item.id}`}"
            >
                
                <div class="flex items-center gap-[10px]">
                    <span :class="avatarClass"></span>
                    <span>{{ item.name }}</span>
                </div>
                <span>{{ item.job_title }}</span>
                <span>{{ item.email }}</span>
                <span class="text-[#9CA1A5]">{{ item.in_the_team }}</span>
            </NuxtLink>
        </div>
        <div class="pagination flex items-center gap-[10px] justify-start justify-items-center">
            <button
                class="w-[40px] h-[40px] flex justify-center items-center"
                @click="decreasePage"
            >
                <img src="/images/arrow-left.png" alt="Back">
            </button>

            <button
                v-for="pageitem,i in Math.ceil(length/10)"
                :key="i"
                @click="setPage(pageitem)"
                :class="[pageitem === Number(page) ?  activePageClass : '', 'w-[40px] h-[40px]']"
            >
                {{ pageitem }}
            </button>

            <button
                class="w-[40px] h-[40px] flex justify-center items-center"
                @click="increasePage"
            >
                <img src="/images/arrow-right.png" alt="Forward">
            </button>
        </div>
    </div>

</template>

<script lang="ts" setup>
import type { LocationQueryValue, LocationQueryValueRaw } from 'vue-router';
import type { Employee } from '~/types';


const router = useRouter();
const route = useRoute();
const employees = ref<Employee[]>([]);
const page = ref(route.query.page);
const length = ref(1);
onMounted(async () => {
    if(!route.query.page) {
        router.push({query: { page: 1 }});
        page.value = route.query.page;
        employees.value = await getEmployees('1');
    }
})






employees.value = await getEmployees(page.value);

const avatarClass = "block w-[40px] h-[40px] bg-[#D9D9D9] rounded-full";
const borderClass = "border-b border-solid border-[#E1E6EC] px-[32px] py-[16px]";
const activePageClass = "text-white px-[12px] py-[10px] rounded-full bg-[#FF3333]";

async function getEmployees(page: LocationQueryValue | LocationQueryValueRaw[]): Promise<Employee[]> {
    const data = await $fetch(`/api/emloyess?page=${page}`);
    length.value = data.length;
    return data.employees;
}

function setPage(page: any) {
    router.push({query: { page }});
};

function decreasePage() {
    if(Number(page.value) === 1) {
        return;
    }
    router.push({query: {page: Number(page.value) - 1}});
}

function increasePage() {
    if(Number(page.value) === Math.ceil(length.value/10)) {
        return;
    }
    router.push({query: { page: Number(page.value) + 1 }});
}

onBeforeRouteUpdate(async (to, from) => {
    page.value = to.query.page;
    employees.value = await getEmployees(page.value);

})

</script>
<template>
    <div 
    class="employee-page">
    <h1 class="text-lg mb-[24px]">
        {{ currentEmployee.name }}
    </h1>
    <div class="border border-solid border-[#E1E6EC] p-[32px] text-sm">
        <h3 class="text-[24px] mb-[24px]">Основные данные</h3>
        <div class="flex items-center gap-[16px] mb-[24px]">
            <span class="text-[#71787F]">Должность</span>
            <span class="py-1 px-4 border-white block">
                {{ currentEmployee.job_title }}
            </span>
        </div>
        <div class="flex items-center gap-[16px] mb-[24px]">
            <span class="text-[#71787F]">В команде</span>
            <span class="py-1 px-4 border border-white block">
                {{ currentEmployee.in_the_team }}
            </span>
        </div>
        <h4 class="text-[#17191C] text-[18px] mb-4">Контактные данные</h4>
        <div class="flex items-center gap-[16px]">
            <span class="text-[#71787F]">Email</span>
            <input
                v-if="isEditing"
                v-model="currentEmployee.email"
                type="text"
                class="border border-solid border-[#E1E6EC] py-1 px-4" 
                @keypress.enter="postData"
            />
            <span v-else class="py-1 px-4 border-white block">
                {{ currentEmployee.email }}
            </span>
            <button @click="isEditing = !isEditing">
                <img src="/images/edit.png" alt="Edit" />
            </button>
        </div>
    </div>
</div>
    
</template>

<script lang="ts" setup>
import type { Employee } from '~/types';

const isEditing = ref(false);
const route = useRoute();

const id = computed(() => route.params.id);

const currentEmployee = ref<Employee>({
    id: Number(id),
    name: '',
    email: '',
    job_title: '',
    in_the_team: '',
    avatar: ''
});

onMounted(async () => {
    getEmployee(id.value);
})

async function getEmployee(id: string | string[]) {
    const data = await $fetch<Employee>(`/api/emloyess/${id}`);
    if(data) {
        currentEmployee.value.name = data.name;
        currentEmployee.value.email = data.email;
        currentEmployee.value.in_the_team = data.in_the_team;   
        currentEmployee.value.job_title = data.job_title;
    }
}

async function postData() {
    const req = await $fetch(`/api/emloyess/${id.value}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            email: currentEmployee.value.email
        }
    });
    isEditing.value = !isEditing.value;
    return null;
}

</script>
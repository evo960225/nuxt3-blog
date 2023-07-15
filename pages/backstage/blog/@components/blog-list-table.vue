<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Blog"
      selection="multiple"
      dense
      row-key="id"
      :loading="isLoading"
      :rows="rows"
      :columns="columns"
      v-model:selected="selected"
      v-model:pagination="pagination"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr>
          <q-td auto-width>
            <q-checkbox v-model="props.selected" dense size="sm" />
          </q-td>
          <q-td key="title" :props="props">
            <NuxtLink :to="`/backstage/blog/${props.row.date.split('-').slice(0,2).join('-')}/${props.row.blogName}`">
              {{ props.row.title }}
            </NuxtLink>
          </q-td>
          <q-td key="date" :props="props">{{ props.row.date }}</q-td>
          <q-td key="category" :props="props">{{ props.row.category }}</q-td>
          <q-td key="button" :props="props">
            <q-btn color="teal-4" :icon="farTrashCan" text-color="white" size="sm" @click="deleteArticle(props.rowIndex)" />
          </q-td>
          <q-td key="button" :props="props">
            <NuxtLink :to="`/backstage/blog/${props.row.date.split('-').slice(0,2).join('-')}/${props.row.blogName}`">
              <q-btn color="primary" text-color="white" label="編輯" size="sm" />
            </NuxtLink>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { farTrashCan } from '@quasar/extras/fontawesome-v6';
import { QTableColumn } from 'quasar'


const prop = defineProps<{
  rows: any[],
  selected: any[] | undefined
  apiUrl: string
}>()
const emit = defineEmits(['update:selected'])
const isLoading = ref(false)

const rows = ref<IBlogInfo[]>(prop.rows)
const selected = computed({
  get() {
    return prop.selected
  },
  set(value) {
    emit('update:selected', value)
  }
})
const columns = ref<QTableColumn[]>([
  {
    name: 'title', label: '標題', field: 'title',
    required: true,
    align: 'left',
    sortable: true
  },
  {
    name: 'date', label: '日期', field: 'date',
    align: 'left',
    sortable: true
  },
  {
    name: 'category', label: '分類', field: 'category',
    align: 'left',
    sortable: true
  },
  {
    name: 'button', label: '刪除', field: 'button',
    align: 'left',
    sortable: true,
  },

  {
    name: 'button', label: '按鈕', field: 'button',
    align: 'left',
    sortable: true,
  },

])
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 3
})

// ------------------------------
// init
function init() {
  
  loadData()
 
}
init()

// ------------------------------
// functions
// ------------------------------
async function fetchFromServer(startRow?:any, count?:any, filter?:any, sortBy?:any, descending?:any) 
  : Promise<IApiPageResult<IBlogInfo> | null> {

  const { data: blogPageData } = await useFetch<IApiPageResult<IBlogInfo>>(prop.apiUrl, {
    key: `blogData-${hashByTime(60*10)}`,
    method: 'GET',
  })

  return blogPageData.value
}

async function loadData() {
  isLoading.value = true

  const resultData = await fetchFromServer()
  rows.value = resultData?.data || [] 
  pagination.value.rowsNumber = resultData?.total || 0


  isLoading.value = false
  return resultData
}

async function onRequest(props: QTableRequestProps) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination

  isLoading.value = true
  
  // pagination
  pagination.value.page = page
  pagination.value.rowsPerPage = rowsPerPage
  pagination.value.sortBy = sortBy
  pagination.value.descending = descending

  const resultData = await loadData()
  pagination.value.rowsNumber = resultData?.total || 0

  // 
  isLoading.value = false
}

async function deleteArticle (rowIndex: number) {
  const { date, blogName } = rows.value[rowIndex]
  const yyyy_mm = date.split('-').slice(0,2).join('-')
  console.log('deleteArticle', yyyy_mm, blogName);
  
  await useFetch(`/api/blog/${yyyy_mm}/${blogName}`, {
    key: `delete-blogData-${hashByTime(1)}`,
    method: 'DELETE',
  })
  await loadData()
}

defineExpose({ pagination })
</script>

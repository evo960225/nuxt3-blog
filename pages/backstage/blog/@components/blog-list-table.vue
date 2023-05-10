<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Blog"
      selection="multiple"
      dense
      row-key="id"
      :rows="rows"
      :columns="columns"
      v-model:selected="selected"
    />
  </div>
</template>

<script lang="ts" setup>
import { QTableColumn } from 'quasar'

const prop = defineProps<{
  rows: QTableColumn[],
  selected: any[] | undefined
}>()
const emit = defineEmits(['update:selected'])
const rows = ref<QTableColumn[]>(prop.rows)
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
    name: 'title', label: 'title', field: 'title',
    required: true,
    align: 'left',
    sortable: true
  },
  {
    name: 'date', label: 'date', field: 'date',
    align: 'left',
    sortable: true
  },
  {
    name: 'category', label: 'category', field: 'category',
    align: 'left',
    sortable: true
  },
  
])
const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 2,
  rowsPerPage: 3
})



</script>

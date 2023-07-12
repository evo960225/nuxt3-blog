<template>
  <div>
    <div>
      <div class="w-full p-5">
        <div class="flex items-center justify-between">
          <NuxtLink to="/backstage/blog/list" class="flex items-center cursor-pointer my-2">
            <q-icon name="arrow_left" color="white" size="2.5rem" />
            <div class="text-xl">返回</div>
          </NuxtLink>
          <q-btn color="green-7" label="更新" @click="updateContent" />
        </div>
        <div class="p-2 space-y-2">
          <q-input v-model="mdData.title" color="teal" bg-color="white" dense outlined label="標題" />
          <q-input v-model="mdData.date" bg-color="white" dense outlined label="日期" class="w-48">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="mdData.date" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input v-model="mdData.category" color="teal" bg-color="white" dense outlined label="分類" />
          <q-input v-model="mdData.description" color="teal" bg-color="white" dense outlined label="說明" />
          <div class="" >
            <q-input v-model="mdData.content" rows="20"
              color="teal" bg-color="white" type="textarea" label="內容"
              outlined 
            />
          </div>
        </div>

        <!-- image list -->
        <div class="flex">
          <div v-for="(imageUrl, index) in imagesUrlData" :key="index" 
            class="flex w-1/4 h-[300px] bg-slate-700 border border-gray-500 <xl:w-1/3 <lg:w-1/2"
          >
            <q-img
              :src="imageUrl"
              :key="index"
              :loading="index>2 ? 'lazy' : 'eager'"
              fit="contain"
              class="h-full"
            >
              <q-radio v-model="mdData.ogImage" label="og" color="green-5" :val="imageUrl" class="!m-0 !p-2 !px-3" />
              <q-btn round color="black" icon="close" 
                class="absolute top-4 right-4 opacity-60 pointer-events-auto" 
                @click="deleteImage(imageUrl)"
              />
              <div class="absolute-bottom text-subtitle1 text-center">
                <q-btn @click="copyHtmlImageUrl(imageUrl)" label="html" icon="file_copy" />
                <q-btn @click="copyMdImageUrl(imageUrl)" label="MD" icon="file_copy" />
              </div>
            </q-img>
          </div>
        </div>
        <div>
          <q-uploader
            :url="`${blogApiUrl}/upload-image`"
            auto-upload
            accept="image/*"
            style="max-width: 300px"
            @uploaded="onUploaded"
          />
        </div>
      </div>
      <q-inner-loading :showing="isLoading">
        <q-spinner-audio
          color="lime-5"
          size="8em"
        />
      </q-inner-loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import { date, useQuasar } from 'quasar'
const $q = useQuasar()
const route = useRoute()
const { yyyy_mm, blogId } = route.params
const isLoading = ref(false)

const blogApiUrl = `/api/blog/${yyyy_mm}/${blogId}`
const ogImageUrl = ref('')

// get data
const getMd = async() => {
  const { data: mdData } = await useFetch<IBlog>(`${blogApiUrl}/md`, {
    key: `mdData-${hashByTime(1)}`,
    method: 'GET',
  })
  if (mdData.value === null) {
    mdData.value = {
      id: '',
      title: '',
      date: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      category: '',
      content: '',
    }
    $q.notify({
      message: '文章不存在',
      color: 'negative',
      type: 'negative',
      position: 'top',
      timeout: 3000,
    })
  }

  return ref<IBlog>(mdData.value)
}

const getImages = async() => {
  const { data: imagesUrlData } = await useFetch<string[]>(`${blogApiUrl}/images`, {
    key: `imageData-${hashByTime(1)}`,
    method: 'GET',
  })
  return imagesUrlData
}
const [mdData, imagesUrlData] = (await Promise.all([getMd(), getImages()]))


async function updateContent() {
  isLoading.value = true

  const { data, error } = await useFetch(`${blogApiUrl}/update`, {
    key: `mdData.post-${hashByTime(60*10)}`,
    method: 'POST',
    body: mdData.value || {},
  })

  if (error.value) {
    $q.notify({
      message: '更新失敗',
      color: 'negative',
      type: 'negative',
      position: 'top',
      timeout: 3000,
    })
    isLoading.value = false
    return
  }

  $q.notify({
    message: '更新成功',
    color: 'positive',
    type: 'positive',
    position: 'top',
    timeout: 3000,
  })
  isLoading.value = false
}

async function copyMdImageUrl(url: string) {
  try {
    const mdImage = `![w-100%](${url})`
    await navigator.clipboard.writeText(mdImage);
    $q.notify('連結已複製');
  } catch (err) {
    $q.notify('Failed to copy text');
  }
}
async function copyHtmlImageUrl(url: string) {
  try {
    const mdImage = `<figure>
  <img src="${url}" alt="w-100%">
  <figcaption></figcaption>
</figure>
`
    await navigator.clipboard.writeText(mdImage);
    $q.notify('連結已複製');
  } catch (err) {
    $q.notify('Failed to copy text');
  }
}

async function onUploaded() {
  $q.notify('上傳成功')
  imagesUrlData.value = (await getImages()).value
}

async function deleteImage(filePath: string) {
  console.log(filePath);
  
  const { data, error } = await useFetch(`${blogApiUrl}/image`, {
    key: `deleteImage-${hashByTime(1)}`,
    method: 'DELETE',
    body: { fileName: filePath.split('/').pop() },
  })

  if (error.value) {
    $q.notify({
      message: '刪除失敗',
      color: 'negative',
      type: 'negative',
      position: 'top',
      timeout: 3000,
    })
    return
  }

  $q.notify({
    message: '刪除成功',
    color: 'positive',
    type: 'positive',
    position: 'top',
    timeout: 3000,
  })

  if (filePath === mdData.value.ogImage) {
    mdData.value.ogImage = ''
    await updateContent()
  }
  
  imagesUrlData.value = (await getImages()).value
}



</script>

<style>
</style>
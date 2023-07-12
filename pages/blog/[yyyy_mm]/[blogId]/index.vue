<template>
  <div class="flex justify-center text-gray-700 m-4">
    <!-- @todo: change @type -->
    <component :is="'script'" type="application/ld+json">
      {
        "@context": "https://schema.org",
        "headline": "{{ blogData?.title }}",
        "@type": "game",
        "datePublished": "{{ new Date(blogData?.date as string).toISOString()  }}",
        "dateModified": "{{ new Date(blogData?.date as string).toISOString()  }}",
      }
    </component>
    <div class="rounded-xl shadow-lg bg-white px-16 py-10 w-[960px] 
      <md:(w-full p-2)">
      <h1 class="text-3xl font-bold tracking-wider">{{ blogData?.title }}</h1>
      <div class="my-3">
        <p class="text-gray-500">{{ blogData?.date }}</p>
        <p class="text-gray-500">{{ blogData?.category }}</p>
      </div>
      <hr class="my-2 border-b border-gray-300">
      <div v-html="blogData?.contentHtml" class="blog-content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { yyyy_mm, blogId } = route.params
const { data: blogData } = await useFetch(`/api/blog/${yyyy_mm}/${blogId}/html`, {
  key: `blogData-html-${hashByTime(1)}`,
  method: 'GET',
})

useHead({ title: blogData.value?.title })
useSeoMeta({
  ogTitle: blogData.value?.title,
  description: blogData.value?.description, 
  ogDescription: blogData.value?.description,
  ogImage: blogData.value?.ogImage,
  twitterImage: blogData.value?.ogImage,
  twitterDescription: blogData.value?.description,
  twitterCard: 'summary_large_image',
})

</script>

<style lang="scss">
.blog-content {
  & h1 {
    @apply text-[1.5rem] font-bold tracking-wider;
    line-height: 3rem;
  }
  & h2 {
    @apply text-2xl font-demi-bold tracking-wider mt-8 pl-6 text-gray-600 border-l-3 border-orange-300 ;
    line-height: 2.5rem;
  } 
  & h3 {
    @apply text-xl mt-4;
    line-height: 2.25rem;
  }
  & p {
    @apply text-lg text-gray-600 px-7 py-2 tracking-[1px];
  }
  & img {
    @apply block mx-auto my-2;
  }
  & img + figcaption {
    @apply block mx-auto mt-2;
  }
  & img[alt='w-10%'] { width: 10%; }
  & img[alt='w-20%'] { width: 20%; }
  & img[alt='w-30%'] { width: 30%; }
  & img[alt='w-40%'] { width: 40%; }
  & img[alt='w-50%'] { width: 50%; }
  & img[alt='w-60%'] { width: 60%; }
  & img[alt='w-70%'] { width: 70%; }
  & img[alt='w-80%'] { width: 80%; }
  & img[alt='w-90%'] { width: 90%; }
  & img[alt='w-100%'] { width: 100%; }

  & [alt='inline'] { @apply inline; }
  & figcaption {
    @apply text-sm text-gray-500 text-center mb-2;
  }
}
</style>
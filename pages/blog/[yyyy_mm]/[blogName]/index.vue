<template>
  <div class="flex flex-col items-center justify-center text-gray-700 m-4">
    <div class="rounded-xl shadow-lg bg-white px-20 py-6 w-[960px] 
      <md:(w-full p-2)"
    >
      <div class="py-3">
        <p class="gener inline-block -ml-0.5 px-3.5 py-2 tracking-widest text-white bg-yellow-500 rounded-md cursor-default">
          {{ blogData?.category }}
        </p>
        <h1 class="blog-title mt-3">{{ blogData?.title }}</h1>
        <div class="my-3 mt-2">
          <p class="text-gray-500 font-normal">建立日期： {{ blogData?.date }}</p>
          
        </div>
      </div>
      <hr class="my-2 border-t-1 border-gray-200 -mx-20 mt-4">
      <div v-html="blogData?.contentHtml" class="blog-content"></div>
    </div>
    <div class="flex justify-center">
      <div class="likeco-btn" data-name="lonelyfeizhai"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const host = runtimeConfig.public.host
const route = useRoute()
const { yyyy_mm, blogName } = route.params
const { data: blogData, refresh } = await useAsyncData('getData', 
  () => $fetch(`/api/blog/${yyyy_mm}/${blogName}`, {
    method: 'GET',
  })
)
const blogDate = computed(() => {
  if (blogData.value?.date) {
    return new Date(blogData.value?.date)
  } else {
    return new Date()
  }
})


useSeoMeta({
  ogTitle: blogData.value?.title,
  description: blogData.value?.description, 
  ogDescription: blogData.value?.description,
  ogImage: blogData.value?.ogImage,
  twitterImage: blogData.value?.ogImage,
  twitterDescription: blogData.value?.description,
  twitterCard: 'summary_large_image',
})

useHead({
  title: blogData.value?.title,
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${host}${route.path}`,
        },
        "headline": `${blogData.value?.title}`,
        "description": `${blogData.value?.description}`,
        "image": blogData.value?.ogImage,
        "author": {
          "@type": "Person",
          "name": "孤獨的邊緣宅"
        },
        "publisher": {
          "@type": "Person",
          "name": "孤獨的邊緣宅",
          "image": `${host}/favicon.ico`
        },
        "genre": `Gaming`,
        "url": `${host}${route.path}`,
        "datePublished":`${blogDate.value.toISOString()}`,
        "dateModified": `${blogDate.value.toISOString()}`,
        
      }),
    },
    // { src: 'https://noobtw.github.io/likeco-btn/likeco-btn.js' },
    // {
    //   children:`
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', '${process.env.GOOGLE_TAG_ID}');
    //   `
    // }
  ],
})

</script>

<style lang="scss">
.gener {
  font-size: 1rem;
  line-height: 1rem;
}
.blog-title {
  font-family:  "Nunito", "Microsoft YaHei", sans-serif;
  @apply tracking-[4px] text-3xl;
}
.blog-content {
  & h1 {
    @apply text-[1.5rem] font-extrabold tracking-wider;
    font-family:  "Nunito", "Microsoft YaHei", sans-serif;
    line-height: 3rem;
  }
  & h2 {
    @apply font-extrabold tracking-[3px] mt-20 -ml-6 pl-6 text-gray-600;
    font-family:  "Nunito", "Microsoft YaHei", sans-serif;
    font-size: 1.4rem;
    line-height: 2.3rem;
    box-shadow: inset 5px 0 0 0 rgba(253, 186, 116);
  } 
  & h2:first-child {
    @apply mt-9
  }
  & h3 {
    @apply text-xl mt-4;
    line-height: 2.25rem;
  }
  & p {
    @apply  text-cool-gray-600  mt-8 tracking-[2px] text-justify;
    font-size: 1.2rem;
    line-height: 2.4rem;
  }
  & p:first-child {
    @apply mt-2
  }

  & img {
    @apply block mx-auto mt-12;
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
    @apply text-sm text-gray-500 text-center mb-4 tracking-widest;
  }

  & iframe {
    @apply block mx-auto mt-8;
  }
  

}
</style>
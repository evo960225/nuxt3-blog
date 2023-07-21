<template>
  <div>
    <div id="header" 
      class="show-header flex justify-center items-center w-full h-15 
        bg-[#000000c8] border-b-6 border-orange-400 z-30
        filter backdrop-filter backdrop-blur-[5px] drop-shadow-xl 
    ">
      <div class="flex grid-cols-6 max-w-[1280px] w-full flex-1">
        <!-- blog name -->
        <div class="flex flex-1 items-center  text-white tracking-widest">
          <NuxtLink to="/" class="tracking-in-expand text-xl">
            孤獨的邊緣宅
          </NuxtLink>
        </div>
        
        <!-- menu -->
        <nav class="flex justify-end items-center max-w-[960px] w-full">
          <ul class="flex justify-center items-center gap-x-12 text-white">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/blog">Blog</NuxtLink></li>
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <div id="autocomplete" class="w-64"></div>
          </ul>
        </nav>

        <!-- social media -->
        <div class="flex flex-1 justify-end items-center gap-x-4">
          <a href="https://www.facebook.com/lonely.fei.zhai" 
            target="_blank" rel="noopener noreferrer"
            title="Facebook"
          ><div>
            <font-awesome-icon :icon="['fab', 'facebook']"  
              class="text-white text-lg"
            /></div>
          </a>
          <a href="https://medium.com/@evo960225" 
            target="_blank" rel="noopener noreferrer"
            title="Medium"
          >
            <font-awesome-icon :icon="['fab', 'medium']"  
              class="text-white text-lg"
            />
          </a>
          
        </div>
      </div>
    </div>
    <div class="h-15"></div>
  </div>
</template>

<script setup lang="tsx">
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic';
import algoliasearch from 'algoliasearch/lite';
const { result, search } = useAlgoliaSearch('dev_blog')

const runtimeConfig = useRuntimeConfig()
const algoliaId = runtimeConfig.public.algoliaId
const algoliaSearchKey = runtimeConfig.public.algoliaSearchKey
import { h, Fragment, render } from 'vue';
import moment from 'moment';
const searchClient = algoliasearch(algoliaId, algoliaSearchKey)

onMounted(() => {
  if (process.client) {
    autocomplete({
      container: '#autocomplete',
      openOnFocus: true,
      panelPlacement: 'end',
      getSources({ query }: { query: any }) {
        return [
          {
            sourceId: 'links',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'dev_blog',
                    query,
                    params: {
                      hitsPerPage: 5,
                      attributesToSnippet: ['title:15', 'description:35'],
                      snippetEllipsisText: '…',
                    },
                  },
                ],
              });
            },
            templates: {
              item({ item, components, html }: { item: any; components: any; html: any}) {
                return html`<div class="aa-ItemWrapper">
                <a ref="#"
                onclick="${() => navigateTo(`/blog/${moment(item.date||'').format('YYYY-MM')}/${item.blogName}`)}"
                >
                  <div class="aa-ItemContent">
                    <div class="aa-ItemContentBody">
                      <div class="aa-ItemContentTitle">
                        ${components.Highlight({
                          hit: item,
                          attribute: 'title',
                        })}
                      </div>
                      <div class="aa-ItemContentDescription !text-gray-400">
                        ${components.Snippet({
                          hit: item,
                          attribute: 'description',
                        })}
                      </div>
                    </div>
                  </div>
                </a>
              </div>`;
              }
            }
          },
          
        ];
      },
      renderer: { createElement: h, Fragment, render },
    });
  }
});

let lastScrollTop = 0;
onMounted(() => {
  if (!document) return
  if (process.client) {
    window.addEventListener("scroll", function(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 100){
          // Downscroll, hide header
          document.getElementById("header")?.classList.remove('show-header');
      } else {
          // Upscroll, show header
          document.getElementById("header")?.classList.add('show-header');
      }
      lastScrollTop = scrollTop;
    })
  }
})
</script>

<style >

#header {
  transition: top 0.5s;
  position: fixed;
  top: -100px;  /* Assume header height is 100px */
  --tw-drop-shadow: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.04)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
}

#header.show-header {
  top: 0;
}

:root {
  --aa-search-input-height: 36px;
}
.aa-Item {
  @apply p-3 border-b border-light-400 hover:bg-light-600 text-gray-600
}


.topbar { 
  background: 
    linear-gradient(to bottom right,transparent 50%,#3d5820 0) right bottom/24px 24px no-repeat,
    linear-gradient(to top left,transparent 50%,#3d5820 0) left top/24px 24px no-repeat,
    rgba(252, 211, 77, var(--tw-bg-opacity));  
  color: white; 
  overflow: hidden;
}
:root {
  --topbar-transition-sec: 0.5s;
}
.drawer{
  transition: visibility var(--topbar-transition-sec);
}
.drawer__nav {
  transition: transform var(--topbar-transition-sec) ease;
}
.drawer__nav--open {
  transform: translateY(0%);
}
.drawer__nav--close {
  transform: translateY(-100%);
}

.menu-hover-animate:hover::after  {
  animation-name: menu-animate;
  animation-duration: 0.65s;
}
.menu-hover-animate::after {
  position: absolute;
  bottom: 6px;
  left: 0px;
  width: 100%;
  height: 30%;
  background: repeating-linear-gradient(45deg, #0000 0px, #0000 7px, #666 7px, #666 18px);
  mask-image: linear-gradient(to right, transparent 0%, transparent 33%, #fff 33%, #fff 66%, transparent 66%, transparent 100%);
  mask-size: 320% 100%;
  mask-position: 0% 0; 
  opacity: 0.8;
  content: "";
  z-index: -1;
}
@keyframes menu-animate {
  0% {
    mask-position: 0% 0; 
  }
  37% {
    mask-position: 50% 0; 
  }
  62% {
    mask-position: 50% 0; 
  }
  100% {
    mask-position: 100% 0; 
  }
}


.tracking-in-expand {
	-webkit-animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
	        animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
          animation-delay: 0.3s;
}

 @-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.6em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.6em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

</style>
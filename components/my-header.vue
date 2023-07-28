<template>
  <div>
    <div id="header" 
      class="show-header flex justify-center items-center w-full h-15 
        bg-[#000000c8] border-b-6 border-orange-400 z-30
        filter backdrop-filter backdrop-blur-[5px] drop-shadow-xl 
        <sm:(backdrop-filter-none bg-[#282828])
    ">
      <div class="flex max-w-[1280px] w-full flex-1 p-2 items-center
        <2xl:max-w-[960px]
      ">
        <!-- blog name -->
        <div class="flex flex-1 items-center  tracking-widest min-w-[160px] <lg:ml-3">
          <NuxtLink to="/" class="tracking-in-expand min-w-[160px] text-xl text-white">
            孤獨的邊緣宅
          </NuxtLink>
        </div>
        
        <!-- menu -->
        <div class="flex justify-end items-center max-w-[960px] w-full 
            <2xl:(w-auto flex-grow-[2]) 
          ">
          <nav class="<md:(!hidden)">
            <ul class="flex justify-center items-center gap-x-12 text-white">
              <li><NuxtLink to="/">Home</NuxtLink></li>
              <li><NuxtLink to="/blog">Blog</NuxtLink></li>
              <li><NuxtLink to="/about">About</NuxtLink></li>
            </ul>
          </nav>

          <!-- autocomplete -->
          <div id="autocomplete" ref="autocompleteRef" 
            class="w-64 h-[32px] ml-12 bg-[#282828] rounded-md my-auto 
            <2xl:(w-48) 
            <md:(mx-4) <sm:w-29"
          >
            <span v-if="isPageLoading" 
              class="ml-5 h-full leading-[32px] text-gray-300">
              loading...
            </span>
          </div>

        </div>

        <!-- social media -->
        <div class="flex flex-1 justify-end items-center gap-x-4
          <lg:(!hidden)
        ">
          <a href="https://www.facebook.com/lonely.fei.zhai" 
            target="_blank" rel="noopener noreferrer"
            title="Facebook" class="flex"
          >
              <Icon name="simple-icons:facebook" color="white" size="20px" />
          </a>
          <a href="https://medium.com/@evo960225" 
            target="_blank" rel="noopener noreferrer"
            title="Medium" class="flex"
          >
            <Icon name="simple-icons:medium" color="white" size="20px" />
          </a>
          
        </div>
        
        <!-- <md: show menu icon -->
        <div class="flex justify-center items-center menu-icon mr-3" 
          :class="{open:isMenuDrawerActive}" 
          @click="isMenuDrawerActive=!isMenuDrawerActive"
        >
          <div class="menu-icon_three-line tw-hidden"></div>
        </div>

        <!-- <md: click icon after drawer -->
        <div id="drawer" class="drawer p-3 
          fixed top-0 -left-[250px] z-50
          w-[250px] h-screen bg-gray-600 
          transition-all duration-500 ease-in-out text-white"
          :class="{ 'left-0': isMenuDrawerActive }" 
        >
          <nav @click="isMenuDrawerActive=false">
            <ul class="tracking-wide" >
                <li class="p-2 mt-3 text-lg font-normal"><NuxtLink to="/">Home</NuxtLink></li>
                <li class="p-2 mt-3 text-lg font-normal"><NuxtLink to="/blog">Blog</NuxtLink></li>
                <li class="p-2 mt-3 text-lg font-normal"><NuxtLink to="/about">About</NuxtLink></li>
            </ul>
            <div class="flex mt-24 px-1 py-3 justify-end items-center space-x-4 border-t-1 border-white border-dashed">
              <a href="https://www.facebook.com/lonely.fei.zhai" 
                target="_blank" rel="noopener noreferrer" 
                title="Facebook" 
              >
                <div>
                  <Icon name="simple-icons:facebook" color="white" size="24px" />
                </div>
              </a>
              <a href="https://medium.com/@evo960225" 
                target="_blank" rel="noopener noreferrer"
                title="Medium" 
              >
                <Icon name="simple-icons:medium" color="white" size="24px"  />
              </a>
            </div>
          </nav>
        </div>
        <div id="overlay" class="fixed w-full h-screen top-0 left-0 bg-dark-50/20 z-40" 
          :class="{ 'tw-block': isMenuDrawerActive, 'tw-hidden': !isMenuDrawerActive }"
          @click="isMenuDrawerActive=false">
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
const isMenuDrawerActive = ref(false)
const isPageLoading = ref(true)
const autocompleteRef = ref<HTMLElement>()


const searchClient = algoliasearch(algoliaId, algoliaSearchKey)
// autocomplete
onMounted(() => {
  // event click autocomplete
  isPageLoading.value = false;
  if (process.client) {
    autocomplete({
      container: autocompleteRef.value as HTMLElement,
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
 
                return process.client && html `<div class="aa-ItemWrapper">
                  <a onclick="${() => navigateTo(`/blog/${moment(item.date||'').format('YYYY-MM')}/${item.blogName}`)}">
                  <div class="aa-ItemContent">
                    <div class="aa-ItemContentBody">
                      <div class="aa-ItemContentTitle !text-gray-600">
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

// hide header
let lastScrollTop = 0;
let scrolling = false;
onMounted(() => {
  if (!document) return
  window.addEventListener('scroll', function() {
    if (process.client && !scrolling) {
      scrolling = true;

      setTimeout(function() {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 80){
            // Downscroll, hide header
            document.getElementById("header")?.classList.remove('show-header');
        } else {
            // Upscroll, show header
            document.getElementById("header")?.classList.add('show-header');
        }
        lastScrollTop = scrollTop;
        scrolling = false;
      }, 100)
    }
  }, false);
})
</script>

<style lang="scss">
:root {
  --aa-search-input-height: 32px;
  --aa-input-background-color-rgb: rgb(40, 40, 40);
  --aa-primary-color-rgb: 212,212,212 !important;
  --aa-text-color-rgb: 212,212,212;
}
.aa-Autocomplete {
  background: rgb(40, 40, 40);
}
.aa-Item {
  @apply p-3 border-b border-light-400 hover:bg-light-600 text-gray-600;
}
.aa-DetachedFormContainer {
  @apply bg-[#282828]
  color: #fff;
  & button {
    @apply text-orange-500;
  }
}
.aa-SubmitButton {
  @apply px-2.5;
}
</style>

<style lang="scss" scoped>

#header {
  transition: top 0.3s;
  position: fixed;
  top: -100px;  /* Assume header height is 100px */
  --tw-drop-shadow: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.04)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
  @apply <sm:(drop-shadow-none);
}

#header.show-header {
  top: 0;
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
  --topbar-transition-sec: 0.6s;
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


.menu-icon {
  
  --close-color: #fff;
  --color: #fff;
  --duration: 600ms;
  --line-height: 3px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;
  z-index: 1;
  
  &_three-line {
    @apply <md:block;
    will-change: auto;
    width: 100%;
    height: var(--line-height);
    background: var(--color);
    position: relative;
    border-radius: var(--line-height);
    transition: all var(--duration);
    
    &::before, &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: var(--line-height);
      background:var(--color);
      border-radius: 5px;
      transition: all var(--duration);
      
    }
    &::before{
      transform: translateY(-8px);
    }
    &::after{
      transform: translateY(8px);
    }
  }
  
  &.open{
    .menu-icon_three-line {
      will-change: transform;
      background: transparent;
      &:before {
        transform: rotate(45deg);
        background: var(--close-color);
      }
      &:after {
        transform: rotate(-45deg);
        background: var(--close-color);
      }
    }
  }
}

</style>
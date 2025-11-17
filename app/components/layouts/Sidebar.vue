<template>
  <div class="w-full">
    <ul class="menu w-full grow">
      <!-- List item -->
      <li v-if="false">
        <NuxtLink class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
          <!-- Home icon -->
          <Icon class="dev" name="ph:house-simple-bold" />
          <span class="is-drawer-close:hidden">Homepage</span>
        </NuxtLink>
      </li>

      <!-- List item -->
      <li v-if="false">
        <NuxtLink class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
          <!-- Settings icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            stroke="currentColor"
            class="my-1.5 inline-block size-4">
            <path d="M20 7h-9"></path>
            <path d="M14 17H5"></path>
            <circle cx="17" cy="17" r="3"></circle>
            <circle cx="7" cy="7" r="3"></circle>
          </svg>
          <span class="is-drawer-close:hidden">Settings</span>
        </NuxtLink>
      </li>

      <li v-for="item in listItems">
        <NuxtLink
          class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          :data-tip="item.label"
          :to="item.link">
          <Icon class="is-drawer-close:tooltip is-drawer-close:tooltip-right" :name="item.icon" />
          <span class="is-drawer-close:hidden">Settings</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    listItems: {
      link: string;
      icon: string;
      label: string;
    }[];
  }>();
</script>

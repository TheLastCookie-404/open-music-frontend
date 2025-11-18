<template>
  <div class="w-full">
    <ul class="menu w-full grow">
      <!-- List item -->

      <li v-for="item in listItems">
        <NuxtLink
          class="dev is-drawer-close:tooltip is-drawer-close:tooltip-right"
          :data-tip="item.label"
          :to="item.link">
          <div class="flex h-7 items-center justify-center gap-3">
            <Icon class="is-drawer-close:tooltip is-drawer-close:tooltip-right" :name="item.icon" />
            <span class="is-drawer-close:hidden">Settings</span>
          </div>
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

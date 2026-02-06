<template>
  <div class="flex w-full grow flex-col">
    <p class="p-6 text-2xl font-bold tracking-wider">TLC Music</p>
    <div class="space-y-5">
      <ul class="menu w-full grow space-y-3 p-3">
        <!-- List item -->

        <li v-for="item in listItems">
          <NuxtLink
            class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base-content/80"
            :class="listItemClass"
            :data-tip="item.label"
            :to="item.link">
            <div class="flex h-7 items-center justify-center gap-5">
              <Icon
                class="is-drawer-close:tooltip is-drawer-close:tooltip-right shrink-0 text-2xl"
                :name="item.icon" />
              <span class="is-drawer-close:hidden text-base">{{ item.label }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>

      <ul class="menu w-full grow space-y-3 p-3">
        <!-- List item -->

        <li v-for="item in navbarList">
          <NuxtLink
            class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base-content/80"
            :class="listItemClass"
            :data-tip="item.label"
            :to="item.link">
            <div class="flex h-7 items-center justify-center gap-5">
              <Icon
                class="is-drawer-close:tooltip is-drawer-close:tooltip-right shrink-0 text-2xl"
                :name="item.icon" />
              <span class="is-drawer-close:hidden text-base">{{ item.label }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>

      <ul class="mb-5 w-full grow space-y-3 px-7 py-3">
        <!-- List item -->

        <li v-for="item in navbar">
          <NuxtLink
            class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base-content/50"
            :class="listItemClass"
            :data-tip="item.label"
            :to="item.link">
            <div class="flex h-7 items-center gap-5">
              <span class="is-drawer-close:hidden text-sm">{{ item.label }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="mt-auto flex items-center justify-center gap-3 p-6">
      <div class="avatar avatar-placeholder">
        <div class="bg-neutral text-neutral-content w-9 rounded-full">
          <span>SY</span>
        </div>
      </div>
      <div class="is-drawer-close:hidden w-full text-sm">Your profile</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    listItems: {
      link: string;
      icon: string;
      label: string;
    }[];
    listItemClass?: string;
  }>();

  const navbarList = [
    {
      link: "/",
      icon: "ph:heart",
      label: "Liked Tracks",
    },
    {
      link: "/",
      icon: "ph:plus-circle",
      label: "Create Playlist",
    },
  ];

  const navbar = [
    {
      link: "/",
      label: "Cyberpunk Vibes",
    },
    {
      link: "/",
      label: "Calm",
    },
    {
      link: "/",
      label: "Liked Tracks",
    },
    {
      link: "/",
      label: "Create Playlist",
    },
    {
      link: "/",
      label: "Liked Tracks",
    },
    {
      link: "/",
      label: "Funny",
    },
  ];
</script>

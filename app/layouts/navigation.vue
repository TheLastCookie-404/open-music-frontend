<template>
  <div>
    <div class="drawer lg:drawer-open">
      <input v-model="isSidebarOpen" id="my-drawer-4" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content bg-base-100 p-5">
        <!-- Navbar -->
        <!-- <Navbar>
          <InputSearch class="input-ghost bg-base-200/60" />
        </Navbar> -->

        <!-- Page content -->
        <slot />
      </div>

      <div class="drawer-side is-drawer-close:overflow-visible">
        <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
        <div
          class="bg-base-200 is-drawer-close:w-20 is-drawer-open:w-64 flex min-h-full flex-col items-start">
          <!-- Sidebar content here -->
          <Sidebar :list-items="navbarList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Navbar from "@/layouts/navigation/Navbar.vue";
  import Sidebar from "@/layouts/navigation/Sidebar.vue";

  const isSidebarOpen = useLocalStorage<boolean>("isSidebarOpen", false);

  const navbarList = [
    {
      link: "/",
      icon: "ph:magnifying-glass",
      label: "Search",
    },
    {
      link: "/",
      icon: "ph:house-simple",
      label: "Home",
    },
    {
      link: "/",
      icon: "ph:books",
      label: "Library",
    },
  ];
</script>

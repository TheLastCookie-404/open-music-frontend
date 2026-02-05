<template>
  <div>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content bg-base-100 p-5">
        <!-- Navbar -->
        <LayoutsNavbar>
          <InputSearch />
        </LayoutsNavbar>

        <!-- Page content -->
        <slot />
      </div>

      <div class="drawer-side is-drawer-close:overflow-visible">
        <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
        <div
          class="bg-base-200 is-drawer-close:w-20 is-drawer-open:w-64 flex min-h-full flex-col items-start">
          <!-- Sidebar content here -->
          <LayoutsSidebar :list-items="navbarList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const navbarList = [
    {
      link: "/",
      icon: "ph:house-simple-bold",
      label: "Home",
    },
  ];
</script>

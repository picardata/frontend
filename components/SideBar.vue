<template>
  <nav
    class="top-navbar flex flex-row align-center p-2 fixed w-full"
    style="z-index: 9001;"
  >
    <!-- Logo Brand -->
    <div class="flex-grow">
      <router-link to="/">Picardata
      </router-link>
    </div>
    <!-- /Logo Brand -->

    <!-- Menu Button -->
    <div class="flex-grow">
      <router-link to="/">Books
      </router-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'sidebar'
}
</script>

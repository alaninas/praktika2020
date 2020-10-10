<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | -->
    <router-link to="/users">Users</router-link> |
    <router-link to="/counter">Counter</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #e1e1e1;
  padding: .625rem;
  border-bottom: .125rem solid rgb(41, 41, 41);
  margin-bottom: .625rem;

  a {
    // font-weight: bold;
    font-variant-caps: all-small-caps;
    font-size: larger;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #1976d2;
    }
  }
}
</style>

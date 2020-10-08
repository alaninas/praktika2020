<template>
  <p class="section">Add User</p>
  <div class="row" id="userInput">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <form @submit.prevent="dummy">
        <span class="col-lg-3 col-md-7 col-sm-12">
          <label for="userName">Name</label>
          <input
            v-bind:class="{ invalid: userErrors.flag, valid: !userErrors.flag }"
            type="text" name="userName" v-model="newName.data" required
          />
        </span>
        <span class="col-lg-3 col-md-5 col-sm-12">
          <label for="ageInput">Age</label><input type="number" name="ageInput" v-model="newAge.data" min="18" max="100"/>
        </span>
        <span class="col-lg-3 col-md-8 col-sm-12">
          <label for="emailInput">Email</label><input type="email" name="emailInput" v-model="newEmail.data"/>
        </span>
        <input type="submit" value="Submit"
               class="button primary responsive-padding responsive-margin col-lg col-md-4 col-sm-12"
               @click="addUser(newName.data, newAge.data, newEmail.data)"/>
      </form>
      <div class="card fluid error" v-if="userErrors.flag"> {{ getErrorMessage() }} </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  name: 'UserComponent',
  el: '#userInput',
  props: {
    userName: {
      type: String,
      required: true
    },
    userAge: Number,
    userEmail: String,
    userErrors: {
      type: Object,
      required: true
    },
    addUser: Function
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup (props: any) {
    console.log(props.userAge)
    const newAge = reactive({ data: props.age })
    const newName = reactive({ data: props.userName })
    const newEmail = reactive({ data: props.userEmail })
    function dummy () {
      return true
    }
    function getErrorMessage () {
      return JSON.stringify(props.userErrors.message)
    }
    return { newAge, newName, newEmail, getErrorMessage, dummy }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
  border-width: .1em;
}

.invalid {
  border-color: red;
  background-color: #fff5f5;
}

.valid {
  border-color: grey;
  background-color: white;
}

form span {
  display: inline-block;
  white-space: nowrap;
}
</style>

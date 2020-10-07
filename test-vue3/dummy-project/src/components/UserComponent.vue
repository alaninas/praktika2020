<template>
    <div class="row" id="userInput">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <form @submit.prevent="dummy">
          <span class="col-lg-5 col-md-5 col-sm-12">
            <label for="userName">Name</label>
            <input
              v-bind:class="{ invalid: userErrors.flag, valid: !userErrors.flag }"
              type="text" name="userName" v-model="newName" required
            />
          </span>
          <span class="col-lg-5 col-md-5 col-sm-12">
            <label for="ageInput">Age</label>
            <input type="number" name="ageInput" v-model="newAge" min="18" max="100"/>
          </span>
          <input type="submit" value="Submit"
                 class="button primary responsive-padding responsive-margin col-lg col-md-2 col-sm-12"
                 @click="addUser(newName, newAge)"/>
        </form>
        <div class="card fluid error" v-if="userErrors.flag"> {{ getErrorMessage() }} </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserComponent',
  el: '#userInput',
  props: {
    userName: {
      type: String,
      required: true
    },
    userAge: Number,
    userErrors: {
      type: Object,
      required: true
    },
    addUser: Function
  },
  data: function () {
    return {
      newAge: this.userAge,
      newName: this.userName
    }
  },
  methods: {
    dummy (): boolean {
      return true
    },
    getErrorMessage (): string {
      return JSON.stringify(this.userErrors.message)
    }
  }
})
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

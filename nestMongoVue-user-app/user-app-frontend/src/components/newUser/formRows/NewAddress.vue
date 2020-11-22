<template>
<div class="row">
  <div id="address-container" class="col-lg-3 col-md-4 col-sm-12 address-container">
    <label for="addressInput">Address</label>
    <input
      class="address-input" type="text" id="addressInput" v-model="user.address" placeholder="your address" name="address" pattern="([,A-z\s]+.,[0-9\s]+){2}" required v-validate
      @keydown.enter="inputHandler.enter()"
      @keydown.down="inputHandler.down()"
      @keydown.up="inputHandler.up()"
      @input="inputHandler.inputChange()"
      @click="inputHandler.enter()"
    />
    <div v-show="!addressAutocomplete.openDropDown" class="error">{{ validationErrors.address }}</div>
    <ul id="address-dropdown" class="dropdown-menu" v-show="addressAutocomplete.openDropDown">
      <li :id="createAddressId(i)" v-for="(match, i) in matchedStringAddresses" :key="i" :class="{'autocomplete-active': isIndexActive(i)}" @click="matchesClick(i)">
        {{ match }}
      </li>
    </ul>
  </div>
  <div class="autofilled-address col-lg-9 col-md-8 col-sm-12">
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="streetInput">Street</label>
        <input type="text" id="streetInput" name="street" :value="user.street ? user.street : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="houseNumberInput">Number</label>
        <input type="text" id="houseNumberInput" name="houseNumber" :value="user.houseNumber ? user.houseNumber : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="cityInput">City</label>
        <input type="text" id="cityInput" name="city" :value="user.city ? user.city : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="zipCodeInput">Zipcode</label>
        <input type="text" id="zipCodeInput" name="zipCode" :value="user.zipCode ? user.zipCode : ''" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import { useAddressAutocomplete } from '@/modules/features/useAddressAutocomplete'
import { useUser } from '@/modules/features/useUser'
import { validationErrors } from '@/modules/states/formErrors'

export default {
  directives: {
    validate: validate
  },
  async setup () {
    const { user } = await useUser({})
    const { addressAutocomplete, inputHandler, matchesClick, matchedStringAddresses, matchedAddresses, isIndexActive, createAddressId } = useAddressAutocomplete(user)
    return {
      inputHandler,
      matchesClick,
      addressAutocomplete,
      isIndexActive,
      matchedStringAddresses,
      matchedAddresses,
      validationErrors,
      user,
      createAddressId
    }
  }
}
</script>

<style scoped src="@/assets/csss/addressAutocomplete.css">
</style>

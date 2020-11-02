import { ref } from 'vue'

export default interface AddressAutocompleteInterface {
    openDropDown: boolean;
    currentIdx: number;
}

export const addressAutocomplete = ref({ currentIdx: 0, openDropDown: false } as AddressAutocompleteInterface)

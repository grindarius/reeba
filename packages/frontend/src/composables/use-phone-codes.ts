import { countries } from "countries-list"
import { computed, ComputedRef, Ref, ref } from "vue"

import { CountryCode } from "@/types"

export interface UsePhoneCodes {
  selectedPhoneCountryCode: Ref<CountryCode>
  phoneCodesList: ComputedRef<Array<CountryCode>>
  onPhoneCountryCodeClicked: (index: number) => void
  countryCodeString: (code: CountryCode) => string
  findCountryName: (code: string) => string | undefined
}

export const usePhoneCodes = (
  defaultCountryCode: CountryCode = { name: "", phoneCode: "", iso31662: "" }
): UsePhoneCodes => {
  const selectedPhoneCountryCode = ref(defaultCountryCode)

  const onPhoneCountryCodeClicked = (index: number): void => {
    selectedPhoneCountryCode.value = phoneCodesList.value[index]
  }

  const countryCodeString = (code: CountryCode): string => {
    return `${code.name} (+${code.phoneCode})`
  }

  const phoneCodesList = computed(() => {
    return Object.entries(countries).flatMap(ct => {
      const phoneCodeArray = ct[1].phone.split(",")

      return phoneCodeArray.map(code => {
        const ret: CountryCode = {
          name: ct[1].name,
          phoneCode: code,
          iso31662: ct[0]
        }

        return ret
      })
    })
  })

  const findCountryName = (code: string): string | undefined => {
    return phoneCodesList.value.find(p => p.phoneCode === code)?.name
  }

  return {
    selectedPhoneCountryCode,
    phoneCodesList,
    onPhoneCountryCodeClicked,
    countryCodeString,
    findCountryName
  }
}

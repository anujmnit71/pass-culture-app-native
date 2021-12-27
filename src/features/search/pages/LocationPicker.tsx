import { t } from '@lingui/macro'
import debounce from 'lodash.debounce'
import React, { useRef, useState } from 'react'
import styled from 'styled-components/native'

import { PageHeader } from 'ui/components/headers/PageHeader'
import { SearchInput } from 'ui/components/inputs/SearchInput'
import { getSpacing, Spacer } from 'ui/theme'

import { SuggestedPlaces } from './SuggestedPlaces'

const SEARCH_DEBOUNCE_MS = 500

export const LocationPicker: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [debouncedValue, setDebouncedValue] = useState<string>(value)
  const debouncedSetValue = useRef(debounce(setDebouncedValue, SEARCH_DEBOUNCE_MS)).current

  const resetSearch = () => {
    setValue('')
    setDebouncedValue('')
  }

  const onChangeText = (newValue: string) => {
    setValue(newValue)
    debouncedSetValue(newValue)
  }

  return (
    <Container>
      <Spacer.TopScreen />
      <Spacer.Column numberOfSpaces={18} />
      <StyledInput>
        <SearchInput
          value={value}
          onChangeText={onChangeText}
          placeholder={t`Saisir une adresse...`}
          autoFocus={true}
          inputHeight="tall"
          accessibilityLabel={t`Barre de recherche des lieux`}
          onPressRightIcon={resetSearch}
        />
      </StyledInput>
      <Spacer.Column numberOfSpaces={4} />
      <SuggestedPlaces query={debouncedValue} />

      <PageHeader title={t`Choisir un lieu`} />
    </Container>
  )
}

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
}))

const StyledInput = styled.View({ alignItems: 'center', marginHorizontal: getSpacing(6) })

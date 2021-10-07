import { t } from '@lingui/macro'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
} from 'react-native'

import { UseNavigationType } from 'features/navigation/RootNavigator'
import { getTabNavConfig } from 'features/navigation/TabBar/helpers'
import { useSearch } from 'features/search/pages/SearchWrapper'
import { analytics } from 'libs/analytics'
import { accessibilityAndTestId } from 'tests/utils'
import { SearchInput } from 'ui/components/inputs/SearchInput'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { Invalidate } from 'ui/svg/icons/Invalidate'
import { MagnifyingGlass } from 'ui/svg/icons/MagnifyingGlass'
import { ACTIVE_OPACITY } from 'ui/theme/colors'

const LeftIcon: React.FC<{ onPressArrowBack: () => void }> = ({ onPressArrowBack }) => {
  const { searchState } = useSearch()
  if (searchState.showResults)
    return (
      <TouchableOpacity
        onPress={onPressArrowBack}
        {...accessibilityAndTestId(t`Revenir en arrière`)}>
        <ArrowPrevious />
      </TouchableOpacity>
    )
  return <MagnifyingGlass />
}

const RightIcon: React.FC<{ currentValue: string; onPress: () => void }> = (props) =>
  props.currentValue.length > 0 ? (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      onPress={props.onPress}
      {...accessibilityAndTestId(t`Réinitialiser la recherche`)}>
      <Invalidate size={24} />
    </TouchableOpacity>
  ) : null

export const SearchBox: React.FC = () => {
  const { navigate } = useNavigation<UseNavigationType>()
  const { searchState, dispatch } = useSearch()
  const [query, setQuery] = useState<string>('')

  useFocusEffect(
    useCallback(() => {
      setQuery(searchState.query)
    }, [searchState.query])
  )

  const resetSearch = () => {
    navigate(...getTabNavConfig('Search', { query: '' }))
    setQuery('')
  }

  const onPressArrowBack = () => {
    setQuery('')
    dispatch({ type: 'SET_QUERY', payload: '' })
    dispatch({ type: 'SHOW_RESULTS', payload: false })
    dispatch({ type: 'INIT' })
  }

  const onSubmitQuery = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    navigate(
      ...getTabNavConfig('Search', {
        query: event.nativeEvent.text,
        showResults: true,
      })
    )
    dispatch({ type: 'SET_QUERY', payload: event.nativeEvent.text })
    dispatch({ type: 'SHOW_RESULTS', payload: true })
    analytics.logSearchQuery(event.nativeEvent.text)
  }

  return (
    <SearchInput
      value={query}
      onChangeText={setQuery}
      placeholder={t`Titre, artiste, lieu...`}
      autoFocus={false}
      inputHeight="tall"
      LeftIcon={() => <LeftIcon onPressArrowBack={onPressArrowBack} />}
      RightIcon={() => <RightIcon currentValue={query} onPress={resetSearch} />}
      onSubmitEditing={onSubmitQuery}
    />
  )
}

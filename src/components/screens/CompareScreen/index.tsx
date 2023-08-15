import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useCompareScreen} from './useCompareScreen';
import {Button, Header, MainText, MainView, PokeCard} from '@components/atoms';
import Colors from '@constants/colors';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {BarChart} from 'react-native-chart-kit';
import Fonts from '@constants/fonts';
import {useHomeScreen} from '../HomeScreen/useHomeScreen';
import {generalStyles} from '@constants/styles';
const window = Dimensions.get('window');

const CompareScreen = () => {
  const {
    bottomSheetRef,
    snapPoints,
    handleSheetChanges,
    _handlerSelectedItem,
    selectedPokemon,
    selected,
    currentIndex,
    _handlerCloseBottomSheet,
  } = useCompareScreen();
  const {
    __onEndReached: __onEndReachedList,
    data: listData,
    isLoading: isLoadingList,
  } = useHomeScreen();

  const dataCharts = {
    labels: ['HP', 'Attack', 'Defense', 'S. Attack', 'S. Defense', 'Speed'],
    datasets: [
      {
        data: selectedPokemon?.[0]?.stats?.map((obj: any) => obj?.base_stat),
        color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`, // Blue color
      },
      {
        data: selectedPokemon?.[1]?.stats?.map((obj: any) => obj?.base_stat),
        color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, // Red color
      },
    ],
  };

  return (
    <MainView flex={1} backgroundColor={Colors.danger.base}>
      <Header
        label="Compare Pokemon"
        backgroundColor={Colors.primary.base}
        subLabel={'M Bintang Al Akbar'}
        withoutBackButton
      />
      <MainView
        borderTopRightRadius={10}
        borderTopLeftRadius={20}
        padding={16}
        backgroundColor={Colors.dark.neutral100}>
        {selectedPokemon?.length > 1 ? ( //render barchart if user already select both pokemon
          <MainView backgroundColor={Colors.dark.neutral100}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <BarChart
                data={dataCharts}
                width={window.width}
                height={220}
                fromZero={true}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  barRadius: 3,
                  barPercentage: 0.6,
                  fillShadowGradientFromOpacity: 1,
                  fillShadowGradientToOpacity: 1,
                  backgroundGradientFrom: Colors.dark.neutral100,
                  backgroundGradientTo: Colors.dark.neutral100,
                  color: (opacity = 1) => 'rgba(0, 255, 255, 1)', //<- This is needed to prevent the color null from appearing
                  labelColor: () => Colors.dark.neutral60,
                  decimalPlaces: 0,
                  propsForLabels: {
                    fontSize: 12,
                    fontFamily: Fonts.RegularPoppins,
                  },
                  propsForHorizontalLabels: {
                    dx: window.width,
                  },
                  propsForBackgroundLines: {
                    stroke: Colors.dark.neutral20,
                  },
                  useShadowColorFromDataset: true,
                }}
                style={styles.barChart}
              />
            </ScrollView>
          </MainView>
        ) : null}
        <BottomSheet
          ref={bottomSheetRef}
          index={currentIndex}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <MainView
            padding={16}
            backgroundColor={Colors.white}
            flex={1}
            flexGrow={1}>
            {currentIndex > 0 ? (
              <Button
                label="Close"
                background={Colors.primary.dark1}
                style={{width: 100, alignSelf: 'flex-end'}}
                action={() => _handlerCloseBottomSheet()}
              />
            ) : null}

            <MainText
              type={'SemiBold'}
              alignSelf="center"
              fontSize={18}
              lineHeight={24}
              marginBottom={16}>
              Choose Pokemon
            </MainText>
            <BottomSheetFlatList
              data={listData}
              nestedScrollEnabled
              numColumns={2}
              contentContainerStyle={[
                generalStyles.contentCenter,
                {flexGrow: 1},
              ]}
              keyExtractor={(_, _id): any => _id?.toString()}
              onEndReached={__onEndReachedList}
              renderItem={({item, index}: any) => (
                <PokeCard
                  avatar={item?.avatar}
                  name={item?.name}
                  order={index + 1}
                  isSelected={selected?.includes(item?.id)}
                  onPress={() => _handlerSelectedItem(item)}
                />
              )}
            />
          </MainView>
        </BottomSheet>
      </MainView>
    </MainView>
  );
};

export {CompareScreen};

const styles = StyleSheet.create({
  barChart: {
    marginTop: 12,
    paddingRight: 7,
  },
});

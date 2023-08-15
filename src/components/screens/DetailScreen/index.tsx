import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Header, LoadingIndicator, MainText, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import {useDetailScreen} from './useDetailScreen';
import {BarChart} from 'react-native-chart-kit';
import Fonts from '@constants/fonts';
import {Carousel, Pagination} from 'react-native-snap-carousel-v4';
import FastImage from 'react-native-fast-image';
import {generalStyles} from '@constants/styles';
const window = Dimensions.get('window');

const chartConfig = {
  barRadius: 3,
  barPercentage: 0.6,
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientToOpacity: 1,
  backgroundGradientFrom: Colors.white,
  backgroundGradientTo: Colors.white,
  color: () => Colors.primary.base,
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
};

const DetailScreen = () => {
  const {navigation, isLoading, data, currentIndex, setCurrentIndex} =
    useDetailScreen();

  const dataChart = {
    labels: ['HP', 'Attack', 'Defense', 'S. Attack', 'S. Defense', 'Speed'],
    datasets: [
      {
        data: data?.stats?.map((obj: any) => obj?.base_stat) ?? [],
      },
    ],
  };

  const imagesSpirites = [
    {
      id: 1,
      avatar: data?.sprites?.other?.home?.front_default,
    },
    {
      id: 2,
      avatar: data?.sprites?.other?.home?.front_shiny,
    },
  ];

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <MainView key={index}>
      <FastImage source={{uri: item?.avatar ?? ''}} style={styles.image} />
    </MainView>
  );

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <MainView flex={1} backgroundColor={Colors.primary.base}>
      <Header
        label={data?.name ?? 'Name of Pokemon'}
        backgroundColor={Colors.primary.base}
      />
      <MainView borderTopRightRadius={10} borderTopLeftRadius={20} padding={16}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Carousel
            data={imagesSpirites}
            renderItem={renderItem}
            sliderWidth={window.width * 0.9}
            itemWidth={window.width * 0.9}
            itemHeight={100}
            sliderHeight={100}
            onSnapToItem={handleSlideChange}
            style={{marginLeft: 100}}
            keyExtractor={(item: any, _: number) => _?.toString()}
          />
          <Pagination
            dotsLength={imagesSpirites?.length}
            activeDotIndex={currentIndex}
            containerStyle={styles.dotContainer}
            dotStyle={styles.dot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
          />
          <MainView style={generalStyles.row}>
            <MainView flexDirection="column">
              <MainText>Weight</MainText>
              <MainText>{data?.weight} kg</MainText>
            </MainView>
            <MainView flexDirection="column">
              <MainText>Height</MainText>
              <MainText>{data?.height} m</MainText>
            </MainView>
          </MainView>
          <MainText paddingTop={16}>Type :</MainText>
          <View style={generalStyles.column}>
            {data?.types?.map((obj: any) => (
              <MainView>
                <MainText>{obj?.type?.name}</MainText>
              </MainView>
            ))}
          </View>
          {data ? (
            <MainView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <BarChart
                  data={dataChart}
                  width={window.width}
                  height={220}
                  fromZero={true}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={chartConfig}
                  style={styles.barChart}
                />
              </ScrollView>
            </MainView>
          ) : null}
        </ScrollView>
      </MainView>
      {isLoading ? <LoadingIndicator /> : null}
    </MainView>
  );
};

export {DetailScreen};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    margin: 20,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: Colors.primary.base,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  barChart: {
    marginTop: 12,
    paddingRight: 7,
  },
});

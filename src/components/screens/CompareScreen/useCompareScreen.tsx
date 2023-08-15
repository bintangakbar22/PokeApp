/* eslint-disable react-hooks/exhaustive-deps */
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCallback, useMemo, useRef, useState} from 'react';

const useCompareScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'CompareScreen'>>();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ['25%', '65%', '70%', '100%'], []);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);
  const [selectedPokemon, setSelectedPokemon] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  const _getDetailPoke = async (id: number) => {
    try {
      const res: any = await api.get(URL_PATH.detail(id));
      return res?.data;
    } catch (_) {}
  };

  const _handlerSelectedItem = useCallback(
    async (item: any) => {
      if (selected?.includes(item?.id)) {
        setSelectedPokemon((prevState: any) =>
          prevState?.filter((obj: any) => obj?.id !== item?.id),
        );
        setSelected((prevState: any) =>
          prevState?.filter((obj: any) => obj !== item?.id),
        );
        return;
      }

      if (selected?.length === 0) {
        const detail = await _getDetailPoke(item?.id);
        setSelectedPokemon([detail]);
        setSelected([item?.id]);
        return;
      }

      if (
        selected?.length > 0 &&
        selected?.length < 2 &&
        item?.id !== selected?.[0]
      ) {
        const detail = await _getDetailPoke(item?.id);
        setSelectedPokemon((prevState: any) => [...prevState, detail]);
        setSelected((prevState: any) => [...prevState, item?.id]);
        setCurrentIndex(1);
      }
    },
    [selected],
  );

  const _handlerCloseBottomSheet = () => {
    setSelected([]);
    setSelectedPokemon([]);
    setCurrentIndex(0);
  };

  return {
    navigation,
    bottomSheetRef,
    snapPoints,
    handleSheetChanges,
    selectedPokemon,
    setSelectedPokemon,
    _handlerSelectedItem,
    selected,
    setSelected,
    currentIndex,
    _handlerCloseBottomSheet,
  };
};

export {useCompareScreen};

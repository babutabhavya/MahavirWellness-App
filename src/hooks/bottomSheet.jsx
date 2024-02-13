import React, {
  createContext,
  useContext,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';

const BottomSheetContext = createContext();

export const useBottomSheet = () => {
  return useContext(BottomSheetContext);
};

const BackdropComponent = props => (
  <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
);

export const BottomSheetProvider = ({children}) => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '75%'], []);
  const [sheetComponent, setSheetComponent] = useState(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const openBottomSheet = component => {
    setSheetComponent(component);
    handlePresentModalPress();
  };

  const closeSheet = () => {
    bottomSheetModalRef.current?.dismiss();
    setSheetComponent(null);
  };

  const storeRef = ref => {
    bottomSheetModalRef.current = ref;
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      closeSheet();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeSheet,
        storeRef,
      }}>
      {children}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BackdropComponent}>
        {sheetComponent}
      </BottomSheetModal>
    </BottomSheetContext.Provider>
  );
};

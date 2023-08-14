interface SplashParam {}
interface HomeParam {}
interface DetailParam {
  id: number;
}
interface CompareParam {
  id: number;
}

type ParamList = {
  SplashScreen: SplashParam;
  BottomTabNavigator: BottomTabParam;
  HomeScreen: HomeParam;
  DetailScreen: DetailParam;
  CompareScreen: CompareParam;
};

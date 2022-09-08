import {StyleSheet} from 'react-native';
import {grid} from '../../constants/grid';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: grid.margin,
  },
  chart: {
    flex: 1,
  },
  row: {
    paddingBottom: grid.gutter,
  },
});

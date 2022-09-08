import {StyleSheet} from 'react-native';
import {grid} from '../../constants/grid';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: grid.margin,
  },
  col: {
    paddingBottom: grid.gutter,
  },
});

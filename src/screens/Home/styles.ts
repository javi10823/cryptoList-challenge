import {StyleSheet} from 'react-native';
import {grid} from '../../constants/grid';

export const styles = StyleSheet.create({
  container: {
    margin: grid.margin,
    flex: 1,
  },
  flatlist: {
    marginTop: grid.gutter,
    flex: 1,
  },
  item: {
    paddingVertical: grid.margin,
  },
  row: {
    flexDirection: 'row',
  },
  wFull: {
    width: '100%',
    marginTop: grid.gutter,
    alignItems: 'center',
  },
  filterItem: {
    flex: 1,
    marginRight: grid.gutter,
  },
  filterItem2: {
    width: 100,
    height: 42,
  },
});

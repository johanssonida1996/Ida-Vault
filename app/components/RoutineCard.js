import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import colors from '../config/colors';

const items = {
  "Morgon": {
    icon: 'weather-sunset-up',
    color: colors.morning,
  },
  "Dag": {
    icon: 'weather-sunny',
    color: colors.day,
  },
  "Kväll": {
    icon: 'weather-sunset-down',
    color: colors.night,
  },
  "Övrigt": {
    icon: 'calendar',
    color: colors.other,
  },
};


const RoutineCard = ({
  id,
  type,
  description,
  index,
  expandedIndex,
  swipedIndex,
  handlePress,
  handleSwipeStart,
  handleSwipeEnd,
  renderRightActions,
}) => (
  <Swipeable
    renderRightActions={() => renderRightActions(id)}
    onSwipeableWillOpen={() => handleSwipeStart(index)}
    onSwipeableWillClose={handleSwipeEnd}
  >
    <TouchableOpacity onPress={() => handlePress(index)} activeOpacity={1}>
      <View
        style={[
          styles.card,
          expandedIndex === index && styles.border,
          swipedIndex === index && styles.swipedCard,
        ]}
      >
        <View style={[styles.cardIcon, { backgroundColor: items[type].color }]}>
          <MaterialCommunityIcons color="#131313" name={items[type].icon} size={20} />
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{type}</Text>
        </View>
        <Text style={styles.cardArrow}>
          <MaterialCommunityIcons
            color="#131313"
            name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
            size={20}
          />
        </Text>
      </View>
      {expandedIndex === index && (
        <View style={styles.expandedContent}>
          <Text style={styles.expandedContentText}>{description}</Text>
        </View>
      )}
    </TouchableOpacity>
  </Swipeable>
);

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  border: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  swipedCard: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#131313',
    marginBottom: 4,
  },
  cardArrow: {
    marginLeft: 'auto',
    fontSize: 17,
    fontWeight: '700',
    color: '#2c9d3b',
  },
  expandedContent: {
    padding: 20,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  expandedContentText:{
    fontSize: 16,
  }
});

export default RoutineCard;

import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {careerList} from '~/model/data';

const Body = () => {
  return (
    <View>
      {careerList.map((d) => (
        <Image key={d.id} source={d.icon} style={styles.image} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 76,
    height: 76,
  },
});

export default Body;

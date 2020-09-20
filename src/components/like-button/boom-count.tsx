import React, {useEffect} from 'react';
import {Animated, Easing, Image, StyleSheet, View} from 'react-native';

// 统计数字图片
const CountImages = [
  require('./images/count/count_0.png'),
  require('./images/count/count_1.png'),
  require('./images/count/count_2.png'),
  require('./images/count/count_3.png'),
  require('./images/count/count_4.png'),
  require('./images/count/count_5.png'),
  require('./images/count/count_6.png'),
  require('./images/count/count_7.png'),
  require('./images/count/count_8.png'),
  require('./images/count/count_9.png'),
];
const CountImgTxt = require('./images/count/count_txt.png');

interface BoomCountProps {
  count: number;
}
const BoomCount = (props: BoomCountProps) => {
  const springValue = new Animated.Value(0.8);

  useEffect(() => {
    Animated.timing(springValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      springValue.setValue(0.8);
    });
  }, [springValue]);

  return (
    <View style={styles.container}>
      {props.count
        .toString()
        .split('')
        .map((d, i) => (
          <Image
            key={i}
            resizeMode="cover"
            style={styles.number}
            source={CountImages[+d]}
          />
        ))}
      <Animated.Image
        resizeMode="cover"
        style={[
          styles.txt,
          {
            transform: [
              {
                scale: springValue,
              },
            ],
          },
        ]}
        source={CountImgTxt}
      />
    </View>
  );
};

export default React.memo(BoomCount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  number: {
    width: 18.85,
    height: 31.2,
  },
  txt: {
    marginTop: -15,
    marginLeft: -3,
    width: 59.5,
    height: 59.5,
  },
});

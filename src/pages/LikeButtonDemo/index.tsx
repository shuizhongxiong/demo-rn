import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import LikeButton from '~/components/like-button';

const LikeButtonDemo = () => {
  const [activeList, setActiveList] = useState<boolean[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      {Array(5)
        .fill(null)
        .map((d, i) => (
          <View key={i} style={styles['likeBtn' + i]}>
            <LikeButton
              height={25}
              width={25}
              active={activeList[i]}
              onActiveChange={(value: boolean) => {
                const activeCur = [...activeList];
                activeCur[i] = value;
                setActiveList(activeCur);
              }}
            />
          </View>
        ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeBtn0: {
    position: 'absolute',
    top: 50,
    left: 100,
  },
  likeBtn1: {
    position: 'absolute',
    top: '50%',
    left: 10,
  },
  likeBtn2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  likeBtn3: {
    position: 'absolute',
    top: '50%',
    right: 10,
  },
  likeBtn4: {
    position: 'absolute',
    bottom: 10,
    right: 100,
  },
});

export default LikeButtonDemo;

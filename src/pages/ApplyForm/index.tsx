import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Button} from 'react-native';

import Header from './containers/Header';
import Body from './containers/Body';
import Footer from './containers/Footer';

const ApplyForm = ({navigation}) => {
  const [step, setStep] = useState(1);

  const onPressPrev = () => {
    const num: number = step - 1;
    setStep(num);
  };

  const onPressNext = () => {
    const num: number = step + 1;
    setStep(num);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header step={step} />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('DemoLikeButton')}
      />
      <ScrollView style={styles.scrollContainer}>
        <Body />
      </ScrollView>
      <Footer onPressPrev={onPressPrev} onPressNext={onPressNext} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
});

export default ApplyForm;

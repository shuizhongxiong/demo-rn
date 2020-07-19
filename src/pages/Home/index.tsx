import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import Header from './containers/Header';
import Body from './containers/Body';
import Footer from './containers/Footer';

const Index = () => {
  return (
    <SafeAreaView style={style.container}>
      <Header />
      <ScrollView style={style.scrollContainer}>
        <Body />
      </ScrollView>
      <Footer onPressPrev={() => {}} onPressNext={() => {}} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
});

export default Index;

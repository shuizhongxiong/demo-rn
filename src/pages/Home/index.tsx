import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import Header from './containers/Header';
import Body from './containers/Body';
import Footer from './containers/Footer';

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollContainer}>
        <Body />
      </ScrollView>
      <Footer onPressPrev={() => {}} onPressNext={() => {}} />
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

export default Index;

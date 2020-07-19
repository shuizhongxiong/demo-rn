import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

interface FooterProps {
  prevText?: string;
  nextText?: string;
  onPressPrev?: (() => void) | null;
  onPressNext?: (() => void) | null;
}

const Footer = ({
  prevText = '上一步',
  nextText = '下一步',
  onPressPrev = null,
  onPressNext = null,
}: FooterProps) => {
  return (
    <View style={styles.container}>
      {!!onPressPrev && (
        <TouchableOpacity style={styles.button} onPress={onPressPrev}>
          <Text style={styles.buttonText}>{prevText}</Text>
        </TouchableOpacity>
      )}
      {!!onPressNext && (
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={onPressNext}>
          <Text style={styles.buttonPrimaryText}>{nextText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#94be49',
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#94be49',
  },
  buttonPrimary: {
    backgroundColor: '#94be49',
  },
  buttonPrimaryText: {
    color: '#fff',
  },
});

export default Footer;

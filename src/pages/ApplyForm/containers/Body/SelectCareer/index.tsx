import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

import Title from '~/components/title';

interface SelectCareerProps {
  careerList: any[];
  careerSelectedId?: number | null;
  onChangeCareer?: ((id: number) => void) | null;
}

const SelectCareer = React.memo(
  ({
    careerList = [],
    careerSelectedId = null,
    onChangeCareer = null,
  }: SelectCareerProps) => {
    return (
      <View>
        <Title title="请选择擅长的服务" tips="（最多一个）" />
        <View style={styles.container}>
          {careerList.map((d) => (
            <TouchableOpacity
              key={d.id}
              style={styles.careerView}
              onPress={() => {
                onChangeCareer && onChangeCareer(d.id);
              }}>
              <View
                style={[
                  styles.imageView,
                  careerSelectedId === d.id && styles.imageViewChecked,
                ]}>
                <Image source={d.icon} style={styles.image} />
              </View>
              <Text
                style={[
                  styles.text,
                  careerSelectedId === d.id && styles.textChecked,
                ]}>
                {d.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  careerView: {
    flex: 1,
    alignItems: 'center',
  },
  imageView: {
    overflow: 'hidden',
    marginBottom: 10,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#e0e0e0',
  },
  imageViewChecked: {
    borderColor: '#94be49',
  },
  image: {
    width: 76,
    height: 76,
  },
  text: {
    color: '#969696',
  },
  textChecked: {
    color: '#94be49',
  },
});

export default SelectCareer;

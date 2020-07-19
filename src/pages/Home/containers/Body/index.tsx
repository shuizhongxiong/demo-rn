import React, {useState} from 'react';
import {View} from 'react-native';

import {careerList} from '~/model/data';
import SelectCareer from './SelectCareer';

const Body = () => {
  const [careerSelectedId, setCareerSelectedId] = useState<number | null>(null);

  const onChangeCareer = (id: number) => {
    setCareerSelectedId(id);
  };

  return (
    <View>
      <SelectCareer
        careerList={careerList}
        careerSelectedId={careerSelectedId}
        onChangeCareer={onChangeCareer}
      />
    </View>
  );
};

export default Body;

import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import {Animated, Easing} from 'react-native';

interface LottieWithPathProps {
  source: any; // 动画 json
  imageAssetsFolder: string; // android 需要
  style: any;
  state: string; // play
  duration: number; // 自定义动画时长
  onAnimationFinish?: () => void;
}
const LottieWithPath = (props: LottieWithPathProps) => {
  const animationRef = useRef<any>(null);
  const progress = new Animated.Value(0);

  useEffect(() => {
    if (props.state === 'play') {
      if (props.duration) {
        Animated.timing(progress, {
          toValue: 1,
          duration: props.duration,
          easing: Easing.linear,
          useNativeDriver: true, // 启用原生动画驱动
        }).start(() => {
          progress.setValue(0);
        });
      } else {
        animationRef.current.play();
      }
    }
  }, [props.state]);

  return (
    <LottieView
      ref={animationRef}
      source={props.source}
      imageAssetsFolder={props.imageAssetsFolder}
      loop={false}
      progress={progress}
      style={props.style}
      onAnimationFinish={props.onAnimationFinish}
    />
  );
};

export default React.memo(LottieWithPath);

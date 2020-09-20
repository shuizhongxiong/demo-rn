import React, {useState, useRef} from 'react';
import {View, Image, PanResponder} from 'react-native';
import BoomView from './boom-view';

const BtnImg0 = require('./images/img_0.png');
const BtnImg1 = require('./images/img_1.png');

interface LikeButtonProps {
  width: number;
  height: number;
  active: boolean;
  onActiveChange: (value: boolean) => void;
}
const LikeButton = (props: LikeButtonProps) => {
  const btnRef = useRef<any>(null);
  const [startPos, setStartPos] = useState({x: 0, y: 0});
  const [boomState, setBoomState] = useState('');

  const panResponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    // 响应触摸事件
    onPanResponderGrant: () => {
      const currentActive = !props.active;
      props.onActiveChange(currentActive);
      if (currentActive) {
        setBoomState('start');
      }
    },
    // 触摸操作结束时触发
    onPanResponderRelease: () => {
      setBoomState('finish');
    },
  });

  return (
    <View {...panResponder.panHandlers}>
      <View
        ref={btnRef}
        style={{width: props.width, height: props.height}}
        onLayout={() => {
          btnRef.current.measureInWindow(
            (x: number, y: number, width: number, height: number) => {
              setStartPos({x: x + width / 2, y: y + height / 2});
            },
          );
        }}>
        <Image
          resizeMode="cover"
          style={{width: props.width, height: props.height}}
          source={props.active ? BtnImg0 : BtnImg1}
        />
      </View>
      <BoomView startPos={startPos} boomState={boomState} />
    </View>
  );
};

export default LikeButton;

import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  PanResponder,
  GestureResponderEvent,
  StyleSheet,
  Modal,
} from 'react-native';
import useUpdateEffect from '~/utils/hooks/useUpdateEffect';
import BoomView from './boom-view';

const BtnImg0 = require('./images/img_0.png');
const BtnImg1 = require('./images/img_1.png');

interface LikeButtonProps {
  width: number;
  height: number;
  active: boolean;
  onActiveChange: (value: boolean) => void;
  prefixChildren: React.ReactNode;
  suffixChildren: React.ReactNode;
  containerStyle?: any;
  buttonStyle?: any;
}
const LikeButton = (props: LikeButtonProps) => {
  const timerRef = useRef<any>(null);
  const [isPress, setIsPress] = useState(false);
  const [startPos, setStartPos] = useState([0, 0]);
  const [boomState, setBoomState] = useState('');

  useUpdateEffect(() => {
    if (props.active) {
      setBoomState('start');
    }
  }, [props.active]);

  // 300ms 后触摸仍未结束，则执行长按
  useUpdateEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    if (boomState === 'start') {
      timerRef.current = setTimeout(() => {
        if (boomState === 'start' && isPress) {
          setBoomState('continue');
        }
      }, 300);
    }
  }, [boomState]);

  const panResponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponderCapture: () => false,

    onPanResponderGrant: (event: GestureResponderEvent) => {
      // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
      // 防止重复点击
      if (isPress) {
        return;
      }
      // 通知父组件更新状态
      if (props.onActiveChange) {
        props.onActiveChange(!props.active);
      }
      setIsPress(true);
      setStartPos([event.nativeEvent.pageX, event.nativeEvent.pageY]);
    },
    onPanResponderTerminationRequest: () => true,
    // 触摸操作结束时触发
    onPanResponderRelease: () => {
      // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
      // 一般来说这意味着一个手势操作已经成功完成。
      setIsPress(false);
      setBoomState('finish');
    },
    onPanResponderTerminate: () => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      setIsPress(false);
      setBoomState('finish');
    },
  });

  return (
    <View {...panResponder.panHandlers}>
      <View
        style={[
          styles.container,
          !!props.containerStyle && props.containerStyle,
        ]}>
        {!!props.prefixChildren && props.prefixChildren}
        <View
          style={[
            !!props.buttonStyle && props.buttonStyle,
            {width: props.width, height: props.height},
          ]}>
          <Image
            resizeMode="cover"
            style={{width: props.width, height: props.height}}
            source={props.active ? BtnImg0 : BtnImg1}
          />
        </View>
        {!!props.suffixChildren && props.suffixChildren}
      </View>
      <Modal
        visible={boomState === 'continue'}
        transparent={true}
        animationType="none"
        hardwareAccelerated={true}
      />
      <BoomView startPos={startPos} boomState={boomState} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default LikeButton;

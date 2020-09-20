/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, Easing, View, Vibration} from 'react-native';
import {Portal} from '@ant-design/react-native';
import useUpdateEffect from '~/utils/hooks/useUpdateEffect';
import useTimeout from '~/utils/hooks/useTimeout';
import BoomCount from './boom-count';

const WinWidth = Dimensions.get('screen').width;
const WinHeight = Dimensions.get('screen').height;

// 爆炸元素图片
const BoomImages = [
  require('./images/action/action_0.png'),
  require('./images/action/action_1.png'),
  require('./images/action/action_2.png'),
  require('./images/action/action_3.png'),
  require('./images/action/action_4.png'),
];
const BoomImagesSize = 36; // 图片的宽高
const BoomGroupMax = 6; // 初始化最多生成 6 组

const ParabolaA = 0.001; // 值越小，抛物线越平缓
const posXMax = WinWidth / 1 - BoomImagesSize; // 无论点在哪里，x 轴最大范围是屏幕宽度 - 动画图片尺寸
const posYMax = WinHeight / 3 - BoomImagesSize; // 无论点在哪里，y 轴最大范围是三分之一屏幕高度 - 动画图片尺寸
const AnimatedDuration = 450; // 动画时长
const vibrateDuration = 200; // 震动时长
const FramesStep = 60; // 默认每 60ms 生成一帧，帧数越小抛物线越平滑，但计算量越大
let AnimatedTimer: any = null; // 长按动画计时器

// 计算随机终点
const getEndPos = (startPos: BoomViewProps['startPos']) => {
  const startX = startPos.x;
  const startY = startPos.y;
  const leftMax = Math.min(startX, posXMax);
  const rightMax = Math.min(WinWidth - startX, posXMax);
  const upMax = Math.min(startY, posYMax);
  const bottomMax = Math.min(WinHeight - startY, posYMax);

  const minDistanceX = WinWidth / 5;
  const minDistanceY = WinHeight / 5;
  let randomList = [];
  if (startY <= minDistanceY) {
    // 顶部
    if (startX <= minDistanceX) {
      // 左侧，集中第四象限
      randomList = [0.1, 0.2, 0.3];
    } else if (WinWidth - startX <= minDistanceX) {
      // 右侧，集中第三象限
      randomList = [0.1, 0.2, 0.9];
    } else {
      // 中间，集中第三、四象限
      randomList = [0.1, 0.2, 0.6];
    }
  } else if (WinHeight - startY <= minDistanceY) {
    // 底部
    if (startX <= minDistanceX) {
      // 左侧，集中第一象限
      randomList = [0.7, 0.8, 0.9];
    } else if (WinWidth - startX <= minDistanceX) {
      // 右侧，集中第二象限
      randomList = [0.1, 0.8, 0.9];
    } else {
      // 中间，集中第一、二象限
      randomList = [0.4, 0.8, 0.9];
    }
  } else {
    // 中间
    if (startX <= minDistanceX) {
      // 左侧，集中第一、四象限
      randomList = [0.4, 0.5, 0.6];
    } else if (WinWidth - startX <= minDistanceX) {
      // 右侧，集中第二、三象限
      randomList = [0.1, 0.5, 0.9];
    } else {
      // 中间，集中第一、二、三、四象限
      randomList = [0.25, 0.5, 0.75];
    }
  }

  // 随机象限，y 轴是反的
  const random = Math.random();
  const minRandom = BoomImagesSize;
  if (random <= randomList[0]) {
    // 第一象限
    return [getRandom(minRandom, rightMax), -getRandom(minRandom, upMax)];
  } else if (random <= randomList[1]) {
    // 第二象限
    return [-getRandom(minRandom, leftMax), -getRandom(minRandom, upMax)];
  } else if (random <= randomList[2]) {
    // 第三象限
    return [-getRandom(minRandom, leftMax), getRandom(minRandom, bottomMax)];
  } else {
    // 第四象限
    return [getRandom(minRandom, rightMax), getRandom(minRandom, bottomMax)];
  }
};
const getRandom = (start: number, end: number) => {
  return ~~(Math.random() * (end - start + 1) + start);
};

// 计算抛物线轨迹，公式：y = a*x*x + b*x + c
const parabola = ({
  x1 = 0, // x 轴起点
  y1 = 0, // y 轴起点
  x2 = 0, // x 轴终点
  y2 = 0, // y 轴终点
  duration = AnimatedDuration, // 动画时长
  a = ParabolaA, // 值越小，抛物线越平缓
  startTime = 0,
}) => {
  const diffX = x2 - x1;
  const diffY = y2 - y1;
  const speedX = diffX / duration;
  const b = (diffY - a * diffX * diffX) / diffX;
  const frames = [];
  const times = [];
  const step = FramesStep;

  for (let i = 0; i <= duration; i += step) {
    const x = x1 + speedX * i;
    const y = y1 + a * x * x + b * x;
    frames.push({x, y}); // 每一帧动画的位置，即 outputRange
    times.push(startTime + i); // 每一帧动画应该对应的时间，即 inputRange
  }

  return {frames, times}; // 包含每帧的(x, y), time
};

interface BoomViewProps {
  startPos: {x: number; y: number};
  boomState: string; // 'start' | 'finish'
}
const BoomView = (props: BoomViewProps) => {
  const [isInit, setIsInit] = useState<boolean>(true);
  useUpdateEffect(() => {
    if (isInit) {
      setIsInit(false);
      initBooms();
    }
    startBoom();
  }, [props.boomState]);

  const [timer, setTimer] = useState<null | number>(null);
  useTimeout(() => {
    if (timer) {
      setTimer(null);
    }
    startBoom();
  }, timer);

  const [boomsView, setBoomsView] = useState<any[]>([]);
  const [boomsFrame, setBoomsFrame] = useState<any>({});
  const [boomsCount, setBoomsCount] = useState<number>(0);

  // 生成所有动画元素，及动画帧
  const initBooms = () => {
    const viewList = [];
    const frameObj: any = {};
    for (let index = 0; index < BoomGroupMax; index++) {
      const imgList = [];
      for (const [i, image] of BoomImages.entries()) {
        const key = index * BoomImages.length + i;
        imgList.push({
          key, // 单个动画元素唯一 key
          image, // 图片连接
        });
        frameObj[key] = null;
      }
      viewList.push(imgList);
    }
    setBoomsView(viewList);
    setBoomsFrame(frameObj);
  };

  // 生成动画元素配置，并开始爆炸动画
  const startBoom = () => {
    if (props.boomState !== 'start') {
      if (AnimatedTimer) {
        cancelAnimationFrame(AnimatedTimer);
        AnimatedTimer = null;
      }
      setBoomsCount(0);
      return;
    }

    // 长按情况下，自动开始下次动画
    AnimatedTimer = requestAnimationFrame(startBoom);

    // 点击震动
    // Vibration.vibrate(vibrateDuration);

    setBoomsFrame((prev) => {
      const cur = {...prev};
      const count = BoomImages.length;
      const max = BoomImages.length * BoomGroupMax;
      const startIndex = Object.values(cur).findIndex((d) => d === null);
      if (startIndex + count > max) {
        return cur;
      }

      const animates = [];
      for (let index = startIndex; index < startIndex + count; index++) {
        const posAnimated = new Animated.ValueXY({x: 0, y: 0}); // 单个动画元素的动画位置，默认 0,0 起始点
        const opacityAnimated = new Animated.Value(0);
        animates.push(
          Animated.timing(posAnimated, {
            toValue: {x: AnimatedDuration, y: AnimatedDuration}, // 动画插值的终点，即 inputRange
            duration: AnimatedDuration, // 动画持续时间
            easing: Easing.linear, // 缓动类型，匀速
            useNativeDriver: true, // 启用原生动画驱动
          }),
        );
        animates.push(
          Animated.timing(opacityAnimated, {
            toValue: AnimatedDuration,
            duration: AnimatedDuration,
            easing: Easing.linear, // 缓动类型，匀速
            useNativeDriver: true, // 启用原生动画驱动
          }),
        );

        const endPos = getEndPos(props.startPos);
        const res = parabola({
          x2: endPos[0],
          y2: endPos[1],
          duration: AnimatedDuration,
        });
        cur[index] = {
          pos: posAnimated,
          opacity: opacityAnimated,
          frames: res.frames, // 即 outputRange
          times: res.times, // 即 inputRange
          duration: AnimatedDuration,
        };
      }

      // 开始此次所有动画
      Animated.parallel(animates).start(() => {
        // 动画停止清空数据
        setBoomsFrame((prev1) => {
          const cur1 = {...prev1};
          for (let index = startIndex; index < startIndex + count; index++) {
            cur1[index] = null;
          }
          return cur1;
        });
      });
      return cur;
    });

    setBoomsCount((prev) => prev + 1);
  };

  const [boomImageStyle, setBoomImageStyle] = useState<any>({});
  const [boomTxtStyle, setBoomTxtStyle] = useState<any>({});
  // 计数组件位置样式，初始化计算一遍即可
  useEffect(() => {
    if (props.startPos) {
      setBoomImageStyle({
        position: 'absolute',
        top: props.startPos.y - BoomImagesSize / 2,
        left: props.startPos.x - BoomImagesSize / 2,
        width: BoomImagesSize,
        height: BoomImagesSize,
      });

      const style: any = {position: 'absolute'};
      const startX = props.startPos.x;
      const startY = props.startPos.y;
      const centerPos = [WinWidth / 2, WinHeight / 2];
      if (startX <= centerPos[0]) {
        style.left = startX;
      } else {
        style.right = Math.max(WinWidth - startX - 35, 0);
      }
      style.top = Math.max(startY - 80, 0);
      setBoomTxtStyle(style);
    }
  }, [props.startPos]);

  return (
    <Portal>
      <View pointerEvents={'none'}>
        {boomsView.length > 0 &&
          boomsView.map((d) =>
            d.map((dd) => (
              <Animated.Image
                key={dd.key}
                source={dd.image}
                resizeMode="cover"
                style={[
                  boomImageStyle,
                  boomsFrame[dd.key]
                    ? {
                        transform: [
                          {
                            translateX: boomsFrame[dd.key].pos.x.interpolate({
                              inputRange: boomsFrame[dd.key].times,
                              outputRange: boomsFrame[dd.key].frames.map(
                                (ddd) => ddd.x,
                              ),
                            }),
                            translateY: boomsFrame[dd.key].pos.y.interpolate({
                              inputRange: boomsFrame[dd.key].times,
                              outputRange: boomsFrame[dd.key].frames.map(
                                (ddd) => ddd.y,
                              ),
                            }),
                          },
                        ],
                        opacity: boomsFrame[dd.key].opacity.interpolate({
                          inputRange: [
                            0,
                            10,
                            boomsFrame[dd.key].duration - 100, // 开始隐藏
                            boomsFrame[dd.key].duration,
                          ],
                          outputRange: [0, 1, 1, 0],
                        }),
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            )),
          )}
        <View style={boomTxtStyle}>
          {boomsCount > 1 && <BoomCount count={boomsCount} />}
        </View>
      </View>
    </Portal>
  );
};

export default React.memo(BoomView);

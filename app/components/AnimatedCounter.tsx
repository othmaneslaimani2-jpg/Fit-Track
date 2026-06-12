import React, { useEffect } from 'react';
import { TextInput, StyleSheet, TextStyle, StyleProp } from 'react-native';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface AnimatedCounterProps {
  value: number;
  style?: StyleProp<TextStyle>;
  duration?: number;
}

export default function AnimatedCounter({ 
  value, 
  style, 
  duration = 1000 
}: AnimatedCounterProps) {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, {
      duration,
      easing: Easing.out(Easing.poly(4)),
    });
  }, [value, duration]);

  const animatedProps = useAnimatedProps(() => {
    const val = Math.round(animatedValue.value);
    let str = val.toString();
    

    let res = '';
    let count = 0;
    for (let i = str.length - 1; i >= 0; i--) {
      if (count === 3 && str[i] !== '-') {
        res = ',' + res;
        count = 0;
      }
      res = str[i] + res;
      count++;
    }

    return {
      text: res,
      defaultValue: res,
    } as any;
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      style={[styles.text, style]}
      animatedProps={animatedProps}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    padding: 0,
    margin: 0,
  },
});

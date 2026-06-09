import React, { useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import { View } from "react-native";
import Animated, { useSharedValue, useAnimatedProps, withTiming, withDelay, Easing } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
    radius?: number;
    strokeWidth?: number;
    progress: number;
    color?: string;
    children?: React.ReactNode;
} 
export default function ProgressRing({
    radius = 60,
    strokeWidth = 12,
    progress = 0.75,
    color = '#70e000',
    children,
}: ProgressRingProps) {
    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;
    const animatedProgress = useSharedValue(0);

    useEffect(()=> {
        animatedProgress.value = withDelay(
            300, withTiming(progress, {duration: 1500,
                easing:Easing.out(Easing.exp)
            })
        );
    }, [progress]);
const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (circumference * animatedProgress.value);
    return { strokeDashoffset };
});
return (
    <View style={{ width: radius * 2, height: radius *2, justifyContent: 'center', alignItems: 'center' }}>
        <Svg width={radius * 2} height={radius * 2} style={{ position: 'absolute' }}>
        
        
        <Circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          stroke="#1e2428" 
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        
        <AnimatedCircle
          cx={radius}
          cy={radius}
          r={innerRadius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round" 
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </Svg>
      {children}
    </View>
);
}
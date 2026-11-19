import React, { useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';

// Entrada suave (fade + subida leve) ao trocar de tela.
export default function FadeIn({ children }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 260, useNativeDriver: Platform.OS !== 'web' }).start();
  }, [anim]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });
  return <Animated.View style={{ opacity: anim, transform: [{ translateY }] }}>{children}</Animated.View>;
}

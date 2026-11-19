import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Animated, Platform, StyleSheet } from 'react-native';
import { mostrarAlerta } from '../utils/alerta';
import { colors, spacing, radius, shadow } from '../theme/theme';

const RECOLHER_APOS_MS = 6000; // recolhe sozinho se o cliente não tocar no número

// Botão fixo na base da tela. Recolhido: só o ícone. Ao tocar no ícone, mostra o número;
// tocar no número abre o WhatsApp.
export default function EntregaFlutuante({ telefone, link }) {
  const [aberto, setAberto] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  // Animação de entrada da pílula (fade + deslize) e recolhimento automático.
  useEffect(() => {
    if (!aberto) {
      anim.setValue(0);
      return undefined;
    }
    Animated.timing(anim, { toValue: 1, duration: 220, useNativeDriver: Platform.OS !== 'web' }).start();
    const timer = setTimeout(() => setAberto(false), RECOLHER_APOS_MS);
    return () => clearTimeout(timer);
  }, [aberto, anim]);

  const abrirWhatsApp = async () => {
    setAberto(false);
    try {
      await Linking.openURL(link);
    } catch (e) {
      mostrarAlerta('Não foi possível abrir o WhatsApp', `Chame manualmente no número ${telefone}.`);
    }
  };

  const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });

  return (
    <View style={styles.container} pointerEvents="box-none">
      {aberto && (
        <Animated.View style={{ opacity: anim, transform: [{ translateX }] }}>
          <TouchableOpacity
            style={styles.pilula}
            onPress={abrirWhatsApp}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`Pedir pelo WhatsApp: ${telefone}`}
          >
            <Text style={styles.numero}>{telefone}</Text>
            <Text style={styles.subtitulo}>Entregamos na sua casa!</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <TouchableOpacity
        onPress={() => setAberto((v) => !v)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={aberto ? 'Recolher contato' : 'Mostrar contato para pedir'}
      >
        <Image source={require('../../assets/images/telefone.png')} style={styles.icone} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', right: spacing.md, bottom: spacing.lg,
    flexDirection: 'row', alignItems: 'center',
  },
  pilula: {
    backgroundColor: colors.red, borderRadius: radius.md, paddingVertical: spacing.sm,
    paddingLeft: spacing.md, paddingRight: 40, marginRight: -32, ...shadow,
  },
  numero: { color: colors.white, fontSize: 18, fontWeight: '800' },
  subtitulo: { color: colors.yellow, fontSize: 12, fontWeight: '600' },
  icone: { width: 56, height: 56, borderRadius: 28, borderWidth: 3, borderColor: colors.red, ...shadow },
});

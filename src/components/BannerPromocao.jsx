import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';
import { formatarPreco } from '../data/produtos';

export default function BannerPromocao({ titulo, descricao, preco }) {
  return (
    <ImageBackground
      source={require('../../assets/images/promocao.jpg')}
      style={styles.banner}
      imageStyle={styles.imagem}
    >
      <View style={styles.overlay}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
        <View style={styles.selo}>
          <Text style={styles.preco}>{formatarPreco(preco)}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: { height: 190, marginHorizontal: spacing.md, borderRadius: radius.lg, ...shadow, backgroundColor: colors.red },
  imagem: { borderRadius: radius.lg },
  overlay: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
    borderRadius: radius.lg,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  titulo: {
    color: colors.white, fontSize: 38, fontWeight: '900',
    textShadowColor: colors.red, textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 4,
  },
  descricao: {
    color: colors.white, fontSize: 20, fontWeight: '700',
    textShadowColor: colors.red, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4,
  },
  selo: {
    alignSelf: 'flex-end', backgroundColor: colors.yellow,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 2, borderRadius: radius.pill,
  },
  preco: { color: colors.red, fontSize: 24, fontWeight: '900' },
});

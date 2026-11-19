import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Platform, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';

const ABAS = [
  { chave: 'lanches', rotulo: 'Lanches' },
  { chave: 'sobre', rotulo: 'Sobre Nós' },
  { chave: 'contato', rotulo: 'Contato' },
];

export default function Header({ telaAtiva, onNavegar, qtdCarrinho = 0 }) {
  // O selo do carrinho "pulsa" sempre que a quantidade muda.
  const escala = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (qtdCarrinho === 0) return;
    const nativo = Platform.OS !== 'web';
    Animated.sequence([
      Animated.timing(escala, { toValue: 1.5, duration: 120, useNativeDriver: nativo }),
      Animated.timing(escala, { toValue: 1, duration: 120, useNativeDriver: nativo }),
    ]).start();
  }, [qtdCarrinho, escala]);

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.titulo}>André Lanches</Text>

        <TouchableOpacity style={styles.icone} onPress={() => onNavegar('pedidos')}
          accessibilityLabel="Meus pedidos" activeOpacity={0.7}>
          <Text style={styles.iconeTexto}>🧾</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icone} onPress={() => onNavegar('carrinho')}
          accessibilityLabel="Carrinho" activeOpacity={0.7}>
          <Text style={styles.iconeTexto}>🛒</Text>
          {qtdCarrinho > 0 && (
            <Animated.View style={[styles.badge, { transform: [{ scale: escala }] }]}>
              <Text style={styles.badgeTexto}>{qtdCarrinho}</Text>
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.menu}>
        {ABAS.map((aba) => {
          const ativa = aba.chave === telaAtiva;
          return (
            <TouchableOpacity
              key={aba.chave}
              style={[styles.aba, ativa && styles.abaAtiva]}
              onPress={() => onNavegar(aba.chave)}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityState={{ selected: ativa }}
            >
              <Text style={[styles.abaTexto, ativa && styles.abaTextoAtivo]}>{aba.rotulo}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    ...shadow,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  logo: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.white },
  titulo: { flex: 1, color: colors.white, fontSize: 22, fontWeight: '800', marginLeft: spacing.sm },
  icone: {
    width: 40, height: 40, borderRadius: 20, marginLeft: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
  },
  iconeTexto: { fontSize: 18 },
  badge: {
    position: 'absolute', top: -4, right: -4, minWidth: 20, height: 20, borderRadius: 10,
    backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
  },
  badgeTexto: { color: colors.red, fontSize: 12, fontWeight: '900' },
  menu: { flexDirection: 'row', justifyContent: 'space-between' },
  aba: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 3,
    borderRadius: radius.pill,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  abaAtiva: { backgroundColor: colors.white },
  abaTexto: { color: colors.white, fontWeight: '600', fontSize: 14 },
  abaTextoAtivo: { color: colors.red, fontWeight: '800' },
});

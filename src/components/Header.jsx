import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';

const ABAS = [
  { chave: 'lanches', rotulo: 'Lanches' },
  { chave: 'sobre', rotulo: 'Sobre Nós' },
  { chave: 'contato', rotulo: 'Contato' },
];

export default function Header({ telaAtiva, onNavegar }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.titulo}>André Lanches</Text>
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
  titulo: { color: colors.white, fontSize: 24, fontWeight: '800', marginLeft: spacing.sm },
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

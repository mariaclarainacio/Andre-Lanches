import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';
import { formatarPreco } from '../data/produtos';

function CardProduto({ item }) {
  return (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.foto} />
      <Text style={styles.nome} numberOfLines={1}>{item.nome}</Text>
      <Text style={styles.descricao} numberOfLines={3}>{item.descricao}</Text>
      <Text style={styles.preco}>{formatarPreco(item.preco)}</Text>
    </View>
  );
}

export default function ListaProdutos({ produtos }) {
  return (
    <View style={styles.secao}>
      <Text style={styles.titulo}>Nossos Lanches</Text>
      <View style={styles.grade}>
        {produtos.map((p) => (
          <CardProduto key={p.id} item={p} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { paddingHorizontal: spacing.md, marginTop: spacing.lg },
  titulo: { color: colors.red, fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: spacing.md },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%', backgroundColor: colors.white, borderRadius: radius.md,
    padding: spacing.sm + 2, marginBottom: spacing.md, alignItems: 'center', ...shadow,
  },
  foto: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: colors.red, marginBottom: spacing.sm },
  nome: { color: colors.red, fontWeight: '800', fontSize: 16 },
  descricao: { color: colors.muted, fontSize: 12, textAlign: 'center', marginVertical: spacing.xs, minHeight: 48 },
  preco: { color: colors.text, fontWeight: '800', fontSize: 17 },
});

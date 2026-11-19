import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';
import { formatarPreco } from '../data/produtos';
import { formatarDataHora } from '../utils/alerta';
import { ETAPAS, CANCELADO } from '../hooks/usePedidos';

const rotuloStatus = (s) => (s === CANCELADO ? 'Cancelado' : ETAPAS[s]);
const corStatus = (s) => (s === CANCELADO ? '#B8001A' : s === ETAPAS.length - 1 ? '#2E9E4F' : '#C98A00');

export default function MeusPedidos({ pedidos, onAbrir, onIrCardapio, onLimpar }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus pedidos</Text>
      {pedidos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioEmoji}>🧾</Text>
          <Text style={styles.sub}>Você ainda não fez nenhum pedido.</Text>
          <TouchableOpacity style={styles.botao} onPress={onIrCardapio}>
            <Text style={styles.botaoTxt}>Ver cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        pedidos.map((p) => (
          <TouchableOpacity key={p.id} style={styles.card} onPress={() => onAbrir(p.id)} activeOpacity={0.8}>
            <View style={styles.linha}>
              <Text style={styles.nome}>Pedido #{p.id}</Text>
              <Text style={styles.valor}>{formatarPreco(p.total)}</Text>
            </View>
            <View style={styles.linha}>
              <Text style={styles.data}>{formatarDataHora(p.criadoEm)}</Text>
              <View style={[styles.badge, { backgroundColor: corStatus(p.status) }]}>
                <Text style={styles.badgeTxt}>{rotuloStatus(p.status)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
      {pedidos.some((p) => p.status === CANCELADO || p.status === ETAPAS.length - 1) && (
        <TouchableOpacity style={styles.limpar} onPress={onLimpar}>
          <Text style={styles.limparTxt}>Limpar histórico</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md },
  titulo: { color: colors.red, fontSize: 28, fontWeight: '900', textAlign: 'center', marginBottom: spacing.md },
  vazio: { alignItems: 'center', padding: spacing.lg },
  vazioEmoji: { fontSize: 56, marginBottom: spacing.sm },
  sub: { color: colors.muted, marginBottom: spacing.md },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, ...shadow },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2 },
  nome: { color: colors.text, fontWeight: '800', fontSize: 16 },
  valor: { color: colors.text, fontWeight: '800', fontSize: 16 },
  data: { color: colors.muted, fontSize: 13 },
  badge: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3 },
  badgeTxt: { color: colors.white, fontSize: 12, fontWeight: '800' },
  limpar: { alignItems: 'center', padding: spacing.md },
  limparTxt: { color: colors.muted, fontWeight: '700' },
  botao: { backgroundColor: colors.red, borderRadius: radius.pill, paddingVertical: 14, paddingHorizontal: spacing.lg },
  botaoTxt: { color: colors.white, fontWeight: '800', fontSize: 16 },
});

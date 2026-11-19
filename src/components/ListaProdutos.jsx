import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';
import { formatarPreco } from '../data/produtos';
import { CATEGORIAS, CATEGORIA_DO_PRODUTO } from '../data/categorias';

// Remove acentos e maiúsculas para a busca ("pao" encontra "Pão")
const normalizar = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function CardProduto({ item, qtd, onAdd, onRemove }) {
  return (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.foto} />
      <Text style={styles.nome} numberOfLines={1}>{item.nome}</Text>
      <Text style={styles.descricao} numberOfLines={3}>{item.descricao}</Text>
      <Text style={styles.preco}>{formatarPreco(item.preco)}</Text>

      {qtd > 0 ? (
        <View style={styles.stepper}>
          <TouchableOpacity style={styles.stepBtn} onPress={() => onRemove(item.id)}>
            <Text style={styles.stepTxt}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtd}>{qtd}</Text>
          <TouchableOpacity style={styles.stepBtn} onPress={() => onAdd(item.id)}>
            <Text style={styles.stepTxt}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.botaoAdd} onPress={() => onAdd(item.id)} activeOpacity={0.8}>
          <Text style={styles.botaoAddTxt}>Adicionar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function ListaProdutos({ produtos, carrinho = {}, onAdd, onRemove }) {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const filtrados = produtos.filter((p) => {
    const naCategoria = categoria === 'Todos' || CATEGORIA_DO_PRODUTO[p.id] === categoria;
    const naBusca = normalizar(p.nome).includes(normalizar(busca.trim()));
    return naCategoria && naBusca;
  });

  return (
    <View style={styles.secao}>
      <Text style={styles.titulo}>Nossos Lanches</Text>

      <TextInput
        style={styles.busca}
        value={busca}
        onChangeText={setBusca}
        placeholder="🔍 Buscar no cardápio"
        placeholderTextColor={colors.muted}
        returnKeyType="search"
      />

      <View style={styles.chips}>
        {CATEGORIAS.map((c) => (
          <TouchableOpacity key={c} style={[styles.chip, categoria === c && styles.chipAtivo]} onPress={() => setCategoria(c)}>
            <Text style={[styles.chipTxt, categoria === c && styles.chipTxtAtivo]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtrados.length === 0 ? (
        <Text style={styles.nada}>Nenhum item encontrado. 🍔</Text>
      ) : (
        <View style={styles.grade}>
          {filtrados.map((p) => (
            <CardProduto key={p.id} item={p} qtd={carrinho[p.id] ? carrinho[p.id].qtd : 0} onAdd={onAdd} onRemove={onRemove} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { paddingHorizontal: spacing.md, marginTop: spacing.lg },
  titulo: { color: colors.red, fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: spacing.md },
  busca: { backgroundColor: colors.white, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 10, fontSize: 15, color: colors.text, marginBottom: spacing.sm, ...shadow },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md },
  chip: { paddingVertical: 7, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.yellowSoft, borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm, marginBottom: spacing.xs },
  chipAtivo: { backgroundColor: colors.red, borderColor: colors.red },
  chipTxt: { color: colors.red, fontWeight: '700' },
  chipTxtAtivo: { color: colors.white },
  nada: { textAlign: 'center', color: colors.muted, marginVertical: spacing.lg, fontSize: 16 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%', backgroundColor: colors.white, borderRadius: radius.md,
    padding: spacing.sm + 2, marginBottom: spacing.md, alignItems: 'center', ...shadow,
  },
  foto: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: colors.red, marginBottom: spacing.sm },
  nome: { color: colors.red, fontWeight: '800', fontSize: 16 },
  descricao: { color: colors.muted, fontSize: 12, textAlign: 'center', marginVertical: spacing.xs, minHeight: 48 },
  preco: { color: colors.text, fontWeight: '800', fontSize: 17, marginBottom: spacing.sm },
  botaoAdd: { backgroundColor: colors.red, borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: spacing.md },
  botaoAddTxt: { color: colors.white, fontWeight: '800', fontSize: 14 },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },
  stepTxt: { color: colors.red, fontSize: 20, fontWeight: '900', lineHeight: 22 },
  qtd: { minWidth: 36, textAlign: 'center', color: colors.text, fontWeight: '800', fontSize: 16 },
});

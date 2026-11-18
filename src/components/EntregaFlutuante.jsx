import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Alert, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';

export default function EntregaFlutuante({ telefone, link }) {
  const ligar = async () => {
    try {
      await Linking.openURL(link);
    } catch (e) {
      Alert.alert('Não foi possível ligar', `Ligue manualmente para ${telefone}.`);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={ligar} activeOpacity={0.85}
      accessibilityRole="button" accessibilityLabel={`Ligar para ${telefone}`}>
      <View style={styles.pilula}>
        <Text style={styles.numero}>{telefone}</Text>
        <Text style={styles.subtitulo}>Entregamos na sua casa!</Text>
      </View>
      <Image source={require('../../assets/images/telefone.png')} style={styles.icone} />
    </TouchableOpacity>
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
  icone: { width: 64, height: 64, borderRadius: 32, borderWidth: 3, borderColor: colors.red, ...shadow },
});

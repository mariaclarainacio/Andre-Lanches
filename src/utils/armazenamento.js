import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIXO = '@andre-lanches:';

// Lê um valor salvo (JSON). Retorna null se não existir ou se der erro.
export async function carregar(chave) {
  try {
    const texto = await AsyncStorage.getItem(PREFIXO + chave);
    return texto ? JSON.parse(texto) : null;
  } catch (e) {
    return null;
  }
}

export async function salvar(chave, valor) {
  try {
    await AsyncStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch (e) {
    // sem armazenamento: o app continua funcionando, só não persiste
  }
}

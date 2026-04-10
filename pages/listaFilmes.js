import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Keyboard,
} from 'react-native';

const MovieCard = ({ item, onRemove }) => {
    const [imgError, setImgError] = useState(false);

    const imageUri = (imgError || !item.imagem)
        ? 'https://via.placeholder.com/150x220/333/FFF?text=Sem+Capa'
        : item.imagem;

    return (
        <View style={styles.itemLista}>
            <Image
                source={{ uri: imageUri }}
                style={styles.capaFilme}
                resizeMode="cover"
                onError={() => setImgError(true)}
            />

            <View style={styles.infoFilme}>
                <Text style={styles.textoItem} numberOfLines={2}>
                    {item.texto}
                </Text>

                <TouchableOpacity
                    onPress={() => onRemove(item.id, item.texto)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.textoBotaoRemover}>Remover do Catálogo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function ListaFilmes() {
    const [novaFilmeSerie, setNovaFilmeSerie] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [listaFilmeSerie, setListaFilmeSerie] = useState([]);

    const adicionarFilmeSerie = () => {
        if (!novaFilmeSerie.trim()) {
            Alert.alert('Ops!', 'O nome do filme ou série é obrigatório.');
            return;
        }

        const novoItem = {
            id: Date.now().toString(),
            texto: novaFilmeSerie.trim(),
            imagem: urlImagem.trim() !== '' ? urlImagem.trim() : null,
        };

        setListaFilmeSerie((prev) => [novoItem, ...prev]);
        setNovaFilmeSerie('');
        setUrlImagem('');
        Keyboard.dismiss();
    };

    const removerFilmeSerie = (id, titulo) => {
        Alert.alert('Remover Item', `Deseja realmente remover "${titulo}"?`, [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Remover',
                style: 'destructive',
                onPress: () => {
                    setListaFilmeSerie((prev) => prev.filter((item) => item.id !== id));
                },
            },
        ]);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.titulo}>Movly</Text>
                <Text style={styles.subtitulo}>Guarde seus filmes preferidos!</Text>
            </View>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do filme/série"
                    placeholderTextColor="#888"
                    value={novaFilmeSerie}
                    onChangeText={setNovaFilmeSerie}
                />

                <TextInput
                    style={styles.input}
                    placeholder="URL da imagem (jpg, png...)"
                    placeholderTextColor="#888"
                    value={urlImagem}
                    onChangeText={setUrlImagem}
                    autoCapitalize="none"
                    keyboardType="url"
                />

                <TouchableOpacity
                    style={styles.botaoAdicionar}
                    onPress={adicionarFilmeSerie}
                >
                    <Text style={styles.textoBotaoAdicionar}>ADICIONAR</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={listaFilmeSerie}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MovieCard item={item} onRemove={removerFilmeSerie} />
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.containerVazio}>
                        <Text style={styles.textoVazio}>Seu catálogo está vazio!</Text>
                    </View>
                )}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F0F',
        paddingHorizontal: 20,
    },
    header: {
        marginTop: 50,
        marginBottom: 20,
        alignItems: 'center',
    },
    titulo: {
        fontSize: 40,
        fontWeight: '900',
        color: '#7E0709',
        letterSpacing: 2,
    },
    subtitulo: {
        color: '#888',
        fontSize: 14,
    },
    inputArea: {
        marginBottom: 25,
    },
    input: {
        backgroundColor: '#1A1A1A',
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#FFF',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    botaoAdicionar: {
        backgroundColor: '#7E0709',
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        elevation: 6,
    },
    textoBotaoAdicionar: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemLista: {
        flexDirection: 'row',
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#222',
    },
    capaFilme: {
        width: 90,
        height: 130,
        backgroundColor: '#222',
    },
    infoFilme: {
        flex: 1,
        padding: 15,
        justifyContent: 'space-between',
    },
    textoItem: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    textoBotaoRemover: {
        color: '#FF453A',
        fontSize: 13,
        marginTop: 10,
    },
    containerVazio: {
        marginTop: 50,
        alignItems: 'center',
    },
    textoVazio: {
        color: '#666',
        fontSize: 16,
    },
});

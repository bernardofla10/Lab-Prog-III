// Crie um app que permite tirar várias fotos com a câmera do dispositivo e exibir todas as fotos capturadas em uma galeria logo abaixo.
// Requisitos Funcionais:
// - O usuário deve conseguir alternar entre câmera frontal e traseira
// - O app deve pedir permissão para acessar a câmera usando useCameraPermissions
// - Ao clicar no botão de capturar a imagem deve ser adicionada a uma lista de fotos tiradas
// - Todas as fotos capturadas devem ser exibidas em uma galeria com rolagem horizontal (ScrollView)

import { useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView, // ScrollView entrou para criar a galeria horizontal.
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const cameraRef = useRef(null);
  const [photos, setPhotos] = useState([]); // antes, havia um estado para várias fotos (photoUri), agora é um array que guarda todas as fotos capturadas (começa vazio []).
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          O app precisa da sua permissão para utilizar a câmera
        </Text>

        <TouchableHighlight style={styles.permissionButton} onPress={requestPermission}>
          <View>
            <Text style={styles.permissionButtonText}>Conceder permissão</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotos((currentPhotos) => [...currentPhotos, photo.uri]); // antes, cada foto substituía a anterior. agora, cada nova foto é adicionada ao array.
    } // [...currentPhotos, photo.uri] significa “copie as fotos atuais e adicione a nova no final”.
  }

  function flipCamera() {
    setFacing((currentFacing) => (currentFacing === 'back' ? 'front' : 'back'));
  }

  function clearPhotos() { // função para limpar a galeria.
    setPhotos([]); // volta o estado photos para array vazio.
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Camera</Text>

      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} ref={cameraRef} facing={facing} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableHighlight style={styles.captureButton} onPress={takePhoto}>
          <View>
            <Ionicons name="camera" size={30} color="white" />
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.captureButton} onPress={flipCamera}>
          <View>
            <Ionicons name="camera-reverse" size={30} color="white" />
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.captureButton} onPress={clearPhotos}>
          <View>
            <Ionicons name="trash" size={30} color="white" />
          </View>
        </TouchableHighlight>
      </View>

      <Text style={styles.counter}>Fotos tiradas: {photos.length}</Text> {/* mostra quantas fotos existem no array. contador de fotos */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryContent}
        style={styles.gallery}
      > {/* galeria horizontal de fotos com barra de rolagem escondida (false) */}
        {photos.map((photoUri, index) => ( // map transforma cada URI em um componente Image.
          <Image
            key={`${photoUri}-${index}`} // identifica cada imagem na lista
            source={{ uri: photoUri }} // usa a URI da foto capturada
            style={styles.galleryImage}
          /> // percorre todas as fotos salvas e renedriza uma imagem pra cada uma.
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  permissionText: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16,
    color: '#111',
  },
  permissionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  title: {
    margin: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    backgroundColor: 'lightgray',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  captureButton: {
    margin: 14,
    padding: 14,
    borderRadius: 50,
    backgroundColor: '#000',
  },
  counter: {
    marginBottom: 12,
    fontWeight: '700',
    color: '#111',
  },
  gallery: {
    width: '100%',
  },
  galleryContent: {
    paddingHorizontal: 8,
    gap: 8,
  },
  galleryImage: {
    width: 82,
    height: 82,
    borderRadius: 8,
  },
});

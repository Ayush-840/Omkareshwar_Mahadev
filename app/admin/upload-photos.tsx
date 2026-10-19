import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { fetchAlbums, createPhotoInAlbum } from '../../src/services/firebase';
import { ScreenHeader } from '../../src/components/common/ScreenHeader';
import { Card } from '../../src/components/common/Card';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { colors, spacing, fontSize, fontWeight, radius } from '../../src/theme';
import { getCurrentLanguage } from '../../src/i18n';

export default function UploadPhotosScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('album-1');
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80'
  );
  const [captionHi, setCaptionHi] = useState('');
  const [captionEn, setCaptionEn] = useState('');
  const [uploading, setUploading] = useState(false);

  const { data: albums = [] } = useQuery({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
  });

  const handleUpload = async () => {
    if (!photoUrl.trim()) {
      Alert.alert(
        lang === 'hi' ? 'फोटो URL आवश्यक' : 'Photo URL required',
        lang === 'hi' ? 'कृपया फोटो का URL दर्ज करें।' : 'Please enter photo URL.'
      );
      return;
    }

    setUploading(true);
    await createPhotoInAlbum(selectedAlbumId, {
      url: photoUrl.trim(),
      thumbUrl: photoUrl.trim(),
      caption: captionHi.trim()
        ? {
            hi: captionHi.trim(),
            en: captionEn.trim() || captionHi.trim(),
          }
        : undefined,
      order: Date.now(),
    });
    setUploading(false);

    Alert.alert(
      lang === 'hi' ? 'फोटो अपलोड संपन्न' : 'Photo Uploaded',
      lang === 'hi' ? 'फोटो एल्बम में सुरक्षित कर दी गई है।' : 'Photo has been added to the album.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('admin.uploadPhotos')} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.label}>
            {lang === 'hi' ? 'एल्बम का चयन करें *' : 'Select Album *'}
          </Text>
          <View style={styles.albumList}>
            {albums.map((album) => {
              const isSelected = selectedAlbumId === album.id;
              const title = lang === 'hi' ? album.title.hi : album.title.en;

              return (
                <TouchableOpacity
                  key={album.id}
                  style={[styles.albumChip, isSelected && styles.albumChipActive]}
                  onPress={() => setSelectedAlbumId(album.id)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'images-outline'}
                    size={18}
                    color={isSelected ? colors.white : colors.maroon}
                  />
                  <Text
                    style={[
                      styles.albumChipText,
                      isSelected && styles.albumChipTextActive,
                    ]}
                  >
                    {title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>
            {lang === 'hi' ? 'फोटो लिंक / URL *' : 'Photo URL *'}
          </Text>
          <TextInput
            style={styles.input}
            value={photoUrl}
            onChangeText={setPhotoUrl}
            placeholder="https://..."
            placeholderTextColor={colors.inkMuted}
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            {lang === 'hi' ? 'फोटो कैप्शन (हिंदी)' : 'Photo Caption (Hindi)'}
          </Text>
          <TextInput
            style={styles.input}
            value={captionHi}
            onChangeText={setCaptionHi}
            placeholder="उदा. भव्य पुष्प श्रृंगार दर्शन"
            placeholderTextColor={colors.inkMuted}
          />

          <Text style={styles.label}>
            {lang === 'hi' ? 'Caption (English - Optional)' : 'Caption (English)'}
          </Text>
          <TextInput
            style={styles.input}
            value={captionEn}
            onChangeText={setCaptionEn}
            placeholder="e.g. Grand Flower Decor Darshan"
            placeholderTextColor={colors.inkMuted}
          />

          <PrimaryButton
            title={t('admin.uploadPhotos')}
            onPress={handleUpload}
            loading={uploading}
            style={styles.uploadBtn}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    padding: spacing.base,
    paddingBottom: 40,
  },
  label: {
    fontSize: fontSize.caption + 1,
    fontWeight: fontWeight.bold,
    color: colors.maroon,
    marginBottom: 6,
  },
  albumList: {
    gap: spacing.xs + 2,
    marginBottom: spacing.md,
  },
  albumChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cream,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.card / 2,
    borderWidth: 1.5,
    borderColor: '#E6DCC8',
    gap: spacing.sm,
    minHeight: 48,
  },
  albumChipActive: {
    backgroundColor: colors.maroon,
    borderColor: colors.maroon,
  },
  albumChipText: {
    fontSize: fontSize.body - 1,
    fontWeight: fontWeight.semibold,
    color: colors.ink,
  },
  albumChipTextActive: {
    color: colors.white,
    fontWeight: fontWeight.bold,
  },
  input: {
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: '#D8CCA6',
    borderRadius: radius.button,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm + 2,
    fontSize: fontSize.body,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  uploadBtn: {
    marginTop: spacing.md,
  },
});

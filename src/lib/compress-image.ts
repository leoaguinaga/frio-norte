/**
 * Browser-only: downscale a phone photo to a JPEG small enough to upload over mobile data
 * and stay under the action body limit (a 12 MP photo of ~5 MB becomes ~300 KB).
 * Throws if the browser can't decode the format (e.g. HEIC on desktop Chrome).
 */
export async function compressImage(file: File, name: string, max = 1600, quality = 0.78): Promise<File> {
  const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
  if (!blob) throw new Error('No se pudo procesar la imagen');
  return new File([blob], `${name}.jpg`, { type: 'image/jpeg' });
}

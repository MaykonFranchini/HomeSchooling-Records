export async function uploadFile(file: File, fileType: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'g6vvqdqk')


  const response = await fetch('https://api.cloudinary.com/v1_1/dxvhof8cl/auto/upload', {
    method: 'POST',
    body: formData
  })

  const ImageData = await response.json()

  if(fileType === 'avatar') {
    const url = ImageData.secure_url.replace('upload', 'upload/ar_1.0,c_thumb,g_face,w_300')
    return url
  }

  return ImageData.secure_url
}

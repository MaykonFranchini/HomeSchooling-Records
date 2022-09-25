export async function uploadAvatar(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'g6vvqdqk')


  const response = await fetch('https://api.cloudinary.com/v1_1/dxvhof8cl/image/upload', {
    method: 'POST',
    body: formData
  })

  const ImageData = await response.json()

  return ImageData.secure_url
}

export async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'g6vvqdqk')


  const response = await fetch('https://api.cloudinary.com/v1_1/dxvhof8cl/auto/upload', {
    method: 'POST',
    body: formData
  })

  const ImageData = await response.json()

  return ImageData.secure_url
}

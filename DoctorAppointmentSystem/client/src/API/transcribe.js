import apiClient from './client'

const transcribeAudio = async (file) => {
  const formData = new FormData()
  formData.append('audio', file)

  const response = await apiClient.post('/transcribe/', formData)
  return response.data
}

export default transcribeAudio
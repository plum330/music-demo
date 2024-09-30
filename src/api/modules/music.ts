import http from ".."

export const getRecommendedPlaylistApi = (data: any) => {
  return http.get(`/personalized`, data)
}

export const getRecommendedMusicListApi = (data: any) => {
  return http.get(`/personalized/newsong`, data)
}

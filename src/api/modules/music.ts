import http from ".."

export const getRecommendedMembers = (data: any) => {
  return ({
    result:  [
      {
        id: '1',
        nickname: '123',
        sex: '男',
        age: 20,
        degress: '硕士'
      },
      {
        id: '2',
        nickname: '12345',
        sex: '女',
        age: 18,
        degress: '硕士'
      },
      {
        id: '3',
        nickname: '123',
        sex: '男',
        age: 20,
        degress: '硕士'
      },
      {
        id: '4',
        nickname: '12345',
        sex: '女',
        age: 18,
        degress: '硕士'
      },
      {
        id: '5',
        nickname: '123',
        sex: '男',
        age: 20,
        degress: '硕士'
      },
      {
        id: '6',
        nickname: '12345',
        sex: '女',
        age: 18,
        degress: '硕士'
      },
      {
        id: '7',
        nickname: '123',
        sex: '男',
        age: 20,
        degress: '硕士'
      },
      {
        id: '8',
        nickname: '12345',
        sex: '女',
        age: 18,
        degress: '硕士'
      },
      {
        id: '9',
        nickname: '123',
        sex: '男',
        age: 20,
        degress: '硕士'
      },
    ]
  })
  // return http.get(`/personalized`, data)
}

export const getRecommendedMusicListApi = (data: any) => {
  return http.get(`/personalized/newsong`, data)
}

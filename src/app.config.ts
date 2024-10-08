export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/message/index',
    'pages/test/virtual_list/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#000000',
    selectedColor: '#ee5200',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '速配',
        iconPath: './assets/make_friends.png',
        selectedIconPath: './assets/make_friends_selected.png'
      },
      // {
      //   pagePath: 'pages/Mine/index',
      //   text: '有聊',
      //   iconPath: './images/user.png',
      //   selectedIconPath: './images/user_select.png'
      // },
      {
        pagePath: 'pages/message/index',
        text: '消息',
        iconPath: './assets/message.png',
        selectedIconPath: './assets/message_selected.png'
      },
      {
        pagePath: 'pages/test/virtual_list/index',
        text: '测试',
        iconPath: './assets/message.png',
        selectedIconPath: './assets/message_selected.png'
      }
    ]
  }
})

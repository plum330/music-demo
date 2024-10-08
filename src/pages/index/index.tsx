import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import '@/pages/index/index.scss'
import { useState } from 'react';
import { getRecommendedMembers } from '@/api/modules/music';
import { member } from '@/models';

import avatar from '@/assets/make_friends.png'
import Header from '@/component/header';

export default function Index() {
  // 推荐
  const [members, setMembers]: [members: Array<member>, setMembers: any] = useState<Array<member>>([])
  async function getRecommendedMemberList() {
    const {result} = await getRecommendedMembers({
      limit: 6,
    })
    setMembers(result)
  }
  // 用于监听页面加载执行 -> 监听到页面加载时，获取编辑推荐列表
  useLoad(() => {
    console.log('Page loaded.')
    getRecommendedMemberList();
  })

  const toDetail = () => {
    console.log('on click')
  }

  return (
    <View className='wrap'>
      <Header />
      <ScrollView className='wrap-scrollview'
        scrollY scrollWithAnimation enableFlex
        style={{height: '100vh'}}
        onScrollToLower={toDetail}
      >
        <View className='wrap-body'>
          {
            members.map((item) => {
              return (
                <View className='wrap-body-item' key={item.id} onClick={toDetail}>
                  <View className='wcbi-body'>
                    <Image className='wcbi-body-img' src={avatar} />
                    <View className='wcbi-body-text'>
                      <Text className='wcbi-body-text-nickname'>{item.nickname}</Text>
                      <Text className='wcbi-body-text-sex'>{item.sex}</Text>
                      <Text className='wcbi-body-text-age'>{item.age}</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

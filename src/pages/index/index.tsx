import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import '@/pages/index/index.scss'
import React, { useState } from 'react';
import { getRecommendedMembers } from '@/api/modules/music';
import { member } from '@/models';

import avatar from '@/assets/make_friends.png'
import Header from '@/component/header';
import { VirtualList } from '@tarojs/components-advanced/dist/components/virtual-list';

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

  const Row = React.memo(({id, index, data}: {id: string, index:number, data: any}) => {
    // return (
      // <View className='wrap-body'>sss
      {/* { */}
        // members.map((item) => {
          return (
            <View className='wrap-body-item' id={id} onClick={toDetail}>
              <View className='wcbi-body'>
                <Image className='wcbi-body-img' src={avatar} />
                <View className='wcbi-body-text'>
                  <Text className='wcbi-body-text-nickname'>{data[index].nickname}</Text>
                  <Text className='wcbi-body-text-sex'>{data[index].sex}</Text>
                  <Text className='wcbi-body-text-age'>{data[index].age}</Text>
                </View>
              </View>
            </View>
          )
        // })
      // }
    // </View>
    // )
  })

  return (
    <View className='wrap'>
      <Header />
      <VirtualList
        className='wrap-body'
        height='100%' /* 列表的高度 */
        width='100%' /* 列表的宽度 */
        item={Row} /* 列表单项组件，这里只能传入一个组件 */
        itemData={members} /* 渲染列表的数据 */
        itemCount={members.length} /* 渲染列表的长度 */
        itemSize={50} /* 列表单项的高度  */
        onScrollToLower={toDetail}
        // onScroll={({}) => {
        //   return toDetail
        // }}
        renderBottom={<Text>我也是有底线的</Text>}
      />
      {/* <ScrollView className='wrap-scrollview'
        scrollY scrollWithAnimation enableFlex
        style={{height: '100vh'}}
        onScrollToLower={toDetail}
      > */}
        {/* <View className='wrap-body'>
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
        </View> */}
      {/* </ScrollView> */}
    </View>
  )
}

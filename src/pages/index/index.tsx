import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import '@/pages/index/index.scss'
import { useState } from 'react';
import { getRecommendedMusicListApi, getRecommendedPlaylistApi } from '@/api/modules/music';
import { Icon } from '@nutui/nutui-react-taro';

export default function Index() {
  // 定义推荐歌单
  type recommendedPlayList = {
    id: number;
    name: string;
    picUrl: string,
    playCount: number;
  }
  const [recommendedPlaylistList, setRecommendPlaylistList]: [recommendedPlayListList: Array<recommendedPlayList>, setRecommededPlaylistList: any] = useState<Array<recommendedPlayList>>([{
    id: 0,
    name: '',
    picUrl: '',
    playCount: 0,
  }])

  // 获取推荐歌单
  async function getRecommendedPlayListList() {
    // 获取推荐歌单
    const {result} = await getRecommendedPlaylistApi({
      limit: 6,
    })
    // 保存推荐歌单
    setRecommendPlaylistList(result)
  }

  // 保存推荐音乐
  const [recommendedMusicList, setRecommendMusicList] = useState<any[]>([]);

  const getRecommendedMusicList = async () => {
    const {result} = await getRecommendedMusicListApi({
      limit: 10,
    })
    // 保存最新音乐列表(强制类型转换)
    setRecommendMusicList(result as any[])
  }
  // 用于监听页面加载执行 -> 监听到页面加载时，获取编辑推荐列表&最新列表
  useLoad(() => {
    console.log('Page loaded.')
    // 展示编辑推荐歌单
    getRecommendedPlayListList();
    // 展示最新音乐列表
    getRecommendedMusicList();
  })

  const toPlaylist = () => {
    console.log('on click')
  }
  return (
    <View className='wrap'>
      <View className='wrap-content'>
        <Text className='wctt-text'>推荐</Text>
        {/* <View className='wrap-content-top'>
          <View className='wrap-content-top-title'>
            <View className='wctt-placeholder'></View>
            <View className='wctt-text'>
              编辑推荐
            </View>
          </View>
        </View> */}
        <View className='wrap-content-body'>
          {
            recommendedPlaylistList.map((item) => {
              return (
                <View className='wrap-content-body-item' key={item.id} onClick={toPlaylist}>
                  <View className='wcbi-body'>
                    <Image className='wcbi-body-img' src={item.picUrl} />
                    <View className='wcbi-body-text'>
                      <Icon value='heart-2' color='#64b578' size='20'></Icon>
                      <Text className='wcbi-body-text-num'>
                        {parseInt(String(item.playCount / 10000))}w
                      </Text>
                    </View>
                    <View className='wcbi-body-bottom'>
                      {item.name}
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    </View>
  )
}

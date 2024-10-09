import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import plane from '@/assets/plane.png'
import '@/component/header/index.scss'

const Header: React.FC<{selectIndex?: number}> = ({selectIndex = 0}) => {
  const tabs = ['推荐', '最新', '123']
  const toPage = (index: number) => {
    console.log("++++++++++:", selectIndex, " ", index)
    if (index === selectIndex) return
    switch(index) {
      case 0:
        // Taro.redirectTo({
        //   url: ''
        // });
        break;

      case 1:
        // Taro.redirectTo({
        //   url: ''
        // })
        break;

      default:
        // Taro.redirectTo({
        //   url: ''
        // })
        break;
    }
  }
  return (
    <View className='wrap-fixed'>
      {/* <View className='wrap-header'> */}
        <View className='wrap-header-box'>
          <Image className='wrap-header-box-img' src={plane} />
          <Text className='wrap-header-box-text'>1234567</Text>
        </View>
      {/* </View> */}
      <View className='wrap-tabs'>
        {
          tabs.map((item: string, index: number) => {
            return (
              <View className='wrap-tabs-item' key={index} onClick={() => toPage(index)}>
                <View className={'wrap-tabs-item-text' + ' ' + (selectIndex === index? 'wrap-tabs-item-hover' : '')}>
                  {item}
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
};

export default Header;

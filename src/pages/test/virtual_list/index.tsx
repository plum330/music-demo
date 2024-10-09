import { View } from "@tarojs/components"
import { VirtualList } from "@tarojs/components-advanced/dist/components/virtual-list"
import Taro from "@tarojs/taro"
import React, { useState } from "react"

const Row = React.memo(({ id, index, data }:{id: string, index:number, data: any[]}) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}>
      Row {index} : {data[index]}
    </View>
  )
})

function buildData(offset = 0) {
  return Array(100)
    .fill(0)
    .map((_, i) => i + offset)
}

const Index = () => {
  const [data, setData] = useState(buildData(0))
  let loading = false
  const listReachBottom = () => {
    // 防止重复请求
    if (loading) {
      return
    }

    Taro.showLoading()
    loading = true
    setTimeout(() => {
      setData(data.concat(buildData(data.length)))
      loading = false
      Taro.hideLoading()
    }, 1000)
  }

  const dataLen = data.length
  const itemSize = 100
    return (
      <VirtualList
        className='List'
        height={700} // 必须设置高度,不同的机型如何兼容
        item={Row}
        itemData={data}
        itemCount={dataLen}
        itemSize={itemSize}
        width='100%'
        onScrollToLower={listReachBottom}
      />
    )
};

export default Index;

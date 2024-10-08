// const Index = () => {
//   return <></>
// };

import { View } from "@tarojs/components"
import { VirtualList } from "@tarojs/components-advanced/dist/components/virtual-list"
import Taro from "@tarojs/taro"
import React, { Component } from "react"

// export default Index;

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

export default class Index extends Component {
  state = {
    data: buildData(0),
  }

  loading = false

  listReachBottom() {
    Taro.showLoading()
    // 如果 loading 与视图相关，那它就应该放在 `this.state` 里
    // 我们这里使用的是一个同步的 API 调用 loading，所以不需要
    this.loading = true
    setTimeout(() => {
      const { data } = this.state
      this.setState(
        {
          data: data.concat(buildData(data.length)),
        },
        () => {
          this.loading = false
          Taro.hideLoading()
        }
      )
    }, 1000)
  }

  render() {
    const { data } = this.state
    const dataLen = data.length
    const itemSize = 100
    // 获取元素高度
    // let count;
    //       Taro.createSelectorQuery().select('.List').boundingClientRect().exec((res) => {
    //         console.log('----------------:', res[0].height)
    //         count = res[0].height / itemSize
    //       })
    return (
      <VirtualList
        className='List'
        height={500}
        item={Row}
        itemData={data}
        itemCount={dataLen}
        itemSize={itemSize}
        width='100%'
        onScroll={({ scrollDirection, scrollOffset }) => {
          console.log("+++++++++++:", this.loading, " ", scrollOffset, ' ', scrollDirection)
          if (
            // 避免重复加载数据
            !this.loading &&
            // 只有往前滚动我们才触发
            scrollDirection === 'forward' &&
            // 5 = (列表高度 / 单项列表高度)
            // 100 = 滚动提前加载量，可根据样式情况调整
            scrollOffset >= (dataLen - 10) * itemSize // 滚动距离 > 90*100 = 9000 主要是这里的计算设置
          ) {
            console.log("++++++++++++++++")
            this.listReachBottom()
          }
        }}
      />
    )
  }
}

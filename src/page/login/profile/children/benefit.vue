<template>
  <div class="benefit app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="flex1">
      <section class="title-tab">
        <ul class="clearfix">
          <li><a href="javascript:;" :class="{choosed:ischoosed}" @click="tab(1)">红包</a></li>
          <li><a href="javascript:;" :class="{choosed:!ischoosed}" @click="tab(2)">商家代金卷</a></li>
        </ul>
      </section>
      <section v-if="ischoosed">
        <section class="enevlope-tip">
          <span>有<b>{{enevlopeTotal}}</b>个红包即将到期</span>
          <router-link :to="{path:'/enevlopeThat'}" class="enevlope">
            <img src="/static/img/description.png" alt="">
            <span>红包说明</span>
          </router-link>
        </section>
        <section class="enevlope-list">
          <ul>
            <li class="clearfix" v-for="item of enevlopeList" :key="item.id">
              <div class="list-content">
                <div class="item-left">
                  <p>￥<span>{{String(item.amount).split('.')[0]}}</span>.<span>{{String(item.amount).split('.')[1] || 0}}</span></p>
                  <p>{{item.description_map.sum_condition}}</p>
                </div>
                <div class="item-right">
                  <div class="item-child-left">
                    <h4>{{item.name}}</h4>
                    <p>{{item.description_map.validity_periods}}</p>
                    <p>{{item.description_map.phone}}</p>
                  </div>
                  <div class="item-child-right">{{item.description_map.validity_delta}}</div>
                </div>
              </div>
              <div class="description" v-if="item.limit_map">
                <p>{{item.limit_map.restaurant_flavor_ids}}</p>
              </div>
            </li>
          </ul>
          <div class="enevlope-history">
            <router-link class="hb" to="/hbHistory">查看历史红包></router-link>
          </div>
        </section>
      </section>
      <section v-else>
        <section class="enevlope-tip">
          <router-link :to="{path:'/volumeThat'}" class="enevlope">
            <img src="/static/img/description.png" alt="">
            <span>商家代金券说明</span>
          </router-link>
        </section>
        <section class="volume-content">
          <img src="/static/img/voucher.png" alt="">
          <p class="nouse">无法使用代金卷</p>
          <p class="why">非客户端或客户端版本过低</p>
          <div>
            <router-link class="method" to="/download">下载或升级客户端</router-link>
          </div>
        </section>
      </section>
    </div>
    <footer v-if="ischoosed">
      <ul class="clearfix">
        <router-link tag="li" to='/exchangeHb'>兑换红包</router-link>
        <router-link tag="li" to='/commend'>推荐有奖</router-link>
      </ul>
    </footer>
    <img-load v-if="loadShow"></img-load>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import imgLoad from '@/components/common/imgLoading'
import homeApi from '@/service/homeApi'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      headTitle: '我的优惠',
      loadShow: false,
      ischoosed: true,
      enevlopeList: [], // 红包列表
      enevlopeTotal: 0 // 红包总数
    }
  },
  computed: {
    ...mapState(['setUserInfo'])
  },
  components: {
    headTop,
    imgLoad
  },
  methods: {
    tab (num) {
      if (num === 1) {
        this.ischoosed = true
      } else {
        this.ischoosed = false
      }
    },
    initData () {
      if (this.setUserInfo.user_id) {
        let params = {id: this.setUserInfo.user_id}
        homeApi.getHongBaoNum(params).then(res => {
          this.enevlopeList = res.data
          this.enevlopeTotal = res.data.length
        })
      }
    }
  },
  created () {
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
.title-tab{
  li{
    float: left;
    width: 50%;
    height: 90px;
    line-height: 90px;
    text-align: center;
    background: #fff;
    a{
      padding:10px;
      border-bottom: 2px solid transparent;/*no*/
      font-size: 28px;
      color: #666;
    }
    .choosed{
      border-color: #3190e8;
      color: #3190e8;
    }
  }
}
.enevlope-tip{
  padding: 0 20px;
  height: 100px;
  line-height: 100px;
  span{
    font-size: 24px;
    color: #666;
    b{
      margin: 0 5px;
      font-size: 28px;
      font-weight: bold;
      color: red;
    }
  }
}
.enevlope{
  float: right;
  line-height: 40px;
  margin-top: 30px;
  img{
    width: 30px;
    height: 30px;
    margin:4px 5px 0 0;
  }
  span{
    font-size: 24px;
    color: #3190e8;
    vertical-align: top;
  }
}
.enevlope-list{
  padding: 0 20px;
  li{
    padding: 40px 20px;
    margin-bottom: 20px;
    background: #fff url('/static/img/hongbao.png') left top repeat-x;
    background-size:20px 10px;
    .list-content{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
.item-left{
  width: 160px;
  border-right: 1px dashed #ddd;/*no*/
  p:nth-of-type(1){
    font-size: 28px;
    font-weight: bold;
    color: red;
    span{
      color: red;
      font-weight: bold;
    }
    span:nth-of-type(1){
      font-size: 52px;
    }
  }
  p:nth-of-type(2){
    line-height: 40px;
    font-size: 24px;
    color: #999;
  }
}
.item-right{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  padding-left: 20px;
}
.item-child-left{
  flex: 1;
  h4{
    font-size: 28px;
    color: #666;
  }
  p{
    font-size: 24px;
    color: #666;
  }
}
.item-child-right{
  width: 90px;
  font-size: 32px;
  font-weight: bold;
  color: red;
}
.description p{
    font-size: 24px;
    color: #999;
    margin-top: 10px;
}
.enevlope-history{
  padding: 40px 0;
  text-align: center;
  .hb{
    font-size: 28px;
    color: #999;
  }
}
footer{
  height: 90px;
  background: #fff;
  li{
    float: left;
    width: 50%;
    height: 100%;
    line-height: 90px;
    font-size: 28px;
    color: #666;
    text-align: center;
  }
}
.volume-content{
  margin-top: 200px;
  text-align: center;
  img{
    width: 300px;
  }
}
.nouse{
  line-height: 80px;
  font-size: 28px;
  color: #666;
}
.why{
  line-height: 40px;
  font-size: 24px;
  color: #999;
}
.volume-content div{
  margin-top: 40px;
}
.method{
  padding: 20px 40px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 28px;
  color: #fff;
  background: #56d176;
}
</style>

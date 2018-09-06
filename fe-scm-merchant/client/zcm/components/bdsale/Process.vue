<template>
  <div class="process-list">
    <div class="process-list-item"  v-if="processList && processList.post">
       <div class="process-deliver-info">
         <fieldset>
            <legend>发货信息</legend>
               <div class="list-item">
                 <div class="list-item-d title">设备信息：</div>
                 <div class="list-item-d">{{processList.post.deviceType + ' / ' + processList.post.deviceSn + ' / ' + processList.post.deviceMode}}</div>
               </div>
               <div class="list-item">
                 <div class="list-item-d title">取回方式：</div>
                 <div class="list-item-d">{{processList.post.mailType}}</div>
               </div>
               <div class="list-item">
                 <div class="list-item-d title">出库时间：</div>
                 <div class="list-item-d">{{processList.post.time}}</div>
               </div>
               <div class="list-item">
                 <div class="list-item-d title">寄件方信息：</div>
                 <div class="list-item-d">{{processList.post.jInfo}}</div>
               </div>
               <div class="list-item">
                 <div class="list-item-d title">入件方信息：</div>
                 <div class="list-item-d">{{processList.post.dInfo}}</div>
               </div>
                <div class="list-item">
                 <div class="list-item-d title">物流详情：</div>
                 <div class="list-item-d">
                   <div v-for="(item, index) in processList.post.routes" :key="index">
                     <span class="route-item">{{item.acceptTime}}</span>
                     <span class="route-item">{{item.acceptAddress}}</span>
                     <span class="route-item">{{item.remark}}</span>
                   </div>
                 </div>
               </div>
            </fieldset>
      </div>
    </div>
    <div class="process-list-item" v-if="processList && processList.recycle">
       <div class="process-deliver-info">
         <fieldset>
            <legend>回收信息</legend>
               <div class="list-item">
                 <div class="list-item-d title">设备信息：</div>
                 <div class="list-item-d">{{processList.recycle.deviceType + ' / ' + processList.recycle.deviceSn + ' / ' + processList.recycle.deviceMode}}</div>
               </div>
               <div class="list-item">
                 <div class="list-item-d title">取回方式：</div>
                 <div class="list-item-d">{{processList.recycle.mailType}}</div>
               </div>
               <div class="list-item">
                 <div class="list-item-d title">入库时间：</div>
                 <div class="list-item-d">{{processList.recycle.time}}</div>
               </div>
               <div class="list-item">
                 <div class="list-item-d title">寄件方信息：</div>
                 <div class="list-item-d">{{processList.recycle.jInfo}}</div>
               </div>
               <div class="list-item">
                 <div class="list-item-d title">入件方信息：</div>
                 <div class="list-item-d">{{processList.recycle.dInfo}}</div>
               </div>
                <div class="list-item">
                 <div class="list-item-d title">物流详情：</div>
                 <div class="list-item-d">
                   <div v-for="item in processList.recycle.routes" :key="item">
                     <span class="route-item">{{item.acceptTime}}</span>
                     <span class="route-item">{{item.acceptAddress}}</span>
                     <span class="route-item">{{item.remark}}</span>
                   </div>
                 </div>
               </div>
            </fieldset>
      </div>
    </div>
  </div>
</template>
<script>

import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      applyId: '',
      applyType: ''
    }
  },
  computed: {
    ...mapGetters({
      processList: 'processList'
    })
  },
  mounted () {
    this.applyType = this.$route.query.applyType
    this.applyId = this.$route.query.applyId

    this.$store.dispatch('setBreadRequired', true)
    this.$store.dispatch('getProcessList', {
      applyId: this.applyId,
      applyType: this.applyType
    })
  }
}
</script>
<style>
 .process-list {
   padding-bottom: 10px;
 }
 .process-list fieldset {
   text-align: left;
   font-size: 14px;
   border: 1px #E4E7ED solid;
   margin-bottom: 20px;
   font-size: 14px;
   color: #606266;
   padding: 10px;
 }
 .process-list .process-list-item {
    position: relative;
    overflow: hidden;
    clear: both;
    border-bottom: 1px #E4E7ED solid;
    padding: 10px 0;
    margin: 0 10px;
    text-align: left;
    font-size: 14px;
    color: #606266;
 }
 .process-deliver-info .list-item {
    overflow: hidden;
    padding: 5px 0;
  }
 .process-deliver-info .list-item .list-item-d {
   float: left;
 }
 .process-deliver-info .list-item .title {
   width: 100px;
   text-align: right
 }
 .process-deliver-info .list-item .route-item {
   margin-right: 10px
 }
</style>



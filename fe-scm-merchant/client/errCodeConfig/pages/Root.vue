<template>
	<el-container class="mis-index">
		<el-header>{{ title }}
			<div class="user-info">
				<span>Hi，</span>
				<span>{{ uname }}</span>
			</div>
		</el-header>
		<el-container>
			<el-aside width="200px">
			 <Nav></Nav>
      </el-aside>
			<el-main>
			<router-view>
			</router-view>
		  </el-main>
		</el-container>
	</el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import Nav from '@/errCodeConfig/components/Nav.vue'

export default {
  data () {
    return {
      title: '招财猫后台运营系统'
    }
  },
  computed: {
    ...mapGetters({
      uname: 'uname'
    })
  },
  methods: {},
  components: {
    Nav
  }
}
</script>

<style lang="less">
.mis-index {
	.user-info {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 15px;
  font-weight: 400;
}
	.el-header {
		background-color: #b3c0d1;
		color: #409eff;
		text-align: left;
		line-height: 60px;
		font-size: 23px;
		font-weight: 400;
		font-family: Hiragino Sans GB;
		background: #409eff;
		color: #fff;
	}
}

</style>
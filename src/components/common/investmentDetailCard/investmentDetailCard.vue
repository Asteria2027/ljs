<template>
  <div class="investDetailCard">
		<h3 class="pro_title ">
			{{title}}<label v-if='type==6'>新手专享</label>
		</h3>
		<div class="pro_content-1">
			<p>历史年化(%)</p>
			<div v-if="annualRate" class="info"><span>{{annualRate}}{{Number(addRate)>0?'+'+addRate:''}}<i v-if="coupon">{{coupon?'+'+coupon+'%':''}}&nbsp;{{month?month+'个月':''}}</i></span> </div>
			<div class="pro">
				<div v-if="investAmount" class="overplus">剩余可投：{{investAmount?investAmount:'--'}}元</div>
				<div v-if="schedules">
					<p class="process_bg"></p>
					<p :style="{width: schedules + '%'}" class="process_bar"></p>
				</div>
				<div v-if="schedules" class="process_count">{{schedules?schedules:'-'}}%</div>
			</div>
			<ul v-if="timelimit">
				<li>
					<p>{{timelimit?timelimit:'-'}}</p>
					<p>{{timelimitTxt?timelimitTxt:'-'}} (月)</p>
				</li>
				<li v-if="type!=4">
					<p>{{moneyAmount?moneyAmount:'-'}}</p>
					<p>{{moneyAmountTxt?moneyAmountTxt:'-'}} (元)</p>
				</li>
				<li>
					<p>{{paymentMode?paymentMode:discountAmount}}</p>
					<p>{{paymentMode?'还款方式':'让利 (元)'}}</p>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
export default {
	props:{
		DetailData: {},
    type:{ //3 散标专区、4 转让专区、5 个人专区、 6 新手专区、 7 企业专区
			type:String
		}
	},
	data(){
		return {
			title:'',
			paymentMode:'',//还款方式
			annualRate:'',//历史年化
			investAmount:'',//剩余可投
			schedules:'',//投标进度
			timelimit:'',//投标期限/剩余期限
			timelimitTxt:'',//投标期限/剩余期限
			moneyAmount:'',//剩余金额/转让金额
			moneyAmountTxt:'',//剩余金额/转让金额
			debtSum:'',//债权价值
			addRate:'',//新手标加息
			coupon:'',//加息率
			month:'',//加息期限
			discountAmount:'',//让利金额
		}
	},
	watch:{
		'DetailData'(newVal){
			if(this.type==4){
				this.title = newVal.borrowTitle;
				this.annualRate = newVal.newAnnualRate;
				this.investAmount = newVal.investAmount;
				this.schedules = newVal.schedules;
				this.timelimit = newVal.remainBorrowLimit;
				this.timelimitTxt = '剩余期限';
				this.moneyAmount = newVal.auctionBasePrice;
				this.moneyAmountTxt = '转让金额';
				this.debtSum = newVal.debtSum;
				this.discountAmount = newVal.discountAmount;
			}else {
				this.title = newVal.borrowDetailMap.borrowTitle;
				this.paymentMode = newVal.borrowDetailMap.paymentMode==1?'等额本息':newVal.borrowDetailMap.paymentMode==2?'按月付息，到期还本':newVal.borrowDetailMap.paymentMode==3?'等本等息':newVal.borrowDetailMap.paymentMode==4?'一次性还本付息':'******';
				this.annualRate = newVal.borrowDetailMap.annualRate;
				this.investAmount = newVal.borrowDetailMap.investAmount;
				this.schedules = newVal.borrowDetailMap.schedules;
				this.timelimit = newVal.borrowDetailMap.deadline;
				this.timelimitTxt = '投标期限';
				this.moneyAmount = newVal.borrowDetailMap.borrowAmount||newVal.investDetailMap.borrowAmount;
				this.moneyAmountTxt = '借款金额';
				this.addRate = newVal.borrowDetailMap.addRate;
				if(this.type!=6&&newVal.activitys.length>0){
					this.coupon = newVal.activitys[0].coupon;
					this.month = newVal.activitys[0].month;
				}
				
			}
		}
	}
};
</script>
<style lang="less" scoped>
.investDetailCard {
	width: 100%;
	background: #FE6246;
	overflow: hidden;
	.pro_title {
		padding: 0.4rem 0.24rem 0.5rem;
		line-height: 0.3rem;
		font-size: 0.2rem;
		color: #fff;
		label {
			color: #ffe21c;
			margin-left: 0.15rem;
			padding: 0.03rem 0.1rem;
			border: 1px solid #ffe21c;
			border-radius: 0.05rem;
		}
	}
	.pro_content-1 {
		>p:nth-child(1) {
			font-size: 0.23rem;
			color: #fff;
			text-align: center;
		}
		.info {
			margin: 0.18rem 0 0.5rem;
			text-align: center;
			color: #fff;
			>span {
				position: relative;
				font-size: 0.72rem;
			}
			>span>i {
				position: absolute;
				top: 0;
				right: -1.1rem;
				font-size: 0.16rem;
				padding: 0.06rem 0.08rem 0.1rem;
				text-align: center;
				color: #ffe21c;			
				background: url('./jiaxi.png') no-repeat;
				background-size: 100% 100%;
			
			}
		}
		.pro {
			display: block;
			display: flex;
			font-size: 0.2rem;
			margin-bottom: 0.7rem;
			color: #fff;
			>div:nth-child(2){
				width: 1.52rem;
				position: relative;
			}
			.overplus {
				margin-right: 0.12rem;
				width: 2.69rem;
				text-align: right;
			}
			.process_count {
				margin-left: 0.12rem;
			}
			.process_bg {
				position: absolute;
				width: 100%;
				height: 0.1rem;
				background: rgba(0, 0, 0, 0.1);
				border-radius: 0.05rem;
				left: 0;
				top: 0.05rem;
			}
			.process_bar {
				position: absolute;
				height: 0.1rem;
				background: #ffe21c;
				border-radius: 0.05rem;
				left: 0;
				top: 0.05rem;
			}
		}
		ul {
			width: 100%;
			height: 0.74rem;
			margin-bottom: 0.26rem;
			display: block;
			display: flex;
			color: #fff;
			li {
				padding: 0 0.2rem;
				text-align: center;
				p:nth-child(1) {
					font-size:0.25rem;
					margin-bottom: 0.2rem;
				}
				p:nth-child(2) {
					font-size:0.2rem;
				}
			}
			li:nth-child(1),
			li:nth-child(2){
				display: block;
				flex: 1;
			}
			li:nth-child(3){
				min-width: 28%;
			}
		}
	}
}
</style>
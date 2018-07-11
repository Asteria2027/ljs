
<template>
<div class="organizationInfo_outDiv">

	<div class="xxpl_menu"  id="xxpl_menu">
		<ul class="clearfix">
			<li @click='closeMenu();jump("introduce"); '>
				<img src="./images/organizationInfo_menu_01.png" alt="">
				<span ohref="#introduce">公司简介</span>
			</li>
			<li @click='closeMenu();jump("shareholding")'>
				<img src="./images/organizationInfo_menu_02.png" alt="">
				<span ohref="#shareholding">股权结构</span>
			</li>
			<li @click='closeMenu();jump("gdbj")'>
				<img src="./images/organizationInfo_menu_03.png" alt="">
				<span ohref="#gdbj">股东背景</span>
			</li>
			<li @click='closeMenu();jump("grow")'>
				<img src="./images/organizationInfo_menu_04.png" alt="">
				<span ohref="#grow">发展历程</span>
			</li>
			<li v-if="isMenuOpen" @click='menuSwitch();jump("businessModel")'>
				<img src="./images/organizationInfo_menu_05.png" alt="">
				<span ohref="#businessModel">业务模式</span>
			</li>
			<li v-if="isMenuOpen" @click='menuSwitch();jump("platInfo_detial")'>
				<img src="./images/organizationInfo_menu_06.png" alt="">
				<span ohref="#platInfo_detial">平台信息</span>
			</li>
			<li v-if="isMenuOpen" @click='menuSwitch();jump("Organization")'>
				<img src="./images/organizationInfo_menu_07.png" alt="">
				<span ohref="#Organization">组织架构</span>
			</li>
			<li v-if="isMenuOpen" @click='menuSwitch();jump("CompanyTeam")'>
				<img src="./images/organizationInfo_menu_08.png" alt="">
				<span ohref="#CompanyTeam">公司团队</span>
			</li>
			<li v-if="isMenuOpen" @click='menuSwitch();jump("OrganizationInfo_contactUs")'>
				<img src="./images/organizationInfo_menu_09.png" alt="">
				<span ohref="#OrganizationInfo_contactUs">联系我们</span>
			</li>
			<li v-if="isMenuOpen" @click='menuSwitch();jump("complaintChannel")'>
				<img src="./images/organizationInfo_menu_10.png" alt="">
				<span ohref="#complaintChannel">投诉渠道</span>
			</li>
			<li v-if="isMenuOpen" @click='menuSwitch();jump("bigThings")'>
				<img src="./images/organizationInfo_menu_11.png" alt="">
				<span ohref="#bigThings">重大事项</span>
			</li>
			<li v-if="isMenuOpen" @click='menuSwitch();jump("honor")'>
				<img src="./images/organizationInfo_menu_12.png" alt="">
				<span ohref="#honor">荣誉证书</span>
			</li>
			<li v-if="isMenuOpen" @click='menuSwitch();jump("aptitude")'>
				<img src="./images/organizationInfo_menu_13.png" alt="">
				<span ohref="#aptitude">资质证书</span>
			</li>
			<li v-if="isMenuOpen" @click='menuSwitch();jump("staffAppearance")'>
				<img src="./images/organizationInfo_menu_14.png" alt="">
				<span ohref="#staffAppearance">员工风貌</span>
			</li>
		</ul>
		<div class="xxpl_menu_switch" id="xxpl_menu_switch">
			<img class="img1" @click='menuSwitch' v-if="!isMenuOpen" src="./images/menu_bottomArrow.png" alt="">
			<img class="img2" @click='menuSwitch' v-if="isMenuOpen" src="./images/menu_topArrow.png" alt="">
		</div>
	</div>

<anchor-scroll :scrollTop = "scrollTop">

	<div class="xxpl_box xxpl_OrganizationInfo" id="xxpl_OrganizationInfo" ref="xxpl_OrganizationInfo">
		<!-- 公司介绍 -->
		<div id="introduce" ref="introduce" class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_introduce">
			<div class="common_title introduce_title">
				<p class="p_title"><span>联金所</span></p>
				<p class="p_bottom">知名风投+行业专家的互联网金融平台，接受比同业更严格的监管</p>
			</div>

			<div class="xxpl_OrganizationInfo_con_detail introduce_detail">
				<p>
					联金所（www.uf-club.com）互联网金融平台于2013年11月1日上线，运营方为深圳前海联金所金融信息服务有限公司，实缴资本6800万元，高管团队由具有多年银行信贷、风控经验及互联网技术、运营专业人才组成。联金所秉承小额分散、规范透明的经营理念，坚持走推动金融改革创新的普惠金融之路，倾力为广大出借人与借款人提供优质便捷、安全可靠的网络借贷信息中介服务
				</p>
				<p>联金所安全、稳健、快速的发展得到资本市场的积极追捧，其中2014年12月，深圳联合金融控股有限公司受让联金所40%股份跃居第一大股东；2015年11月，A股上市公司赫美集团收购联金所51%股权并成为联金所控股股东。在互联网金融迎来合规及上市热潮大背景下，2017年12月，联金所引入新的战略股东——佛山市新叶投资合伙企业（国内著名风投优势资本旗下）和上海闻玺投资咨询有限公司（母公司为上海盈灿咨询，其是互联网金融咨询服务的创领者，为互金企业提供运营、品牌、资本等全方位咨询服务）合计占股80%，至此形成“知名风投+行业专家”的强大股东阵容，我们将会获得更多的资源和支持取得更好更快的发展，向互金领域的第一梯队目标前进。</p>
			</div>
		</div>
		<!-- 股权结构 -->
		<div id="shareholding" ref="shareholding" class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_shareholding">
			<div class="common_title shareholding_title">
				<p class="p_title2">
					<span>股权结构</span>
				</p>
			</div>

			<div class="xxpl_OrganizationInfo_con_detail">
				<img src="./images/OrganizationInfo_shareholding.png" alt="">
			</div>
		</div>
		<!-- 股东背景 -->
		<div id="gdbj" ref="gdbj" class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_gdbj">
			<div class="common_title gdbj_title">
				<p class="p_title"><span>股东背景</span></p>
				<p class="p_bottom">联金所目前已形成“知名风投+行业专家”的强大股东阵容</p>
			</div>

			<div class="xxpl_OrganizationInfo_con_detail gdbj_detial">

				<div class="gdbj_detial_box clearfix">
					<div class="gdbj_detial_box_img">
						<img src="./images/OrganizationInfo_gdbj_yszb.png" alt="">
					</div>
					<div class="gdbj_detial_box_word common_word">
						<p class="p_title">知名风投——优势资本</p>
						<p>佛山市新叶投标合伙企业，其执行方优势资本系国内著名风投。优势资本创立于2002年，为国内领先的股权投标机构，拥有专业的投标团队、雄厚的财团支持和产业战略投标者联盟，深耕擅长的细分领域互联网、通信、新能源等，管理规模达80亿、累计投标项目152个；其中，已上市项目中市值逾100亿企业10家。</p>
					</div>
				</div>


				<div class="gdbj_detial_box clearfix">
					<div class="gdbj_detial_box_img">
						<img src="./images/OrganizationInfo_gdbj_ycjt.png" alt="">
					</div>
				<div class="gdbj_detial_box_word common_word">
					<p class="p_title">行业专家——盈灿咨询</p>
					<p>盈灿咨询隶属于盈灿集团旗下，是一家致力于为互联网金融企业提供全方位服务的公司，提供运营、品牌、公信力、资本等多维度的咨询服务，全面为互联网金融企业提供赋能。盈灿咨询前身为网贷之家研究院具备国内互联网金融领域最前沿的影响力，最权威的数据库、最深度的模型库。盈灿咨询已成立6年，现有50余名互联网金融领域专家、服务200余家平台，是互联网金融咨询服务的创领者。</p>
				</div>
				</div>
			</div>
			<div class="legalPerson_signature">
				<img src="./images/legalPerson_signature.png" alt="">
			</div>

		</div>

		<!-- 发展历程 -->
		<div class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_grow" id="grow" ref="grow">
			<div class="common_title grow_title">
				<p class="p_title">
					<span>发展历程</span>
				</p>
				<p class="p_bottom">进步源自虔诚之心和点滴付出，您的信任与重托则是我们最大的动力</p>
			</div>

			<div class="xxpl_OrganizationInfo_con_detail grow_detial">
				<div class="grow_detial_arrow grow_detial_arrowUp" id="growArrowUp" v-show="growArrowUp" @click="changeTop('up')">
					<img src="./images/OrganizationInfo_growArrowUp.png" alt="">
				</div>
				<div class="grow_detial_arrow grow_detial_arrowDown" id="growArrowDown"  v-show="!growArrowUp" @ @click="changeTop('down')">
					<img src="./images/OrganizationInfo_growArrowDown.png" alt="">
				</div>
				<div class="grow_detail_content">
					<span class="line"></span>
					<div ref="growContent_parent">
						<ul id="growContent" ref="growContent">
							<!-- 第一页 -->
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_28.jpg" alt="">
									</li>
									<li>
										<strong>2017.12.04</strong>
										<p>联金所引入新的战略股东优势资本和盈灿集团，至此形成“知名风投+行业专家”的强大股东阵容。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_26.jpg" alt="">
									</li>
									<li>
										<strong>2016.11.01</strong>
										<p>联金所成立三周年。高尔夫嘉年华暨三周年庆典在深圳高尔夫俱乐部成功举办，近百名投标人代表、合作伙伴到场。</p>
									</li>
								</div>
							</div>
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_27.jpg" alt="">
									</li>
									<li>
										<strong>2016.11.23</strong>
										<p>联金所旗下“月月升”理财产品荣获“年度影响力互联网金融产品”大奖。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_25.jpg" alt="">
									</li>
									<li>
										<strong>2016.10.28</strong>
										<p>联金所摘得“2016年度互联网金融平台50强”和“年度成长突破奖”两大殊荣。</p>
									</li>
								</div>
							</div>
							<!-- 第二页 -->
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_24.jpg" alt="">
									</li>
									<li>
										<strong>2016.10.20</strong>
										<p>联金所CEO刘哲受邀担任深圳大学互金风险教育活动演讲嘉宾，对大学生进行互联网金融行业风险教育。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_22.jpg" alt="">
									</li>
									<li>
										<strong>2016.07.13</strong>
										<p>联金所同阳泉市商业银行签署战略合作协议，合作金额高达100亿元。</p>
									</li>
								</div>
							</div>
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_23.jpg" alt="">
									</li>
									<li>
										<strong>2016.09.11</strong>
										<p>网贷之家联合盈灿咨询发布8月网贷“百强榜”，联金所排名上升至第28名。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_21.jpg" alt="">
									</li>
									<li>
										<strong>2016.06.17</strong>
										<p>联金所作为联盟平台出席国金联合会1周年庆典暨官网上线仪式，为行业正能量发声。</p>
									</li>
								</div>
							</div>
							<!-- 第三页 -->
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_20.jpg" alt="">
									</li>
									<li>
										<strong>2016.06.16</strong>
										<p>联金所加入广东省金融消费权益保护联合会。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_18.jpg" alt="">
									</li>
									<li>
										<strong>2016.05.14</strong>
										<p>联金所联合发起福田区网贷行业协会（筹委会）。</p>
									</li>
								</div>
							</div>
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_19.jpg" alt="">
									</li>
									<li>
										<strong>2016.05.29</strong>
										<p>联金所CEO刘哲出席“创互金无限未来”论坛，与吴晓求杨锦麟同台。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_17.jpg" alt="">
									</li>
									<li>
										<strong>2016.04.26</strong>
										<p>上海金融信息行业协会、杭州市互联网金融协会组团考察联金所，互相学习，共同探讨P2P发展之道。</p>
									</li>
								</div>
							</div>
							<!-- 第四页 -->
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_16.jpg" alt="">
									</li>
									<li>
										<strong>2016.04.22</strong>
										<p>广东互联网金融协会秘书长朱明春、副秘书长华德莉考察联金所，对联金所发展模式给予赞赏。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_14.jpg" alt="">
									</li>
									<li>
										<strong>2015.12.31</strong>
										<p>联金所荣登"2015深圳金融名片"榜单。</p>
									</li>
								</div>
							</div>
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_15.jpg" alt="">
									</li>
									<li>
										<strong>2016.03.01</strong>
										<p>联金所联合发起成立前海互金联盟。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_13.jpg" alt="">
									</li>
									<li>
										<strong>2015.12.27</strong>
										<p>联金所CEO刘哲获评2015年广东互联网金融协会年度新人奖。</p>
									</li>
								</div>
							</div>
							<!-- 第五页 -->
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_12.jpg" alt="">
									</li>
									<li>
										<strong>2015.12.15</strong>
										<p>联金所高票当选广东互联网金融协会副会长单位。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_10.jpg" alt="">
									</li>
									<li>
										<strong>2015.11.08</strong>
										<p>联金所2016届校园宣讲招聘活动圆满收官, 先后在华中科技大学、中山大学、南京大学、四川大学宣讲招聘,备受学生追捧。</p>
									</li>
								</div>
							</div>
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_11.jpg" alt="">
									</li>
									<li>
										<strong>2015.11.24</strong>
										<p>联金所成功引入新的控股股东A股上市公司赫美集团,正式成为为数不多的上市公司控股互联网金融企业。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_09.jpg" alt="">
									</li>
									<li>
										<strong>2015.11.05</strong>
										<p>联金所在融资中国2015互联网金融峰会中荣获“互联网金融风控奖”。</p>
									</li>
								</div>
							</div>
							<!-- 第六页 -->
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_08.jpg" alt="">
									</li>
									<li>
										<strong>2015.09.25</strong>
										<p>联金所实缴注册资本增至6800万元,安全保障再升级。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_06.jpg" alt="">
									</li>
									<li>
										<strong>2015.06.25</strong>
										<p>联金所成为首批加入互联网金融公益联盟的企业,该联盟由权威媒体《南方都市报》发起成立。</p>
									</li>
								</div>
							</div>
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_07.jpg" alt="">
									</li>
									<li>
										<strong>2015.09.12</strong>
										<p>联金所跻身"2015年度互联网金融平台50强"榜单。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_05.jpg" alt="">
									</li>
									<li>
										<strong>2015.05.16</strong>
										<p>联金所联合网贷之家等11家具有国资或上市公司背景的互联网金融企业成立"国金联盟"。</p>
									</li>
								</div>
							</div>
							<!-- 第七页 -->
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_04.jpg" alt="">
									</li>
									<li>
										<strong>2015.01.08</strong>
										<p>首届百度新站评选大赛,联金所荣获"新站排行榜第五名" "垂直行业最佳新站排行榜第二名"。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_02.jpg" alt="">
									</li>
									<li>
										<strong>2014.09.16</strong>
										<p>联金所荣获中国网贷平台AAAA评级。</p>
									</li>
								</div>
							</div>
							<div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_03.jpg" alt="">
									</li>
									<li>
										<strong>2014.11.06-08</strong>
										<p>联金所CEO刘哲在深圳金博会接受CCTV采访。</p>
									</li>
								</div>
								<div>
									<li>
										<img src="./images/info_fzlc_small_01.jpg" alt="">
									</li>
									<li>
										<strong>2013.11.01</strong>
										<p>联金所官网正式上线。</p>
									</li>
								</div>
							</div>

						</ul>
					</div>
				</div>
			</div>

			<div class="legalPerson_signature">
				<img src="./images/legalPerson_signature.png" alt="">
			</div>
		</div>

		<!-- 平台信息 -->
		<div id="platInfo_detial" ref="platInfo_detial" class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_platInfo">
			<div class="common_title platInfo_title">
				<p class="p_title2">
					<span>平台信息</span>
				</p>
			</div>

			<div class="xxpl_OrganizationInfo_con_detail platInfo_detial">
				<div class="platInfo_detial_box">
					<h1 class="common_h">公司信息</h1>
					<table class="companyInfo" cellspacing="0">
						<tbody class="table1">
						<tr>
							<th>企业名称</th>
							<th>深圳前海联金所金融信息服务有限公司</th>
						</tr>
						<tr>
							<th>注册资本</th>
							<th class="th2">（人民币）6800万元</th>
						</tr>
						<tr>
							<th>实缴资本</th>
							<th>（人民币）6800万元</th>
						</tr>
						<tr>
							<th>成立日期</th>
							<th>2014年03月18日</th>
						</tr>
						<tr>
							<th>经营期限及状态</th>
							<th>自2014-03-18至2034-03-18（开业）</th>
						</tr>

						<tr>
							<th>注册地址</th>
							<th>深圳市前海深港合作区前湾一路63号前海企业公馆B单元25栋2楼整层</th>
						</tr>

						<tr>
							<th>经营地址</th>
							<th>深圳市福田区天安数码城科技创新广场1期B座1011</th>
						</tr>

						<tr>
							<th>法定代表人</th>
							<th>郭晓军</th>
						</tr>
						<tr>
							<th>登记机关</th>
							<th>深圳市市场监督管理局</th>
						</tr>


						<tr>
							<th>资金存管情况</th>
							<th>浙商银行资产存管已上线</th>
						</tr>
						<tr>
							<th>经营范围</th>
							<th style="height: 80px">受金融机构的合法委托从事金融服务外包及数据信息分析；计算机软硬件技术开发、销售及其他国内贸易（不含专营、专控、专卖商品）；在网上从事商贸业务；投标管理；资产管理；投标顾问、投标咨询、信息咨询；市场营销策划；投标兴办实业（具体项目另行申报）；货物及技术进出口。</th>
						</tr>

						<tr>
							<th>分支机构</th>
							<th>暂无</th>
						</tr>

						<tr>
							<th>协议模板</th>
							<th id="jpbottom1">
								<a href="http://www.uf-club.com/appage/xxplXssBox.do">注册协议模板</a>
							</th>
						</tr>

						<tr>
							<th>公司章程</th>
							<th>
								<a href="https://www.uf-club.com/static/auditReport/前海联金所章程.pdf" target="_blank">公司章程</a><span class="appShow" id="appShow">(请在浏览器查看)</span>
							</th>
						</tr>
						</tbody>

					</table>

					<div class="platInfo_detial_box">
						<h1 class="common_h">平台信息</h1>
						<table class="table2" cellspacing="0">
							<tbody>
							<tr>
								<th>平台名称</th>
								<th>联金所</th>
							</tr>
							<tr>
								<th>网址</th>
								<th>www.uf-club.com</th>
							</tr>
							<tr>
								<th>APP应用名称</th>
								<th>联金所</th>
							</tr>
							<tr>
								<th>公众号</th>
								<th>联金助手（服务号）、联金所（订阅号）</th>
							</tr>
							<tr>
								<th>平台上线运营时间</th>
								<th>2013年11月01日</th>
							</tr>
							<tr>
								<th>电信业务经营备案信息</th>
								<th>粤ICP备14046625号</th>
							</tr>
							<tr>
								<th>财务审计报告</th>
								<th>
									<a href="https://www.uf-club.com/static/auditReport/2016%E5%B9%B4%E5%89%8D%E6%B5%B7%E5%AE%A1%E8%AE%A1%E6%8A%A5%E5%91%8A.pdf"
									target="_blank">查看</a><span class="appShow" id="appShow">(请在浏览器查看)</span>
								</th>
							</tr>
							</tbody>
						</table>
					</div>

					<div class="platInfo_detail_box officialChannel">
						<h1 class="common_h">官方渠道</h1>
						<div class="officialChannel_con">
							<ul class="clearfix">
								<li>
									<a href="https://www.uf-club.com">
										<img src="./images/OrganizationInfo_platInfo_logo.png" alt="">
									</a>
								</li>

								<li>
									<img src="./images/OrganizationInfo_platInfo_fwh.png" alt="">
								</li>
							</ul>
							<ul class="clearfix">
								<li>
									<img src="./images/OrganizationInfo_platInfo_dyh.jpg" alt="">
								</li>
								<li>
									<img src="./images/OrganizationInfo_platInfo_app.png" alt="">
								</li>

							</ul>
						</div>
					</div>


				</div>

			</div>

			<div class="legalPerson_signature">
				<img src="./images/legalPerson_signature.png" alt="">
			</div>
		</div>
		<!-- 业务模式 -->
		<div id="businessModel" ref="businessModel" class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_businessModel">
			<div class="common_title businessModel_title">
				<p class="p_title2"><span>业务模式</span></p>
			</div>
			<div class="xxpl_OrganizationInfo_con_detail businessModel_detial">
				<p class="common_word">联金所（www.uf-club.com）平台上的借款项目均通过严格的风控审核，出借人在平台上对借款项目投标，资金经由银行存管，满标后直接划入借款人账户；项目到期后，借款人通过平台向出借人还款。通过联金所的推荐，您可以将手中的富余资金，出借给信用良好的小微企业或个人借款人，并获得利息回报。</p>
				<img width="100%" src="./images/OrganizationInfo_businessModel.png" alt="">
			</div>

			<div class="legalPerson_signature">
				<img src="./images/legalPerson_signature.png" alt="">
			</div>
		</div>
		<!-- 影像联金 -->
		<!-- <div id="OrganizationInfo_video" class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_video">
			<div class="common_title video_title">
				<p class="p_title">影像联金</p>
				<p class="p_bottom">这几年我们通过媒体发出了一些声音，影像记录责任与担当</p>
			</div>
			<div class="xxpl_OrganizationInfo_con_detail video_detial">
				<div>
					<div>
						<video controls="controls" name="media">
							您的浏览器不支持 video 标签。
							<source src="http://121.12.89.108/6972EBC8D413173865F0160C9/030008010056C435AAC33F300FC43A8ECCE961-C0E1-92D7-15C9-C622D0C61627.mp4?ccode=0501&amp;duration=282&amp;expire=18000&amp;psid=263900a9d4b9c83f03ff104cf83cc0ed&amp;ups_client_netip=77881982&amp;ups_ts=1521768081&amp;ups_userid=&amp;utid=e1g3EzC6K20CAXeIGYJteHk8&amp;vid=XMTQ3NDE2MDAyMA%3D%3D&amp;vkey=A8cb95d67283ecb1e69bfbb1b3ef3a660"
							type="video/mp4">
						</video>
						<p class="video-title">cctv-2</p>
						<p class="video-dsc">联金所集团2016新春盛典CEO李波先生致辞</p>
					</div>
					<div>
						<video controls="controls" name="media">
							您的浏览器不支持 video 标签。
							<source src="http://121.12.89.108/6972EBC8D413173865F0160C9/030008010056C435AAC33F300FC43A8ECCE961-C0E1-92D7-15C9-C622D0C61627.mp4?ccode=0501&amp;duration=282&amp;expire=18000&amp;psid=263900a9d4b9c83f03ff104cf83cc0ed&amp;ups_client_netip=77881982&amp;ups_ts=1521768081&amp;ups_userid=&amp;utid=e1g3EzC6K20CAXeIGYJteHk8&amp;vid=XMTQ3NDE2MDAyMA%3D%3D&amp;vkey=A8cb95d67283ecb1e69bfbb1b3ef3a660"
							type="video/mp4">
						</video>
						<p class="video-title">cctv-2</p>
						<p class="video-dsc">联金所集团2016新春盛典CEO李波先生致辞</p>
					</div>
				</div>
				<div>
					<div>
						<video controls="controls" name="media">
							您的浏览器不支持 video 标签。
							<source src="http://121.12.89.108/6972EBC8D413173865F0160C9/030008010056C435AAC33F300FC43A8ECCE961-C0E1-92D7-15C9-C622D0C61627.mp4?ccode=0501&amp;duration=282&amp;expire=18000&amp;psid=263900a9d4b9c83f03ff104cf83cc0ed&amp;ups_client_netip=77881982&amp;ups_ts=1521768081&amp;ups_userid=&amp;utid=e1g3EzC6K20CAXeIGYJteHk8&amp;vid=XMTQ3NDE2MDAyMA%3D%3D&amp;vkey=A8cb95d67283ecb1e69bfbb1b3ef3a660"
							type="video/mp4">
						</video>
						<p class="video-title">cctv-2</p>
						<p class="video-dsc">联金所集团2016新春盛典CEO李波先生致辞</p>
					</div>
					<div>
						<video controls="controls" name="media">
							您的浏览器不支持 video 标签。
							<source src="http://121.12.89.108/6972EBC8D413173865F0160C9/030008010056C435AAC33F300FC43A8ECCE961-C0E1-92D7-15C9-C622D0C61627.mp4?ccode=0501&amp;duration=282&amp;expire=18000&amp;psid=263900a9d4b9c83f03ff104cf83cc0ed&amp;ups_client_netip=77881982&amp;ups_ts=1521768081&amp;ups_userid=&amp;utid=e1g3EzC6K20CAXeIGYJteHk8&amp;vid=XMTQ3NDE2MDAyMA%3D%3D&amp;vkey=A8cb95d67283ecb1e69bfbb1b3ef3a660"
							type="video/mp4">
						</video>
						<p class="video-title">cctv-2</p>
						<p class="video-dsc">联金所集团2016新春盛典CEO李波先生致辞</p>
					</div>
				</div>
				<div>
					<div>
						<video controls="controls" name="media">
							您的浏览器不支持 video 标签。
							<source src="http://121.12.89.108/6972EBC8D413173865F0160C9/030008010056C435AAC33F300FC43A8ECCE961-C0E1-92D7-15C9-C622D0C61627.mp4?ccode=0501&amp;duration=282&amp;expire=18000&amp;psid=263900a9d4b9c83f03ff104cf83cc0ed&amp;ups_client_netip=77881982&amp;ups_ts=1521768081&amp;ups_userid=&amp;utid=e1g3EzC6K20CAXeIGYJteHk8&amp;vid=XMTQ3NDE2MDAyMA%3D%3D&amp;vkey=A8cb95d67283ecb1e69bfbb1b3ef3a660"
							type="video/mp4">
						</video>
						<p class="video-title">cctv-2</p>
						<p class="video-dsc">联金所集团2016新春盛典CEO李波先生致辞</p>
					</div>
					<div>
						<video controls="controls" name="media">
							您的浏览器不支持 video 标签。
							<source src="http://121.12.89.108/6972EBC8D413173865F0160C9/030008010056C435AAC33F300FC43A8ECCE961-C0E1-92D7-15C9-C622D0C61627.mp4?ccode=0501&amp;duration=282&amp;expire=18000&amp;psid=263900a9d4b9c83f03ff104cf83cc0ed&amp;ups_client_netip=77881982&amp;ups_ts=1521768081&amp;ups_userid=&amp;utid=e1g3EzC6K20CAXeIGYJteHk8&amp;vid=XMTQ3NDE2MDAyMA%3D%3D&amp;vkey=A8cb95d67283ecb1e69bfbb1b3ef3a660"
							type="video/mp4">
						</video>
						<p class="video-title">cctv-2</p>
						<p class="video-dsc">联金所集团2016新春盛典CEO李波先生致辞</p>
					</div>
				</div>
				<p class='video-more'>查看更多>></p>
			</div>
		</div> -->
		<!-- 员工风貌 -->
		<div id="staffAppearance" ref="staffAppearance" class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_staffAppearance">
			<div class="common_title platInfo_staffAppearance">
				<p class="p_title2"><span>员工风貌</span></p>
			</div>
			<div id="staffAppearance_detial_wrap" ref="staffAppearance_detial_wrap">
				<div class="staffAppearance_detial staffAppearance_detial_padingTop">
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_jqzx_01.jpg" alt="联金所员工风貌">
						</div>
						<p>搬迁新址 服务升级</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_jqzx_02.jpg" alt="联金所员工风貌">
						</div>
						<p>搬迁新址 服务升级</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_jqzx_03.jpg" alt="联金所员工风貌">
						</div>
						<p>搬迁新址 服务升级</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_jqzx_04.jpg" alt="联金所员工风貌">
						</div>
						<p>搬迁新址 服务升级</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_jqzx_05.jpg" alt="联金所员工风貌">
						</div>
						<p>搬迁新址 服务升级</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_jqzx_06.jpg" alt="联金所员工风貌">
						</div>
						<p>搬迁新址 服务升级</p>
					</li>
				</div>

				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_funSports_01.jpg" alt="联金所员工风貌">
						</div>
						<p>亲子趣味运动会</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_funSports_02.jpg" alt="联金所员工风貌">
						</div>
						<p>亲子趣味运动会</p>
					</li>
				</div>

				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_funSports_03.jpg" alt="联金所员工风貌">
						</div>
						<p>亲子趣味运动会</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_funSports_04.jpg" alt="联金所员工风貌">
						</div>
						<p>亲子趣味运动会</p>
					</li>
				</div>

				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_funSports_05.jpg" alt="联金所员工风貌">
						</div>
						<p>亲子趣味运动会</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/staffStyle_funSports_06.jpg" alt="联金所员工风貌">
						</div>
						<p>亲子趣味运动会</p>
					</li>
				</div>

				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc100.jpg" alt="联金所员工风貌">
						</div>
						<p>3周年庆典</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc101.jpg" alt="联金所员工风貌">
						</div>
						<p>3周年庆典</p>
					</li>
				</div>



				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc103.jpg" alt="联金所员工风貌">
						</div>
						<p>4周年庆典</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc104.jpg" alt="联金所员工风貌">
						</div>
						<p>3周年庆典</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc105.jpg" alt="联金所员工风貌">
						</div>
						<p>3周年庆典</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc1.jpg" alt="联金所员工风貌">
						</div>
						<p>2周年生日会</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc2.jpg" alt="联金所员工风貌">
						</div>
						<p>2周年生日会</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc3.jpg" alt="联金所员工风貌">
						</div>
						<p>2016年中层管理培训</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc4.jpg" alt="联金所员工风貌">
						</div>
						<p>办公室环境布置</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc5.jpg" alt="联金所员工风貌">
						</div>
						<p>办公室环境布置</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc6.jpg" alt="联金所员工风貌">
						</div>
						<p>办公室环境布置</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc7.jpg" alt="联金所员工风貌">
						</div>
						<p>年会活动</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc8.jpg" alt="联金所员工风貌">
						</div>
						<p>年会活动</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc9.jpg" alt="联金所员工风貌">
						</div>
						<p>年会活动</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc10.jpg" alt="联金所员工风貌">
						</div>
						<p>年会活动</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc11.jpg" alt="联金所员工风貌">
						</div>
						<p>年会活动</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc12.jpg" alt="联金所员工风貌">
						</div>
						<p>年会活动</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc13.jpg" alt="联金所员工风貌">
						</div>
						<p>年会活动</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc14.jpg" alt="联金所员工风貌">
						</div>
						<p>年会活动</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc15.jpg" alt="联金所员工风貌">
						</div>
						<p>年会活动</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc16.jpg" alt="联金所员工风貌">
						</div>
						<p>年会活动</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc17.jpg" alt="联金所员工风貌">
						</div>
						<p>素质拓展</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc18.jpg" alt="联金所员工风貌">
						</div>
						<p>素质拓展</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc19.jpg" alt="联金所员工风貌">
						</div>
						<p>素质拓展</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc20.jpg" alt="联金所员工风貌">
						</div>
						<p>投标人见面会</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc21.jpg" alt="联金所员工风貌">
						</div>
						<p>投标人见面会</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc22.jpg" alt="联金所员工风貌">
						</div>
						<p>投标人见面会</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc23.jpg" alt="联金所员工风貌">
						</div>
						<p>员工活动</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc24.jpg" alt="联金所员工风貌">
						</div>
						<p>员工培训</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc25.jpg" alt="联金所员工风貌">
						</div>
						<p>员工培训</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc26.jpg" alt="联金所员工风貌">
						</div>
						<p>员工培训</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc27.jpg" alt="联金所员工风貌">
						</div>
						<p>员工生日会</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc28.jpg" alt="联金所员工风貌">
						</div>
						<p>员工活动</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc29.jpg" alt="联金所员工风貌">
						</div>
						<p>员工活动</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc30.jpg" alt="联金所员工风貌">
						</div>
						<p>员工活动</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc31.jpg" alt="联金所员工风貌">
						</div>
						<p>员工活动</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/info_ygfc32.jpg" alt="联金所员工风貌">
						</div>
						<p>员工活动</p>
					</li>
				</div>
			</div>
			<div id='staff_more' ref="staff_more" class="staffAppearance_detial_more" @click="view('staff')">
				<p>查看更多>></p>
			</div>
		</div>
		<!-- 重大事项 -->
		<div class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_bigThings" id="bigThings" ref="bigThings">
			<div class="common_title platInfo_bigThings">
				<p class="p_title2"> <span>重大事项</span></p>
			</div>
			<div class="bigThings_detail">
				<div class="bigThings_detail_con">
					<table cellspacing="0">
						<tbody>
						<tr>
							<th>重大风险信息</th>
							<th>详情</th>
						</tr>
						<tr>
							<th>减资、合并、分立、解散或者申请破产</th>
							<th>无</th>
						</tr>
						<tr>
							<th>依法进入破产程序</th>
							<th>无</th>
						</tr>
						<tr>
							<th>被责令停业、整顿、关闭</th>
							<th>无</th>
						</tr>
						<tr>
							<th>涉及重大诉讼、仲裁、或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚</th>
							<th>无</th>
						</tr>
						<tr>
							<th>法定代表人、实际控制人、主要负责人、董事、监事、高级管理人员涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施</th>
							<th>无</th>
						</tr>
						<tr>
							<th>主要或者全部业务陷入停顿</th>
							<th>无</th>
						</tr>
						<tr>
							<th>存在欺诈、损害出借人利益等其他营销网贷机构经营活动的重大事项</th>
							<th>无</th>
						</tr>
						</tbody>
					</table>

				</div>

			</div>

			<div class="legalPerson_signature">
				<img src="./images/legalPerson_signature.png" alt="">
			</div>
		</div>
		<!-- 荣誉证书 -->
		<div class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_staffAppearance" id="honor" ref="honor">
			<div class="common_title platInfo_staffAppearance">
				<p class="p_title2"> <span>荣誉证书</span> </p>
			</div>
			<div id="honor_detial_wrap">
				<div class="staffAppearance_detial staffAppearance_detial_padingTop">
					<li>
						<div class="imgWrap">
							<img src="./images/honor_gdjrxh.png" alt="联金所员工风貌">
						</div>
						<p>广东互联网金融协会副会长单位证书</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/honor_xfqy.png" alt="联金所员工风貌">
						</div>
						<p>广东省金融消费权益保护联合会会员单位</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/honor_jrfwwb.png" alt="联金所员工风貌">
						</div>
						<p>深圳市金融服务外包协会副会长单位</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/honor_50qiang.png" alt="联金所员工风貌">
						</div>
						<p>年度中国互联网金融平台50强</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/honor_zjjrfw.png" alt="联金所员工风貌">
						</div>
						<p>深圳金融名片-最佳新金融服务品牌</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/honer_7.png" alt="联金所员工风貌">
						</div>
						<p>深圳市互联网金融协会副会长单位</p>
					</li>
				</div>


				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/honer_8.png" alt="联金所员工风貌">
						</div>
						<p>2015年度互联网金融平台50强</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/honer_9.png" alt="联金所员工风貌">
						</div>
						<p>2014年度最受关注互联网金融创新力企业</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/honer_10.png" alt="联金所员工风貌">
						</div>
						<p>深圳市互联网金融协会副会长单位</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/honer_11.png" alt="联金所员工风貌">
						</div>
						<p>每日经济新闻2014年度稳健平台</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/honer_12.png" alt="联金所员工风貌">
						</div>
						<p>百度站长平台最受欢迎新站</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/honer_13.png" alt="联金所员工风貌">
						</div>
						<p>第八界深圳国际金融博览会最受媒体关注奖</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/honer_14.png" alt="联金所员工风貌">
						</div>
						<p>广东互联网金融协会年度新人奖</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/honer_15.png" alt="联金所员工风貌">
						</div>
						<p>互联网金融公益联盟企业</p>
					</li>
				</div>
				<div class="staffAppearance_detial">
					<li>
						<div class="imgWrap">
							<img src="./images/honer_16.png" alt="联金所员工风貌">
						</div>
						<p>华夏银行最佳合作客户</p>
					</li>
					<li>
						<div class="imgWrap">
							<img src="./images/honer_17.png" alt="联金所员工风貌">
						</div>
						<p>2015年度深圳金融名片</p>
					</li>
				</div>
			</div>
			<div id='honor_more' ref="honor_more" class="staffAppearance_detial_more clearfix"  @click="view('honor')">
				<p>查看更多>></p>
			</div>
			<div class="legalPerson_signature">
				<img src="./images/legalPerson_signature.png" alt="">
			</div>
		</div>
		<!-- 资质证书 -->
		<div class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_staffAppearance" id="aptitude" ref="aptitude">
			<div class="common_title platInfo_staffAppearance">
				<p class="p_title2"><span>资质证书</span></p>
			</div>
			<div class="staffAppearance_detial staffAppearance_detial_padingTop">
				<li>
					<div class="imgWrap">
						<img src="./images/OrganizationInfo_business_certificates1.png" alt="联金所员工风貌">
					</div>
					<p>机构信用代码</p>
				</li>
				<li>
					<div class="imgWrap">
						<img src="./images/OrganizationInfo_business_certificates2.png" alt="联金所员工风貌">
					</div>
					<p>开户许可证</p>
				</li>
			</div>
			<div class="staffAppearance_detial">
				<li>
					<div class="imgWrap">
						<img src="./images/OrganizationInfo_business_certificates3.png" alt="联金所员工风貌">
					</div>
					<p>主体登记及备案信息查询</p>
				</li>
				<li>
					<div class="imgWrap">
						<img src="./images/OrganizationInfo_business_certificates4.png" alt="联金所员工风貌">
					</div>
					<p>营业执照</p>
				</li>
			</div>
			<div class="staffAppearance_detial">
				<li>
					<div class="imgWrap">
						<img src="./images/OrganizationInfo_business_certificates5.png" alt="联金所员工风貌">
					</div>
					<p>众信网认证</p>
				</li>
				<li>
					<div class="imgWrap">
						<img src="./images/OrganizationInfo_business_certificates6.png" alt="联金所员工风貌">
					</div>
					<p>深圳电子商务市场监督服务网</p>
				</li>
			</div>
			<div class="legalPerson_signature">
				<img src="./images/legalPerson_signature.png" alt="">
			</div>
		</div>
		<!-- 组织架构 -->
		<div id="Organization" ref="Organization" class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_Organization">
			<div class="common_title platInfo_Organization">
				<p class="p_title2"><span>组织架构</span></p>
			</div>
			<div class="Organization_detial">
				<img src="./images/OrganizationInfo_business_Organization.png?2018.4.9" alt="组织架构">
			</div>
		</div>
		<!-- 公司团队 -->
		<div id="CompanyTeam" ref="CompanyTeam" class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_CompanyTeam">
			<div class="common_title platInfo_CompanyTeam">
				<p class="p_title2"> <span>公司团队</span> </p>
			</div>
			<div class="Legal_Person">
				<div>
						<span>
							<span>法定代表人/执行董事: 郭晓军</span>
							<span>监事:李思敏</span>
						</span>
				</div>
			</div>
			<div class="teamTitle">
				<h4>高管团队</h4>
				<p>知名银行、大型机构从业背景，金融基因与互联网技术</p>
				<p>完美融合。</p>
			</div>
			<div class="teamPerson">
				<ul class="person">
					<li>
						<img src="./images/OrganizationInfo_liuzhe.png" alt="">
						<p>刘哲</p>
						<p>首席执行官</p>
					</li>
					<li>毕业于中山大学。联金所联合创始人，曾就职于深圳赫美小额贷款股份有限公司，历任公司业务部负责人、 金融市场部负责人，主办过亿元级企业融资，具有开放的互联网思维及全面的金融理论基础，对网络理财产品运作模式理解深刻。有丰富的运营规划和管理经验。</li>
				</ul>
				<ul class="person">
					<li>毕业于武汉大学经济与管理学院数理金融实验班，经济学学士，工商管理硕士。曾任职于交通银行深圳分行，负责会计核算和风险控制等工作。于2011年投身于互联网金融领域，硕士论文的研究方向即为互联网金融，在互联网金融行业有着丰富的理论知识和长期的实践经验。作为广东某互联网金融平台的联合创始人，有六年互金运营管理经验、三年互金创业经验。现任联金所首席运营官。</li>
					<li>
						<img src="./images/OrganizationInfo_kangpingping.png" alt="">
						<p>康萍萍</p>
						<p>首席运营官</p>
					</li>
				</ul>

				<ul class="person">
					<li>
						<img src="./images/OrganizationInfo_zhaoyong.png" alt="">
						<p>赵永</p>
						<p>首席技术官</p>
					</li>
					<li>华南理工大学工商管理硕士，曾任职于多家国内外软件上市公司，服务客户包括瑞士银行、中国银行、华为等大型公司以及初创型互联网金融公司。十二年互联网及软件咨询、设计和管理从业经历，对提供安全可靠的互联网金融解决方案及研发管理有着丰富的理论研究和实践经验。</li>
				</ul>

				<ul class="person">
					<li>华南理工大学工商管理学院企管研究生学历，熟悉国家会计法规、税务法规，多年企业财务会计负责人管理工作经验，严谨的管理思维，擅长企业财务内控建设、财务体系建立、企业财务风险管理，2015年初正式加入深圳联金所。</li>
					<li>
						<img src="./images/OrganizationInfo_panyuming.png" alt="">
						<p>潘宇明</p>
						<p>首席财务官</p>
					</li>
				</ul>
			</div>
			<div class="teamTitle2">
				<h4>从业人员</h4>
			</div>
			<div class="staff_distributed">
				<div>
					<img src="./images/OrganizationInfo_staff-education.png">
				</div>
				<div>
					<img src="./images/OrganizationInfo_staff-age.png">
				</div>
				<div class="staff_desc">
					<p>公司目前在职人数：43人；</p>
					<p>公司目前人员情况：学历分布：硕士3人，本科19人，</p>
					<p>大专及以下21人；</p>
					<p>年龄分布情况：41.9%在25岁以下，32.5%在26-29之间，</p>
					<p>25.6%在30-39岁之间。</p>
				</div>
			</div>
			<div class="legalPerson_signature">
				<img src="./images/legalPerson_signature.png" alt="">
			</div>
		</div>
		<!-- 联系我们 -->
		<div id="OrganizationInfo_contactUs" ref="OrganizationInfo_contactUs" class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_contactUs">
			<div class="common_title platInfo_contactUs">
				<p class="p_title2"><span>联系我们</span></p>
			</div>
			<ul>
				<li>
					<p>办公地址</p>
					<p>广东省深圳市福田区天安数码城</p>
					<p>创新科技广场一期B座10楼</p>
				</li>
				<li>
					<p>客服热线</p>
					<p>400-867-9888&0755-88607525</p>
					<p> (周一~周五 09:00-20:00) </p>
					<p> (周六~周日 09:00-12:00 13:30-18:00)</p>
				</li>
				<li>
					<p>会员QQ群</p>
					<p>联金所核心用户群: 303424792</p>
					<p>联金所VIP2群: 152770274</p>
				</li>
				<li>
					<p>邮箱</p>
					<p>客服邮箱: kefu@uf-club.com</p>
					<p>业务合作: coop@uf-club.com</p>
				</li>
			</ul>
			<div class="legalPerson_signature">
				<img src="./images/legalPerson_signature.png" alt="">
			</div>
		</div>
		<!-- 投诉渠道 -->
		<div class="xxpl_OrganizationInfo_con xxpl_OrganizationInfo_complaintChannel" id="complaintChannel" ref="complaintChannel">
			<div class="common_title platInfo_complaintChannel">
				<p class="p_title2"> <span>投诉渠道</span> </p>
			</div>
			<ul class="complaintChannel_desc">
				<li>
					<div>投诉、咨询、举报联系电话</div>
					<div>
						<p>400-867-9888</p>
						<p> (周一~周五 09:00-20:00)</p>
						<p> (周六~周日 09:00-12:00 13:00-18:00)</p>
					</div>
				</li>
				<li>
					<div>
						电子邮箱
					</div>
					<div>
						<p>kefu@uf-club.com</p>
					</div>
				</li>
				<li>
					<div>
						通讯地址
					</div>
					<div>
						<p>深圳市福田区泰然四路</p>
						<p> 创新科技广场一期B座1011</p>
					</div>
				</li>
			</ul>
		</div>
		<!--  联金所底部 -->
		<div class="xxpl_ljsLogo">
			<img src="./images/OrganizationInfo_ljsLogo.png" alt="">
		</div>

	</div>

</anchor-scroll>


</div>


</template>

<script>

	import AnchorScroll from "@/components/common/anchorScroll/anchorScroll"

	export default {
		data() {
			return {
				isMenuOpen:false,
				growArrowUp: true,
				scrollTop: 0
			}
		},
		mounted () {

		},
		methods: {
			menuSwitch () {
				this.isMenuOpen = !this.isMenuOpen;
			},
			closeMenu () {
				this.isMenuOpen = false;
			},
			jump (ref) {
				this.scrollTop = this.$refs[ref].offsetTop ;

			},


			/* 查看更多 */
			view(str) {
				var divLens;
				if (str == 'staff') {
					divLens = this.$refs.staffAppearance_detial_wrap.children.length;
					for (var i = 0; i <= divLens - 1; i++) {
						var t = this.$refs.staffAppearance_detial_wrap.children[i]
						t.style.display = "flex";
					}
					this.$refs.staff_more.style.display = "none";
				} else if (str = 'honor') {
					divLens = document.getElementById('honor_detial_wrap').children.length;
					for (var i = 0; i <= divLens - 1; i++) {
						var t = document.getElementById('honor_detial_wrap').children[i]
						t.style.display = "flex";
					}
					document.getElementById('honor_more').style.display = "none";
				}
			},

			changeTop ( direction ) {
				const parentH = parseFloat(this.$refs.growContent_parent.offsetHeight) ;
				const contentH = parseFloat(this.$refs.growContent.offsetHeight);
				const diffH = contentH -parentH;
				let step = 150;
				let growContentStyle = this.$refs.growContent.style;
				if(this.$refs.growContent.style.top == '') {
					this.$refs.growContent.style.top = 0;
				}
				if(direction == "down"){
					step = -150;
				}
				growContentStyle.top = parseFloat(growContentStyle.top) - step + 'px';
				if( parseFloat(growContentStyle.top) <= -diffH || parseFloat(growContentStyle.top) >= 0 ) {
					this.growArrowUp = !this.growArrowUp;
				}

			}

		},
		components: {
			AnchorScroll
		}
	};
</script>
<style lang='less' scoped>
@import "./infoDis.less";

	.organizationInfo_outDiv {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	}
</style>

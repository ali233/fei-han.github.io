/**瀑布流布局
 **使用绝对定位，把每个元素放在列中最短的位置
 *计算容器宽度；列宽度；最小列数=容器宽度/列宽度
 *获得列数后，需要保存每个列的当前高度，这样在添加每个数据块时，才知道起始高度是多少;
 *依次取容器中的所有数据块，先寻找当前高度最小的某列;
 *根据列序号，确定数据块的left，top值，最后更新所在列的当前高度加上这个数据块元素的高度，至此，插入一个元素结束
 *当所有元素插入完毕后，调整容器的高度为各列最大的高度值，结束依次调整
 * 
 */
render()
$(window).on('resize',function(){
	render();
})

function render(){
	var windowWidth = $(window).width();
	var itemsWidth = $('.items').outerWidth(true);
	var colNum = Math.floor(windowWidth/itemsWidth);
	var colNowHeight = []; //存放每一列当前总的高度
	for (var i = 0; i < colNum; i++) {
		colNowHeight.push(0);
	}
	$('.items').each(function(){
		var $this = $(this);
		var mincolHeight = colNowHeight[0];
		var index = 0; //最小总高度列的下标
		for (var i = 0; i < colNowHeight.length; i++) {
			if(colNowHeight[i] < mincolHeight){
				mincolHeight = colNowHeight[i];
				index = i;
			}
		}
		$this.css({
			left : index*itemsWidth,
			top : mincolHeight
		});
		colNowHeight[index] = colNowHeight[index] + $this.outerHeight(true);
	});
}
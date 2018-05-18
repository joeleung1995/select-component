(function () {

	var fruitList = null;

	function init () {
		getData();
		bindEvent();
	}

	init();

	// 从后台获取数据并渲染
	function getData () {

		ajax("GET", "https://www.joeleung1995.cn/xiguatest", "", handleData, true);

		function handleData (res) {
			
			fruitList = JSON.parse(res).data;

			var	oUl = document.getElementsByTagName("ul")[0],
				fragment = document.createDocumentFragment(),
				oLi;

			fruitList.forEach( elem => {
				oLi = document.createElement("li");
				oLi.innerHTML = elem.name;
				fragment.appendChild(oLi);
			})

			oUl.appendChild(fragment);

		}
	}

	function bindEvent () {

		var triangle = document.getElementsByClassName("triangle")[0],
			btn = document.getElementsByClassName("btn")[0],
			input = document.getElementsByTagName("input")[0],
			resultBbox = document.getElementsByClassName("result-box")[0];

		var time_click = 0, //用来处理失去焦点同时点击button造成触发两次toggle的bug
			time_blur = 0;

		// 绑定按钮的点击事件
		btn.addEventListener("click",  () => {
			time_click = new Date().getTime();
			if (time_click - time_blur > 200 || time_click - time_blur < 0) {
				resultBbox.classList.toggle("show");
				triangle.classList.toggle("rotate");
			}
		})

		// 输入框获取焦点时，下拉列表展开
		input.addEventListener("focus", () => {
			resultBbox.classList.add("show");
			triangle.classList.add("rotate");
		})

		// 输入框失去焦点时，下拉列表收起
		input.addEventListener("blur", () => {
			time_blur = new Date().getTime();
			resultBbox.classList.remove("show");
			triangle.classList.remove("rotate");
		})

		// 当输入时，进行检索
		input.addEventListener("input", e => {
			if (fruitList) {
				var oLis = Array.from(document.getElementsByClassName("redWords"));
				oLis.forEach( elem => {
					elem.classList.remove("redWords");
				})
				check(fruitList, e.target.value);
			}
		})

	}

	function check (list, val) {

		val = val.toUpperCase(); //不区分大小写

		list.forEach( (elem, index) => {
			var redWords = elem.name.slice(0, val.length),
				normalWords = elem.name.slice(val.length);

				redWords_upper = redWords.toUpperCase();
			
			if(redWords_upper == val) {
				var oLi = document.getElementsByTagName("li")[index];
				oLi.innerHTML = `<span class="redWords">${redWords}</span>${normalWords}`
			}
		})
	}



})()

"use strict";

function Nodes({ $app, initialState, onMetClick, onGateClick, onBackClick }) {
	//초기화
	this.state = initialState.nodes;
	this.isRoot = initialState.isRoot;
	this.$target = document.createElement("div");
	this.$target.className = "Nodes";
	$app.appendChild(this.$target);

	this.setState = (state) => {
		this.state = state.nodes;
		this.isRoot = state.isRoot;
		this.render();
	};

	this.render = () => {
		//state에는 node라는 Array-attribute가 있음
		//나였으면 for문으로 했을 것을 map으로 매우 깔끔한 코드로 작성됨...!
		this.$target.innerHTML = "";
		if (this.isRoot) {
			console.log("IS ROOT!!");
		} else {
			console.log("IS NOT ROOT!!");
			this.$target.innerHTML = `<div><img class="Prev" src="../assets/prev.png" width="180"></div>`;
		}
		const arry = this.state.map(
			(node) => `
            <div class="Node">
                ${
									node.type == "DIRECTORY"
										? `<img class="Gate" name="${node.name}" id="${node.id}" src="../assets/directory.png">`
										: `<img class="Met" name="${node.name}" id="${node.filePath}" src="../assets/file.png">`
								}
                ${node.name}
            </div>`
		);
		this.$target.innerHTML += arry.join("");
		// this.$target.style.display = this.state ? "block" : "none";

		//여기가 맞나???

		if (!this.isRoot) {
			const prev = this.$target.querySelector(".Prev");
			prev.addEventListener("click", onBackClick);
		}

		const gates = this.$target.querySelectorAll(".Gate");
		gates.forEach((node) => node.addEventListener("click", onGateClick));

		const mets = this.$target.querySelectorAll(".Met");
		mets.forEach((node) => node.addEventListener("click", onMetClick));

		//어떻게하면 모든 Gate 클래스 얘들에게 이벤트 리스너를 부착할 수 있을까?
	};

	//초기화(객체 생성시)하면서 화면 렌더링
	// this.render();
}
//https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public/images/a2i.jpg
//https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public/${node.filePath}
export default Nodes;

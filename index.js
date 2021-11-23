let page = 1;
let limit = 25;
let name_div = document.querySelector(".results");

function showResults(data) {
	data.forEach((e) => {
		console.log(e.login);
		let div = document.createElement("div");
		const htmlData = `
	    <div class="card">
				<p class="name">${e.login}</p>
			</div>
	    `;

		div.innerHTML = htmlData;
		name_div.insertAdjacentElement("beforeend", div);
	});
}

const getData = async () => {
	const ip = document.getElementById("inputBox").value;
	console.log("fetching ip", ip, page, limit);
	const res = await fetch(
		`https://api.github.com/users?name=${ip}?page=${page}&per_page=${limit}`
	);
	const data = await res.json();

	console.log(data);

	showResults(data);
};

const debounce = function (fun, d) {
	let timer;
	return function () {
		clearTimeout(timer);
		timer = setTimeout(() => {
			getData.apply();
		}, d);
	};
};

const betterFunction = debounce(getData, 300);

const showData = () => {
	setTimeout(() => {
		page++;
		getData();
	}, 300);
};

name_div.addEventListener("scroll", function () {
	const { scrollHeight, scrollTop, clientHeight } =
		document.querySelector(".results");

	if (scrollHeight - (scrollTop + 2) <= clientHeight) {
		showData();
	}
});

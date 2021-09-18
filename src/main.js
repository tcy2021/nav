const $sitelist = $(".sitelist");
const $lastLi = $sitelist.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "J",
    url: "http://js.jirengu.com/",
  },
  { logo: "F", url: "https://www.figma.com/" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $sitelist.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
          <div class="logo">${node.logo[0]}</div>
          <div class="link">${simplifyUrl(node.url)}
          </div>
          <div class="close"><svg class="icon">
          <use xlink:href="#icon-close"></use>
               </svg></div>
        </div>
    </li>`).insertBefore($lastLi); //$2 用jQuery获取（），${}js的语法
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });

  render();
  //   console.log($sitelist);
  //   const $li = $(`<li>
  //   <a href="${url}">
  //     <div class="site">
  //       <div class="logo">${url[0]}</div>
  //       <div class="link">${url}</div>
  //     </div>
  //   </a>
  // </li>`).insertBefore($lastLi);
});

window.onbeforeunload = () => {
  //   console.log("页面要关闭了");
  const string = JSON.stringify(hashMap);
  //   console.log(typeof hashMap);
  //   console.log(hashMap);
  //   console.log(typeof string);
  //   console.log(string);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

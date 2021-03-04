function search() {
  window.location.href = `https://www.baidu.com/s?ie=UTF-8&wd=${encodeURIComponent(
    document.getElementById("search").value
  )}`;
}

document.getElementById("search").onkeypress = function (e) {
  if (e.key === "Enter" || e.code === "Enter") {
    search();
  }
};

document.getElementById("submit").onclick = search;

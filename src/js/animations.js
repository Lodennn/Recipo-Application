const scrollbar = document.querySelector(".scrollbar");
const bookmarks = document.querySelector(".bookmarks");
const bookmarksPreviewList = bookmarks.querySelector(".preview__recipe-list");

bookmarks.addEventListener("scroll", function (e) {
  const scrollPos = Math.trunc(e.target.scrollTop);
  //prettier-ignore
  const bookmarksPreviewListHeight = parseInt(getComputedStyle(bookmarksPreviewList).height);

  const bookmarksHeight = parseInt(getComputedStyle(bookmarks).height);
  //prettier-ignore
  const scrollPosInPercentage = Math.floor((scrollPos / (bookmarksPreviewListHeight - bookmarksHeight)) * 100);

  scrollbar.style.height = `${scrollPosInPercentage}%`;
});

export function recipeAnimation(parentEl) {
  setTimeout(() => {
    const recipeTitle = parentEl.querySelector(".recipe-title");
    recipeTitle.classList.add("animate");
  }, 10);
}

export function sidebarAnimation(renderStatus) {
  const sidebar = document.querySelector(".sidebar");
  if (renderStatus || window.innerWidth >= 1200) {
    console.log(true, "75em");
    sidebar.classList.remove("mob-sidebar");
  } else {
    sidebar.classList.add("mob-sidebar");
  }
}

console.log("animations");

// Add JS here
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    document.getElementById('next-page').click();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    document.getElementById('prev-page').click();
  }
});
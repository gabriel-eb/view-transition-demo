// Add JS here

document.addEventListener("keydown", (e) => {
  console.log(e.code);
  if (e.code === "ArrowRight") {
    document.getElementById('next-page').click();
  }
});
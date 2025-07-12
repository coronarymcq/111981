document.querySelectorAll(".qscon h3").forEach((heading) => {
  heading.style.marginTop = "30px";
});

document.querySelectorAll('.qscon input[type="radio"]').forEach((radio) => {
  radio.addEventListener("click", function () {
    const questionGroup = this.name;
    const parentDiv = this.closest(".qscon");

    // Hide all explanations for this question group
    parentDiv.querySelectorAll(`p.explanation`).forEach((p) => {
      if (
        p.previousElementSibling.querySelector(`input[name="${questionGroup}"]`)
      ) {
        p.style.display = "none";
      }
    });

    // Show explanation just after this question group
    let sibling = this.parentElement;
    while (sibling && sibling.tagName.toLowerCase() !== "p") {
      sibling = sibling.nextElementSibling;
    }
    if (sibling && sibling.classList.contains("explanation")) {
      sibling.style.display = "block";
    }
  });
});

document
  .getElementById("ai-generate-btn")
  .addEventListener("click", async function () {
    const inputText = document.getElementById("ai-text-input").value.trim();
    const statusDiv = document.getElementById("ai-status");
    const questionContainer = document.getElementById("ai-question-container");
    const progressBarContainer = document.getElementById(
      "progress-bar-container"
    );
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    if (!inputText) {
      alert("❗ Please enter a topic or content.");
      return;
    }

    statusDiv.innerText = "⏳ AI is generating questions… please wait…";
    questionContainer.innerHTML = "";
    progressBarContainer.style.display = "block";
    progressBar.style.width = "0%";
    progressText.innerText = "0%";

    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 90) {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress > 90) progress = 90;
        progressBar.style.width = progress + "%";
        progressText.innerText = progress + "%";
      }
    }, 300);

    const prompt = `
You are a high-yield USMLE Step 2 CK tutor.

Generate 10 NEW, UNIQUE high-yield multiple-choice questions (MCQs), First Aid-style, based on the medical content below.

Format output EXACTLY like this example (including tags and styles):

<h3>Q1: What is the diagnosis?</h3>
<ul>
  <li><input type="radio" name="q1" data-correct="false"> A. Option 1</li>
  <li><input type="radio" name="q1" data-correct="true"> B. Option 2</li>
  <li><input type="radio" name="q1" data-correct="false"> C. Option 3</li>
  <li><input type="radio" name="q1" data-correct="false"> D. Option 4</li>

</ul>
<p class="explanation" style="display:none;">Explanation: This is why B is correct...</p>

CONTENT:
"""${inputText}"""
  `;

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
            // <-- Replace this with your actual key
          },
          body: JSON.stringify({
            model: "openrouter/auto",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.5,
          }),
        }
      );

      const data = await response.json();
      clearInterval(interval);
      progressBar.style.width = "100%";
      progressText.innerText = "100%";

      if (data.error) {
        questionContainer.innerHTML = `<p style="color: red;">❌ Error: ${data.error.message}</p>`;
        statusDiv.innerText = "Failed to generate questions.";
        progressBarContainer.style.display = "none";
        return;
      }

      const aiHTML =
        data.choices?.[0]?.message?.content ||
        "<p>AI failed to generate content.</p>";
      questionContainer.innerHTML = aiHTML;
      statusDiv.innerText = "✅ Questions ready!";

      const allInputs = questionContainer.querySelectorAll("input[type=radio]");
      allInputs.forEach((input) => {
        input.addEventListener("change", function () {
          const questionName = input.name;
          const questionOptions = questionContainer.querySelectorAll(
            `input[name="${questionName}"]`
          );

          questionOptions.forEach((opt) => (opt.disabled = true));
          questionOptions.forEach((opt) => {
            const li = opt.parentElement;
            if (opt.dataset.correct === "true") {
              li.style.backgroundColor = "#c8e6c9"; // green
            } else {
              li.style.backgroundColor = "#ffcdd2"; // red
            }
          });

          const explanation = input.closest("ul").nextElementSibling;
          if (explanation && explanation.classList.contains("explanation")) {
            explanation.style.display = "block";
          }
        });
      });

      setTimeout(() => {
        progressBarContainer.style.display = "none";
        progressText.innerText = "";
      }, 1500);
    } catch (err) {
      clearInterval(interval);
      progressBarContainer.style.display = "none";
      progressText.innerText = "";
      console.error("🔥 AI error:", err);
      statusDiv.innerText = "❌ Error while generating questions.";
    }
  });

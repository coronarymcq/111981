document
  .getElementById("ai-file-input")
  .addEventListener("change", async function () {
    const file = this.files[0];
    const reader = new FileReader();
    const statusDiv = document.getElementById("ai-status");
    const questionContainer = document.getElementById("ai-question-container");
    const progressBarContainer = document.getElementById(
      "progress-bar-container"
    );
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    statusDiv.innerText = "Reading file… please wait…";
    questionContainer.innerHTML = "";
    progressBarContainer.style.display = "block";
    progressBar.style.width = "0%";
    progressText.innerText = "0%";

    reader.onload = async function () {
      const fileContent = reader.result;
      console.log("📄 File content loaded:", fileContent);

      statusDiv.innerText = "AI is generating questions… please wait…";

      // Fake progress bar increments
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
You are a high-yield Step 2 CK-style medical tutor. 
A student uploaded content below. 

Generate 20 NEW, UNIQUE high-yield multiple-choice questions (MCQs), First Aid style, each with:

- Options marked with data-correct="true" or "false"
- An explanation paragraph after each question (initially hidden)
- Format output strictly as raw HTML like this example:

<h3>Q1: What is the most likely diagnosis?</h3>
<ul>
  <li><input type="radio" name="q1" data-correct="false"> A. Hypothyroidism</li>
  <li><input type="radio" name="q1" data-correct="true"> B. PCOS</li>
  <li><input type="radio" name="q1" data-correct="false"> C. Sheehan Syndrome</li>
</ul>
<p class="explanation" style="display:none;">Explanation: PCOS is the most likely diagnosis due to ...</p>

CONTENT:
"""${fileContent}"""
`;

      try {
        console.log("🚀 Sending request to OpenRouter API...");
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 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",
            },
            body: JSON.stringify({
              model: "openrouter/auto",
              messages: [{ role: "user", content: prompt }],
              temperature: 0.5,
            }),
          }
        );

        console.log("✅ Response received.");
        const data = await response.json();
        console.log("📦 OpenRouter API response:", data);

        clearInterval(interval);
        progressBar.style.width = "100%";
        progressText.innerText = "100%";

        if (data.error) {
          questionContainer.innerHTML = `<p style="color: red;">❌ Error: ${data.error.message}</p>`;
          statusDiv.innerText = "Failed to generate questions.";
          progressBarContainer.style.display = "none";
          progressText.innerText = "";
          return;
        }

        const aiHTML =
          data.choices?.[0]?.message?.content ||
          "<p>AI failed to generate content.</p>";
        questionContainer.innerHTML = aiHTML;
        statusDiv.innerText = "✅ Questions ready!";

        // Add interactivity to answers:
        const allInputs =
          questionContainer.querySelectorAll("input[type=radio]");
        allInputs.forEach((input) => {
          input.addEventListener("change", function () {
            const questionName = input.name;
            const questionOptions = questionContainer.querySelectorAll(
              `input[name="${questionName}"]`
            );

            // Disable all options after one is selected
            questionOptions.forEach((opt) => (opt.disabled = true));

            // Highlight correct and incorrect
            questionOptions.forEach((opt) => {
              const li = opt.parentElement;
              if (opt.dataset.correct === "true") {
                li.style.backgroundColor = "#c8e6c9"; // green
              } else {
                li.style.backgroundColor = "#ffcdd2"; // red
              }
            });

            // Show explanation paragraph
            const explanation = input.closest("ul").nextElementSibling;
            if (explanation && explanation.classList.contains("explanation")) {
              explanation.style.display = "block";
            }
          });
        });

        // Hide progress bar after a short delay
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
    };

    reader.readAsText(file);
  });

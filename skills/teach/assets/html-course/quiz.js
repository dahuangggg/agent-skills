(() => {
  const quizzes = document.querySelectorAll("[data-quiz]");

  for (const quiz of quizzes) {
    const quizId = quiz.dataset.quizId || "lesson-quiz";
    const questions = [...quiz.querySelectorAll("[data-question]")];
    const score = quiz.querySelector("[data-score]");
    const reset = quiz.querySelector("[data-reset]");
    const storageKey = `nova-teach:${quizId}`;

    const readState = () => {
      try {
        return JSON.parse(localStorage.getItem(storageKey) || "{}");
      } catch {
        return {};
      }
    };

    const state = readState();

    const updateScore = () => {
      const answered = questions.filter((question) => question.dataset.choice).length;
      const correct = questions.filter(
        (question) => question.dataset.choice === question.dataset.answer
      ).length;
      if (score) {
        score.textContent =
          answered === questions.length
            ? `完成：${correct}/${questions.length} 正确`
            : `进度：${answered}/${questions.length}，正确 ${correct}`;
      }
      localStorage.setItem(
        storageKey,
        JSON.stringify(
          Object.fromEntries(questions.map((question, index) => [index, question.dataset.choice || ""]))
        )
      );
    };

    const choose = (question, choice) => {
      const answer = question.dataset.answer;
      const feedback = question.querySelector("[data-feedback]");
      question.dataset.choice = choice;

      for (const button of question.querySelectorAll("[data-choice]")) {
        const selected = button.dataset.choice === choice;
        button.classList.toggle("is-selected", selected);
        button.classList.toggle("is-correct", selected && choice === answer);
        button.classList.toggle("is-wrong", selected && choice !== answer);
        button.setAttribute("aria-pressed", String(selected));
      }

      if (feedback) {
        const correct = choice === answer;
        feedback.textContent = correct
          ? feedback.dataset.correct || "正确。"
          : feedback.dataset.wrong || "再想一遍这个组件负责的是抽象、协议、执行还是治理。";
        feedback.classList.toggle("is-correct", correct);
        feedback.classList.toggle("is-wrong", !correct);
      }
      updateScore();
    };

    questions.forEach((question, index) => {
      for (const button of question.querySelectorAll("[data-choice]")) {
        button.addEventListener("click", () => choose(question, button.dataset.choice));
      }
      if (state[index]) choose(question, state[index]);
    });

    reset?.addEventListener("click", () => {
      localStorage.removeItem(storageKey);
      for (const question of questions) {
        delete question.dataset.choice;
        for (const button of question.querySelectorAll("[data-choice]")) {
          button.classList.remove("is-selected", "is-correct", "is-wrong");
          button.setAttribute("aria-pressed", "false");
        }
        const feedback = question.querySelector("[data-feedback]");
        if (feedback) {
          feedback.textContent = "";
          feedback.classList.remove("is-correct", "is-wrong");
        }
      }
      updateScore();
    });

    updateScore();
  }
})();

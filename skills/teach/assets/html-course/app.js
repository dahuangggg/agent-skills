(() => {
  "use strict";

  const normalize = (value) =>
    String(value ?? "")
      .normalize("NFKC")
      .toLocaleLowerCase("zh-CN")
      .replace(/\s+/g, " ")
      .trim();

  function setupMobileNavigation() {
    const button = document.getElementById("mobile-menu");
    const scrim = document.getElementById("sidebar-scrim");
    const sidebar = document.getElementById("site-sidebar");
    if (!button || !sidebar) return;

    const setOpen = (open) => {
      document.body.classList.toggle("sidebar-open", open);
      button.setAttribute("aria-expanded", String(open));
      if (open) sidebar.querySelector("input")?.focus();
    };

    button.addEventListener("click", () => setOpen(!document.body.classList.contains("sidebar-open")));
    scrim?.addEventListener("click", () => setOpen(false));
    sidebar.addEventListener("click", (event) => {
      if (event.target.closest("a") && window.matchMedia("(max-width: 820px)").matches) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function searchScore(entry, query, terms) {
    const title = normalize(entry.title);
    const group = normalize(entry.group);
    const headings = normalize((entry.headings ?? []).join(" "));
    const summary = normalize(entry.summary);
    const corpus = `${title} ${group} ${headings} ${summary}`;
    if (!terms.every((term) => corpus.includes(term))) return -1;

    let score = 0;
    if (title === query) score += 100;
    if (title.startsWith(query)) score += 55;
    if (title.includes(query)) score += 35;
    if (headings.includes(query)) score += 20;
    for (const term of terms) {
      if (title.includes(term)) score += 14;
      if (headings.includes(term)) score += 7;
      if (summary.includes(term)) score += 3;
    }
    return score;
  }

  function setupSearch() {
    const input = document.getElementById("site-search");
    const results = document.getElementById("search-results");
    const index = window.NOVA_SITE?.search ?? [];
    if (!input || !results || !index.length) return;

    let activeIndex = -1;
    let resultLinks = [];

    const close = () => {
      results.hidden = true;
      results.replaceChildren();
      activeIndex = -1;
      resultLinks = [];
    };

    const select = (next) => {
      resultLinks.forEach((link) => link.classList.remove("is-active"));
      if (!resultLinks.length) return;
      activeIndex = (next + resultLinks.length) % resultLinks.length;
      resultLinks[activeIndex].classList.add("is-active");
      resultLinks[activeIndex].scrollIntoView({ block: "nearest" });
    };

    const render = () => {
      const query = normalize(input.value);
      if (!query) {
        close();
        return;
      }

      const terms = query.split(" ").filter(Boolean);
      const matches = index
        .map((entry) => ({ entry, score: searchScore(entry, query, terms) }))
        .filter((item) => item.score >= 0)
        .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, "zh-CN"))
        .slice(0, 12);

      results.replaceChildren();
      activeIndex = -1;
      if (!matches.length) {
        const empty = document.createElement("div");
        empty.className = "search-empty";
        empty.textContent = "没有匹配文档";
        results.append(empty);
      } else {
        for (const { entry } of matches) {
          const link = document.createElement("a");
          link.className = "search-result";
          link.href = entry.href;
          const title = document.createElement("strong");
          title.textContent = entry.title;
          const group = document.createElement("span");
          group.textContent = entry.group;
          link.append(title, group);
          results.append(link);
        }
      }
      results.hidden = false;
      resultLinks = Array.from(results.querySelectorAll("a"));
    };

    input.addEventListener("input", render);
    input.addEventListener("focus", () => {
      if (input.value.trim()) render();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        select(activeIndex + 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        select(activeIndex - 1);
      } else if (event.key === "Enter" && activeIndex >= 0) {
        event.preventDefault();
        resultLinks[activeIndex]?.click();
      } else if (event.key === "Escape") {
        close();
        input.blur();
      }
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".search-box") && !event.target.closest(".search-results")) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !event.target.matches("input, textarea")) {
        event.preventDefault();
        input.focus();
      }
    });
  }

  function setupReadingProgress() {
    const progress = document.getElementById("reading-progress");
    const article = document.querySelector(".document-body");
    if (!progress || !article) return;

    let ticking = false;
    const update = () => {
      const start = article.getBoundingClientRect().top + window.scrollY;
      const end = start + article.offsetHeight - window.innerHeight;
      const value = end <= start ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      progress.style.width = `${value * 100}%`;
      ticking = false;
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
  }

  function setupCodeCopy() {
    for (const shell of document.querySelectorAll(".code-shell")) {
      const code = shell.querySelector("code");
      if (!code) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-code";
      button.textContent = "复制";
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code.textContent ?? "");
          button.textContent = "已复制";
        } catch {
          button.textContent = "失败";
        }
        window.setTimeout(() => {
          button.textContent = "复制";
        }, 1500);
      });
      shell.append(button);
    }
  }

  function setupActiveToc() {
    const links = Array.from(document.querySelectorAll(".toc-link"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    const byId = new Map(links.map((link) => [decodeURIComponent(link.hash.slice(1)), link]));
    const headings = Array.from(document.querySelectorAll(".document-body h2[id], .document-body h3[id]"));
    let active = null;

    const activate = (id) => {
      if (active === id) return;
      links.forEach((link) => link.classList.toggle("is-active", link === byId.get(id)));
      active = id;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) activate(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -78% 0px", threshold: [0, 1] }
    );
    headings.forEach((heading) => observer.observe(heading));
    if (headings[0]) activate(headings[0].id);
  }

  let mermaidRunning = false;
  window.initNovaMermaid = async () => {
    if (mermaidRunning || !window.mermaid) return;
    const nodes = Array.from(document.querySelectorAll("pre.mermaid:not([data-rendered])"));
    if (!nodes.length) return;
    mermaidRunning = true;

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      fontFamily: '"Noto Sans SC", Inter, "PingFang SC", "Microsoft YaHei", sans-serif',
      flowchart: { htmlLabels: true, curve: "basis", useMaxWidth: true },
      sequence: { useMaxWidth: true, wrap: true },
      themeVariables: {
        primaryColor: "#dceff0",
        primaryTextColor: "#172321",
        primaryBorderColor: "#087f83",
        secondaryColor: "#f4e9e4",
        secondaryTextColor: "#172321",
        secondaryBorderColor: "#a74b2b",
        tertiaryColor: "#f4f1e6",
        tertiaryTextColor: "#172321",
        tertiaryBorderColor: "#8a6500",
        lineColor: "#526b65",
        textColor: "#172321",
        mainBkg: "#ffffff",
        clusterBkg: "#f8faf9",
        clusterBorder: "#b8c7c2",
        noteBkgColor: "#f4f1e6",
        noteBorderColor: "#8a6500",
      },
    });

    for (const node of nodes) {
      const source = node.textContent ?? "";
      try {
        await window.mermaid.run({ nodes: [node], suppressErrors: false });
        node.dataset.rendered = "true";
      } catch (error) {
        node.textContent = source;
        node.dataset.rendered = "error";
        node.closest(".diagram-shell")?.classList.add("is-error");
        console.warn("Mermaid diagram failed to render", error);
      }
    }
    mermaidRunning = false;
  };

  function start() {
    setupMobileNavigation();
    setupSearch();
    setupReadingProgress();
    setupCodeCopy();
    setupActiveToc();
    window.initNovaMermaid();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

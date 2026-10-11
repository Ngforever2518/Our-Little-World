/*
 * PERSONALIZE THIS FILE
 * 1. Change the username and password below.
 * 2. Edit the book title and introduction here. The eight supplied chapters
 * live in story-data.js; the ninth chapter below is still a placeholder.
 * Long chapters automatically flow onto as many pages as needed.
 */
const CONFIG = {
  username: "gyanvee",
  password: "ourlittleworld",
  bookTitle: "The Cute Girl and Her Little Rascal ❤️",
  coverSubtitle: "cute, playful, and personal",
  author: "Written with love by Nikhil",
  dedication: "For Gyanvee,\nmy favorite hello, my safest place,\nand the loveliest part of every day.",
  prefaceTitle: "Before the story begins",
  preface: [
    "Every love story has a beginning. Some begin with a glance, some with a conversation, and some with a simple Instagram request that neither person knows will become something special.",
    "Ours began with a little curiosity, a few nervous messages, countless late-night calls, silly fights, unexpected surprises, and memories that I wish I could relive a thousand times.",
    "This is not a story about a perfect boy or a perfect girl. It's a story about a cute girl and her little rascal — two people, their little world, their beautiful moments, their mistakes, and everything they learned along the way.",
    "Gyanvee, this book is my little collection of us. Every chapter holds a piece of my heart, a memory I don't want to forget, and a moment that became a part of our story.",
    "So, my baby, turn the page.",
    "Let's go back to where it all began. 🥹❤️"
  ],
  chapters: [
    { title: "The Day Our Story Began", subtitle: "A beginning, soft as a first hello", paragraphs: ["Every lovely story has a first page. Ours begins with a moment that may have seemed ordinary at the time, but somehow it made the world feel a little brighter.", "I remember the small details: the way the conversation found its own rhythm, the smile that stayed with me afterward, and the quiet thought that I wanted to know you a little more.", "If I could revisit that day, I would tell my past self to pay attention. Something wonderful had just begun—and it was you."] },
    { title: "Little Things I Remember", subtitle: "The details that found a place in my heart", paragraphs: ["A story is made of more than the big milestones. It lives in the little things: the words that make us laugh, the thoughtful gestures, and the comfortable quiet we can share.", "This page is a placeholder for a memory only we understand. Add the details here—the place, the day, the silly joke, or the tiny moment that still makes you smile."] },
    { title: "The Way You Make Me Smile", subtitle: "An everyday kind of magic", paragraphs: ["There is a special kind of happiness that arrives when I hear from you. The day feels kinder, and even the ordinary things seem to have a little more color.", "I hope you always know how much your warmth matters to me. You have a way of making the world feel gentler just by being yourself."] },
    { title: "Our Favorite Moments", subtitle: "Snapshots I want to keep forever", paragraphs: ["Some memories shine like little stars. They remind me that happiness is often made from simple things: being together, talking for hours, and finding reasons to laugh.", "Use this chapter for your favorite shared moment. Write it in your own words, and let every detail bring it back to life."] },
    { title: "A Place That Feels Like Us", subtitle: "Wherever we are together", paragraphs: ["Maybe it is a favorite corner, a familiar route, or simply a conversation that makes time disappear. Some places feel special because of the person beside us.", "Tell the story of a place that feels like ours. The best setting is the one where we can be completely ourselves."] },
    { title: "Things I Adore About You", subtitle: "A list with no final page", paragraphs: ["I adore the way you are unmistakably you: your thoughtful heart, your bright spirit, and all the little things that make being around you feel easy.", "This list could fill a whole library, so let this be its first page. Add another reason whenever one finds its way into your thoughts."] },
    { title: "Dreams We Can Share", subtitle: "A few tomorrows to look forward to", paragraphs: ["The future is a collection of unwritten pages. I like thinking about the small adventures, new places, quiet days, and happy surprises waiting somewhere ahead.", "This chapter can hold the things we dream about together—big plans, tiny wishes, and everything in between."] },
    { title: "My Promise to You", subtitle: "A gentle promise, from my heart", paragraphs: ["I promise to keep showing up with honesty, patience, and care. I promise to listen, to cheer for you, and to remember that the little ways we love each other matter every day.", "Most of all, I promise to keep choosing kindness and to keep making space for the things that make you feel loved."] },
    { title: "To Be Continued…", subtitle: "The loveliest pages are still ahead", paragraphs: ["This is not an ending. It is a bookmark in a story still unfolding, with new memories waiting to become our favorites.", "Whenever we turn another page, I hope we find more laughter, more little adventures, and more reasons to be grateful that our paths crossed.", "Until the next chapter, remember this: you are loved, you are treasured, and you make my world a more beautiful place. ♡"] }
  ],
  wordsPerPage: 165
};

// The eight chapters provided for this book replace the first eight examples.
// The ninth chapter remains as a placeholder until its text is ready.
CONFIG.chapters = [...window.STORY_CHAPTERS, CONFIG.chapters[8]];

const screens = {
  login: document.querySelector("#login-screen"),
  home: document.querySelector("#home-screen"),
  album: document.querySelector("#album-screen"),
  book: document.querySelector("#book-screen")
};
const pageDefinitions = [];
let currentPage = 0;

function wordsPerVisiblePage() {
  if (window.innerWidth <= 680) return Math.min(CONFIG.wordsPerPage, 82);
  if (window.innerWidth <= 900) return Math.min(CONFIG.wordsPerPage, 125);
  return CONFIG.wordsPerPage;
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  screens[name].classList.remove("hidden");
  document.querySelector("#contents-panel").classList.remove("open");
  document.querySelector("#contents-toggle").setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value;
  const error = document.querySelector("#login-error");
  if (username === CONFIG.username && password === CONFIG.password) {
    error.textContent = "";
    showScreen("home");
  } else {
    error.textContent = "That doesn't look quite right. Try again, sweetheart ♡";
    document.querySelector("#password").focus();
  }
});

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "home") showScreen("home");
  if (action === "story") {
    showScreen("book");
    renderPage(0);
  }
  if (action === "album") showScreen("album");
  if (action === "logout") showScreen("login");
});

function splitLongParagraph(text, maxWords) {
  const words = text.trim().split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += maxWords) chunks.push(words.slice(i, i + maxWords).join(" "));
  return chunks;
}

function paginateParagraphs(paragraphs, maxWords) {
  const pages = [];
  let page = [];
  let wordCount = 0;
  paragraphs.forEach((entry) => {
    if (entry && typeof entry === "object" && entry.type === "heading") {
      if (wordCount > maxWords - 40 && page.length) {
        pages.push(page);
        page = [];
        wordCount = 0;
      }
      page.push(entry);
      wordCount += Math.max(3, entry.text.split(/\s+/).length);
      return;
    }
    const pieces = splitLongParagraph(entry, maxWords);
    pieces.forEach((piece) => {
      const count = piece.split(/\s+/).length;
      if (wordCount && wordCount + count > maxWords) {
        pages.push(page);
        page = [];
        wordCount = 0;
      }
      page.push(piece);
      wordCount += count;
    });
  });
  if (page.length) pages.push(page);
  return pages.length ? pages : [[""]];
}

function buildPages() {
  pageDefinitions.length = 0;
  const wordsPerPage = wordsPerVisiblePage();
  pageDefinitions.push({ type: "cover" });
  pageDefinitions.push({ type: "title" });
  const prefacePages = paginateParagraphs(CONFIG.preface, wordsPerPage);
  prefacePages.forEach((paragraphs, index) => {
    pageDefinitions.push({ type: "preface", paragraphs, part: index + 1, parts: prefacePages.length });
  });
  CONFIG.chapters.forEach((chapter, chapterIndex) => {
    paginateParagraphs(chapter.paragraphs, wordsPerPage).forEach((paragraphs, partIndex, all) => {
      pageDefinitions.push({ type: "chapter", chapter, chapterIndex, paragraphs, part: partIndex + 1, parts: all.length });
    });
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function paragraphsHTML(paragraphs) {
  return paragraphs.map((entry) => entry && typeof entry === "object" && entry.type === "heading"
    ? `<h3 class="chapter-section-heading">${escapeHTML(entry.text)}</h3>`
    : `<p>${escapeHTML(entry)}</p>`).join("");
}

function pageInner(content, pageNumber, className) {
  return `<div class="page-inner ${className}">${content}<div class="page-number">${String(pageNumber).padStart(2, "0")}</div></div>`;
}

function pageHTML(page, pageNumber) {
  if (page.type === "cover") {
    return `<div class="book-page-cover">${pageInner(`<div class="cover-flower">❀</div><p class="page-eyebrow">A book made with love</p><h1>${escapeHTML(CONFIG.bookTitle)}</h1><p class="cover-subtitle">${escapeHTML(CONFIG.coverSubtitle)}</p><div class="cover-divider">✦　♡　✦</div><p class="cover-author">${escapeHTML(CONFIG.author)}</p>`, pageNumber, "cover-page")}</div>`;
  }
  if (page.type === "title") {
    return pageInner(`<p class="page-eyebrow">Our story</p><h2>${escapeHTML(CONFIG.bookTitle)}</h2><div class="title-rule"></div><p>${escapeHTML(CONFIG.dedication).replace(/\n/g, "<br />")}</p>`, pageNumber, "title-page");
  }
  if (page.type === "preface") {
    const part = page.parts > 1 ? ` · ${page.part}` : "";
    return pageInner(`<p class="page-eyebrow">A little introduction${part}</p><h2>${escapeHTML(CONFIG.prefaceTitle)}</h2><div class="page-prose">${paragraphsHTML(page.paragraphs)}</div>`, pageNumber, "preface-page");
  }
  const chapter = page.chapter;
  const continuation = page.part > 1 ? ` <span>· ${page.part}</span>` : "";
  return pageInner(`<p class="page-eyebrow">Chapter ${String(page.chapterIndex + 1).padStart(2, "0")}${continuation}</p><h2>${escapeHTML(chapter.title)}</h2><p class="chapter-subtitle">${escapeHTML(chapter.subtitle || "A page in our story")}</p><div class="page-prose">${paragraphsHTML(page.paragraphs)}</div>`, pageNumber, "chapter-page");
}

function buildContents() {
  const items = [{ label: "Cover", number: "♡", page: 0 }, { label: "Title page", number: "01", page: 1 }, { label: "Before the story begins", number: "02", page: pageDefinitions.findIndex((page) => page.type === "preface") }];
  CONFIG.chapters.forEach((chapter, chapterIndex) => {
    const page = pageDefinitions.findIndex((definition) => definition.type === "chapter" && definition.chapterIndex === chapterIndex);
    items.push({ label: chapter.title, number: `Chapter ${chapterIndex + 1}`, page, chapterIndex });
  });
  document.querySelector("#contents-list").innerHTML = items.map((item) => `<button class="contents-item" type="button" data-page="${item.page}"${item.chapterIndex === undefined ? "" : ` data-chapter-index="${item.chapterIndex}"`}><span class="contents-number${item.chapterIndex === undefined ? "" : " chapter-number"}">${escapeHTML(item.number)}</span><span class="contents-label">${escapeHTML(item.label)}</span></button>`).join("");
}

function renderPage(index) {
  currentPage = Math.max(0, Math.min(index, pageDefinitions.length - 1));
  const page = pageDefinitions[currentPage];
  const article = document.querySelector("#book-page");
  article.innerHTML = pageHTML(page, currentPage + 1);
  article.classList.toggle("book-page-cover", page.type === "cover");
  article.setAttribute("aria-label", `Page ${currentPage + 1} of ${pageDefinitions.length}`);
  document.querySelector("#page-count").textContent = `Page ${currentPage + 1} of ${pageDefinitions.length}`;
  document.querySelector("#prev-page").disabled = currentPage === 0;
  document.querySelector("#next-page").disabled = currentPage === pageDefinitions.length - 1;
  document.querySelectorAll(".contents-item").forEach((item) => {
    const pageMatch = Number(item.dataset.page) === currentPage;
    const chapterMatch = page.type === "chapter" && Number(item.dataset.chapterIndex) === page.chapterIndex;
    item.classList.toggle("active", pageMatch || chapterMatch);
  });
}

document.querySelector("#prev-page").addEventListener("click", () => renderPage(currentPage - 1));
document.querySelector("#next-page").addEventListener("click", () => renderPage(currentPage + 1));
document.querySelector("#contents-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (button) renderPage(Number(button.dataset.page));
});
document.querySelector("#contents-toggle").addEventListener("click", (event) => {
  const panel = document.querySelector("#contents-panel");
  const open = panel.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});
document.addEventListener("keydown", (event) => {
  if (screens.book.classList.contains("hidden")) return;
  if (event.key === "ArrowRight") renderPage(currentPage + 1);
  if (event.key === "ArrowLeft") renderPage(currentPage - 1);
  if (event.key === "Escape") {
    document.querySelector("#contents-panel").classList.remove("open");
    document.querySelector("#contents-toggle").setAttribute("aria-expanded", "false");
  }
});

buildPages();
buildContents();

let resizeTimer;
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    if (screens.book.classList.contains("hidden")) return;
    const currentDefinition = pageDefinitions[currentPage];
    const currentChapter = currentDefinition?.chapterIndex;
    const currentType = currentDefinition?.type;
    const currentPart = currentDefinition?.part || 1;
    buildPages();
    buildContents();
    let nextPage = pageDefinitions.findIndex((page) => page.type === currentType && (currentType !== "chapter" || page.chapterIndex === currentChapter) && (currentType !== "chapter" || page.part === currentPart));
    renderPage(nextPage < 0 ? 0 : nextPage);
  }, 180);
});

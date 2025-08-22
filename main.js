/* Floating hacker/cyber emojis across all pages */
(function hackerEmojis() {
  const bg = document.getElementById("emoji-bg");
  if (!bg) return;
  const emojis = ["💻","🕵️‍♂️","🔐","🛡️","⚡","🧠","📡"];
  function spawn() {
    const s = document.createElement("span");
    s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    s.style.position = "absolute";
    s.style.left = Math.random()*window.innerWidth + "px";
    s.style.top = "-30px";
    s.style.fontSize = 18 + Math.random()*22 + "px";
    s.style.opacity = 0.18 + Math.random()*0.35;
    bg.appendChild(s);
    let y = -30;
    const id = setInterval(() => {
      y += 1 + Math.random()*2.5;
      s.style.top = y + "px";
      if (y > window.innerHeight + 40) { clearInterval(id); s.remove(); }
    }, 28);
  }
  setInterval(spawn, 220);
})();

/* Highlight the current page in the navbar */
(function setActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(a=>{
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
})();
(function () {

  var themeButton = document.getElementById("theme-toggle");

  var moonIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var sunIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>';

  function setTheme(name) {
    if (name === "dark") {
      document.body.classList.add("theme-dark");
    } else {
      document.body.classList.remove("theme-dark");
    }
    if (themeButton) {
      /* moon is light theme sun is dark theme */
      themeButton.innerHTML = name === "dark" ? sunIcon : moonIcon;
    }
    try {
      localStorage.setItem("ksu-handmade-theme", name);
    } catch (e) {

    }
  }

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      if (document.body.classList.contains("theme-dark")) {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    });
  }

  /* remember theme chosen last time */
  var saved = "light";
  try {
    saved = localStorage.getItem("ksu-handmade-theme") || "light";
  } catch (e) {

  }
  setTheme(saved === "dark" ? "dark" : "light");

  /* Back to Top button */
  var topButton = document.getElementById("back-to-top");

  if (topButton) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        topButton.classList.add("show");
      } else {
        topButton.classList.remove("show");
      }
    });

    topButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Real-time clock */
  var clock = document.getElementById("footer-clock");

  function updateClock() {
    var now = new Date();
    var date = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    var time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
    clock.textContent = date + " | " + time;
  }

  if (clock) {
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ==========================================================================
     EXTRA VOTE
     ========================================================================== */
  var voteButtons = document.querySelectorAll("#four .vote");

  for (var i = 0; i < voteButtons.length; i++) {
    voteButtons[i].addEventListener("click", function () {
      var card = this.closest("article");
      if (!card) {
        return;
      }

      var countSpan = card.querySelector(".card-footer span");
      var currentNumber = parseInt(countSpan.textContent, 10);

      if (isNaN(currentNumber)) {
        currentNumber = 0;
      }

      //Add the vote and update the count on the card
      countSpan.textContent = (currentNumber + 1) + " votes";

      //Message like the validation messages
      alert("Voted! Thank you.");
    });
  }

  /* ==========================================================================
     FILTER VOTE CARDS
     ========================================================================== */
  var filterButtons = document.querySelectorAll("#four .four-list .filter");
  var voteCards = document.querySelectorAll("#four .four-workshops article");
  var voteGrid = document.querySelector("#four .four-workshops");

  if (filterButtons.length > 0 && voteCards.length > 0 && voteGrid) {
    var emptyVoteMsg = document.createElement("p");
    emptyVoteMsg.textContent = "No items in this category yet.";
    emptyVoteMsg.style.display = "none";
    emptyVoteMsg.style.color = "#ffffff";
    emptyVoteMsg.style.width = "100%";
    emptyVoteMsg.style.textAlign = "center";
    voteGrid.appendChild(emptyVoteMsg);

    for (var f = 0; f < filterButtons.length; f++) {
      filterButtons[f].addEventListener("click", function () {
        var chosen = this.value.toLowerCase();
        var shown = 0;

        for (var j = 0; j < filterButtons.length; j++) {
          filterButtons[j].classList.remove("active");
        }
        this.classList.add("active");

        for (var c = 0; c < voteCards.length; c++) {
          var tag = voteCards[c].querySelector(".price-tag");
          var cat = tag ? tag.textContent.trim().toLowerCase() : "";

          if (chosen === "all" || cat === chosen) {
            voteCards[c].style.display = "";
            shown++;
          } else {
            voteCards[c].style.display = "none";
          }
        }

        if (shown === 0) {
          emptyVoteMsg.style.display = "block";
        } else {
          emptyVoteMsg.style.display = "none";
        }
      });
    }
  }

  /* ==========================================================================
     PHONE MENU BUTTON 
     ========================================================================== */
  var header = document.querySelector("header");
  var navEl = document.querySelector("header nav");

  if (header && navEl) {
    var menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.id = "menu-toggle";
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    navEl.parentNode.insertBefore(menuButton, navEl);

    menuButton.addEventListener("click", function () {
      var isOpen = header.classList.toggle("menu-open");
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

})();

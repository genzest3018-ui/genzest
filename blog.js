 window.addEventListener("scroll", () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height ? (winScroll / height) * 100 : 0;
      const progressBar = document.getElementById("progressBar");
      if (progressBar) progressBar.style.width = scrolled + "%";
    });
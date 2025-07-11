<script>
    // GSAP Animations
    document.addEventListener("DOMContentLoaded", () => {
        const title = document.getElementById('title');
        const firstLink = document.getElementById('steam-link');
        const secondLink = document.getElementById('second-link');

        // Animate the title (slide in from the right)
        gsap.fromTo(
            title, 
            { x: 200, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }
        );

        // Animate the first button (slide in from the right)
        gsap.fromTo(
            firstLink,
            { x: 200, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power2.out" }
        );

        // Animate the second button (slide in right after the first one)
        gsap.fromTo(
            secondLink,
            { x: 200, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, delay: 1, ease: "power2.out" }
        );
    });

    // Проверка авторизации
    document.addEventListener("DOMContentLoaded", async () => {
        const response = await fetch("/api/user");
        if (response.ok) {
            const user = await response.json();

            // Показываем аватар и имя
            const userInfo = document.getElementById("user-info");
            userInfo.style.display = "flex";
            userInfo.querySelector("#username").textContent = user.displayName;
            userInfo.querySelector("#avatar").src = user.photos[2].value;

            // Меняем кнопку "CONNECT" на "Выйти"
            const steamLink = document.getElementById("steam-link");
            steamLink.href = "/logout";
            steamLink.innerHTML = `<img src="${user.photos[0].value}" width="30" height="30" style="margin-right: 10px;"> Выйти`;
        }
    });
</script>
// Add JS here

document.addEventListener("keydown", (e) => {
    console.log(e.code);
    if (e.code === "ArrowRight") {
        document.getElementById('next-page').click();
    }
});

window.addEventListener("pageswap", async (e) => {
    // Only run this if an active view transition exists
    if (e.viewTransition) {
        const currentUrl = e.activation.from?.url
            ? new URL(e.activation.from.url)
            : null;
        const targetUrl = new URL(e.activation.entry.url);

        // Going from profile page to homepage
        // ~> The big img and title are the ones!
        if (isProfilePage(currentUrl) && isHomePage(targetUrl)) {
            // Set view-transition-name values on the elements to animate
            document.querySelector(`#detail main h1`).style.viewTransitionName =
                "name";
            document.querySelector(`#detail main img`).style.viewTransitionName =
                "avatar";

            // Remove view-transition-names after snapshots have been taken
            // Stops naming conflicts resulting from the page state persisting in BFCache
            await e.viewTransition.finished;
            document.querySelector(`#detail main h1`).style.viewTransitionName =
                "none";
            document.querySelector(`#detail main img`).style.viewTransitionName =
                "none";
        }

        // Going to profile page
        // ~> The clicked items are the ones!
        if (isProfilePage(targetUrl)) {
            const profile = extractProfileNameFromUrl(targetUrl);

            // Set view-transition-name values on the elements to animate
            document.querySelector(`#${profile} span`).style.viewTransitionName =
                "name";
            document.querySelector(`#${profile} img`).style.viewTransitionName =
                "avatar";

            // Remove view-transition-names after snapshots have been taken
            // Stops naming conflicts resulting from the page state persisting in BFCache
            await e.viewTransition.finished;
            document.querySelector(`#${profile} span`).style.viewTransitionName =
                "none";
            document.querySelector(`#${profile} img`).style.viewTransitionName =
                "none";
        }
    }
});

const isProfilePage = (url) => url.pathname === "/profile";

const isHomePage = (url) => url.pathname === "/";

const extractProfileNameFromUrl = (url) => url.pathname.split("/")[2];
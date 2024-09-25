// Path where this app is deployed. Because we don’t deploy at the root of the domain
// we need to keep track of this and adjust any URL matching using this value.
const homePagePattern = new URLPattern(`/index.html`, window.origin);
const isHomePage = (url) => homePagePattern.exec(url);

const profilePagePattern = new URLPattern(`/profiles/:profile`, window.origin);
const isProfilePage = (url) => profilePagePattern.exec(url);

const extractProfileNameFromUrl = (url) => {
    const match = profilePagePattern.exec(url);
    return match?.pathname.groups.profile;
}

const setTemporaryViewTransitionNames = async (entries, vtPromise) => {
    for (const [$el, name] of entries) {
        $el.style.viewTransitionName = name;
    }

    await vtPromise;

    for (const [$el, name] of entries) {
        $el.style.viewTransitionName = '';
    }

}

// When going to a detail page, set `animate-name` and `animate-avatar` vt-names
// on the elements that link to that detail page
window.addEventListener('pageswap', async (e) => {
    if (e.viewTransition) {
        const currentUrl = e.activation.from?.url ? new URL(e.activation.from.url) : null;
        const targetUrl = new URL(e.activation.entry.url);

        // Going from profile page to homepage
        // ~> The big img and title are the ones!
        if (isProfilePage(currentUrl) && isHomePage(targetUrl)) {
            setTemporaryViewTransitionNames([
                [document.querySelector(`#detail main h1`), 'animate-name'],
                [document.querySelector(`#detail main img`), 'animate-avatar'],
            ], e.viewTransition.finished);
        }

        // Going to profile page
        // ~> The clicked items are the ones!
        if (isProfilePage(targetUrl)) {
            const profile = extractProfileNameFromUrl(targetUrl).replace(/\.[^/.]+$/, "");

            setTemporaryViewTransitionNames([
                [document.querySelector(`#${profile} span`), 'animate-name'],
                [document.querySelector(`#${profile} img`), 'animate-avatar'],
            ], e.viewTransition.finished);
        }
    }
});

// When going from a detail page to the homepage, set `animate-name` and `animate-avatar` vt-names
// on the list item for the profile that was viewed on the detail page.
window.addEventListener('pagereveal', async (e) => {

    if (!navigation.activation.from) return;

    if (e.viewTransition) {
        const fromUrl = new URL(navigation.activation.from.url);
        const currentUrl = new URL(navigation.activation.entry.url);

        // Went from profile page to homepage
        // ~> Set VT names on the relevant list item
        if (isProfilePage(fromUrl) && isHomePage(currentUrl)) {
            const profile = extractProfileNameFromUrl(fromUrl).replace(/\.[^/.]+$/, "");

            setTemporaryViewTransitionNames([
                [document.querySelector(`#${profile} span`), 'animate-name'],
                [document.querySelector(`#${profile} img`), 'animate-avatar'],
            ], e.viewTransition.ready);
        }

        // Went to profile page
        // ~> Set VT names on the main title and image
        if (isProfilePage(currentUrl)) {
            setTemporaryViewTransitionNames([
                [document.querySelector(`#detail main h1`), 'animate-name'],
                [document.querySelector(`#detail main img`), 'animate-avatar'],
            ], e.viewTransition.ready);
        }
    }
});

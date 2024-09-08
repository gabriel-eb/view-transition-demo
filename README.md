# View Transitions API demo
The View Transitions API provides a mechanism for easily creating animated transitions between different website views. This includes animating between DOM states in a single-page app (SPA)  and animating the navigation between documents in a multi-page app (MPA) [1](#references).

The View Transitions API provides an **easy way** of handling the required view changes and transition animations for both the above use cases [1](#references).

For this presentation, we are going to focus on the MPA use case.

## ⚠ Caveats
View transitions API is still in development:
- Stable for chromium based browsers.
- Being experimental for webkit (Safari).
- Not implemented for Gecko (Firefox) based yet.

## 📖 Recap
There are 3 main components for web: HTML, CSS, and JS. Each one has a role in a website.

### Hyper Text Markup Language (HTML)
HTML is a markup language originally created to share scientific documents between universities via internet. It uses tags to describe the hierarchy for each part of the document. Other examples of markup languages are Markdown, Tex, XML, and Latex.

### Cascading Style Sheets (CSS)
CSS is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.

### JavaScript (JS) 
JS is a lightweight interpreted programming language with first-class functions, originally designed to add interactivity to websites. It can change HTML on the go via DOM by targeting one or several tags, and it can extract, add, and modify the website.

With the introduction of web engines and NodeJS, there was a branching with little or no difference between the plain JavaScript, known as vanilla JS, and the one used by them. The standard for vanilla JS is called ECMAScript.

### MPA & SPA
Today, there are two main types of web applications: Multi-page Application (MPA) and Single-page Application (SPA).
- MPA makes calls to a server and loads each page of a website every time the user navigates between pages.
- SPA tries to download all static assets in the first load and simulates the navigation between pages. It mainly uses JS to fetch data on the go and change the HTML.

For this presentation, MPA transition is equivalent to a **cross-document transition** and SPA transition to a **same-document transition**. But view transitions aren't directly associated with web apps; they can be used for static sites, as we'll see.

## ⚙ How does a view transition work?
For MPA transitions to work (of a compatible browser):
- Both documents need to exist on the same origin.
- Both pages need to opt-in to allow the view transition.

Basically, both documents need to be on the same website and use the CSS property `view-transition`.

``` css
@view-transition {
  navigation: auto;
}
```

The default animation is fade-in (opacity from 0 to 1). Other properties that can be animated without much modification are width, height, position, and transform. For customization, there are 3 main components from web APIs:
- `pageswap` and `pagereveal` events.
- Navigation API
- Render blocking

Specifically, render blocking can block the rendering of the new page, so the animation can be completed. Sometimes if an asset is missing, the animation skips. But render blocking impacts loading time (FCP [6](#references)). As stated before, any fail during the transition shouldn't throw an error; it should be handled and the transition is going to skip.

The `pageswap` event fires before the last frame of a page is rendered. You can use this to do some last-minute changes on the outgoing page, right before the old snapshots get taken. The `pagereveal` event fires on a page after it has been initialized or reactivated but before the first rendering opportunity. With it, you can customize the new page before the new snapshots get taken. Also, you can modify the default animations in any way you want using regular CSS — target the "from" animation with `::view-transition-old`, and the "to" animation with `::view-transition-new` [2](#references).

``` css
  @keyframe customized{
    from: {
      width: 0;
    }
    to: {
      width: 100%;
    }
  }

  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: customized 0.5s;
  }
```

One last resource to optimize the transitions is to add Speculation Rules [7](#references), but it is an experimental feature like View Transitions API, so it is limited to certain browsers.

## 🔮 Use Cases
In brief, the best use case is to add animation between transitions for certain web pages, and apps can be a plus. Being more specific:
- Static webs like landing pages.
- For SPAs, transitions between components's states.
- Web frameworks using a native API instead of an in-house solution.

A huge drawback (aside from not being compatible with Mozilla-based browsers) is that it requires the user to have a good connection, accessibility features like `prefered-reduced-motion` should be taken care of by creating a custom animation for it, and it is still an API in development and requires time to extend adoption.

## Conclusion
If you want to add an extra to your website, you can use the View Transitions API. It's a good fit for marketing landing pages and targeted components in an SPA. In the long run, this API will surely be part of the web standards, so it's a good idea to know it exists and how to use it.

## References
1. [MDN - View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)  
2. [MDN - Using the View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API/Using)  
3. [Smooth transitions with the View Transition API](https://developer.chrome.com/docs/web-platform/view-transitions)  
4. [Cross-document view transitions for multi-page applications](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)  
5. [Same-document view transitions for single-page applications](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)
6. [First Contentful Paint (FCP)](https://web.dev/articles/fcp)
7. [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API)

### Live demos
8. [(MPA) List of Chrome DevRel](https://view-transitions.netlify.app/profiles/mpa/)  
9. [(MPA) Cross-document view transition example](https://mdn.github.io/dom-examples/view-transitions/mpa/)  
10. [(SPA) Basic View Transitions API demo](https://mdn.github.io/dom-examples/view-transitions/spa/)  
11. [(SPA) Cards](https://view-transitions.netlify.app/cards/spa/)
12. [(SPA) HTTP 203](https://http203-playlist.netlify.app/)
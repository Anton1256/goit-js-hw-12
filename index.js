import{a as E,S as P,i as m}from"./assets/vendor-lDhL-8I6.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&u(p)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const R="49833944-6607058f780df4ba7a1e9afed",I="https://pixabay.com/api/";async function y(e,o=1){return(await E.get(I,{params:{key:R,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}const f=document.querySelector(".gallery"),i=document.querySelector(".loader"),a=document.querySelector(".load-more-btn"),n=document.querySelector(".end-message");let l=null;function O(e){const o=e.tags.split(",").slice(0,3).join(", ");return`
    <li class="gallery-item">
        <a href="${e.largeImageURL}" class="gallery-link">
            <img
                class="gallery-image"
                src="${e.webformatURL}"
                alt="${o}"
                loading="lazy"
            />
            <div class="info">
                <div class="info-item">
                    <p class="info-label">Likes</p>
                    <span class="info-value">${e.likes}</span>
                </div>
                <div class="info-item">
                    <p class="info-label">Views</p>
                    <span class="info-value">${e.views}</span>
                </div>
                <div class="info-item">
                    <p class="info-label">Comments</p>
                    <span class="info-value">${e.comments}</span>
                </div>
                <div class="info-item">
                    <p class="info-label">Downloads</p>
                    <span class="info-value">${e.downloads}</span>
                </div>
            </div>
        </a>
    </li>
    `}function L(e){if(!f)return;const o=e.map(O).join("");f.insertAdjacentHTML("beforeend",o),l?l.refresh():l=new P(".gallery a",{captionsData:"alt",captionDelay:250})}function T(){f&&(f.innerHTML="",l&&(l.destroy(),l=null))}function v(){i==null||i.classList.remove("hidden")}function b(){i==null||i.classList.add("hidden")}function w(){a==null||a.classList.remove("hidden"),n==null||n.classList.add("hidden")}function S(){a==null||a.classList.add("hidden")}function q(){n==null||n.classList.remove("hidden")}function x(){n==null||n.classList.add("hidden")}const A=document.querySelector(".form"),$=document.querySelector("input[name='search-text']"),D=document.querySelector(".load-more-btn");let h="",c=1,d=0;A.addEventListener("submit",j);D.addEventListener("click",z);function g(e){m.warning({title:"Warning",message:e,position:"topRight",timeout:3e3})}function _(e){m.success({title:"Success",message:e,position:"topRight",timeout:3e3})}async function j(e){e.preventDefault();const o=$.value.trim();if(!o){g("Please enter a search query");return}h=o,c=1,S(),x(),v(),T();try{const{hits:r,total:u}=await y(h,c);if(d=u,r.length===0){g("there are no images matching your search query. Try again!");return}L(r),_(`We found ${d} images.`),r.length<15||r.length>=d?q():w()}catch(r){m.error({title:"Error",message:"Failed to fetch images. Try again.",position:"topRight",timeout:3e3}),console.error("Error fetching images:",r)}finally{b()}}async function z(){c+=1,v(),S();try{const{hits:e}=await y(h,c);L(e),e.length<15||c*15>=d?q():w()}catch(e){m.error({title:"Error",message:"Failed to load more images. Try again.",position:"topRight",timeout:3e3}),console.error("Error loading more images:",e)}finally{b()}}
//# sourceMappingURL=index.js.map

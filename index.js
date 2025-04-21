import{a as E,S as R,i as m}from"./assets/vendor-lDhL-8I6.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&u(p)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const I="49833944-6607058f780df4ba7a1e9afed",P="https://pixabay.com/api/";async function y(e,t=1){return(await E.get(P,{params:{key:I,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})).data}const f=document.querySelector(".gallery"),i=document.querySelector(".loader"),a=document.querySelector(".load-more-btn"),n=document.querySelector(".end-message");let l=null;function O(e){const t=e.tags.split(",").slice(0,3).join(", ");return`
    <li class="gallery-item">
        <a href="${e.largeImageURL}" class="gallery-link">
            <img
                class="gallery-image"
                src="${e.webformatURL}"
                alt="${t}"
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
    `}function L(e){if(!f)return;const t=e.map(O).join("");f.insertAdjacentHTML("beforeend",t),l?l.refresh():l=new R(".gallery a",{captionsData:"alt",captionDelay:250})}function T(){f&&(f.innerHTML="",l&&(l.destroy(),l=null))}function v(){i==null||i.classList.remove("hidden")}function w(){i==null||i.classList.add("hidden")}function b(){a==null||a.classList.remove("hidden"),n==null||n.classList.add("hidden")}function S(){a==null||a.classList.add("hidden")}function q(){n==null||n.classList.remove("hidden")}function x(){n==null||n.classList.add("hidden")}const A=document.querySelector(".form"),$=document.querySelector("input[name='search-text']"),B=document.querySelector(".load-more-btn");let h="",c=1,d=0;A.addEventListener("submit",_);B.addEventListener("click",j);function g(e){m.warning({title:"Warning",message:e,position:"topRight",timeout:3e3})}function D(e){m.success({title:"Success",message:e,position:"topRight",timeout:3e3})}async function _(e){e.preventDefault();const t=$.value.trim();if(!t){g("Please enter a search query");return}h=t,c=1,S(),x(),v(),T();try{const{hits:r,total:u}=await y(h,c);if(d=u,r.length===0){g("there are no images matching your search query. Try again!");return}L(r),D(`We found ${d} images.`),r.length<15||r.length>=d?q():b()}catch(r){m.error({title:"Error",message:"Failed to fetch images. Try again.",position:"topRight",timeout:3e3}),console.error("Error fetching images:",r)}finally{w()}}async function j(){c+=1,v(),S();try{const{hits:e}=await y(h,c);L(e);const t=document.querySelector(".gallery-item");if(t){const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}e.length<15||c*15>=d?q():b()}catch(e){m.error({title:"Error",message:"Failed to load more images. Try again.",position:"topRight",timeout:3e3}),console.error("Error loading more images:",e)}finally{w()}}
//# sourceMappingURL=index.js.map

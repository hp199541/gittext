/**
 * 1. 指令 (若无<span>子元素，children[0].cloneNode会报错)
 * <div style="width:100px">
 *   <p v-marquee>
 *    <span>demodemodemo</span>
 *   </p>
 * </div>
 * 2. .marquee 类名
 * p {
 *   white-space: nowrap;  // NOTE 必须
 * }
 * p.marquee {
 *   word-break: keep-all;
 *   width: fit-content; // NOTE 必须
 *   animation: textloop linear infinite;
 *   min-width: 100%;
 *   span {
 *     padding-right: 20px
 *   }
 * }
 * 3. 动画
 * @keyframes textloop {
 *   0% {
 *     transform: translateX(0);
 *   }
 *   100% {
 *     transform: translateX(-50%);
 *   }
 * }
*/
import Vue from 'vue'
Vue.directive('marquee', function (el) {
  if (el.classList.contains('marquee')) return
  window.setTimeout(() => {
    let offsetWidth = el.offsetWidth
    let scrollWidth = el.scrollWidth
    if (offsetWidth && scrollWidth && (scrollWidth > offsetWidth)) {
      let clone = el.children[0].cloneNode(true) // 复制一次 <span> 子元素
      el.appendChild(clone)
      el.style.cssText += `;-webkit-animation-duration:${scrollWidth / 30}s;animation-duration:${scrollWidth / 30}s;--offset:${offsetWidth - scrollWidth * 2 - 20}px`
      el.classList.add('marquee')
    }
  }, 20)
})

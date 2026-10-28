/* Shared by the personal homepage and blog. Dependency-free image viewer. */
(() => {
 const zh=document.documentElement.lang.startsWith('zh');
 let dialog,canvas,image,trigger,zoom=1;
 const fit=()=>{if(!dialog?.open)return;const ratio=image.naturalWidth/image.naturalHeight||1;const height=Math.max(160,innerHeight*.9-84);image.style.width=Math.round((ratio>=1?canvas.clientWidth:Math.min(canvas.clientWidth,height*ratio))*zoom)+'px'};
 function init(){
  if(dialog)return;
  dialog=document.createElement('dialog');dialog.className='media-viewer';dialog.setAttribute('aria-label',zh?'图片查看器':'Image viewer');
  const tools=document.createElement('div');tools.className='media-viewer-tools';
  const button=(label,aria,action)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-label',aria);b.addEventListener('click',action);return b};
  tools.append(button('−',zh?'缩小':'Zoom out',()=>{zoom=Math.max(.5,zoom/1.4);fit()}),button(zh?'适应窗口':'Fit to window',zh?'适应窗口':'Fit to window',()=>{zoom=1;fit();canvas.scrollTo(0,0)}),button('+',zh?'放大':'Zoom in',()=>{zoom=Math.min(6,zoom*1.4);fit()}));
  const close=button('×',zh?'关闭图片':'Close image',()=>dialog.close());close.className='media-viewer-close';
  canvas=document.createElement('div');canvas.className='media-viewer-canvas';image=document.createElement('img');image.addEventListener('load',fit);canvas.append(image);dialog.append(tools,close,canvas);document.body.append(dialog);
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
  dialog.addEventListener('close',()=>{document.documentElement.classList.remove('media-viewer-open');trigger?.focus({preventScroll:true})});
  window.addEventListener('resize',fit);
 }
 const seen=new Set();
 document.querySelectorAll('.figure-zoom, .article-body img').forEach(node=>{
  if(node.closest('.note-figure'))return;
  const img=node.tagName==='IMG'?node:node.querySelector('img');if(!img)return;
  let link=img.closest('a');
  if(link&&!/\.(svg|webp|png|jpe?g|gif)(\?|$)/i.test(link.href))return;
  if(!link){link=document.createElement('a');link.href=img.currentSrc||img.src;img.before(link);link.append(img)}
  if(seen.has(link))return;seen.add(link);link.setAttribute('aria-haspopup','dialog');link.classList.add('media-viewer-trigger');
  link.addEventListener('click',e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();init();trigger=link;zoom=1;image.src=link.href;image.alt=img.alt;dialog.showModal();document.documentElement.classList.add('media-viewer-open');fit();canvas.scrollTo(0,0)});
 });
})();

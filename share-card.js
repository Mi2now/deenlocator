/* DeenLocator — Share Card Logic
   2now Technology
   Edit: share-card.js
   Contains: openEventShare, openShare (mosque), and canvas helpers
   Depends on: app.js (LOGO, LOCATIONS, APP_CONFIG, showToast)
*/

var SOC_ICONS = {
  fb:  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='4' fill='%231877F2'/%3E%3Cpath d='M16 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 0 1 4-4h2v3z' fill='%23fff'/%3E%3C/svg%3E",
  ig:  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3ClinearGradient id='ig' x1='0%25' y1='100%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23f09433'/%3E%3Cstop offset='25%25' stop-color='%23e6683c'/%3E%3Cstop offset='50%25' stop-color='%23dc2743'/%3E%3Cstop offset='75%25' stop-color='%23cc2366'/%3E%3Cstop offset='100%25' stop-color='%23bc1888'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='24' height='24' rx='5' fill='url(%23ig)'/%3E%3Crect x='7' y='7' width='10' height='10' rx='3' stroke='%23fff' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='12' cy='12' r='2.5' stroke='%23fff' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='16.5' cy='7.5' r='1' fill='%23fff'/%3E%3C/svg%3E",
  wa:  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='4' fill='%2325D366'/%3E%3Cpath d='M12 4a8 8 0 0 0-6.93 11.97L4 20l4.16-1.06A8 8 0 1 0 12 4zm4.19 10.85c-.18.5-1.04.96-1.43 1.01-.36.05-.82.07-1.32-.08-.3-.09-.7-.22-1.2-.44-2.1-.9-3.47-3-3.58-3.14-.1-.14-.84-1.12-.84-2.13 0-1 .52-1.5.71-1.7.18-.2.4-.25.53-.25h.38c.12 0 .28-.05.44.33.17.4.57 1.38.62 1.48.05.1.08.22.02.35-.07.13-.1.21-.2.32-.1.1-.21.23-.3.31-.1.09-.2.18-.09.36.12.17.52.86 1.12 1.39.77.69 1.42.9 1.62.99.2.1.32.08.44-.05.12-.12.5-.58.63-.78.13-.2.26-.17.44-.1.18.07 1.13.53 1.32.63.2.1.33.14.38.22.05.08.05.46-.13.96z' fill='%23fff'/%3E%3C/svg%3E",
  x:   "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='4' fill='%23000'/%3E%3Cpath d='M17.5 4h2.5l-5.5 6.3L21 20h-4.7l-3.5-4.6L8.5 20H6l5.8-6.6L3 4h4.8l3.2 4.2L17.5 4zm-.9 14.4h1.4L7.5 5.4H6l10.6 13z' fill='%23fff'/%3E%3C/svg%3E"
};



function wrapText(ctx, text, x, y, maxWidth, lineHeight){
  var words = text.split(' ');
  var line = '';
  var lines = [];
  for(var n=0; n<words.length; n++){
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    if(metrics.width > maxWidth && n > 0){
      lines.push(line.trim());
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  if(line.trim()) lines.push(line.trim());
  lines.forEach(function(l, i){
    ctx.fillText(l, x, y + i * lineHeight);
  });
  return y + lines.length * lineHeight;
}


function roundRect(ctx, x, y, w, h, r){
  if(typeof r === 'number') r = {tl:r,tr:r,br:r,bl:r};
  ctx.beginPath();
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + w - r.tr, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r.tr);
  ctx.lineTo(x+w, y+h-r.br);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r.br, y+h);
  ctx.lineTo(x+r.bl, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r.bl);
  ctx.lineTo(x, y+r.tl);
  ctx.quadraticCurveTo(x, y, x+r.tl, y);
  ctx.closePath();
}

/* Wrap long text */

function triggerDownload(canvas, fname){
  var a = document.createElement('a');
  a.download = fname;
  a.href = canvas.toDataURL('image/png');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* Draw rounded rectangle */

function fixImgurUrl(url){
  if(!url) return url;
  url = url.trim();
  /* Strip BBCode tags: [img]URL[/img] → URL */
  url = url.replace(/^\[img\]/i,'').replace(/\[\/img\]$/i,'').trim();
  /* Strip markdown link format: [text](URL) → URL */
  var mdM = url.match(/^\[.*?\]\((.+?)\)$/);
  if(mdM) url = mdM[1].trim();

  /* Already direct: i.imgur.com/XXXXX.ext — keep as is */
  if(url.match(/^https?:\/\/i\.imgur\.com\/[a-zA-Z0-9]+\.[a-z]+$/)) return url;
  /* imgur.com/XXXXX or imgur.com/XXXXX.png → i.imgur.com/XXXXX.png */
  var m = url.match(/^https?:\/\/(?:www\.)?imgur\.com\/([a-zA-Z0-9]+)(?:\.[a-z]+)?$/);
  if(m) return 'https://i.imgur.com/'+m[1]+'.png';
  /* Album URL imgur.com/a/XXXXX — cannot auto-resolve, return as-is */
  return url;
}


/* ═══ EVENT SHARE CARD ═══ */

function openEventShare(locId, evIdx){
  var loc = LOCATIONS.find(function(l){ return l.id===locId; });
  if(!loc || !loc.events || !loc.events[evIdx]) return;
  var ev = loc.events[evIdx];
  trackEvent('event_share','engagement',ev.title||'');

  /* Per-field font sizes */
  var titleFs       = ev.titleFontSize     || 84;
  var orgFs         = ev.organiserFontSize || 34;
  var timeFs        = ev.timeFontSize      || 26;
  var extraFs       = ev.extraInfoFontSize || 30;
  var sponsorFs     = ev.sponsorFontSize   || 22;
  var sponsorLogoSz = ev.sponsorLogoSize   || 40;

  var W = 1080;

  var catPalette = {
    lecture:  {bg1:'#1e1b4b',bg2:'#0c0a2e',accent:'#818cf8'},
    feeding:  {bg1:'#052e16',bg2:'#020c05',accent:'#4ade80'},
    donation: {bg1:'#431407',bg2:'#180700',accent:'#fb923c'},
    project:  {bg1:'#1c1917',bg2:'#080605',accent:'#fbbf24'},
    eid:      {bg1:'#1a1000',bg2:'#0a0600',accent:'#d4a843'},
    general:  {bg1:'#0a2418',bg2:'#020d08',accent:'#22c98a'},
    others:   {bg1:'#1e1b4b',bg2:'#0c0a2e',accent:'#a78bfa'}
  };
  var isProjectOrFeeding = (ev.category==='project'||ev.category==='feeding'||ev.category==='donation');
  var pal = catPalette[ev.category||'general']||catPalette.general;

  /* ── PASS 1: measure content height on a scratch canvas ── */
  var mCv = document.createElement('canvas');
  mCv.width = W; mCv.height = 100;
  var mCtx = mCv.getContext('2d');

  var hH = 170;
  var mY = hH + 110; /* title starts here */

  /* Title lines — same auto-fit logic as Pass 2 */
  (function(){
    var _tFs2 = titleFs;
    mCtx.font = 'bold ' + _tFs2 + 'px sans-serif';
    var _tw2 = (ev.title||'').split(' ');
    var _widest2 = _tw2.reduce(function(mx,w){return Math.max(mx,mCtx.measureText(w).width);},0);
    while(_tFs2 > 28 && _widest2 > W-100){ _tFs2--; mCtx.font='bold '+_tFs2+'px sans-serif'; _widest2=_tw2.reduce(function(mx,w){return Math.max(mx,mCtx.measureText(w).width);},0); }
    var _tl2='', _tls2=[];
    _tw2.forEach(function(w){var t=_tl2?_tl2+' '+w:w;if(mCtx.measureText(t).width>W-100){_tls2.push(_tl2);_tl2=w;}else _tl2=t;});
    if(_tl2) _tls2.push(_tl2);
    var _lh2 = Math.round(_tFs2*1.15);
    mY += _tls2.slice(0,3).length * _lh2 + 8;
    /* Organiser: estimate with orgFs capped */
    var _oFs2=orgFs; if(ev.organiser){ mCtx.font='italic '+_oFs2+'px sans-serif'; while(_oFs2>14&&mCtx.measureText('by '+ev.organiser).width>W-100){_oFs2--;} mY+=Math.round(_oFs2*1.5)+4; }
  })();

  /* Pills row */
  mY += 10 + 64 + 24;

  /* Venue block */
  mY += 110 + 130; /* 110 height + 20 gap already in curY+=130 */

  /* Banner images */
  var banners = [ev.bannerUrl, ev.bannerUrl2].filter(Boolean);
  if(banners.length) mY += 260 + 30;

  /* Info pill */
  var _pillH2 = 0;
  if(ev.extraInfo && ev.extraInfo.trim()){
    var _infoLines = ev.extraInfo.split('\n').filter(function(l){return l.trim();});
    var _pPad = 28, _lineH2 = Math.round(extraFs * 1.4);
    mCtx.font = 'bold '+extraFs+'px sans-serif';
    var _allW = [];
    _infoLines.forEach(function(il){
      var clean = il.trim();
      if(clean.charAt(0)==='*'||clean.charAt(0)==='.'||clean.charAt(0)==='-') clean='\u2022 '+clean.replace(/^[*.\-]\s*/,'');
      var wds=clean.split(' '),wl='',wr=[];
      wds.forEach(function(w){ var t=wl?wl+' '+w:w; if(mCtx.measureText(t).width>W-130&&wl){wr.push(wl);wl=w;}else wl=t; });
      if(wl) wr.push(wl);
      _allW = _allW.concat(wr);
    });
    _pillH2 = _pPad*2 + (_allW.length * _lineH2);
    mY += 28 + _pillH2 + 28;
  }

  /* Bottom block height estimate: label(24) + name(34) + acct(46) + bank(28) + soc rows */
  var _socCount = 0;
  if(ev.facebook) _socCount++;
  if(ev.instagram) _socCount++;
  if(ev.whatsappSocial) _socCount++;
  if(ev.twitterX) _socCount++;
  var _socRows = Math.ceil(_socCount / 2);
  /* phone(30+38) + soc rows(32 each) + label(24) + top gap(40) */
  var _bottomBlockH = 40 + 24 + (ev.phone ? 68 : 0) + (_socRows * 32) + 20;
  /* left col: donations(32+32+36+30+10=140) + supported by label(32) + sponsors(30 each) */
  var _leftH = 0;
  if(ev.accountNumber) _leftH += 32+32+36+30+10; /* DONATIONS block */
  if(ev.sponsors){
    var _spCount=(Array.isArray(ev.sponsors)?ev.sponsors:ev.sponsors.split('\n').filter(Boolean)).length;
    _leftH += 32 + Math.min(_spCount,5)*32; /* SUPPORTED BY label + rows */
  }
  _bottomBlockH = Math.max(_bottomBlockH, 40 + Math.max(_leftH, 60));

  var _footerH = 132;
  /* ISSUE 2 FIX: dynamic H = content bottom + bottom block + gap + footer */
  var H = Math.max(1680, mY + _bottomBlockH + 20 + _footerH);

  /* ── PASS 2: draw on correctly-sized canvas ── */
  var cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  var ctx = cv.getContext('2d');

  /* fY derived from actual H */
  var fY = H - _footerH;

  /* Async image queue — export only after all settle */
  var _imgQueue = [];
  function _loadImg(src, onLoaded){
    if(!src) return;
    var p = new Promise(function(resolve){
      var img = new Image(); img.crossOrigin = 'anonymous';
      img.onload  = function(){ try{ onLoaded(img); }catch(e){} resolve(); };
      img.onerror = function(){ resolve(); };
      try{ img.src = src; }catch(e){ resolve(); }
    });
    _imgQueue.push(p);
  }

  /* Background */
  var grad = ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,pal.bg1); grad.addColorStop(1,pal.bg2);
  ctx.fillStyle=grad; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,255,255,0.02)'; ctx.lineWidth=1;
  for(var gx=0;gx<W;gx+=90){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
  for(var gy=0;gy<H;gy+=90){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}

  /* Header */
  ctx.fillStyle='rgba(255,255,255,0.04)'; ctx.fillRect(0,0,W,hH);
  ctx.fillStyle=pal.accent; ctx.fillRect(0,hH-3,W,3);

  /* Brand — always left-aligned */
  function drawBrand(){
    ctx.textAlign='left';
    ctx.font='bold 44px sans-serif'; ctx.fillStyle=pal.accent;
    ctx.fillText('Deen',148,76);
    ctx.fillStyle='rgba(255,255,255,0.92)';
    ctx.fillText('Locator',148+ctx.measureText('Deen').width+4,76);
    ctx.font='22px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.4)';
    ctx.fillText('by 2now Technology',148,104);
  }
  _loadImg(LOGO, function(img){ ctx.drawImage(img,50,22,80,80); drawBrand(); });
  drawBrand();

  /* Category pill top-right */
  var catLabel=(ev.category||'General').charAt(0).toUpperCase()+(ev.category||'General').slice(1);
  ctx.textAlign='left'; ctx.font='bold 26px sans-serif';
  var bw=ctx.measureText(catLabel).width+44;
  ctx.fillStyle=pal.accent; roundRect(ctx,W-bw-50,42,bw,54,27); ctx.fill();
  ctx.fillStyle='rgba(0,0,0,0.8)'; ctx.fillText(catLabel,W-bw-50+22,80);

  /* Title */
  var curY=hH+110;
  /* Auto-fit title: reduce font size if single-word lines are too wide */
  ctx.textAlign='left';
  (function(){
    /* Try requested size; if any word alone exceeds W-100, shrink until it fits */
    var _tFs = titleFs;
    var _maxTW = W - 100;
    ctx.font = 'bold ' + _tFs + 'px sans-serif';
    var _words = (ev.title||'').split(' ');
    /* Shrink until the widest single word fits */
    var _widest = _words.reduce(function(mx,w){ return Math.max(mx, ctx.measureText(w).width); }, 0);
    while(_tFs > 28 && _widest > _maxTW){
      _tFs--;
      ctx.font = 'bold ' + _tFs + 'px sans-serif';
      _widest = _words.reduce(function(mx,w){ return Math.max(mx, ctx.measureText(w).width); }, 0);
    }
    ctx.fillStyle = '#ffffff';
    var eWords=_words, eLine='', eLines=[];
    eWords.forEach(function(w){var t=eLine?eLine+' '+w:w;if(ctx.measureText(t).width>_maxTW){eLines.push(eLine);eLine=w;}else eLine=t;});
    if(eLine) eLines.push(eLine);
    var _lineH = Math.round(_tFs * 1.15);
    eLines.slice(0,3).forEach(function(nl){ctx.fillText(nl,50,curY);curY+=_lineH;});
  })();
  curY+=8;
  if(ev.organiser){
    var _orgText = 'by '+ev.organiser;
    var _oFs = fitFontSizeItalic ? orgFs : orgFs; /* placeholder until helpers available */
    /* Inline fit since helpers not yet defined at this point */
    _oFs = orgFs;
    ctx.font = 'italic ' + _oFs + 'px sans-serif';
    while(_oFs > 14 && ctx.measureText(_orgText).width > W-100){ _oFs--; ctx.font='italic '+_oFs+'px sans-serif'; }
    ctx.fillStyle='rgba(255,255,255,0.6)';
    ctx.fillText(_orgText,50,curY);
    curY += Math.round(_oFs * 1.5) + 4;
  }

  /* Time + Date pills */
  curY+=10;
  var pillX=50, pillH=64, pillGap=14;
  function drawPill(icon,text,border){
    ctx.textAlign='left'; ctx.font='bold '+timeFs+'px sans-serif';
    var tw=ctx.measureText(icon+' '+text).width+36;
    ctx.fillStyle='rgba(255,255,255,0.07)'; roundRect(ctx,pillX,curY,tw,pillH,pillH/2); ctx.fill();
    ctx.strokeStyle=border||'rgba(255,255,255,0.2)'; ctx.lineWidth=1.5;
    roundRect(ctx,pillX,curY,tw,pillH,pillH/2); ctx.stroke();
    ctx.fillStyle='#ffffff'; ctx.fillText(icon+' '+text,pillX+18,curY+43);
    pillX+=tw+pillGap;
  }
  if(ev.time) drawPill('\u23F0',ev.time,pal.accent);
  if(ev.endDate){
    var _d=new Date(ev.endDate),_dn=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],_dm=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    drawPill('\uD83D\uDCC5',_dn[_d.getDay()]+' '+_d.getDate()+' '+_dm[_d.getMonth()]+' '+_d.getFullYear(),'rgba(255,255,255,0.25)');
  }
  curY+=pillH+24;

  /* Venue block */
  ctx.fillStyle='rgba(255,255,255,0.07)'; roundRect(ctx,50,curY,W-100,110,16); ctx.fill();
  ctx.strokeStyle=pal.accent; ctx.lineWidth=1; roundRect(ctx,50,curY,W-100,110,16); ctx.stroke();
  ctx.textAlign='left'; ctx.font='bold 28px sans-serif'; ctx.fillStyle=pal.accent;
  ctx.fillText('\uD83C\uDFDB\uFE0F  '+loc.name,80,curY+42);
  ctx.font='24px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.55)';
  ctx.fillText('\uD83D\uDCCD  '+(loc.address||loc.area+', Abuja'),80,curY+82);
  curY+=130;

  /* Images */
  if(banners.length){
    var imgAreaW=W-100, imgGap=12, imgH2=260, hw=(imgAreaW-imgGap)/2;
    if(banners.length===1){
      var singleX=Math.floor((W-hw)/2);
      ctx.fillStyle='rgba(255,255,255,0.05)'; roundRect(ctx,singleX,curY,hw,imgH2,12); ctx.fill();
      (function(bx,by,bw2,bh){
        _loadImg(fixImgurUrl(banners[0]),function(bImg){
          ctx.save();roundRect(ctx,bx,by,bw2,bh,12);ctx.clip();
          ctx.fillStyle='#ffffff';ctx.fillRect(bx,by,bw2,bh);
          var iw=bImg.naturalWidth,ih=bImg.naturalHeight,scale=Math.min(bw2/iw,bh/ih),dw=iw*scale,dh=ih*scale;
          ctx.drawImage(bImg,bx+(bw2-dw)/2,by+(bh-dh)/2,dw,dh);ctx.restore();
        });
      })(singleX,curY,hw,imgH2);
    } else {
      [0,1].forEach(function(k){
        var bx=50+k*(hw+imgGap), by=curY;
        ctx.fillStyle='rgba(255,255,255,0.05)'; roundRect(ctx,bx,by,hw,imgH2,12); ctx.fill();
        (function(x,y,w2,h){
          _loadImg(fixImgurUrl(banners[k]),function(img){
            ctx.save();ctx.fillStyle='#fff';roundRect(ctx,x,y,w2,h,12);ctx.fill();
            roundRect(ctx,x,y,w2,h,12);ctx.clip();
            var iw=img.naturalWidth,ih=img.naturalHeight,ps=0.85,sw=w2*ps,sh=h*ps,
                scale=Math.min(sw/iw,sh/ih),dw=iw*scale,dh=ih*scale;
            ctx.drawImage(img,x+(w2-dw)/2,y+(h-dh)/2,dw,dh);ctx.restore();
          });
        })(bx,by,hw,imgH2);
      });
    }
    curY+=imgH2+30;
  }

  /* Info pill */
  if(ev.extraInfo&&ev.extraInfo.trim()){
    curY+=28;
    var infoLines=ev.extraInfo.split('\n').filter(function(l){return l.trim();});
    var pPad=28;
    /* Auto-fit extraFs: shrink if any word alone exceeds available width */
    var _eFs=extraFs, _eMaxW=W-130-24;
    ctx.font='bold '+_eFs+'px sans-serif';
    var _eWords=(ev.extraInfo||'').split(/\s+/);
    var _eWidest=_eWords.reduce(function(mx,w){return Math.max(mx,ctx.measureText(w).width);},0);
    while(_eFs>12&&_eWidest>_eMaxW){_eFs--;ctx.font='bold '+_eFs+'px sans-serif';_eWidest=_eWords.reduce(function(mx,w){return Math.max(mx,ctx.measureText(w).width);},0);}
    var lineH2=Math.round(_eFs*1.4);
    ctx.font='bold '+_eFs+'px sans-serif';
    var allWrapped=[];
    infoLines.forEach(function(il){
      var clean=il.trim();
      if(clean.charAt(0)==='*'||clean.charAt(0)==='.'||clean.charAt(0)==='-') clean='\u2022 '+clean.replace(/^[*.\-]\s*/,'');
      var words=clean.split(' '),wLine='',wrapped=[];
      words.forEach(function(w){
        var test=wLine?wLine+' '+w:w;
        if(ctx.measureText(test).width>W-130&&wLine){wrapped.push(wLine);wLine=w;}
        else wLine=test;
      });
      if(wLine) wrapped.push(wLine);
      allWrapped=allWrapped.concat(wrapped);
    });
    var pillH2=pPad*2+(allWrapped.length*lineH2);
    ctx.fillStyle='rgba(255,255,255,0.06)'; roundRect(ctx,44,curY-4,W-88,pillH2+8,20); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.13)'; roundRect(ctx,50,curY,W-100,pillH2,16); ctx.fill();
    ctx.fillStyle=pal.accent; ctx.fillRect(50,curY,5,pillH2);
    ctx.textAlign='left'; ctx.font='bold '+_eFs+'px sans-serif'; ctx.fillStyle='#ffffff';
    var ty2=curY+pPad+30;
    allWrapped.forEach(function(rl){ ctx.fillText(rl,50+24,ty2); ty2+=lineH2; });
    curY+=pillH2+28;
  }

  /* ══ BOTTOM TWO-COLUMN LAYOUT ══
     ISSUE 1 FIX: bottomY is always curY+40 — never allowed to go above the pill */
  var bottomY = curY + 40;
  var colW=(W-120)/2, leftX=50, rightX=50+colW+20;
  ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(50,bottomY-14,W-100,1);

  /* fitText: shrink font size before truncating — ISSUE 3 FIX */
  function fitText(txt, maxW, font){
    ctx.font = font || '22px sans-serif';
    if(ctx.measureText(txt).width <= maxW) return txt;
    while(txt.length>4 && ctx.measureText(txt+'...').width>maxW) txt=txt.slice(0,-1);
    return txt+'...';
  }

  /* ISSUE 3 FIX: font-shrink for social handles — never truncates with ellipsis */
  function drawSocLabel(txt, maxW, x, y){
    var fs = 18;
    ctx.font = fs+'px sans-serif';
    while(fs > 11 && ctx.measureText(txt).width > maxW){
      fs--;
      ctx.font = fs+'px sans-serif';
    }
    ctx.fillStyle='rgba(255,255,255,0.75)';
    ctx.fillText(txt, x, y);
  }

  var colMaxW = colW-20;

  /* ── AUTO-FIT HELPERS ──
     fitFontSize: reduces font size until text fits maxWidth.
     Returns the font size that fits. Never goes below minSize. */
  function fitFontSize(text, maxW, requestedSize, minSize){
    var fs = requestedSize;
    var lo = minSize || Math.max(10, Math.round(requestedSize * 0.4));
    ctx.font = 'bold ' + fs + 'px sans-serif';
    while(fs > lo && ctx.measureText(text).width > maxW){
      fs--;
      ctx.font = 'bold ' + fs + 'px sans-serif';
    }
    return fs;
  }

  /* fitFontSizeItalic: same but italic */
  function fitFontSizeItalic(text, maxW, requestedSize, minSize){
    var fs = requestedSize;
    var lo = minSize || Math.max(10, Math.round(requestedSize * 0.4));
    ctx.font = 'italic ' + fs + 'px sans-serif';
    while(fs > lo && ctx.measureText(text).width > maxW){
      fs--;
      ctx.font = 'italic ' + fs + 'px sans-serif';
    }
    return fs;
  }

  /* fitFontSizeNormal: for sponsor names etc */
  function fitFontSizeNormal(text, maxW, requestedSize, minSize){
    var fs = requestedSize;
    var lo = minSize || Math.max(10, Math.round(requestedSize * 0.4));
    ctx.font = fs + 'px sans-serif';
    while(fs > lo && ctx.measureText(text).width > maxW){
      fs--;
      ctx.font = fs + 'px sans-serif';
    }
    return fs;
  }

  /* Social 2×2 grid */
  function drawSocGrid(socItems, startX, startRy, colWidth){
    var hcw = Math.floor((colWidth-8)/2);
    var ry = startRy;
    for(var _si=0;_si<socItems.length;_si+=2){
      for(var _sj=_si;_sj<Math.min(_si+2,socItems.length);_sj++){
        var _sc=socItems[_sj], _sx=startX+(_sj%2)*(hcw+8);
        (function(img_x,img_y,key,tx,ty,avail){
          _loadImg(SOC_ICONS[key],function(img){ ctx.drawImage(img,img_x,img_y,28,28); });
          ctx.textAlign='left';
          drawSocLabel(_sc.lbl, avail, tx, ty);
        })(_sx, ry-18, _sc.icon, _sx+34, ry, hcw-38);
      }
      ry+=32;
    }
    return ry;
  }

  /* ── LEFT column: Donations (always first if present), then Supported By ── */
  ctx.textAlign='left';
  var _leftY = bottomY + 20;

  /* DONATIONS */
  if(ev.accountNumber){
    ctx.font='bold 20px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.38)';
    ctx.fillText('DONATIONS',leftX,_leftY); _leftY+=32;
    ctx.font='bold 26px sans-serif'; ctx.fillStyle='#f0c96a';
    if(ev.accountName){ ctx.fillText(fitText(ev.accountName,colMaxW,'bold 26px sans-serif'),leftX,_leftY); _leftY+=32; }
    ctx.font='34px sans-serif'; ctx.fillStyle='#f0c96a';
    ctx.fillText(ev.accountNumber,leftX,_leftY); _leftY+=36;
    ctx.font='20px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.38)';
    if(ev.bankName){ ctx.fillText(ev.bankName,leftX,_leftY); _leftY+=30; }
    _leftY+=10; /* gap before Supported By */
  }

  /* SUPPORTED BY (shown after Donations if both exist, or alone if no account) */
  var spArr2=[];
  if(ev.sponsors){
    if(Array.isArray(ev.sponsors)) spArr2=ev.sponsors;
    else{ ev.sponsors.split('\n').forEach(function(s){if(s.trim())spArr2.push({name:s.trim(),logoUrl:''});}); }
    spArr2=spArr2.filter(function(s){return(typeof s==='string'?s:(s.name||'')).trim();});
  }
  if(spArr2.length){
    ctx.font='bold 20px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.38)';
    ctx.fillText('SUPPORTED BY',leftX,_leftY); _leftY+=44;
    spArr2.slice(0,5).forEach(function(s){
      var sName=typeof s==='string'?s:s.name;
      var sLogo=typeof s==='object'&&s.logoUrl?s.logoUrl:'';
      if(sLogo){
        /* Logo: draw downward from current y, name vertically centred beside it */
        (function(lx,ly,sz){
          /* circle centre at (lx+sz/2, ly+sz/2) — logo sits BELOW the label */
          _loadImg(sLogo,function(img){
            ctx.save();ctx.beginPath();ctx.arc(lx+sz/2,ly+sz/2,sz/2,0,Math.PI*2);ctx.clip();
            ctx.fillStyle='rgba(255,255,255,0.1)'; ctx.fill();
            ctx.drawImage(img,lx,ly,sz,sz);ctx.restore();
          });
        })(leftX,_leftY,sponsorLogoSz);
        var _spFs=fitFontSizeNormal(sName,colMaxW-(sponsorLogoSz+8),sponsorFs,12);
        ctx.font=_spFs+'px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.85)';
        ctx.fillText(sName,leftX+sponsorLogoSz+10,_leftY+Math.round(sponsorLogoSz*0.62));
        _leftY+=sponsorLogoSz+8;
      } else {
        /* No logo — diamond bullet + name */
        var _spFs2=fitFontSizeNormal('\u2726  '+sName,colMaxW,sponsorFs,12);
        ctx.font=_spFs2+'px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.75)';
        ctx.fillText('\u2726  '+sName,leftX,_leftY+Math.round(_spFs2*0.8));
        _leftY+=Math.max(30,Math.round(_spFs2*1.4));
      }
    });
  }

  /* ── RIGHT column: Enquiry + Social (same for all categories) ── */
  var _rightY=bottomY+20;
  if(ev.phone){
    ctx.textAlign='left'; ctx.font='bold 20px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.38)';
    ctx.fillText('ENQUIRY',rightX,_rightY); _rightY+=30;
    ctx.font='bold 26px sans-serif'; ctx.fillStyle='#22c98a';
    ctx.fillText('\uD83D\uDCDE  '+ev.phone,rightX,_rightY); _rightY+=38;
  }
  var socItemsAll=[];
  if(ev.facebook) socItemsAll.push({icon:'fb',lbl:ev.facebook});
  if(ev.instagram) socItemsAll.push({icon:'ig',lbl:ev.instagram});
  if(ev.whatsappSocial) socItemsAll.push({icon:'wa',lbl:ev.whatsappSocial});
  if(ev.twitterX) socItemsAll.push({icon:'x',lbl:ev.twitterX});
  if(socItemsAll.length) drawSocGrid(socItemsAll, rightX, _rightY, colW);


  /* Footer */
  ctx.fillStyle='rgba(0,0,0,0.55)'; ctx.fillRect(0,fY,W,_footerH);
  ctx.fillStyle=pal.accent; ctx.fillRect(0,fY,W,2);
  var _appUrl='https://'+((typeof APP_CONFIG!=='undefined'&&APP_CONFIG.appUrl)||'deenlocator.ng').replace(/^https?:\/\//,'');
  ctx.textAlign='left'; ctx.font='bold 25px sans-serif'; ctx.fillStyle='#fff';
  ctx.fillText('\uD83D\uDCF1 Download DeenLocator \u2014 Free App',50,fY+38);
  ctx.font='21px sans-serif'; ctx.fillStyle=pal.accent;
  ctx.fillText(_appUrl,50,fY+64);
  ctx.font='17px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.4)';
  ctx.fillText('Free Eid & Jumuah locator \u2022 Abuja FCT',50,fY+90);
  var _fPhone=(typeof APP_CONFIG!=='undefined'&&APP_CONFIG.contactPhone)||'+234 806 590 0110';
  ctx.textAlign='right'; ctx.font='bold 21px sans-serif'; ctx.fillStyle='#22c98a';
  ctx.fillText('\uD83D\uDCDE '+_fPhone,W-50,fY+38);
  var _fSocArr=[];
  if(typeof APP_CONFIG!=='undefined'){
    if(APP_CONFIG.footerFacebook) _fSocArr.push('fb: '+APP_CONFIG.footerFacebook);
    if(APP_CONFIG.footerInstagram) _fSocArr.push('ig: '+APP_CONFIG.footerInstagram);
    if(APP_CONFIG.footerWhatsapp) _fSocArr.push('wa: '+APP_CONFIG.footerWhatsapp);
    if(APP_CONFIG.footerTwitter) _fSocArr.push('x: '+APP_CONFIG.footerTwitter);
  }
  if(_fSocArr.length){
    ctx.font='17px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.55)'; ctx.textAlign='right';
    for(var _fi=0;_fi<_fSocArr.length;_fi+=2){
      ctx.fillText(_fSocArr.slice(_fi,_fi+2).join('   '),W-50,fY+60+Math.floor(_fi/2)*22);
    }
  }
  ctx.textAlign='left';

  /* Export after all async images settle */
  function doShare(){
    cv.toBlob(function(blob){
      var fname='deenlocator-event-'+(ev.title||'event').replace(/[^a-z0-9]/gi,'_').toLowerCase()+'.png';
      var file=new File([blob],fname,{type:'image/png'});
      if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
        navigator.share({files:[file],title:ev.title||'Event',text:'DeenLocator \u2014 '+loc.name});
      } else {
        triggerDownload(cv,fname); showToast('\u2705 Event card saved!');
      }
    },'image/png');
  }
  Promise.all(_imgQueue).then(doShare).catch(doShare);
}




/* Auto-fix imgur URLs: convert page URL to direct image URL */

function openShare(id){
  var _sl=LOCATIONS.find(function(l){return l.id===id;});
  trackEvent('share_card_open', 'engagement', _sl?_sl.name:'unknown');
  var loc = LOCATIONS.find(function(l){return l.id===id;});
  if(!loc) return;
  shareLocId = id;
  currentShareLoc = loc;

  /* ── Populate visual card ── */
  var type  = loc.type==='eid'?'Eid Prayer Ground':loc.type==='both'?'Eid + Jumuah Mosque':'Jumuah Mosque';
  var bgBadge = loc.type==='eid'?'#fef3c7':loc.type==='both'?'#ede9fe':'#d1fae5';
  var fcBadge = loc.type==='eid'?'#92400e':loc.type==='both'?'#4c1d95':'#065f46';

  var scBadge = document.getElementById('scBadge');
  scBadge.textContent = type;
  scBadge.style.background = bgBadge;
  scBadge.style.color = fcBadge;

  document.getElementById('scName').textContent = loc.name;
  document.getElementById('scArea').textContent = '📍 ' + loc.area + ', Abuja';
  document.getElementById('scAddress').textContent = loc.address || loc.area + ', Abuja, FCT';

  /* Time pills — respect per-mosque hidden flags */
  var timesEl = document.getElementById('scTimes');
  timesEl.innerHTML = '';
  if(loc.jumuahTime){
    var jDisplay = loc.jumuahTimeHidden ? 'TBC' : loc.jumuahTime;
    timesEl.innerHTML += '<div class="share-card-time-pill"><span>Jumuah</span>' + jDisplay + ' Fri</div>';
  }
  if(loc.eidTime){
    var eDisplay = loc.eidTimeHidden ? 'TBC' : loc.eidTime;
    timesEl.innerHTML += '<div class="share-card-time-pill"><span>Eid Prayer</span>' + eDisplay + '</div>';
  }
  if(loc.imam && loc.imam !== 'To be announced'){
    timesEl.innerHTML += '<div class="share-card-time-pill"><span>'+(loc.imamRole||'Imam')+'</span>' + loc.imam + '</div>';
  }

  /* Text preview */
  document.getElementById('sharePreviewText').textContent = buildShareText(loc);

  var text = buildShareText(loc);

  document.getElementById('shareWhatsappBtn').onclick = function(){
    var waUrl = 'https://wa.me/?text=' + encodeURIComponent(text);
    window.open(waUrl, '_blank');
  };
  /* One-tap: save image AND open WhatsApp */
  document.getElementById('shareOneTapBtn').onclick = function(){
    var btn = document.getElementById('shareOneTapBtn');
    btn.innerHTML = '⏳ Generating card...';
    btn.disabled  = true;
    oneTapShareCard(currentShareLoc, text);
    setTimeout(function(){
      btn.innerHTML = '🚀 Save Card + Share on WhatsApp';
      btn.disabled  = false;
    }, 4000);
  };
  document.getElementById('shareCopyBtn').onclick = function(){
    navigator.clipboard.writeText(text.replace(/\*/g,'')).then(function(){
      showToast('📋 Copied to clipboard!');
      closeShareSheet();
    }).catch(function(){
      showToast('📋 Copy not supported — use WhatsApp button');
    });
  };

  document.getElementById('shareOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

/* ══ SUGGEST A MOSQUE ══ */

(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const PAGE=window.SHOMAN_PAGE||'home';
const PGM={home:'index.html',about:'about.html',theater:'theater.html',products:'seats.html',telescopic:'telescopic.html',options:'options.html',projects:'projects.html',downloads:'downloads.html',contact:'contact.html'};
const PAGEKEY={home:'home',about:'about',theater:'theater',seats:'products',telescopic:'products',options:'products',projects:'projects',downloads:'projects',contact:'contact'};
const FILE={home:'index.html',about:'about.html',theater:'theater.html',seats:'seats.html',telescopic:'telescopic.html',options:'options.html',projects:'projects.html',downloads:'downloads.html',contact:'contact.html'}[PAGE]||'index.html';
const PGF=id=>/^svc-/.test(id)?PGM.theater+'#'+id:(PGM[id]||'index.html');
let leaving=false;
function navTo(u){if(leaving)return;leaving=true;if(reduced){location.href=u;return}document.documentElement.classList.add('leaving');setTimeout(()=>{location.href=u},190)}
addEventListener('pageshow',e=>{leaving=false;document.documentElement.classList.remove('leaving')});
let lang=ls.get('shoman_lang')||'en';
const T=(en,ar)=>lang==='ar'?ar:en;
const setLocale=()=>{document.documentElement.lang=lang==='ar'?'ar':'en';document.documentElement.dir=lang==='ar'?'rtl':'ltr'};
const pick=(o,k)=>(o&&(o[k+(lang==='ar'?'Ar':'En')]||o[k+'En']))||'';
const uid=()=>Math.random().toString(36).slice(2,9);
const MEDIA_IMAGE={'hero-auditorium.webp':'img/pexels-25857614.jpg','hero-stage.webp':'img/pexels-35657609.jpg','telescopic.webp':'img/pexels-36834057.jpg','about.webp':'img/pexels-1679617.jpg'};
const clone=o=>JSON.parse(JSON.stringify(o));
const hsh=s=>{let h=5381;s='shoman|'+s;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return String(h>>>0)};

/* ---------- icons & art ---------- */
const IC={
 arch:'<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/>',
 audio:'<path d="M4 9v6h4l5 4V5L8 9H4zM16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"/>',
 light:'<path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
 visual:'<rect x="3" y="4" width="18" height="12"/><path d="M8 20h8M12 16v4"/>',
 mech:'<path d="M3 5h18M3 19h18M5 5l7 14M19 5l-7 14M12 5l-5 7M12 5l5 7"/>',
 care:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5"/>',
 num:'<rect x="4" y="6" width="16" height="12"/><path d="M8 10v4M8 10l-1.5 1M12 10h2.5v2h-2.5v2H15"/>',
 row:'<path d="M3 20h18M5 20V9h14v11M8 9V5h8v4M10 14h4"/>',
 acc:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
 tab:'<path d="M3 17l5-9h13l-5 9H3zM8 8l-2-3h12l3 3"/>'
};
const ico=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="miter">${IC[n]||IC.arch}</svg>`;
const ARR=c=>`<svg ${c?`class="${c}"`:''} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8h12M9 3l5 5-5 5"/></svg>`;
const ARRL='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8h12M9 3l5 5-5 5"/></svg>';
const CHEV='<svg class="chev" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 3l4 4 4-4"/></svg>';
const XI='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 2l12 12M14 2L2 14"/></svg>';
let gid=0;
function logoSVG(light){
  const rtl=lang==='ar';
  const fg=light?'#FFFFFF':'#1a0b54';
  const grad='url(#shomanLogo)';
  const markTransform=rtl?'translate(142 0) scale(-1 1)':'';
  const textX=rtl?102:39,textAnchor=rtl?'end':'start';
  return `<svg class="shoman-logo" viewBox="0 0 142 36" direction="ltr" style="direction:ltr;unicode-bidi:isolate" role="img" aria-label="shoman" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="shomanLogo" x1="3" y1="29" x2="29" y2="3" gradientUnits="userSpaceOnUse"><stop stop-color="#2F6BFF"/><stop offset=".5" stop-color="#8A5CFF"/><stop offset="1" stop-color="#F06CFF"/></linearGradient><linearGradient id="shomanLogoLight" x1="3" y1="29" x2="29" y2="3" gradientUnits="userSpaceOnUse"><stop stop-color="#6E91FF"/><stop offset=".5" stop-color="#C69BFF"/><stop offset="1" stop-color="#FF9CF2"/></linearGradient></defs><g transform="${markTransform}"><circle class="lr" pathLength="1" cx="16" cy="18" r="13.8" stroke="${grad}" stroke-width="2"/><path class="lgr" d="M14.27 10.80 L14.72 8.49 L17.28 8.49 L17.73 10.80 L19.87 11.69 L21.82 10.37 L23.63 12.18 L22.31 14.13 L23.20 16.27 L25.51 16.72 L25.51 19.28 L23.20 19.73 L22.31 21.87 L23.63 23.82 L21.82 25.63 L19.87 24.31 L17.73 25.20 L17.28 27.51 L14.72 27.51 L14.27 25.20 L12.13 24.31 L10.18 25.63 L8.37 23.82 L9.69 21.87 L8.80 19.73 L6.49 19.28 L6.49 16.72 L8.80 16.27 L9.69 14.13 L8.37 12.18 L10.18 10.37 L12.13 11.69Z M19.1 18 A3.1 3.1 0 1 0 12.9 18 A3.1 3.1 0 1 0 19.1 18Z" fill="${grad}" fill-rule="evenodd"/><circle class="ld" cx="16" cy="18" r="1.7" fill="#fff"/></g><text x="${textX}" y="25" text-anchor="${textAnchor}" direction="ltr" unicode-bidi="isolate" fill="${fg}" font-family="'Plus Jakarta Sans',Arial,sans-serif" font-size="23" font-weight="500" letter-spacing="-.45">shoman</text></svg>`;
}
function chair(i){
  const sets=[['#2B50E8','#1BB3D1'],['#0B1528','#2B50E8'],['#0F2A6B','#54D6F5'],['#444655','#94A3B8'],['#2B50E8','#9CE9FF'],['#0B1528','#1BB3D1'],['#0F2A6B','#1BB3D1'],['#2B50E8','#CBD5E1'],['#0F2A6B','#1BB3D1'],['#444655','#1BB3D1']];
  const [c1,c2]=sets[i%sets.length];
  return `<svg viewBox="0 0 200 200" aria-hidden="true"><rect x="58" y="22" width="84" height="92" fill="${c1}"/><rect x="66" y="30" width="68" height="76" fill="${c2}" opacity=".55"/><rect x="50" y="114" width="100" height="30" fill="${c1}"/><rect x="38" y="98" width="14" height="52" fill="#0B1528"/><rect x="148" y="98" width="14" height="52" fill="#0B1528"/><rect x="92" y="144" width="16" height="34" fill="#444655"/><rect x="64" y="176" width="72" height="8" fill="#0B1528"/></svg>`;
}
function scene(k){
  const id='g'+(++gid);
  let s=`<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0F2A6B"/><stop offset="1" stop-color="#0B1528"/></linearGradient></defs><rect width="1600" height="900" fill="url(#${id})"/>`;
  if(k===0){
    s+='<polygon points="720,0 880,0 1180,470 420,470" fill="#54D6F5" opacity=".14"/><rect x="420" y="440" width="760" height="14" fill="#1BB3D1" opacity=".5"/>';
    for(let r=0;r<9;r++){const sc=.55+r*.1,y=500+r*46,n=13+r,w=58*sc,g=14*sc;let x=(1600-n*(w+g))/2;
      for(let i=0;i<n;i++){s+=`<g opacity="${Math.min(.3+r*.09,.95)}"><rect x="${x.toFixed(1)}" y="${(y-48*sc).toFixed(1)}" width="${w.toFixed(1)}" height="${(48*sc).toFixed(1)}" fill="#2B50E8"/><rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="${(11*sc).toFixed(1)}" fill="#54D6F5"/></g>`;x+=w+g}}
  }else if(k===1){
    for(let i=0;i<9;i++){s+=`<rect x="${i*62}" y="0" width="52" height="640" fill="#0F2A6B" opacity="${.5+(i%2)*.25}"/><rect x="${1600-(i+1)*62+10}" y="0" width="52" height="640" fill="#0F2A6B" opacity="${.5+(i%2)*.25}"/>`}
    s+='<polygon points="560,0 640,0 760,640 440,640" fill="#9CE9FF" opacity=".16"/><polygon points="960,0 1040,0 1160,640 840,640" fill="#9CE9FF" opacity=".12"/><rect x="0" y="640" width="1600" height="260" fill="#071A27"/><rect x="300" y="640" width="1000" height="10" fill="#1BB3D1"/>';
    for(let i=0;i<7;i++){s+=`<rect x="${340+i*136}" y="700" width="60" height="70" fill="#2B50E8" opacity="${.4+i*.07}"/>`}
  }else{
    for(let i=0;i<9;i++){const y=720-i*68;s+=`<rect x="${120+i*96}" y="${y}" width="${1500-i*96}" height="68" fill="${i%2?'#0F2A6B':'#0F2A6B'}"/><rect x="${120+i*96}" y="${y}" width="${1500-i*96}" height="6" fill="#54D6F5" opacity=".6"/>`;
      for(let j=0;j<12-Math.floor(i*.6);j++){s+=`<rect x="${160+i*96+j*112}" y="${y+14}" width="52" height="38" fill="#1BB3D1" opacity="${.25+i*.07}"/>`}}
    s+='<polygon points="1100,0 1250,0 1500,360 900,360" fill="#9CE9FF" opacity=".1"/>';
  }
  return s+'</svg>';
}
function telArt(i){
  const hl=[[560,120,300,150],[140,420,420,90],[160,560,700,120],[860,300,300,160],[1180,500,260,150]][i%5];
  const lab=['SAFETY','STABILITY','INSTALLATION','SEATING','ACCESSORIES'][i%5];
  return scene(2).replace('</svg>',`<rect x="${hl[0]}" y="${hl[1]}" width="${hl[2]}" height="${hl[3]}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="14 8"/><rect x="${hl[0]}" y="${hl[1]-34}" width="190" height="34" fill="#fff"/><text x="${hl[0]+12}" y="${hl[1]-11}" font-family="Space Grotesk,sans-serif" font-weight="700" font-size="16" letter-spacing="2" fill="#0B1528">${lab}</text></svg>`);
}
function mapSVG(){
  let s='<svg viewBox="0 0 800 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="800" height="440" fill="#EDF7F9"/>';
  for(let x=0;x<=800;x+=40)s+=`<line x1="${x}" y1="0" x2="${x}" y2="440" stroke="#CBD5E1" stroke-width="1" opacity=".7"/>`;
  for(let y=0;y<=440;y+=40)s+=`<line x1="0" y1="${y}" x2="800" y2="${y}" stroke="#CBD5E1" stroke-width="1" opacity=".7"/>`;
  s+='<path d="M0 300 C120 270 200 330 320 300 S520 240 640 270 800 320 800 320 V440 H0Z" fill="#E2E8F0"/><path d="M180 120 L330 150 L380 230 L300 300 L190 260Z" fill="#fff" stroke="#CBD5E1"/><path d="M420 90 L640 110 L700 220 L600 330 L450 290Z" fill="#fff" stroke="#CBD5E1"/><line x1="250" y1="210" x2="560" y2="210" stroke="#2B50E8" stroke-width="2" stroke-dasharray="8 6"/>';
  [[250,210,'CAIRO'],[560,210,'RIYADH']].forEach(p=>{s+=`<g><rect x="${p[0]-9}" y="${p[1]-9}" width="18" height="18" fill="#2B50E8"/><rect x="${p[0]-3}" y="${p[1]-3}" width="6" height="6" fill="#fff"/><rect x="${p[0]-44}" y="${p[1]+18}" width="88" height="26" fill="#0B1528"/><text x="${p[0]}" y="${p[1]+36}" text-anchor="middle" font-family="Space Grotesk,sans-serif" font-weight="600" font-size="13" letter-spacing="2" fill="#fff">${p[2]}</text></g>`});
  return s+'</svg>';
}

/* ---------- data ---------- */
const VAR_EN=['Upholstered · Wood finish','Upholstered · Steel frame','Tip-up · Fabric','Tip-up · Perforated back','Fixed · Upholstered','Fixed · Wood finish','Tip-up · Leatherette','Upholstered · Aluminium base','Tip-up · Wood back','Fixed · Fabric'];
const VAR_AR=['منجّد · تشطيب خشبي','منجّد · هيكل صلب','قابل للطي · قماش','قابل للطي · ظهر مثقّب','ثابت · منجّد','ثابت · تشطيب خشبي','قابل للطي · جلد صناعي','منجّد · قاعدة ألومنيوم','قابل للطي · ظهر خشبي','ثابت · قماش'];
const seed=()=>({
 v:6,
 settings:{batch:4,phone:'+20 100 819 9777',landline:'+20 2 26582212',email:'hello@shoman.com',waRiyadh:'201008199777',
  cairoEn:'Villa 99, West Arabella, 5th Settlement, New Cairo',cairoAr:'فيلا 99، ويست أرابيلا، التجمع الخامس، القاهرة الجديدة',
  riyadhEn:'Al Wizarat, Riyadh, Saudi Arabia',riyadhAr:'الوزارات، الرياض، المملكة العربية السعودية',
  riyadhNoteEn:'Contact our Cairo team',riyadhNoteAr:'تواصل مع فريقنا في القاهرة',facebook:'#',instagram:'#',x:'#',defLang:'en'},
 sections:{about:true,theater:true,products:true,telescopic:true,options:true,projects:true,downloads:true,contact:true},
 hero:[
  {id:'h1',titleEn:'Spaces that bring people together',titleAr:'مساحات تجمع الناس',subEn:'Auditorium seating and complete theater systems, engineered in Egypt and delivered across the region.',subAr:'مقاعد قاعات وأنظمة مسارح متكاملة، تُصمَّم في مصر وتُنفَّذ في المنطقة.'},
  {id:'h2',titleEn:'Seating made to specification',titleAr:'مقاعد مصنوعة وفق المواصفات',subEn:'Ten Performer models, finished to the acoustics and the sightlines of your hall.',subAr:'عشرة موديلات من Performer، بتشطيبات تناسب صوتيات قاعتك وزوايا الرؤية فيها.'},
  {id:'h3',titleEn:'One partner, from stage to seat',titleAr:'شريك واحد من المسرح إلى المقعد',subEn:'Architecture, audio, lighting, visuals and mechanisms under one roof.',subAr:'العمارة والصوت والإضاءة والمؤثرات البصرية والميكانيزم تحت سقف واحد.'}],
 products:VAR_EN.map((v,i)=>({id:'ch'+(i+1),code:'CH '+String(i+1).padStart(3,'0'),nameEn:'Performer',nameAr:'Performer',descEn:v,descAr:VAR_AR[i],material:i%2?'Steel frame, fabric':'Wood, upholstery',mechanism:/Tip-up/.test(v)?'Self-rising':'Fixed',acoustic:'Class B',dims:'W 520 × D 560 × H 880 mm',status:i<8?'Published':'Published',featured:i<3})),
 services:[
  {id:'arch',icon:'arch',titleEn:'Architecture & Design',titleAr:'العمارة والتصميم',descEn:'Interiors shaped around sound and sightlines, from the stage floor to the last row.',descAr:'تصميم داخلي مبني على الصوتيات وزوايا الرؤية، من أرضية المسرح إلى آخر صف.',status:'Published',items:[['Furniture','أثاث'],['Acoustic insulation','العزل الصوتي'],['Curtains','ستائر'],['Stage','خشبة المسرح'],['Seating','المقاعد'],['Flooring & Rugs','الأرضيات والسجاد']].map(a=>({en:a[0],ar:a[1]}))},
  {id:'audio',icon:'audio',titleEn:'Pro Audio',titleAr:'الصوتيات الاحترافية',descEn:'Speakers, mixing and communications sized to the room and the programme.',descAr:'سماعات وميكسرات وأنظمة اتصال بحجم القاعة ونوع العروض.',status:'Published',items:[['PA Speakers','سماعات PA'],['Line Array','لاين أراي'],['Mixer','ميكسر'],['Microphone','ميكروفون'],['Amplifier','مكبر صوت'],['Podium','منصة'],['Accessories','إكسسوارات'],['Comms','أنظمة الاتصال']].map(a=>({en:a[0],ar:a[1]}))},
  {id:'light',icon:'light',titleEn:'Pro Lighting',titleAr:'الإضاءة الاحترافية',descEn:'Fixtures, control and dimming for stage, house and architectural lighting.',descAr:'وحدات إضاءة وتحكم ومخفّتات للمسرح والصالة والإضاءة المعمارية.',status:'Published',items:[['LED Lights','إضاءة LED'],['Lighting Bar','لايتنج بار'],['Lighting Desk','وحدة تحكم'],['Cue lights','كيو لايت'],['Dimmers','مخفّتات'],['Fresnel','فريزنل'],['Floodlights','كشافات'],['Moving Light','إضاءة متحركة']].map(a=>({en:a[0],ar:a[1]}))},
  {id:'visual',icon:'visual',titleEn:'Visual & Effects',titleAr:'المؤثرات البصرية',descEn:'Projection, LED walls and stage effects that suit the venue and the show.',descAr:'عرض وشاشات LED ومؤثرات مسرحية تناسب المكان والعرض.',status:'Published',items:[['Projector','بروجكتور'],['Projector screen','شاشة عرض'],['LED screen','شاشة LED'],['Pyro','مؤثرات نارية'],['Smoke machine','ماكينة دخان'],['Special effects','مؤثرات خاصة']].map(a=>({en:a[0],ar:a[1]}))},
  {id:'mech',icon:'mech',titleEn:'Mechanism',titleAr:'الميكانيزم',descEn:'Rigging and stage machinery for safe, repeatable movement.',descAr:'أنظمة تعليق وماكينات مسرح لحركة آمنة ومتكررة.',status:'Published',items:[['Truss','تراس'],['Motive','موتيف'],['Siti','سيتي']].map(a=>({en:a[0],ar:a[1]}))},
  {id:'care',icon:'care',titleEn:'Annual Care Packages',titleAr:'باقات الصيانة السنوية',descEn:'Scheduled inspection and maintenance so the hall is ready for every season.',descAr:'فحص وصيانة دورية لتكون القاعة جاهزة في كل موسم.',status:'Published',block:true,items:[{en:'Annual packages cover scheduled inspection, cleaning, adjustment and replacement of worn parts across seating, audio, lighting and stage systems. Package scope is agreed per venue.',ar:'تشمل الباقات السنوية الفحص والتنظيف والضبط واستبدال الأجزاء المستهلكة في المقاعد والصوت والإضاءة وأنظمة المسرح. يُتفق على نطاق الباقة لكل موقع.'}]}
 ],
 options:[
  {id:'o1',icon:'num',titleEn:'Seat numbers',titleAr:'أرقام المقاعد',descEn:'Engraved or printed numbers fixed to the seat back or arm.',descAr:'أرقام محفورة أو مطبوعة على ظهر المقعد أو ذراعه.',status:'Published'},
  {id:'o2',icon:'row',titleEn:'Row markers',titleAr:'علامات الصفوف',descEn:'Row letters and aisle markers matched to the seating plan.',descAr:'حروف الصفوف وعلامات الممرات متوافقة مع مخطط المقاعد.',status:'Published'},
  {id:'o3',icon:'acc',titleEn:'Accessories',titleAr:'الإكسسوارات',descEn:'Cup holders, armrest options and cable-free add-ons.',descAr:'حاملات أكواب وخيارات مساند ذراع وإضافات بدون كابلات.',status:'Published'},
  {id:'o4',icon:'tab',titleEn:'Writing tablets',titleAr:'طاولات الكتابة',descEn:'Fold-away tablets for lecture halls, left or right handed.',descAr:'طاولات قابلة للطي لقاعات المحاضرات، لليمين أو لليسار.',status:'Published'}],
 tabs:[
  {id:'t1',titleEn:'Safety',titleAr:'السلامة',descEn:'Every tier is locked and guarded before the first spectator sits.',descAr:'كل مستوى مؤمَّن ومزوَّد بحواجز قبل جلوس أول متفرج.',bEn:'Integrated guardrails|Anti-slip decking|Load-tested structure',bAr:'حواجز مدمجة|أرضية مانعة للانزلاق|هيكل مُختبر تحت الحمل',status:'Published'},
  {id:'t2',titleEn:'Stability',titleAr:'الثبات',descEn:'A rigid frame keeps the stand steady under a full crowd.',descAr:'هيكل صلب يحافظ على ثبات المدرج تحت حشد كامل.',bEn:'Cross-braced frame|Levelling feet|Locking mechanism',bAr:'هيكل بتدعيم متقاطع|أرجل ضبط المستوى|آلية تأمين',status:'Published'},
  {id:'t3',titleEn:'Installation',titleAr:'التركيب',descEn:'Planned on site and installed by our own crews.',descAr:'يُخطَّط في الموقع ويُركَّب بواسطة فرقنا.',bEn:'Site survey|Fast fit-out|Handover and training',bAr:'معاينة الموقع|تركيب سريع|تسليم وتدريب',status:'Published'},
  {id:'t4',titleEn:'Seating',titleAr:'المقاعد',descEn:'Choose bench, shell or upholstered seats for each tier.',descAr:'اختر مقاعد مقعدية أو قوقعية أو منجّدة لكل مستوى.',bEn:'Bench and individual seats|Multiple finishes|Colour matching',bAr:'مقاعد مشتركة وفردية|تشطيبات متعددة|مطابقة الألوان',status:'Published'},
  {id:'t5',titleEn:'Accessories',titleAr:'الإكسسوارات',descEn:'Add-ons that complete the stand for sport and events.',descAr:'إضافات تكمل المدرج للرياضة والفعاليات.',bEn:'Handrails|Aisle lighting|Seat numbering',bAr:'درابزين|إضاءة الممرات|ترقيم المقاعد',status:'Published'}],
 projects:[
  {id:'p1',titleEn:'City Theater, Cairo',titleAr:'مسرح المدينة، القاهرة',sector:'theaters',country:'Egypt',year:'2023',seats:'820',status:'Published'},
  {id:'p2',titleEn:'University Auditorium',titleAr:'قاعة جامعية',sector:'universities',country:'Egypt',year:'2022',seats:'1,200',status:'Published'},
  {id:'p3',titleEn:'Indoor Sports Hall',titleAr:'صالة رياضية مغطاة',sector:'sports',country:'Saudi Arabia',year:'2024',seats:'2,400',status:'Published'},
  {id:'p4',titleEn:'Conference Centre',titleAr:'مركز مؤتمرات',sector:'conference',country:'Saudi Arabia',year:'2023',seats:'640',status:'Published'},
  {id:'p5',titleEn:'Cultural Hall',titleAr:'قاعة ثقافية',sector:'theaters',country:'Egypt',year:'2021',seats:'450',status:'Published'},
  {id:'p6',titleEn:'Lecture Hall Complex',titleAr:'مجمع قاعات محاضرات',sector:'universities',country:'Egypt',year:'2024',seats:'980',status:'Published'}],
 downloads:[
  {id:'d1',titleEn:'Company catalog',titleAr:'كتالوج الشركة',fileName:'shoman-Catalog.pdf',size:'12 MB',status:'Published'},
  {id:'d2',titleEn:'Performer data sheets (CH 001–010)',titleAr:'أوراق بيانات Performer',fileName:'Performer-Datasheets.pdf',size:'6.4 MB',status:'Published'},
  {id:'d3',titleEn:'Telescopic seating catalog',titleAr:'كتالوج المدرجات القابلة للطي',fileName:'Telescopic.pdf',size:'8.1 MB',status:'Published'},
  {id:'d4',titleEn:'Theater solutions brochure',titleAr:'كتيّب حلول المسارح',fileName:'Theater-Solutions.pdf',size:'5.2 MB',status:'Published'}],
 nav:[{id:'home',show:true},{id:'about',show:true},{id:'theater',show:true},{id:'projects',show:true},{id:'contact',show:true}],
 media:[{id:'m1',name:'hero-auditorium.webp',size:'420 KB',src:MEDIA_IMAGE['hero-auditorium.webp']},{id:'m2',name:'hero-stage.webp',size:'380 KB',src:MEDIA_IMAGE['hero-stage.webp']},{id:'m3',name:'telescopic.webp',size:'510 KB',src:MEDIA_IMAGE.telescopic},{id:'m4',name:'about.webp',size:'290 KB',src:MEDIA_IMAGE.about}],
 admins:[{id:'a1',email:'admin@shoman.com',pw:hsh('SHOMAN-Admin-2026'),active:true,last:Date.now()}],
 audit:[{ts:Date.now()-86400000*2,by:'admin@shoman.com',msg:'Published Products: CH 008'},{ts:Date.now()-86400000,by:'admin@shoman.com',msg:'Edited Global Settings'},{ts:Date.now()-3600000*5,by:'admin@shoman.com',msg:'Edited Theater Solutions: Pro Audio'}],
 versions:{},
 stats:{downloads:1284,week:[38,52,47,63,71,58,84],views:[['CH 001',312],['CH 003',268],['CH 002',241],['CH 005',187]],svcViews:[['Pro Audio',204],['Architecture & Design',171],['Pro Lighting',139]]}
});
let DB;
try{DB=JSON.parse(ls.get('shoman_db')||'null')}catch(e){DB=null}
if(!DB||DB.v!==6)DB=seed();
DB.media=DB.media.map((m,i)=>({...m,src:m.src||MEDIA_IMAGE[m.name]||Object.values(MEDIA_IMAGE)[i%4]}));
DB.nav=DB.nav.filter(n=>n.id!=='seats'); /* rule 13: no Seats link in the navbar */
const save=()=>ls.set('shoman_db',JSON.stringify(DB));
const pubP=()=>DB.products.filter(p=>p.status==='Published');

/* ---------- state ---------- */
let mode='admin', shown=0, tabIdx=0, chipSel='all', heroRaf=0, openOv=null, lastFocus=null, histPushed=false, IO=null;
const sectionOn=k=>DB.sections[k]!==false;

/* ---------- smooth scroll (Lenis) and parallax (GSAP) ---------- */
let lenis=null,stTr=[],tickOn=false;
const lenisTick=t=>{if(lenis)lenis.raf(t*1000)};
function initLenis(){
  if(lenis){lenis.start();return}
  if(reduced||!window.Lenis)return;
  try{
    lenis=new window.Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true});
    const g=window.gsap,S=window.ScrollTrigger;
    if(g&&S){g.registerPlugin(S);lenis.on('scroll',S.update);if(!tickOn){g.ticker.add(lenisTick);g.ticker.lagSmoothing(0);tickOn=true}}
    else{const loop=t=>{if(!lenis)return;lenis.raf(t);requestAnimationFrame(loop)};requestAnimationFrame(loop)}
  }catch(e){lenis=null}
}
function killLenis(){stTr.forEach(t=>t&&t.kill());stTr=[];if(lenis){try{lenis.destroy()}catch(e){}lenis=null}}
function initParallax(){
  stTr.forEach(t=>t&&t.kill());stTr=[];
  const g=window.gsap,S=window.ScrollTrigger;if(!g||!S||reduced||mode!=='site')return;
  try{
    g.registerPlugin(S);
    const sc=$$('#hero .scene svg'),hc=$$('#hero .hc .in'),trg={trigger:'#hero',start:'top top',end:'bottom top',scrub:true};
    if(sc.length)stTr.push(g.to(sc,{yPercent:8,ease:'none',scrollTrigger:trg}).scrollTrigger);
    if(hc.length)stTr.push(g.to(hc,{yPercent:-10,opacity:.25,ease:'none',scrollTrigger:trg}).scrollTrigger);
  }catch(e){}
}

/* ---------- site render ---------- */
function headerHTML(){
  const nv={home:T('Home','الرئيسية'),about:T('About Us','من نحن'),theater:T('Theater Solutions','حلول المسارح'),seats:T('Seats','المقاعد'),projects:T('Our Projects','مشاريعنا'),contact:T('Contact Us','تواصل معنا')};
  const tg={home:'home',about:'about',theater:'theater',seats:'products',projects:'projects',contact:'contact'};
  const rl=t=>t;
  const svcs=DB.services.filter(s=>s.status==='Published');
  const lis=DB.nav.filter(n=>n.show).map(n=>{
    if(n.id==='theater')return `<li class="has-dd"><a class="nl" href="${PGF('theater')}" data-go="theater" data-nav="theater" data-dd aria-haspopup="true" aria-expanded="false">${rl(nv.theater)}${CHEV}</a><div class="dd" role="menu">${svcs.map((s,i)=>`<a href="${PGF('svc-'+s.id)}" role="menuitem" data-svc="${s.id}" style="--i:${i}"><span>${esc(pick(s,'title'))}</span>${ARR('arr')}</a>`).join('')}</div></li>`;
    return `<li><a class="nl" href="${PGF(tg[n.id])}" data-go="${tg[n.id]}" data-nav="${tg[n.id]}">${rl(nv[n.id])}</a></li>`}).join('');
  return `<div class="wrap hrow"><a class="logo" href="${PGF('home')}" data-go="home" aria-label="shoman">${logoSVG()}</a><nav class="main" id="mnav" aria-label="Main"><ul id="nul">${lis}<i class="nav-ind" id="nind"></i></ul></nav><button class="lang" id="langb" aria-label="${T('Switch to Arabic','التبديل إلى الإنجليزية')}"><span>${lang==='ar'?'EN':'عربي'}</span></button><button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><i></i></button></div>`;
}
function heroHTML(){
  const eb=T('ARCHITECTURAL SEATING & THEATER SOLUTIONS','مقاعد معمارية وحلول المسارح');
  const sl=DB.hero.map((s,i)=>`<div class="slide${i?'':' active'}" data-i="${i}" aria-hidden="${i?'true':'false'}"><div class="scene">${scene(i)}</div><div class="hc"><div class="wrap"><div class="in"><div class="eyebrow lt">${eb}</div><h1>${esc(pick(s,'title'))}</h1><p class="sub">${esc(pick(s,'sub'))}</p><div class="btns"><a class="btn w hx" href="#products" data-go="products"><span class="hxs">${T('Explore seats','استعرض المقاعد')}</span><span class="hxl la" aria-hidden="true"><span>${T('Explore seats','استعرض المقاعد')}</span></span><span class="hxl lb" aria-hidden="true"><span>${T('Explore seats','استعرض المقاعد')}</span></span></a></div></div></div></div></div>`).join('');
  const t=[['2009',T('Established in Egypt','تأسست في مصر')],['02',T('Regional hubs','مركزان إقليميان')],['10',T('Performer models','موديلات Performer')],['360',T('Integrated solutions','حلول متكاملة'),'°']];
  return `<section id="home"><div class="hero" id="hero" aria-roledescription="carousel" aria-label="${T('Featured','المميز')}">${sl}<div class="scrollhint">${T('SCROLL TO DISCOVER','مرّر للاستكشاف')}</div><button class="harr prev" id="hprev" aria-label="${T('Previous','السابق')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"><path d="M15 3L6 12l9 9"/></svg></button><button class="harr next" id="hnext" aria-label="${T('Next','التالي')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"><path d="M9 3l9 9-9 9"/></svg></button><div class="hctl"><div class="wrap"></div></div></div>
  <div class="trust"><div class="wrap" data-stg>${t.map(x=>`<div class="it"><b data-count="${x[0]}" data-suf="${x[2]||''}">${x[0]}${x[2]||''}</b><span>${x[1]}</span></div>`).join('')}</div></div></section>`;
}
function aboutHTML(){
  return `<section id="about"><div class="wrap about"><div class="txt"><div class="eyebrow rv">${T('THE SHOMAN STORY','قصة shoman')}</div><h2 class="title rv-h">${T('Expertise in every detail','خبرة في كل تفصيلة')}</h2><p class="lead rv">${T('shoman Trade & Investment was founded in February 2009 by a group of audio-visual experts. We design, supply and install auditorium seating, telescopic stands and complete theater systems.','تصمم shoman مساحات ثقافية ومقاعد قاعات وأنظمة مسارح متكاملة لتدوم لأجيال.')}</p><p class="rv">${T('From a hub in New Cairo and a second in Riyadh, one team handles the room from the acoustic plan to the final seat.','من مركزنا في القاهرة الجديدة ومركز ثانٍ في الرياض، يتولى فريق واحد القاعة من الخطة الصوتية حتى آخر مقعد.')}</p><div class="facts rv" data-stg-s><div><b>${T('Founded','التأسيس')}</b>${T('February 2009','فبراير 2009')}</div><div><b>${T('Hubs','المراكز')}</b>${T('Cairo · Riyadh','القاهرة · الرياض')}</div><div><b>${T('Focus','التخصص')}</b>${T('Seating & theater systems','المقاعد وأنظمة المسارح')}</div><div><b>${T('Delivery','التنفيذ')}</b>${T('Design to installation','من التصميم إلى التركيب')}</div></div></div><div class="pic rv-img">${scene(0)}<div class="cap"><span>shoman / ${T('AUDITORIUM','قاعة')}</span><span>2009 — ${new Date().getFullYear()}</span></div></div></div></section>`;
}
function svcCard(s,i){
  return `<article class="svc spotlight-card" id="svc-${s.id}"><div class="top"><div class="tile">${ico(s.icon)}</div><span class="no">${String(i+1).padStart(2,'0')}</span></div><h3>${esc(pick(s,'title'))}</h3><p>${esc(pick(s,'desc'))}</p><button class="more" data-svc-open="${s.id}">${T('More details','المزيد من التفاصيل')}${ARR()}</button></article>`;
}
function theaterHTML(){
  const svcs=DB.services.filter(s=>s.status==='Published');
  return `<section id="theater"><div class="wrap"><div class="sec-head"><div class="eyebrow rv">${T('THEATER SOLUTIONS','حلول المسارح')}</div><h2 class="title rv-h">${T('From the stage to the last seat','من المسرح إلى آخر مقعد')}</h2><p class="lead rv">${T('Six disciplines, one contract. Each is planned with the others so sound, light and structure agree.','ستة تخصصات بعقد واحد. يُخطَّط كل منها مع الباقي ليتوافق الصوت والضوء والإنشاء.')}</p></div><div class="svc-grid" data-stg>${svcs.map(svcCard).join('')}</div></div></section>`;
}
function pcHTML(p,idx,isNew,k){
  return `<article class="pc spotlight-card${isNew?' new':''}" style="--i:${k||0}" tabindex="0" role="button" aria-label="${esc(p.code)}" data-prod="${p.id}"><div class="im"><span class="n">${String(idx+1).padStart(2,'0')}</span>${chair(idx)}</div><div class="bd"><div><small>shoman / PERFORMER</small><h3>${esc(p.code)}</h3><p>${esc(pick(p,'desc'))}</p></div><span class="sqb">${ARRL}</span></div></article>`;
}
function productsHTML(){
  const list=pubP();
  const ar=`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 3L5 8l5 5"/></svg>`;
  return `<section id="products"><div class="wrap"><div class="sec-head"><div class="eyebrow rv">${T('SEATS · PERFORMER COLLECTION','المقاعد · مجموعة Performer')}</div><h2 class="title rv-h">${T('Seating made to specification.','مقاعد مصنوعة وفق المواصفات.')}</h2><p class="lead rv">${T('Open a model for materials, mechanism, acoustic absorption and dimensions.','افتح أي موديل لمعرفة الخامات والميكانيزم والامتصاص الصوتي والأبعاد.')}</p></div><div class="pslider rv" id="pslider"><button class="pnav prev" id="pprev" aria-label="${T('Previous','السابق')}">${ar}</button><div class="pview"><div class="ptrack" id="ptrack">${list.map((p,i)=>pcHTML(p,i)).join('')}</div></div><button class="pnav next" id="pnext" aria-label="${T('Next','التالي')}">${ar}</button></div></div></section>`;
}
function tabHTML(i){
  const t=DB.tabs.filter(x=>x.status==='Published')[i]||DB.tabs[0];
  const bl=(lang==='ar'?t.bAr:t.bEn)||t.bEn||'';
  return `<h3>${esc(pick(t,'title'))}</h3><p>${esc(pick(t,'desc'))}</p><ul>${bl.split('|').filter(Boolean).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
}
function telHTML(){
  const tabs=DB.tabs.filter(x=>x.status==='Published'),n=tabs.length;
  const row=(t,i)=>{
    const bl=(lang==='ar'?t.bAr:t.bEn)||t.bEn||'',on=i===tabIdx;
    return `<div class="acr${on?' on':''}" data-i="${i}"><button class="ach" data-tab="${i}" aria-expanded="${on}" aria-controls="acp${i}" id="ach${i}"><b>${String(i+1).padStart(2,'0')}</b><span>${esc(pick(t,'title'))}</span><i aria-hidden="true"></i></button><div class="acp" id="acp${i}" role="region" aria-labelledby="ach${i}"><div class="acb"><p>${esc(pick(t,'desc'))}</p><ul>${bl.split('|').filter(Boolean).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div></div>`};
  return `<section id="telescopic" class="on-dark"><div class="wrap"><div class="telhead"><div><div class="eyebrow rv">${T('TELESCOPIC SEATING','المدرجات القابلة للطي')}</div><h2 class="title rv-h" style="margin-top:18px">${T('Stands that fold away and hold firm','مدرجات تُطوى وتثبت بإحكام')}</h2></div></div><div class="pic telbig rv-img" id="telpic"><div class="swap">${telArt(tabIdx)}</div><span class="telchip" id="telchip"><b>${String(tabIdx+1).padStart(2,'0')}</b> / ${String(n).padStart(2,'0')}</span></div><div class="acc rv" id="acc">${tabs.map(row).join('')}</div></div></section>`;
}
function optionsHTML(){
  return `<section id="options"><div class="wrap"><div class="sec-head"><div class="eyebrow rv">${T('OPTIONS','الخيارات')}</div><h2 class="title rv-h">${T('Every detail, considered.','كل تفصيلة محسوبة.')}</h2></div><div class="ogrid" data-stg>${DB.options.filter(o=>o.status==='Published').map(o=>`<div class="oc spotlight-card"><div class="ic">${ico(o.icon)}</div><h3>${esc(pick(o,'title'))}</h3><p>${esc(pick(o,'desc'))}</p></div>`).join('')}</div></div></section>`;
}
const SECT={theaters:['Theaters','المسارح'],universities:['Universities','الجامعات'],sports:['Sports','الرياضة'],conference:['Conference','المؤتمرات']};
function prjHTML(){
  const ps=DB.projects.filter(p=>p.status==='Published');
  const kScene={theaters:0,universities:1,sports:2,conference:0};
  return `<section id="projects"><div class="wrap"><div class="sec-head"><div class="eyebrow rv">${T('OUR PROJECTS','مشاريعنا')}</div><h2 class="title rv-h">${T('Spaces we have equipped','قاعات جهّزناها')}</h2></div><div class="chips rv" id="chips"><button class="chip ${chipSel==='all'?'on':''}" data-chip="all">${T('All','الكل')}</button>${Object.keys(SECT).map(k=>`<button class="chip ${chipSel===k?'on':''}" data-chip="${k}">${SECT[k][lang==='ar'?1:0]}</button>`).join('')}</div><div class="prj" id="prj" data-stg>${ps.map(p=>`<article class="pj spotlight-card" data-sec="${p.sector}" data-lb="${p.id}" tabindex="0" role="button" aria-label="${esc(pick(p,'title'))}"><div class="im">${scene(kScene[p.sector]||0)}</div><div class="bd"><div><small>${(SECT[p.sector]||[p.sector,p.sector])[lang==='ar'?1:0]}</small><h3>${esc(pick(p,'title'))}</h3><p>${esc(p.country)} · ${esc(p.year)} · ${esc(p.seats)} ${T('seats','مقعد')}</p></div><span class="sqb">${ARR()}</span></div></article>`).join('')}</div><p class="note">${T('Sample projects for design review. Real projects, photos and figures are added from the dashboard.','مشاريع تجريبية للمراجعة. تُضاف المشاريع والصور والأرقام الحقيقية من لوحة التحكم.')}</p></div></section>`;
}
function dlHTML(){
  return `<section id="downloads"><div class="wrap"><div class="sec-head"><div class="eyebrow rv">${T('TECHNICAL LIBRARY','المكتبة الفنية')}</div><h2 class="title rv-h">${T('Catalogs and data sheets','الكتالوجات وأوراق البيانات')}</h2><p class="lead rv">${T('Open to everyone. No sign-in needed.','متاحة للجميع بدون تسجيل دخول.')}</p></div><div class="dl" data-stg>${DB.downloads.filter(d=>d.status==='Published').map(d=>`<a href="#downloads" data-dl="${d.id}"><span class="pdf">PDF</span><div><h3>${esc(pick(d,'title'))}</h3><p>${esc(d.fileName)}</p></div><span class="meta">${esc(d.size)}</span><span class="sqb">${ARR()}</span></a>`).join('')}</div></div></section>`;
}
function contactHTML(){
  const S=DB.settings;
  const br=(city,addr,phoneHtml,wa)=>`<div class="cc spotlight-card"><div class="eyebrow">${city}</div><h3>${city==='CAIRO'?T('Cairo','القاهرة'):T('Riyadh','الرياض')}</h3><div class="row"><b>${T('Address','العنوان')}</b><span>${addr}</span></div><div class="row"><b>${T('Phone','الهاتف')}</b><span>${phoneHtml}</span></div>${wa?`<a class="btn s sm" href="https://wa.me/${esc(wa)}" target="_blank" rel="noopener" style="justify-self:start">WhatsApp ${ARR()}</a>`:''}</div>`;
  const ph=n=>`<span class="ltr">${esc(n)}</span><button class="cp" data-copy="${esc(n)}">${T('Copy','نسخ')}</button>`;
  return `<section id="contact"><div class="wrap"><div class="sec-head"><div class="eyebrow rv">${T('CONTACT','تواصل معنا')}</div><h2 class="title rv-h">${T('Your vision starts here.','رؤيتك تبدأ من هنا.')}</h2><p class="lead rv">${T('Call or message the team. We reply during working hours, Sunday to Thursday.','اتصل أو راسل الفريق. نرد خلال ساعات العمل، من الأحد إلى الخميس.')}</p></div><div class="cgrid" data-stg>${br('CAIRO',esc(pick(S,'cairo')),ph(S.phone)+'<br>'+ph(S.landline)+'<br><span class="ltr">'+esc(S.email)+'</span>','')}${br('RIYADH',esc(pick(S,'riyadh')),esc(pick(S,'riyadhNote')),S.waRiyadh)}<div class="map">${mapSVG()}</div></div></div></section>`;
}
/* animated wave that rises out of the footer: three periodic layers drifting at different speeds */
const WAVE=(()=>{const P=(y,u,v)=>{let d=`M0 ${y}`;for(let i=0;i<4;i++){const x=i*600;d+=`C${x+150} ${u} ${x+450} ${v} ${x+600} ${y}`}return d+'V120H0Z'};
  const L=(cls,d,fill,op)=>`<svg class="wv ${cls}" viewBox="0 0 2400 120" preserveAspectRatio="none"><path d="${d}" fill="${fill}" fill-opacity="${op}"/></svg>`;
  return '<div class="fwave" aria-hidden="true">'
   +L('w1',P(70,6,126),'#1BB3D1','.35')
   +L('w2',P(82,26,122),'#2B50E8','.55')
   +L('w3',P(98,60,124),'#071A27','1')
   +'</div>'})();
function footHTML(){
  const svcs=DB.services.filter(s=>s.status==='Published');
  return `${WAVE}<div class="wrap"><div class="fgrid"><div><div style="max-width:142px">${logoSVG(true)}</div><p style="margin-top:18px;max-width:34ch;font-size:14px">${T('Architectural seating and complete theater solutions from Cairo and Riyadh.','مقاعد معمارية وحلول مسارح متكاملة من القاهرة والرياض.')}</p><div class="soc"><a href="${esc(DB.settings.facebook)}" target="_blank" rel="noopener" aria-label="Facebook">f</a><a href="${esc(DB.settings.x)}" target="_blank" rel="noopener" aria-label="X">𝕏</a><a href="${esc(DB.settings.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">ig</a></div></div><div><h4>${T('About shoman','عن shoman')}</h4><ul><li><a href="${PGF('about')}" data-go="about">${T('About Us','من نحن')}</a></li><li><a href="${PGF('products')}" data-go="products">${T('Seats','المقاعد')}</a></li><li><a href="${PGF('projects')}" data-go="projects">${T('Our Projects','مشاريعنا')}</a></li><li><a href="${PGF('downloads')}" data-go="downloads">${T('Downloads','التحميلات')}</a></li></ul></div><div><h4>${T('Theater Solutions','حلول المسارح')}</h4><ul>${svcs.map(s=>`<li><a href="${PGF('svc-'+s.id)}" data-svc="${s.id}">${esc(pick(s,'title'))}</a></li>`).join('')}</ul></div><div><h4>${T('Contact','التواصل')}</h4><ul><li><a href="${PGF('contact')}" data-go="contact">${T('Contact the team','تواصل مع الفريق')}</a></li><li><span class="ltr">${esc(DB.settings.phone)}</span></li><li><span class="ltr">${esc(DB.settings.email)}</span></li></ul></div></div><div class="fbot"><span>© ${new Date().getFullYear()} shoman Trade &amp; Investment</span><div><button data-legal="privacy">${T('Privacy','الخصوصية')}</button><button data-legal="terms">${T('Terms','الشروط')}</button></div></div></div>`;
}

/* ---------- page extras (content from shoman.com) ---------- */
const xs=(eb,tt,ld,inner)=>`<section${inner?'':' class="txt"'}><div class="wrap"><div class="sec-head"><div class="eyebrow rv">${eb}</div><h2 class="title rv-h">${tt}</h2>${ld?`<p class="lead rv">${ld}</p>`:''}</div>${inner}</div></section>`;
const xcards=a=>`<div class="ogrid" data-stg>${a.map(x=>`<div class="oc spotlight-card"><div class="ic">${ico(x[0])}</div><h3>${x[1]}</h3>${x[2]?`<p>${x[2]}</p>`:''}</div>`).join('')}</div>`;
/* infinite horizontal slider (kaif-ui style): two identical halves, translateX(-50%) loop, slows on hover */
const xnames=(a,rev)=>{const half=[...a,...a].map(n=>`<div class="sl-it"><span class="sl-card"><b>${n}</b></span></div>`).join('');
  return `<div class="sl${rev?' rev':''}" style="--n:${a.length}" role="list" aria-label="${a.join(', ')}"><div class="sl-track"><div class="sl-half">${half}</div><div class="sl-half" aria-hidden="true">${half}</div></div></div>`};
const xlinks=a=>`<div class="ogrid" data-stg>${a.map(x=>`<a class="oc spotlight-card" href="${PGF(x[0])}" data-go="${x[0]}"><div class="ic">${ico(x[1])}</div><h3>${x[2]}</h3><p>${x[3]}</p></a>`).join('')}</div>`;
const CLIENTS=['Wise','MIS','ELS','MS','NG','RCIS','Summits'];
const BRANDS=['Christie','DTS','JBL','ITC','KM','Nutrik','Pioneer','Shure','Sony','Soundcraft','Zero88','Yamaha','Bose','DBX'];
function extraHTML(P){
  if(P==='about')return xs(T('WHAT WE OFFER','ما نقدمه'),T('Complete theater solutions, one team','حلول متكاملة للمسارح بفريق واحد'),T('shoman provides the best engineering solutions for every aspect of theater building and equipment, using modern technology to build your design.','توفر shoman أفضل الحلول الهندسية لجميع جوانب بناء المسرح والمعدات، وبأفضل الحلول الإبداعية باستخدام التكنولوجيا الحديثة لبناء التصميم الخاص بك.'),
    xcards([['arch',T('Engineering & architectural solutions','الحلول الهندسية والمعمارية')],['mech',T('Execution mechanisms','آليات التنفيذ')],['row',T('Theater finishing','تشطيبات المسارح')],['acc',T('Theater fit-out','تجهيزات المسارح')],['num',T('Theater seating','كراسي المسارح')],['audio',T('Theater sound','صوتيات المسارح')],['light',T('Theater lighting','إضاءة المسارح')]]))
   +xs(T('TRACK RECORD','سجل الإنجاز'),T('A leader in theater solutions in Egypt','من رواد حلول المسارح في مصر'),T('For over a decade shoman has been one of the largest suppliers of audio-visual presentation equipment, theater seats and complete theater fit-outs. Our record with educational institutes building school theaters secured our place among the pioneers.','تعد shoman واحدة من أكبر موردي معدات العروض الصوتية والمرئية وكراسي المسارح وكافة تجهيزات المسارح لأكثر من عقد. وسجلنا الحافل مع المعاهد التعليمية في مصر لبناء المسارح المدرسية جعلنا أحد رواد حلول المسرح في مصر.'),'')
   +xs(T('OUR MISSION','مهمتنا'),T('Full technical solutions at fair prices','حلول تقنية هندسية كاملة بأسعار مناسبة'),T('To offer a complete range of engineering and technology solutions at fair prices that meet client needs, delivered with the highest quality and distinction.','تقديم مجموعة كاملة من الحلول التكنولوجية الهندسية للسوق بأسعار مناسبة لتلبية احتياجات العملاء، وبأعلى جودة وتميز.'),'')
   +xs(T('CLIENTS','عملاؤنا'),T('Trusted by schools and institutions','ثقة المدارس والمؤسسات'),T('We are committed to always delivering the best, fitted to your sector and needs.','نحن ملتزمون بتقديم الأفضل دائما وبما يتناسب مع قطاع أعمالك واحتياجاتك.'),xnames(CLIENTS));
  if(P==='theater')return xs(T('OUR APPROACH','منهجنا'),T('Performance spaces that come alive','مساحات أداء تنبض بالحياة'),T('Theater architecture is unlike any other. Tell us your concept and our team turns it into reality with an architectural perspective of your venue, using imported panels and materials for walls and ceilings that give a strong professional finish.','يختلف التصميم المعماري للمسارح تمامًا عن أي نوع آخر. عن طريق إخبارنا بمفهومك، سيحول فريقنا فكرتك إلى حقيقة من خلال منظور معماري لمكانك، ونستورد لوحات ومواد للجدران والأسقف تضمن لمسة نهائية احترافية قوية.'),'')
   +xs(T('HOW WE WORK','مراحل العمل معنا'),T('Design, build, test, deliver','تصميم وإنشاء واختبار وتسليم'),'',xcards([
    ['arch',T('Design','التصميم'),T('Everything starts with an idea. We turn your ideas and style into a living space, advise on planning and design decisions, and prepare engineering drawings that make the most of every area.','كل شيء يبدأ بفكرة. نحول أفكارك وأسلوبك إلى واقع ينبض بالحياة من منظور معماري مثالي لمسرحك، ونقدم النصيحة بشأن قرارات التخطيط والتصميم والرسومات الهندسية لاستغلال كل المساحات.')],
    ['mech',T('Construction','الإنشاء'),T('We are general contractors and skilled construction managers. We anticipate problems before they happen and cover most theater items: wall cladding, acoustic insulation, ceilings, floors, curtains, seating and the stage.','نحن المقاولون العموم ومديرو بناء مهرة، نتفوق في توقع المشاكل قبل وقوعها وحلها. يوفر فريقنا معظم بنود تشييد المسارح بما فيها تجاليد الحوائط والعزل الصوتي والأسقف والأرضيات والستائر والمقاعد وخشبة المسرح.')],
    ['care',T('Testing','الاختبار'),T('We make sure all stage equipment is safe and in good working order, using engineering measuring tools for lighting systems, hoists and machinery, and measurement calculators for sound.','نتأكد من أن جميع معدات المسرح آمنة وفي حالة عمل جيدة باستخدام أدوات القياس الهندسية لأنظمة الإضاءة والروافع والآلات، واختبار أنظمة الصوت بحاسبات القياس.')],
    ['visual',T('Delivery','التسليم'),T('Because we support every aspect of the theater professionally, you receive a great space with the latest lighting and audio-visual equipment, with furniture and décor integrated with your logos and branding.','نظراً لأننا ندعم جميع جوانب المسرح باحترافية، ستجد نفسك في فراغ رائع بأحدث معدات الإضاءة والأجهزة السمعية والبصرية، مع دمج الأثاث والديكور بشعاراتك وعلاماتك التجارية.')]]))
   +xs(T('BRANDS','الماركات'),T('Equipment from trusted manufacturers','معدات من مصنّعين موثوقين'),'',xnames(BRANDS,true));
  if(P==='seats')return xs(T('EXPLORE MORE','استكشف المزيد'),T('Beyond fixed seating','أبعد من المقاعد الثابتة'),'',xlinks([['telescopic','tab',T('Telescopic seating','المدرجات القابلة للطي'),T('Stands that fold away and hold firm.','مدرجات تُطوى وتثبت بإحكام.')],['options','acc',T('Options','الخيارات'),T('Every detail, considered.','كل تفصيلة محسوبة.')],['downloads','num',T('Downloads','التحميلات'),T('Catalogs and data sheets.','الكتالوجات وأوراق البيانات.')]]));
  if(P==='projects')return xs(T('CLIENTS','عملاؤنا'),T('Institutions that trust us','مؤسسات وثقت بنا'),T('We are committed to always delivering the best, fitted to your sector and needs.','نحن ملتزمون بتقديم الأفضل دائما وبما يتناسب مع قطاع أعمالك واحتياجاتك.'),xnames(CLIENTS));
  return '';
}
function mainHTML(){
  if(PAGE==='home')return heroHTML()+(sectionOn('about')?aboutHTML():'')+(sectionOn('theater')?theaterHTML():'')+(sectionOn('products')?productsHTML():'')+(sectionOn('telescopic')?telHTML():'')+(sectionOn('options')?optionsHTML():'')+(sectionOn('projects')?prjHTML():'')+(sectionOn('downloads')?dlHTML():'')+(sectionOn('contact')?contactHTML():'');
  const M={about:aboutHTML,theater:theaterHTML,seats:productsHTML,telescopic:telHTML,options:optionsHTML,projects:prjHTML,downloads:dlHTML,contact:contactHTML}[PAGE]||heroHTML;
  return M()+extraHTML(PAGE);
}
function protoHTML(){return '';
  return mode==='admin'?`<button id="pgo" style="color:#fff">← ${T('Back to site','العودة للموقع')}</button>`:`<span>${T('PROTOTYPE REVIEW','نموذج للمراجعة')}</span><button id="pgo" style="color:#fff">${T('Open /admin','افتح /admin')} →</button>`;
}
function renderSite(animate){
  document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  $('#hdr').innerHTML=headerHTML();$('#main').innerHTML=mainHTML();$('#foot').innerHTML=footHTML();
  $('#proto').innerHTML=protoHTML();
  initHero();initReveal(!animate);spy();setTimeout(moveInd,60);moveTab();initPSlider();initParallax();initScrollAnim();initScrollTilt();
}

/* ---------- reveal ---------- */
function countUp(root){
  $$('[data-count]',root.matches&&root.matches('[data-count]')?root.parentNode:root).forEach(el=>{
    if(el.dataset.done)return;el.dataset.done=1;
    const to=+el.dataset.count,suf=el.dataset.suf||'';
    if(reduced||isNaN(to)){el.textContent=el.dataset.count+suf;return}
    const t0=performance.now(),dur=1400,pad=el.dataset.count.length;
    (function f(n){const k=Math.min((n-t0)/dur,1),e=1-Math.pow(1-k,3);el.textContent=String(Math.round(to*e)).padStart(pad,'0')+suf;if(k<1)requestAnimationFrame(f)})(t0);
  });
}
function initReveal(imm){
  $$('#site [data-stg]').forEach(c=>[...c.children].forEach((ch,i)=>{ch.classList.add('rv');ch.style.setProperty('--dl',i*100)}));
  $$('#site .rv-h').forEach(h=>h.style.setProperty('--dl',60));
  /* footer: columns reveal one after another, each column's items cascade */
  $$('#site footer .fgrid>div').forEach((col,i)=>{[...col.children].flatMap(ch=>ch.tagName==='UL'?[...ch.children]:[ch]).forEach((el,j)=>{el.classList.add('rv');el.style.setProperty('--dl',i*140+j*70)})});
  $$('#site footer .fbot').forEach(f=>{f.classList.add('rv');f.style.setProperty('--dl',480)});
  const els=$$('#site .rv,#site .rv-h,#site .rv-img,#site .rv-line');
  if(IO){IO.disconnect();IO=null}
  if(imm||reduced||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));countUp(document);return}
  IO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');IO.unobserve(e.target);countUp(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(e=>IO.observe(e));
}

/* ---------- products: auto slider (steps every 2s, small side arrows) ---------- */
let psT=0,psI=0,psAbort=null;
function initPSlider(){
  clearInterval(psT);if(psAbort)psAbort.abort();
  const root=$('#pslider'),tr=$('#ptrack');if(!root||!tr)return;
  psAbort=new AbortController();const sg={signal:psAbort.signal};
  const n=tr.children.length;let paused=false,sx=null;
  const vis=()=>innerWidth>1000?4:innerWidth>640?2:1;
  const max=()=>Math.max(0,n-vis());
  const paint=(anim=true)=>{
    const v=vis(),gap=parseFloat(getComputedStyle(tr).columnGap)||0,cw=(tr.parentElement.clientWidth-gap*(v-1))/v;
    root.style.setProperty('--v',v);
    psI=Math.min(psI,max());
    tr.style.transition=anim&&!reduced?'':'none';
    tr.style.transform=`translateX(${(lang==='ar'?1:-1)*psI*(cw+gap)}px)`;
  };
  const go=k=>{const m=max();psI=k>m?0:k<0?m:k;paint()};
  paint(false);
  $('#pprev').addEventListener('click',()=>go(psI-1),sg);$('#pnext').addEventListener('click',()=>go(psI+1),sg);
  root.addEventListener('pointerenter',()=>paused=true,sg);root.addEventListener('pointerleave',()=>paused=false,sg);
  root.addEventListener('focusin',()=>paused=true,sg);root.addEventListener('focusout',()=>paused=false,sg);
  root.addEventListener('pointerdown',e=>sx=e.clientX,sg);
  root.addEventListener('pointerup',e=>{if(sx!=null&&Math.abs(e.clientX-sx)>50)go(psI+(e.clientX<sx?1:-1)*(lang==='ar'?-1:1));sx=null},sg);
  addEventListener('resize',()=>paint(false),sg);
  if(!reduced)psT=setInterval(()=>{if(!paused&&!document.hidden&&mode==='site')go(psI+1)},2000);
}

/* ---------- telescopic: accordion + big image ---------- */
function setTab(i){
  
  tabIdx=i;const n=$$('#acc .acr').length;
  $$('#acc .acr').forEach((r,k)=>{const on=k===i;r.classList.toggle('on',on);$('.ach',r).setAttribute('aria-expanded',on)});
  const pic=$('#telpic'),sw=$('.swap',pic);if(sw)sw.outerHTML=`<div class="swap">${telArt(i)}</div>`;
  const c=$('#telchip');if(c)c.innerHTML=`<b>${String(i+1).padStart(2,'0')}</b> / ${String(n).padStart(2,'0')}`;
}

/* ---------- text-parallax-content scroll: headings drift at different speeds, media shrinks and darkens as it leaves ---------- */
let saAbort=null,saRaf=0;
function initScrollAnim(){
  if(saAbort)saAbort.abort();cancelAnimationFrame(saRaf);saRaf=0;
  const cl=v=>Math.min(1,Math.max(0,v));
  const T_=[],M_=[];
  $$('#main section:not(#home)').forEach(sec=>{
    $$('.sec-head .eyebrow,.telhead .eyebrow',sec).forEach(e=>T_.push([e,sec,.55]));
    $$('.sec-head .title,.telhead .title',sec).forEach(e=>T_.push([e,sec,1]));
    $$('.sec-head .lead',sec).forEach(e=>T_.push([e,sec,1.6]));
    $$('.pic,.telbig',sec).forEach(e=>M_.push(e));
  });
  T_.forEach(t=>t[0].classList.add('sa-t'));M_.forEach(m=>m.classList.add('sa-m'));
  const hero=$('#hero');
  const off=()=>reduced;
  if(off()){[...T_.map(t=>t[0]),...M_].forEach(e=>{e.style.removeProperty('--py');e.style.removeProperty('--ps');e.style.removeProperty('--po')});return}
  saAbort=new AbortController();
  const run=()=>{
    saRaf=0;if(mode!=='site')return;
    const vh=innerHeight,amp=innerWidth<700?20:40;
    T_.forEach(([el,sec,k])=>{
      const r=sec.getBoundingClientRect();
      if(r.top>vh*1.3||r.bottom<-vh*.3)return;
      const p=cl((vh-r.top)/(vh+r.height));
      el.style.setProperty('--py',((.5-p)*2*amp*k).toFixed(1)+'px');
    });
    M_.forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.top>vh*1.3||r.bottom<-vh*.3)return;
      const p=cl((vh-r.top)/(vh+r.height)),q=cl((p-.4)/.6);
      el.style.setProperty('--ps',(1-.12*q).toFixed(4));
      el.style.setProperty('--po',(.6*q).toFixed(3));
    });
    if(hero){const h=hero.offsetHeight,q=cl(scrollY/h);hero.style.setProperty('--hs',(1-.07*q).toFixed(4));hero.style.setProperty('--ho',(.55*q).toFixed(3))}
  };
  const tick=()=>{if(!saRaf)saRaf=requestAnimationFrame(run)};
  addEventListener('scroll',tick,{passive:true,signal:saAbort.signal});addEventListener('resize',tick,{signal:saAbort.signal});
  tick();
}

/* ---------- container tilt: each section tilts back, then flattens as it enters (works together with the text parallax) ---------- */
let stAbort=null,stRaf=0;
function initScrollTilt(){
  if(stAbort)stAbort.abort();cancelAnimationFrame(stRaf);stRaf=0;
  const ws=$$('#main section:not(#home)>.wrap');
  ws.forEach(w=>{w.classList.add('sa');w.style.transform=''});
  if(!ws.length||reduced||innerWidth<700)return;
  stAbort=new AbortController();
  const clamp=v=>Math.min(1,Math.max(0,v)),ease=t=>1-Math.pow(1-t,3);
  const run=()=>{
    stRaf=0;if(mode!=='site')return;
    const vh=innerHeight,mob=innerWidth<1000;
    ws.forEach(w=>{
      const r=w.getBoundingClientRect();
      if(r.top>vh*1.6||r.bottom<-vh*.5)return;
      const p=ease(clamp((vh*.98-r.top)/(vh*.7)));
      if(p>=.999){w.style.transform='';w.style.willChange='';return}
      w.style.willChange='transform';
      w.style.transform=`perspective(1400px) rotateX(${((1-p)*(mob?10:20)).toFixed(2)}deg) scale(${(1.035-.035*p).toFixed(4)}) translateY(${((1-p)*30).toFixed(1)}px)`;
    });
  };
  const tick=()=>{if(!stRaf)stRaf=requestAnimationFrame(run)};
  addEventListener('scroll',tick,{passive:true,signal:stAbort.signal});addEventListener('resize',tick,{signal:stAbort.signal});
  tick();
}

/* ---------- hero ---------- */
function initHero(){
  cancelAnimationFrame(heroRaf);
  const hero=$('#hero');if(!hero)return;
  const slides=$$('.slide',hero),bars=$$('.bars .hr',hero),nums=$$('.bars .hn',hero),n=slides.length;
  let cur=0,el=0,last=performance.now(),paused=false;
  const paint=()=>bars.forEach((b,i)=>b.style.strokeDashoffset=100*(1-(i===cur?Math.min(el/2000,1):0)));
  function go(k){
    cur=(k+n)%n;el=0;
    slides.forEach((s,i)=>{s.classList.toggle('active',i===cur);s.setAttribute('aria-hidden',i===cur?'false':'true')});
    nums.forEach((b,i)=>b.classList.toggle('on',i===cur));paint();
  }
  hero.addEventListener('mouseenter',()=>paused=true);hero.addEventListener('mouseleave',()=>paused=false);
  hero.addEventListener('focusin',()=>paused=true);hero.addEventListener('focusout',()=>paused=false);
  $('#hprev').onclick=()=>go(cur-1);$('#hnext').onclick=()=>go(cur+1);
  nums.forEach(b=>b.onclick=()=>go(+b.dataset.b));
  let sx=null;hero.addEventListener('pointerdown',e=>sx=e.clientX);hero.addEventListener('pointerup',e=>{if(sx!=null&&Math.abs(e.clientX-sx)>50)go(cur+(e.clientX<sx?1:-1)*(lang==='ar'?-1:1));sx=null});
  hero.tabIndex=0;hero.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+(lang==='ar'?-1:1));if(e.key==='ArrowLeft')go(cur-(lang==='ar'?-1:1))});
  nums.forEach((b,i)=>b.classList.toggle('on',i===cur));paint();
  (function tick(now){
    const dt=Math.min(now-last,100);last=now;
    if(mode==='site'&&!paused&&!reduced&&!document.hidden){el+=dt;if(el>=2000)go(cur+1);else paint()}
    heroRaf=requestAnimationFrame(tick);
  })(performance.now());
}

/* ---------- nav / scroll spy ---------- */
function moveInd(target){
  const ul=$('#nul'),ind=$('#nind');if(!ul||!ind)return;
  const a=target&&target.classList&&target.classList.contains('nl')?target:$('.nl.act',ul);
  if(!a||innerWidth<=1020){ind.style.opacity=0;return}
  const u=ul.getBoundingClientRect(),r=a.getBoundingClientRect();
  if(!ind.dataset.init){ind.style.transition='none'}
  ind.style.width=r.width+'px';ind.style.height='3px';ind.style.transform=`translate(${r.left-u.left}px,${r.bottom-u.top-3}px)`;ind.style.opacity=1;
  if(!ind.dataset.init){void ind.offsetWidth;ind.style.transition='';ind.dataset.init=1}
}
let spyId=null;
function spy(){
  let cur=PAGEKEY[PAGE]||'home';
  if(cur!==spyId||!$('.nl.act')){spyId=cur;$$('.nl[data-nav]').forEach(a=>a.classList.toggle('act',a.dataset.nav===cur));moveInd()}
  const h=$('#hdr');if(h){h.classList.toggle('sc',scrollY>10);document.documentElement.style.setProperty('--hh',h.offsetHeight+'px')}
  const d=document.documentElement.scrollHeight-innerHeight;$('#prog').style.transform=`scaleX(${d>0?Math.min(scrollY/d,1):0})`;
}
let spyT=0;addEventListener('scroll',()=>{if(mode!=='site'||spyT)return;spyT=requestAnimationFrame(()=>{spyT=0;spy()})},{passive:true});
addEventListener('resize',()=>{moveInd();moveTab()});
function moveTab(){const t=$('#tabs'),i=$('#tind');if(!t||!i)return;const b=$$('button',t)[tabIdx];if(!b)return;const tr=t.getBoundingClientRect(),br=b.getBoundingClientRect();i.style.width=br.width+'px';i.style.transform=`translateX(${br.left-tr.left+t.scrollLeft}px)`;const need=br.left-tr.left+t.scrollLeft-12;if(br.left<tr.left||br.right>tr.right)t.scrollTo({left:need,behavior:'smooth'})}
function goTo(id,flash){
  const el=document.getElementById(id);if(!el){const f=PGF(id);if(id!=='admin'&&f.split('#')[0]!==FILE)navTo(f.includes('#')?f:f+'#'+id);return}
  if(lenis)lenis.scrollTo(el,{offset:-70,duration:1.3});else el.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
  if(flash){el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),1700)}
  try{history.replaceState(history.state,'','#'+id)}catch(e){}
}

/* ---------- overlays ---------- */
function openOverlay(name,focusSel){
  closeOverlay(true,true);
  lastFocus=document.activeElement;openOv=name;
  $('#scrim').classList.add('on');
  const el=name==='panel'?$('#panel'):$('#'+name);el.classList.add('on');
  document.body.style.overflow='hidden';if(lenis)lenis.stop();
  try{history.pushState({ov:1},'');histPushed=true}catch(e){histPushed=false}
  setTimeout(()=>{const f=focusSel?$(focusSel,el):el;f&&f.focus&&f.focus()},60);
}
function closeOverlay(fromPop,quiet){
  if(!openOv)return;
  const name=openOv;openOv=null;
  (name==='panel'?$('#panel'):$('#'+name)).classList.remove('on');
  $('#scrim').classList.remove('on');document.body.style.overflow='';if(lenis)lenis.start();
  if(!fromPop&&histPushed&&!quiet){histPushed=false;try{history.back()}catch(e){}}
  else if(!quiet)histPushed=false;
  if(!quiet&&lastFocus&&lastFocus.focus)lastFocus.focus();
}
addEventListener('popstate',()=>{if(openOv){histPushed=false;closeOverlay(true)}});
function openPanel(eb,title,body){
  $('#pn-e').textContent=eb;$('#pn-t').textContent=title;$('#pn-b').innerHTML=body;
  $$('#pn-b>*').forEach((c,i)=>c.style.setProperty('--i',i));
  $('#panel').scrollTop=0;openOverlay('panel','#pn-x');
}
function openSvc(id){
  const s=DB.services.find(x=>x.id===id);if(!s)return;
  const items=s.items||[];
  let body=`<p class="lead" style="font-size:16px">${esc(pick(s,'desc'))}</p>`;
  if(s.block)body+=`<p style="color:var(--steel)">${esc(items[0]?pick(items[0],'')||(lang==='ar'?items[0].ar:items[0].en):'')}</p>`;
  else body+=`<ol>${items.map((it,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span>${esc(lang==='ar'?(it.ar||it.en):it.en)}</li>`).join('')}</ol>`;
  body+=`<a class="btn p" href="#contact" data-go="contact" data-closeov style="justify-self:start">${T('Contact the team','تواصل مع الفريق')}${ARR()}</a>`;
  openPanel(T('THEATER SOLUTIONS','حلول المسارح'),pick(s,'title'),body);
}
function openProd(id){
  const list=pubP(),p=list.find(x=>x.id===id),idx=list.indexOf(p);if(!p)return;
  const row=(k,v)=>`<div><b>${k}</b><span>${esc(v)}</span></div>`;
  openPanel('shoman / PERFORMER',p.code,`<div class="pimg">${chair(idx)}</div><p class="lead" style="font-size:16px">${esc(pick(p,'desc'))}</p><div class="spec">${row(T('Material','الخامة'),p.material)}${row(T('Mechanism','الميكانيزم'),p.mechanism)}${row(T('Acoustic absorption','الامتصاص الصوتي'),p.acoustic)}${row(T('Dimensions','الأبعاد'),p.dims)}</div><div class="btns"><a class="btn p" href="#contact" data-go="contact" data-closeov>${T('Contact the team','تواصل مع الفريق')}${ARR()}</a><a class="btn s" href="#options" data-go="options" data-closeov>${T('Options','الخيارات')}</a></div>`);
}
function openLb(id){
  const p=DB.projects.find(x=>x.id===id);if(!p)return;
  const k={theaters:0,universities:1,sports:2,conference:0}[p.sector]||0;
  $('#lb-a').innerHTML=scene(k);$('#lb-c').innerHTML=`<b style="font:600 20px var(--f-head)">${esc(pick(p,'title'))}</b><div style="color:#CBD5E1;font-size:14px">${esc(p.country)} · ${esc(p.year)} · ${esc(p.seats)} ${T('seats','مقعد')}</div>`;
  openOverlay('lbx','.xb');
}
function openLegal(k){
  const pr=k==='privacy';
  $('#lg-t').textContent=pr?T('Privacy','الخصوصية'):T('Terms','الشروط');
  $('#lg-b').innerHTML=pr?`<h4>${T('What we collect','ما نجمعه')}</h4><p>${T('This site does not collect personal data. There are no accounts, forms or newsletters.','لا يجمع هذا الموقع أي بيانات شخصية. لا توجد حسابات أو نماذج أو نشرات بريدية.')}</p><h4>${T('Contact','التواصل')}</h4><p>${T('Messages sent by phone, email or WhatsApp are handled by the shoman team only.','الرسائل المرسلة عبر الهاتف أو البريد أو واتساب يتعامل معها فريق shoman فقط.')}</p><p class="note">${T('Draft text for review. Final legal wording to be supplied.','نص مبدئي للمراجعة. يُستبدل بالصياغة القانونية النهائية.')}</p>`:`<h4>${T('Use of this site','استخدام الموقع')}</h4><p>${T('Content is for information only. It is not an offer, a quotation or a price list.','المحتوى للتعريف فقط. وهو ليس عرضًا ولا تسعيرًا ولا قائمة أسعار.')}</p><h4>${T('Specifications','المواصفات')}</h4><p>${T('Specifications and images may change without notice.','قد تتغير المواصفات والصور دون إشعار.')}</p><p class="note">${T('Draft text for review. Final legal wording to be supplied.','نص مبدئي للمراجعة. يُستبدل بالصياغة القانونية النهائية.')}</p>`;
  openOverlay('legal','.xb');
}

/* ---------- language switch (keeps the reader on the same section) ---------- */
function anchorPos(){
  const hh=($('#hdr')||{}).offsetHeight||70;
  let best=null;
  $$('#main section[id], #main [id^=svc-]').forEach(e=>{const r=e.getBoundingClientRect();if(r.top<=hh+4&&r.bottom>hh)best={id:e.id,off:hh-r.top}});
  const d=document.documentElement.scrollHeight-innerHeight;
  return best||{ratio:d>0?scrollY/d:0};
}
function restorePos(p){
  const hh=($('#hdr')||{}).offsetHeight||70;let y=0;
  const el=p.id&&document.getElementById(p.id);
  if(el)y=el.getBoundingClientRect().top+scrollY+p.off-hh;
  else y=(p.ratio||0)*(document.documentElement.scrollHeight-innerHeight);
  if(lenis)lenis.scrollTo(y,{immediate:true});window.scrollTo(0,y);
}
function switchLang(){
  const b=$('#langb');
  const run=()=>{const p=anchorPos();lang=lang==='ar'?'en':'ar';ls.set('shoman_lang',lang);renderSite(false);restorePos(p)};
  if(b&&!reduced){b.classList.add('out');setTimeout(run,230)}else run();
}

/* ---------- site events ---------- */
function copyTxt(t,btn){
  const done=()=>{const o=btn.textContent;btn.textContent='✓';setTimeout(()=>btn.textContent=o,1200)};
  try{navigator.clipboard.writeText(t).then(done,done)}catch(e){done()}
}
document.addEventListener('click',e=>{
  if(mode!=='site')return;
  const t=e.target;
  const go=t.closest('[data-go]');
  if(go){
    e.preventDefault();
    const dd=go.closest('.has-dd');
    if(go.hasAttribute('data-dd')&&innerWidth<=1020){dd.classList.toggle('open');go.setAttribute('aria-expanded',dd.classList.contains('open'));return}
    if(go.hasAttribute('data-closeov')&&openOv){closeOverlay(false,true);openOv=null;$('#scrim').classList.remove('on');$('#panel').classList.remove('on');document.body.style.overflow='';if(lenis)lenis.start()}
    $('#site').classList.remove('menu-open');
    {const f=PGM[go.dataset.go];if(f&&f!==FILE&&go.closest('#hdr,#foot')){navTo(f);return}}
    closeDD();goTo(go.dataset.go);return;
  }
  const sv=t.closest('[data-svc]');
  if(sv){e.preventDefault();closeDD();$('#site').classList.remove('menu-open');if(FILE!=='theater.html'&&sv.closest('#hdr,#foot')){navTo(PGF('svc-'+sv.dataset.svc));return}goTo('svc-'+sv.dataset.svc,true);return}
  const so=t.closest('[data-svc-open]');if(so){openSvc(so.dataset.svcOpen);return}
  const pr=t.closest('[data-prod]');if(pr){openProd(pr.dataset.prod);return}
  const lb=t.closest('[data-lb]');if(lb){openLb(lb.dataset.lb);return}
  const lg=t.closest('[data-legal]');if(lg){openLegal(lg.dataset.legal);return}
  if(t.closest('#pn-x')||t.closest('[data-close]')||t.id==='scrim'){closeOverlay();return}
  if(t.closest('#langb')){switchLang();return}
  if(t.closest('#burger')){const s=$('#site');s.classList.toggle('menu-open');$('#burger').setAttribute('aria-expanded',s.classList.contains('menu-open'));return}
  const cp=t.closest('[data-copy]');if(cp){copyTxt(cp.dataset.copy,cp);return}
  const dl=t.closest('[data-dl]');if(dl){e.preventDefault();return}
  const ch=t.closest('[data-chip]');
  if(ch){
    chipSel=ch.dataset.chip;$$('#chips .chip').forEach(c=>c.classList.toggle('on',c===ch));
    $$('#prj .pj').forEach(p=>{
      const m=chipSel==='all'||p.dataset.sec===chipSel;
      if(m){p.hidden=false;void p.offsetWidth;p.classList.remove('out')}
      else{p.classList.add('out');setTimeout(()=>{if(p.classList.contains('out'))p.hidden=true},380)}
    });return;
  }
  const tb=t.closest('[data-tab]');
  if(tb){
    const row=tb.closest('.acr');if(row&&row.classList.contains('on')){row.classList.remove('on');tb.setAttribute('aria-expanded','false');return}
    setTab(+tb.dataset.tab);return;
  }
  if(t.closest('#loadmore')){
    const list=pubP(),b=Math.max(1,+DB.settings.batch||4),btn=$('#loadmore'),g=$('#pgrid');
    if(btn.dataset.less==='1'){
      [...g.children].slice(b).forEach(c=>c.remove());shown=Math.min(b,list.length);
      btn.dataset.less='0';setBT(btn,T('Load more','عرض المزيد'));
      $('#lcount').textContent=`${T('Showing','معروض')} ${shown} ${T('of','من')} ${list.length}`;
      goTo('products');return;
    }
    const from=shown;shown=Math.min(shown+b,list.length);
    list.slice(from,shown).forEach((p,k)=>g.insertAdjacentHTML('beforeend',pcHTML(p,from+k,true,k)));
    $('#lcount').textContent=`${T('Showing','معروض')} ${shown} ${T('of','من')} ${list.length}`;
    const first=g.children[from];if(first)first.focus({preventScroll:true});
    if(shown>=list.length){btn.dataset.less='1';setBT(btn,T('Load less','عرض أقل'))}
    return;
  }
  
  if(!t.closest('.has-dd'))closeDD();
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if(openOv)closeOverlay();else closeDD()}
  if((e.key==='Enter'||e.key===' ')&&(e.target.matches&&e.target.matches('[data-prod],[data-lb]'))){e.preventDefault();e.target.click()}
  if(e.key==='Tab'&&openOv){
    const c=openOv==='panel'?$('#panel'):$('#'+openOv);const f=$$('a[href],button:not([disabled]),[tabindex="0"]',c).filter(x=>x.offsetParent!==null);
    if(f.length){const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
  }
});
function closeDD(){$$('.has-dd.open').forEach(d=>{d.classList.remove('open');const a=$('[data-dd]',d);a&&a.setAttribute('aria-expanded','false')})}
let ddT=0;
document.addEventListener('mouseover',e=>{
  if(mode!=='site'||innerWidth<=1020)return;
  const nl=e.target.closest&&e.target.closest('.nl');if(nl)moveInd(nl);
  const d=e.target.closest&&e.target.closest('.has-dd');
  if(d){clearTimeout(ddT);d.classList.add('open');$('[data-dd]',d).setAttribute('aria-expanded','true')}
});
document.addEventListener('mouseout',e=>{
  if(mode!=='site'||innerWidth<=1020)return;
  if(e.target.closest&&e.target.closest('#nul')&&!(e.relatedTarget&&e.relatedTarget.closest&&e.relatedTarget.closest('#nul')))moveInd();
  const d=e.target.closest&&e.target.closest('.has-dd');
  if(d&&!d.contains(e.relatedTarget)){ddT=setTimeout(()=>{d.classList.remove('open');$('[data-dd]',d).setAttribute('aria-expanded','false')},160)}
});

/* =================== ADMIN =================== */
let A={view:'home',email:null,fails:0,lockUntil:0};
const adm=()=>$('#admin');
function sessOK(){
  const raw=ls.get('shoman_sess')||'',cut=raw.indexOf('|');
  if(cut>0){const email=raw.slice(0,cut),pw=raw.slice(cut+1),current=DB.admins.find(x=>x.active&&x.email===email&&x.pw===pw);if(current)return current}
  return DB.admins.find(x=>x.active)||DB.admins[0];
}
function renderNF(){
  setLocale();
  adm().innerHTML=`<div class="nf"><div><div class="big">404</div><h1 style="font-size:clamp(26px,4vw,40px)">${T('Page not found','الصفحة غير موجودة')}</h1><p class="lead" style="font-size:16px">${T('The page you are looking for does not exist or has moved.','الصفحة التي تبحث عنها غير موجودة أو تم نقلها.')}</p><a class="btn p" href="#" id="nfhome">${T('Back to home','العودة للرئيسية')}${ARRL}</a></div></div>`;
  $('#nfhome').onclick=e=>{e.preventDefault();location.hash='';route()};
}
function renderLogin(){
  setLocale();
  adm().innerHTML=`<div class="adm-login"><form class="lcard" id="lf" novalidate><div style="max-width:142px">${logoSVG()}</div><div><h1 style="font-size:26px">${T('Sign in','تسجيل الدخول')}</h1></div><div class="fld"><label for="le">${T('Email','البريد الإلكتروني')}</label><input id="le" type="email" autocomplete="username" dir="ltr" required></div><div class="fld"><label for="lp">${T('Password','كلمة المرور')}</label><input id="lp" type="password" autocomplete="current-password" dir="ltr" required></div><button class="btn p" type="submit" style="justify-content:center">${T('Continue','متابعة')}${ARRL}</button></form></div>`;
  $('#le').focus();
  $('#lf').onsubmit=e=>{
    e.preventDefault();
    if(Date.now()<A.lockUntil)return renderNF();
    const em=$('#le').value.trim().toLowerCase(),pw=$('#lp').value;
    const a=DB.admins.find(x=>x.email.toLowerCase()===em&&x.pw===hsh(pw)&&x.active);
    if(!a){A.fails++;if(A.fails>=5){A.lockUntil=Date.now()+60000;A.fails=0}return renderNF()}
    A.fails=0;ls.set('shoman_sess',a.email+'|'+a.pw);a.last=Date.now();save();renderShell();
  };
}
const VIEWS=()=>[['home',T('Dashboard Home','الرئيسية')],['pages',T('Pages','الصفحات')],['products',T('Products','المنتجات')],['options',T('Optional Features','الخيارات الإضافية')],['telescopic',T('Telescopic','المدرجات القابلة للطي')],['theater',T('Theater Solutions','حلول المسارح')],['projects',T('Projects','المشاريع')],['downloads',T('Downloads','التحميلات')],['media',T('Media','الوسائط')],['settings',T('Global Settings','الإعدادات العامة')],['navigation',T('Navigation & Footer','القائمة والفوتر')],['admins',T('Admin Users','مستخدمو الإدارة')],['account',T('My Account','إعدادات حسابي')],['audit',T('Audit Log','سجل التعديلات')]];
function renderShell(){
  const a=sessOK();if(!a)return renderLogin();
  A.email=a.email;setLocale();
  adm().innerHTML=`<div class="shell"><aside class="side" id="side"><div class="logo">${logoSVG(true)}</div><nav id="snav" aria-label="Admin"><i class="sind" id="sind"></i>${VIEWS().map((v,i)=>`<button data-v="${v[0]}" style="--i:${i}">${ARRL}<span>${v[1]}</span></button>`).join('')}</nav></aside><div class="main-a"><div class="topb"><button class="mb-btn" id="mbb" aria-label="Menu"><svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" stroke-width="2"><path d="M2 5h14M2 9h14M2 13h14"/></svg></button><h1 id="vt"></h1><span class="sp"></span><button class="btn s sm" id="alang">${lang==='ar'?'EN':'عربي'}</button><div class="me" id="me"><button id="meb" aria-haspopup="true"><span class="av">${esc(a.email[0].toUpperCase())}</span><span class="nm">${esc(a.email)}</span></button><div class="menu"><button style="--i:0" data-act="pw">${T('Change password','تغيير كلمة المرور')}</button></div></div></div><div class="content stg" id="cont"></div></div></div>`;
  const cont=$('#cont');
  const labelTables=()=>$$('table.t',cont).forEach(table=>{
    const scroll=table.closest('.tw'),menu=$('#snav');
    if(scroll){
      const card=scroll.closest('.card');
      const menuHeight=menu?.clientHeight||innerHeight;
      const heading=card?.querySelector('.ch')?.offsetHeight||0;
      if(card){card.style.maxHeight=menuHeight+'px';card.style.minHeight='0';card.style.display='flex';card.style.flexDirection='column'}
      scroll.style.flex='1 1 auto';
      scroll.style.minHeight='0';
      scroll.style.maxHeight=Math.max(0,menuHeight-heading-16)+'px';
      scroll.style.overflowY='auto';
    }
    let heads=$$('thead th',table).map(th=>th.textContent.trim());
    if(!heads.length){
      const title=table.closest('.card')?.querySelector('.ch h3')?.textContent||'';
      if(title.includes('Recent changes')||title.includes('آخر'))heads=lang==='ar'?['التعديل','المسؤول','متى']:['Change','Admin','When'];
      else if(title.includes('Header links')||title.includes('روابط'))heads=lang==='ar'?['الرابط','التفاصيل','الظهور']:['Link','Details','Visibility'];
    }
    if(!heads.length)return;
    $$('tbody tr',table).forEach(row=>$$('td',row).forEach((cell,i)=>{
      if(cell.hasAttribute('colspan'))return;
      cell.dataset.label=heads[i]||'';
    }));
  });
  const tableObserver=new MutationObserver(labelTables);
  tableObserver.observe(cont,{childList:true,subtree:true});
  window.onresize=labelTables;
  $('#snav').onclick=e=>{const b=e.target.closest('[data-v]');if(b){$('#side').classList.remove('open');go(b.dataset.v)}};
  $('#mbb').onclick=e=>{e.stopPropagation();$('#side').classList.toggle('open')};
  $('#alang').onclick=()=>{lang=lang==='ar'?'en':'ar';ls.set('shoman_lang',lang);renderShell()};
  $('#meb').onclick=e=>{e.stopPropagation();$('#me').classList.toggle('open')};
  $('#me .menu').onclick=e=>{
    const b=e.target.closest('[data-act]');if(!b)return;$('#me').classList.remove('open');
    
    if(b.dataset.act==='pw')pwDialog(a);
  };
  go(A.view,true);
}
document.addEventListener('click',e=>{
  const m=$('#me');if(m&&!m.contains(e.target))m.classList.remove('open');
  const side=$('#side');if(side?.classList.contains('open')&&!side.contains(e.target)&&!e.target.closest('#mbb'))side.classList.remove('open');
});
function sind(){
  const b=$(`#snav [data-v="${A.view}"]`),i=$('#sind');if(!b||!i)return;
  $$('#snav button').forEach(x=>x.classList.toggle('on',x===b));
  i.style.height=b.offsetHeight+'px';i.style.transform=`translateY(${b.offsetTop}px)`;
}
function go(v,first){
  A.view=v;const cont=$('#cont');if(!cont)return;
  $('#vt').textContent=(VIEWS().find(x=>x[0]===v)||[])[1]||'';
  setTimeout(sind,first?400:0);
  const run=()=>{cont.classList.remove('view-out');cont.innerHTML='';VIEW[v]();[...cont.children].forEach((c,i)=>c.style.setProperty('--i',i));window.scrollTo(0,0)};
  if(first){run();return}
  cont.classList.add('view-out');
  setTimeout(()=>{cont.classList.remove('view-out');cont.innerHTML='<div class="card" style="padding:20px;display:grid;gap:12px"><div class="skel" style="width:40%"></div><div class="skel"></div><div class="skel" style="width:80%"></div></div>';setTimeout(run,180)},140);
}
/* helpers */
function log(msg){DB.audit.unshift({ts:Date.now(),by:A.email,msg});DB.audit=DB.audit.slice(0,200);save()}
function toast(msg){
  const t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent='✓  '+msg;adm().appendChild(t);
  setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),300)},2700);
}
function dlg(o){
  $$('.dlg,.dlg-b',adm()).forEach(x=>x.remove());
  const b=document.createElement('div');b.className='dlg-b';const d=document.createElement('div');d.className='dlg';
  d.innerHTML=`<div class="box" role="dialog" aria-modal="true" aria-label="${esc(o.title)}" style="${o.w?`width:min(${o.w}px,100%)`:''}"><div class="dh"><h3 style="font-size:19px">${esc(o.title)}</h3><button class="xb" data-x aria-label="Close">${XI}</button></div><div class="db">${o.body}</div>${o.foot?`<div class="df">${o.foot}</div>`:''}</div>`;
  adm().append(b,d);requestAnimationFrame(()=>b.classList.add('on'));
  const close=()=>{const bx=$('.box',d);bx.classList.add('out');b.classList.remove('on');setTimeout(()=>{b.remove();d.remove()},200)};
  b.onclick=close;d.addEventListener('click',e=>{if(e.target===d||e.target.closest('[data-x]'))close()});
  d.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  const f=$('input,select,textarea,button.btn',d);f&&f.focus();
  return {el:d,close};
}
const badge=s=>`<span class="badge ${s==='Published'?'pub':s==='Draft'?'drf':'hid'}">${s==='Published'?T('Published','منشور'):s==='Draft'?T('Draft','مسودة'):T('Hidden','مخفي')}</span>`;
const fmtT=ts=>{const d=new Date(ts);return d.toLocaleDateString(lang==='ar'?'ar-EG':'en-GB',{day:'2-digit',month:'short'})+' '+d.toLocaleTimeString(lang==='ar'?'ar-EG':'en-GB',{hour:'2-digit',minute:'2-digit'})};
function pwDialog(a){
  const d=dlg({title:T('Change password','تغيير كلمة المرور'),body:`<div class="form"><div class="fld"><label for="pw1">${T('New password','كلمة المرور الجديدة')}</label><input id="pw1" type="password" dir="ltr" minlength="8"></div></div>`,foot:`<button class="btn s sm" data-x>${T('Cancel','إلغاء')}</button><button class="btn p sm" id="pwok">${T('Save','حفظ')}</button>`});
  $('#pwok',d.el).onclick=()=>{const v=$('#pw1',d.el).value;if(v.length<8)return toast(T('Use at least 8 characters','استخدم 8 أحرف على الأقل'));a.pw=hsh(v);ls.set('shoman_sess',a.email+'|'+a.pw);log('Changed own password');d.close();toast(T('Password changed','تم تغيير كلمة المرور'))};
}

/* ---- generic CRUD ---- */
function fieldHTML(f,it){
  const L=T(f.l[0],f.l[1]);
  if(f.t==='bi')return `<div class="bi"><div class="fld"><label for="f_${f.k}En">${L} (EN)</label><input id="f_${f.k}En" name="${f.k}En" dir="ltr" value="${esc(it[f.k+'En'])}"></div><div class="fld"><label for="f_${f.k}Ar">${L} (AR)</label><input id="f_${f.k}Ar" name="${f.k}Ar" dir="rtl" value="${esc(it[f.k+'Ar'])}"></div></div>`;
  if(f.t==='biarea')return `<div class="bi"><div class="fld"><label for="f_${f.k}En">${L} (EN)</label><textarea id="f_${f.k}En" name="${f.k}En" dir="ltr">${esc(it[f.k+'En'])}</textarea></div><div class="fld"><label for="f_${f.k}Ar">${L} (AR)</label><textarea id="f_${f.k}Ar" name="${f.k}Ar" dir="rtl">${esc(it[f.k+'Ar'])}</textarea></div></div>`;
  if(f.t==='select')return `<div class="fld"><label for="f_${f.k}">${L}</label><select id="f_${f.k}" name="${f.k}">${f.o.map(o=>`<option value="${o[0]}" ${it[f.k]===o[0]?'selected':''}>${esc(T(o[1],o[2]||o[1]))}</option>`).join('')}</select></div>`;
  if(f.t==='bool')return `<div class="sw"><button type="button" class="${it[f.k]?'on':''}" data-sw="${f.k}" aria-label="${L}"></button><span>${L}</span></div>`;
  if(f.t==='items'){
    const rows=(it.items||[]).map(x=>itmRow(x)).join('');
    return `<div><div class="fld"><label>${L}</label></div><div id="items" data-block="${it.block?1:0}">${rows}</div><button type="button" class="btn s sm" id="additem" style="margin-top:10px">+ ${T('Add','إضافة')}</button></div>`;
  }
  return `<div class="fld"><label for="f_${f.k}">${L}</label><input id="f_${f.k}" name="${f.k}" type="${f.t==='num'?'number':'text'}" value="${esc(it[f.k])}"></div>`;
}
const itmRow=x=>`<div class="itm"><div class="mv"><button type="button" class="ib" data-m="up" aria-label="Up">▲</button><button type="button" class="ib" data-m="dn" aria-label="Down">▼</button></div><input dir="ltr" value="${esc(x.en)}" placeholder="EN"><input dir="rtl" value="${esc(x.ar)}" placeholder="AR"><button type="button" class="ib" data-m="rm" aria-label="Remove">✕</button></div>`;
function collect(box,fields,it){
  const o=clone(it);
  fields.forEach(f=>{
    if(f.t==='bi'||f.t==='biarea'){o[f.k+'En']=$(`[name="${f.k}En"]`,box).value.trim();o[f.k+'Ar']=$(`[name="${f.k}Ar"]`,box).value.trim()}
    else if(f.t==='bool')o[f.k]=$(`[data-sw="${f.k}"]`,box).classList.contains('on');
    else if(f.t==='items')o.items=$$('#items .itm',box).map(r=>{const i=$$('input',r);return {en:i[0].value.trim(),ar:i[1].value.trim()}}).filter(x=>x.en||x.ar);
    else{const v=$(`[name="${f.k}"]`,box).value;o[f.k]=f.t==='num'?(+v||0):v.trim()}
  });
  return o;
}
const STAT=[['Published','Published','منشور'],['Draft','Draft','مسودة'],['Hidden','Hidden','مخفي']];
function crud(host,cfg){
  const list=DB[cfg.coll];let q='';
  const nm=it=>cfg.name?cfg.name(it):(it.titleEn||it.code||it.id);
  host.innerHTML=`<div class="card"><div class="ch"><div class="tools">${cfg.search===false?'':`<div class="fld"><input id="qs" type="search" placeholder="${T('Search','بحث')}" aria-label="${T('Search','بحث')}"></div>`}</div>${cfg.add===false?'':`<button class="btn p sm" id="addb">+ ${T('Add','إضافة')}</button>`}</div><div class="tw"><table class="t"><thead><tr>${cfg.cols.map(c=>`<th>${T(c.h[0],c.h[1])}</th>`).join('')}<th></th></tr></thead><tbody id="tb"></tbody></table></div></div>`;
  function rows(hl){
    const it=list.filter(x=>!q||JSON.stringify(x).toLowerCase().includes(q));
    $('#tb',host).innerHTML=it.length?it.map((x,i)=>{
      const ix=list.indexOf(x);
      return `<tr data-id="${x.id}" class="${hl===x.id?'hl':''}" style="--i:${i}">${cfg.cols.map(c=>`<td>${c.f(x,ix)}</td>`).join('')}<td><div class="ac">${cfg.order===false?'':`<button class="ib" data-a="up" aria-label="Up" ${ix===0?'disabled':''}>↑</button><button class="ib" data-a="dn" aria-label="Down" ${ix===list.length-1?'disabled':''}>↓</button>`}<button class="ib" data-a="edit" aria-label="Edit">✎</button>${cfg.status===false?'':`<button class="ib" data-a="vis" aria-label="Show/Hide">◐</button>`}${cfg.del===false?'':`<button class="ib" data-a="del" aria-label="Delete">✕</button>`}</div></td></tr>`}).join(''):`<tr><td colspan="${cfg.cols.length+1}"><div class="empty">${T('Nothing here yet. Add the first item.','لا يوجد شيء بعد. أضف أول عنصر.')}</div></td></tr>`;
    if(hl)setTimeout(()=>{const r=$(`tr[data-id="${hl}"]`,host);r&&r.classList.remove('hl')},1600);
  }
  rows();
  const qs=$('#qs',host);if(qs)qs.oninput=()=>{q=qs.value.toLowerCase();rows()};
  function edit(it,isNew){
    const body=`<form class="form" id="ef" novalidate>${cfg.fields.map(f=>fieldHTML(f,it)).join('')}</form>`;
    const hist=!isNew&&cfg.versioned;
    const d=dlg({title:(isNew?T('Add','إضافة'):T('Edit','تعديل'))+' · '+T(cfg.title[0],cfg.title[1]),w:760,body,foot:`${hist?`<button class="btn s sm" id="hb" style="margin-inline-end:auto">${T('Version history','سجل النسخ')}</button>`:''}<button class="btn s sm" data-x>${T('Cancel','إلغاء')}</button>${cfg.preview?`<button class="btn s sm" id="pvb">${T('Preview','معاينة')}</button>`:''}<button class="btn p sm" id="svb">${cfg.status===false?T('Save','حفظ'):T('Save & publish','حفظ ونشر')}</button>`});
    const ef=$('#ef',d.el);
    ef.onclick=e=>{
      const sw=e.target.closest('[data-sw]');if(sw)sw.classList.toggle('on');
      const m=e.target.closest('[data-m]');if(m){const r=m.closest('.itm');if(m.dataset.m==='rm'){r.style.opacity=0;setTimeout(()=>r.remove(),180)}else if(m.dataset.m==='up'&&r.previousElementSibling)r.parentNode.insertBefore(r,r.previousElementSibling);else if(m.dataset.m==='dn'&&r.nextElementSibling)r.parentNode.insertBefore(r.nextElementSibling,r)}
      if(e.target.closest('#additem'))$('#items',ef).insertAdjacentHTML('beforeend',itmRow({en:'',ar:''}));
    };
    const first=cfg.fields[0];
    const getObj=(forceStatus)=>{const o=collect(ef,cfg.fields,it);if(forceStatus)o.status=forceStatus;return o};
    $('#svb',d.el).onclick=()=>{
      const o=getObj(cfg.status===false?null:(cfg.status!==false&&$('[name="status"]',ef)?undefined:'Published'));
      const key=o[first.k+'En']!==undefined?o[first.k+'En']:o[first.k];
      if(!key){return toast(T('Fill in the first field','املأ الحقل الأول'))}
      if(cfg.status!==false&&$('[name="status"]',ef)&&$('[name="status"]',ef).value==='Draft'&&false){}
      if(isNew){list.push(o)}else{
        const ix=list.findIndex(x=>x.id===it.id);
        if(cfg.versioned){const k=cfg.coll+':'+it.id;DB.versions[k]=(DB.versions[k]||[]).concat({ts:Date.now(),by:A.email,data:clone(it)}).slice(-10)}
        list[ix]=o;
      }
      log((isNew?'Added ':'Edited ')+T(cfg.title[0],cfg.title[0])+': '+nm(o));save();d.close();rows(o.id);toast(T('Saved','تم الحفظ'));cfg.after&&cfg.after();
    };
    if(cfg.preview)$('#pvb',d.el).onclick=()=>pvDialog(cfg.preview(getObj()));
    if(hist)$('#hb',d.el).onclick=()=>{
      const vs=(DB.versions[cfg.coll+':'+it.id]||[]).slice().reverse();
      const d2=dlg({title:T('Version history','سجل النسخ'),body:vs.length?`<div class="mlist">${vs.map((v,i)=>`<div class="card" style="padding:12px 16px;display:flex;justify-content:space-between;gap:12px;align-items:center"><div><b>${fmtT(v.ts)}</b><div style="font-size:13px;color:var(--steel)">${esc(v.by)}</div></div><button class="btn s sm" data-r="${i}">${T('Restore','استرجاع')}</button></div>`).join('')}</div>`:`<div class="empty">${T('No earlier versions yet.','لا توجد نسخ سابقة بعد.')}</div>`});
      d2.el.onclick=e=>{const b=e.target.closest('[data-r]');if(!b)return;const v=vs[+b.dataset.r];const ix=list.findIndex(x=>x.id===it.id);list[ix]=clone(v.data);log('Restored '+T(cfg.title[0],cfg.title[0])+': '+nm(v.data));save();d2.close();d.close();rows(it.id);toast(T('Version restored','تم استرجاع النسخة'))};
    };
  }
  host.onclick=e=>{
    if(e.target.closest('#addb')){edit(cfg.blank(),true);return}
    const b=e.target.closest('[data-a]');if(!b)return;
    const tr=b.closest('tr'),id=tr.dataset.id,ix=list.findIndex(x=>x.id===id),it=list[ix],a=b.dataset.a;
    if(a==='edit')edit(it,false);
    if(a==='up'||a==='dn'){const j=a==='up'?ix-1:ix+1;[list[ix],list[j]]=[list[j],list[ix]];save();rows(id);cfg.after&&cfg.after()}
    if(a==='vis'){it.status=it.status==='Published'?'Hidden':'Published';log(`${it.status==='Published'?'Showed':'Hid'} ${cfg.title[0]}: ${nm(it)}`);save();rows(id);toast(T('Updated','تم التحديث'));cfg.after&&cfg.after()}
    if(a==='del'){
      const d=dlg({title:T('Delete this item?','حذف هذا العنصر؟'),body:`<p>${T('This removes','سيتم حذف')} <b>${esc(nm(it))}</b> ${T('from the site. You can hide it instead and keep it as a draft.','من الموقع. يمكنك إخفاءه بدلًا من ذلك والاحتفاظ به كمسودة.')}</p>`,foot:`<button class="btn s sm" data-x>${T('Cancel','إلغاء')}</button><button class="btn danger sm" id="dok">${T('Delete','حذف')}</button>`});
      $('#dok',d.el).onclick=()=>{d.close();tr.classList.add('gone');setTimeout(()=>{list.splice(list.findIndex(x=>x.id===id),1);log('Deleted '+cfg.title[0]+': '+nm(it));save();rows();toast(T('Deleted','تم الحذف'));cfg.after&&cfg.after()},360)};
    }
  };
}
function pvDialog(html){
  const d=dlg({title:T('Preview','معاينة'),w:900,body:`<div class="tools" style="margin-bottom:12px"><button class="btn s sm" data-pv="d">${T('Desktop','ديسكتوب')}</button><button class="btn s sm" data-pv="m">${T('Mobile','موبايل')}</button></div><div class="pv"><div class="frame" id="pvf" style="padding:16px">${html}</div></div>`});
  d.el.addEventListener('click',e=>{const b=e.target.closest('[data-pv]');if(b)$('#pvf',d.el).classList.toggle('mob',b.dataset.pv==='m')});
}
const statusCol={h:['Status','الحالة'],f:x=>badge(x.status)};
const STATSEL={k:'status',t:'select',l:['Status','الحالة'],o:[['Published','Published','منشور'],['Draft','Draft','مسودة'],['Hidden','Hidden','مخفي']]};

/* ---- views ---- */
const VIEW={
  home(){
    const c=$('#cont'),S=DB.stats,wk=S.week,mx=Math.max(...wk);
    const days=lang==='ar'?['س','ح','ن','ث','ر','خ','ج']:['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];
    c.innerHTML=`<div class="kpis stg">${[[S.downloads,T('Downloads','التحميلات')],[DB.products.length,T('Products','المنتجات')],[DB.projects.length,T('Projects','المشاريع')],[DB.services.length,T('Services','الخدمات')]].map((k,i)=>`<div class="card h kpi" style="--i:${i}"><b data-c="${k[0]}">0</b><span>${k[1]}</span></div>`).join('')}</div>
    <div class="two"><div class="card"><div class="ch"><h3>${T('Site views this week','زيارات الموقع هذا الأسبوع')}</h3><span class="badge live">${T('LIVE','مباشر')}</span></div><div class="cb"><div class="bars-c">${wk.map((v,i)=>`<div style="height:${Math.round(v/mx*100)}%;--i:${i}" title="${v}"></div>`).join('')}</div><div class="axis">${days.map(d=>`<span>${d}</span>`).join('')}</div></div></div>
    <div class="card"><div class="ch"><h3>${T('Most viewed','الأكثر مشاهدة')}</h3></div><div class="cb mlist">${[...S.views,...S.svcViews].slice(0,6).map(v=>`<div style="display:flex;justify-content:space-between;gap:12px;padding-bottom:8px;border-bottom:1px solid var(--line)"><span>${esc(v[0])}</span><b style="font-family:var(--f-head)">${v[1]}</b></div>`).join('')}</div></div></div>
    <div class="card"><div class="ch"><h3>${T('Recent changes','آخر التعديلات')}</h3><button class="btn s sm" id="gal">${T('Open audit log','سجل التعديلات')}</button></div><div class="tw"><table class="t"><tbody>${DB.audit.slice(0,5).map((a,i)=>`<tr style="--i:${i}"><td>${esc(a.msg)}</td><td style="color:var(--steel)">${esc(a.by)}</td><td style="color:var(--muted);white-space:nowrap">${fmtT(a.ts)}</td></tr>`).join('')}</tbody></table></div></div>`;
    $$('[data-c]',c).forEach(el=>{const to=+el.dataset.c,t0=performance.now();(function f(n){const k=Math.min((n-t0)/1100,1);el.textContent=Math.round(to*(1-Math.pow(1-k,3))).toLocaleString('en-US');if(k<1)requestAnimationFrame(f)})(t0)});
    $('#gal',c).onclick=()=>go('audit');
  },
  pages(){
    const c=$('#cont');
    const names={about:['About','من نحن'],theater:['Theater Solutions','حلول المسارح'],products:['Seats','المقاعد'],telescopic:['Telescopic','المدرجات'],options:['Options','الخيارات'],projects:['Projects','المشاريع'],downloads:['Downloads','التحميلات'],contact:['Contact','التواصل']};
    c.innerHTML=`<div class="card"><div class="ch"><h3>${T('Section visibility','إظهار الأقسام')}</h3></div><div class="cb" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">${Object.keys(names).map(k=>`<div class="sw"><button class="${sectionOn(k)?'on':''}" data-s="${k}" aria-label="${names[k][0]}"></button><span>${T(...names[k])}</span></div>`).join('')}</div></div><div id="hh"></div>`;
    c.onclick=e=>{const b=e.target.closest('[data-s]');if(!b)return;b.classList.toggle('on');DB.sections[b.dataset.s]=b.classList.contains('on');log('Toggled section: '+b.dataset.s);save();toast(T('Saved','تم الحفظ'))};
    const h=document.createElement('div');$('#hh',c).replaceWith(h);
    crud(h,{coll:'hero',title:['Hero slides','شرائح الهيرو'],add:false,del:false,status:false,search:false,
      cols:[{h:['Headline (EN)','العنوان (EN)'],f:x=>esc(x.titleEn)},{h:['Headline (AR)','العنوان (AR)'],f:x=>`<span dir="rtl">${esc(x.titleAr)}</span>`}],
      fields:[{k:'title',t:'bi',l:['Headline','العنوان']},{k:'sub',t:'biarea',l:['Subheading','العنوان الفرعي']}]});
  },
  products(){
    const c=$('#cont'),h=document.createElement('div');c.appendChild(h);
    const L=pubP,pc=it=>`<div class="pgrid" style="grid-template-columns:1fr">${pcHTML(it,Math.max(0,DB.products.findIndex(x=>x.id===it.id)),false)}</div>`;
    crud(h,{coll:'products',title:['Products','المنتجات'],versioned:true,preview:pc,name:x=>x.code,
      cols:[{h:['Preview','معاينة'],f:(x,i)=>`<span class="thumb">${chair(i)}</span>`},{h:['Code','الكود'],f:x=>`<b>${esc(x.code)}</b>`},{h:['Name','الاسم'],f:x=>esc(pick(x,'desc'))},{h:['Featured','مميز'],f:x=>x.featured?'★':'–'},statusCol],
      blank:()=>({id:'ch'+uid(),code:'CH '+String(DB.products.length+1).padStart(3,'0'),nameEn:'Performer',nameAr:'Performer',descEn:'',descAr:'',material:'',mechanism:'',acoustic:'',dims:'',status:'Draft',featured:false}),
      fields:[{k:'code',t:'text',l:['Code','الكود']},{k:'desc',t:'bi',l:['Description','الوصف']},{k:'material',t:'text',l:['Material','الخامة']},{k:'mechanism',t:'text',l:['Mechanism','الميكانيزم']},{k:'acoustic',t:'text',l:['Acoustic absorption','الامتصاص الصوتي']},{k:'dims',t:'text',l:['Dimensions','الأبعاد']},{k:'featured',t:'bool',l:['Featured','منتج مميز']},STATSEL]});
    const bar=document.createElement('div');bar.className='card';bar.innerHTML=`<div class="ch"><h3>${T('Load more batch size','عدد المنتجات في كل دفعة')}</h3></div><div class="cb tools"><div class="fld"><label for="bs">${T('Products per press','منتجات لكل ضغطة')}</label><input id="bs" type="number" min="1" max="24" value="${DB.settings.batch}" style="width:120px"></div><button class="btn p sm" id="bsv" style="align-self:flex-end">${T('Save','حفظ')}</button></div>`;c.insertBefore(bar,h);
    $('#bsv',bar).onclick=()=>{DB.settings.batch=Math.max(1,Math.min(24,+$('#bs',bar).value||4));shown=0;log('Changed Load More batch to '+DB.settings.batch);save();toast(T('Saved','تم الحفظ'))};
  },
  options(){const h=document.createElement('div');$('#cont').appendChild(h);crud(h,{coll:'options',title:['Options','الخيارات'],
    cols:[{h:['Option','الخيار'],f:x=>`<b>${esc(x.titleEn)}</b>`},{h:['Arabic','العربية'],f:x=>`<span dir="rtl">${esc(x.titleAr)}</span>`},statusCol],
    blank:()=>({id:'o'+uid(),icon:'acc',titleEn:'',titleAr:'',descEn:'',descAr:'',status:'Draft'}),
    fields:[{k:'title',t:'bi',l:['Title','العنوان']},{k:'desc',t:'biarea',l:['Description','الوصف']},{k:'icon',t:'select',l:['Icon','الأيقونة'],o:[['num','Numbers'],['row','Rows'],['acc','Accessory'],['tab','Tablet']]},STATSEL]})},
  telescopic(){const h=document.createElement('div');$('#cont').appendChild(h);crud(h,{coll:'tabs',title:['Telescopic tabs','تبويبات المدرجات'],
    cols:[{h:['Tab','التبويب'],f:x=>`<b>${esc(x.titleEn)}</b>`},{h:['Summary','الملخص'],f:x=>esc(x.descEn)},statusCol],
    blank:()=>({id:'t'+uid(),titleEn:'',titleAr:'',descEn:'',descAr:'',bEn:'',bAr:'',status:'Draft'}),
    fields:[{k:'title',t:'bi',l:['Title','العنوان']},{k:'desc',t:'biarea',l:['Summary','الملخص']},{k:'b',t:'biarea',l:['Bullets (separate with |)','نقاط (افصل بـ |)']},STATSEL]})},
  theater(){const h=document.createElement('div');$('#cont').appendChild(h);
    const pc=it=>`<div class="svc-grid" style="grid-template-columns:1fr">${svcCard(it,0)}</div>`;
    crud(h,{coll:'services',title:['Theater Solutions','حلول المسارح'],versioned:true,preview:pc,
    cols:[{h:['Service','الخدمة'],f:x=>`<b>${esc(x.titleEn)}</b>`},{h:['Arabic','العربية'],f:x=>`<span dir="rtl">${esc(x.titleAr)}</span>`},{h:['Panel items','عناصر البانل'],f:x=>x.block?'1 block':(x.items||[]).length},statusCol],
    blank:()=>({id:'s'+uid(),icon:'arch',titleEn:'',titleAr:'',descEn:'',descAr:'',status:'Draft',items:[]}),
    fields:[{k:'title',t:'bi',l:['Title','العنوان']},{k:'desc',t:'biarea',l:['Short description','الوصف المختصر']},{k:'icon',t:'select',l:['Icon','الأيقونة'],o:[['arch','Architecture'],['audio','Audio'],['light','Lighting'],['visual','Visual'],['mech','Mechanism'],['care','Care']]},{k:'items',t:'items',l:['Side panel content (reorder with arrows)','محتوى البانل الجانبي (رتّب بالأسهم)']},STATSEL]})},
  projects(){const h=document.createElement('div');$('#cont').appendChild(h);crud(h,{coll:'projects',title:['Projects','المشاريع'],
    cols:[{h:['Project','المشروع'],f:x=>`<b>${esc(x.titleEn)}</b>`},{h:['Sector','القطاع'],f:x=>esc((SECT[x.sector]||[x.sector])[0])},{h:['Country','الدولة'],f:x=>esc(x.country)},{h:['Year','السنة'],f:x=>esc(x.year)},{h:['Seats','المقاعد'],f:x=>esc(x.seats)},statusCol],
    blank:()=>({id:'p'+uid(),titleEn:'',titleAr:'',sector:'theaters',country:'Egypt',year:String(new Date().getFullYear()),seats:'',status:'Draft'}),
    fields:[{k:'title',t:'bi',l:['Title','العنوان']},{k:'sector',t:'select',l:['Sector','القطاع'],o:Object.keys(SECT).map(k=>[k,SECT[k][0],SECT[k][1]])},{k:'country',t:'text',l:['Country','الدولة']},{k:'year',t:'text',l:['Year','السنة']},{k:'seats',t:'text',l:['Seats','عدد المقاعد']},STATSEL]})},
  downloads(){const h=document.createElement('div');$('#cont').appendChild(h);crud(h,{coll:'downloads',title:['Downloads','التحميلات'],
    cols:[{h:['File','الملف'],f:x=>`<b>${esc(x.titleEn)}</b><div style="font-size:12px;color:var(--muted)">${esc(x.fileName)}</div>`},{h:['Size','الحجم'],f:x=>esc(x.size)},statusCol],
    blank:()=>({id:'d'+uid(),titleEn:'',titleAr:'',fileName:'',size:'',status:'Draft'}),
    fields:[{k:'title',t:'bi',l:['Title','العنوان']},{k:'fileName',t:'text',l:['File name','اسم الملف']},{k:'size',t:'text',l:['Size','الحجم']},STATSEL]})},
  media(){
    const c=$('#cont');
    c.innerHTML=`<div class="card"><div class="ch"><h3>${T('Media library','مكتبة الوسائط')}</h3><label class="btn p sm" for="mu" style="cursor:pointer">+ ${T('Upload','رفع')}</label><input id="mu" type="file" accept="image/*" hidden></div><div class="cb"><div class="media-g" id="mg"></div><p class="note">${T('Images are compressed automatically on upload (WebP/AVIF).','تُضغط الصور تلقائيًا عند الرفع (WebP/AVIF).')}</p></div></div>`;
    const draw=()=>{$('#mg').innerHTML=DB.media.map((m,i)=>`<div style="animation:rise .45s var(--ease) both;animation-delay:${i*40}ms"><i><img src="${esc(m.src||MEDIA_IMAGE[m.name]||Object.values(MEDIA_IMAGE)[i%4])}" alt="${esc(m.name)}" loading="lazy"></i><b style="font-size:12px;word-break:break-all">${esc(m.name)}</b><span>${esc(m.size)}</span></div>`).join('')};draw();
    $('#mu').onchange=e=>{const f=e.target.files[0];if(!f)return;DB.media.push({id:'m'+uid(),name:f.name,size:Math.max(1,Math.round(f.size/1024))+' KB',k:DB.media.length%3});log('Uploaded media: '+f.name);save();draw();toast(T('Uploaded','تم الرفع'))};
  },
  settings(){
    const c=$('#cont'),S=DB.settings;
    const F=(k,l,ltr)=>`<div class="fld"><label for="s_${k}">${l}</label><input id="s_${k}" name="${k}" value="${esc(S[k])}" ${ltr?'dir="ltr"':''}></div>`;
    c.innerHTML=`<form class="card" id="sf"><div class="ch"><h3>${T('Contact & branches','التواصل والفروع')}</h3><span style="font-size:13px;color:var(--steel)">${T('Changing a value here updates Contact and Footer together.','تغيير القيمة هنا يحدّث التواصل والفوتر معًا.')}</span></div><div class="cb form"><div class="frow">${F('phone',T('Mobile','الموبايل'),1)}${F('landline',T('Landline','الأرضي'),1)}</div><div class="frow">${F('email',T('Email','البريد'),1)}${F('waRiyadh',T('WhatsApp Riyadh (digits)','واتساب الرياض (أرقام)'),1)}</div><div class="bi">${F('cairoEn','Cairo address (EN)',1)}${F('cairoAr','عنوان القاهرة (AR)')}</div><div class="bi">${F('riyadhEn','Riyadh address (EN)',1)}${F('riyadhAr','عنوان الرياض (AR)')}</div><div class="bi">${F('riyadhNoteEn','Riyadh phone note (EN)',1)}${F('riyadhNoteAr','ملاحظة هاتف الرياض (AR)')}</div><div class="frow">${F('facebook','Facebook',1)}${F('instagram','Instagram',1)}</div><div class="frow">${F('x','X',1)}<div></div></div><div><button class="btn p" type="submit">${T('Save settings','حفظ الإعدادات')}</button></div></div></form>`;
    $('#sf').onsubmit=e=>{e.preventDefault();$$('#sf [name]').forEach(i=>S[i.name]=i.value.trim());log('Edited Global Settings');save();toast(T('Settings saved','تم حفظ الإعدادات'))};
  },
  navigation(){
    const c=$('#cont');const nm={home:['Home','الرئيسية'],about:['About Us','من نحن'],theater:['Theater Solutions','حلول المسارح'],seats:['Seats','المقاعد'],projects:['Our Projects','مشاريعنا'],contact:['Contact Us','تواصل معنا']};
    c.innerHTML=`<div class="card"><div class="ch"><h3>${T('Header links','روابط الهيدر')}</h3></div><div class="tw"><table class="t"><tbody>${DB.nav.map((n,i)=>`<tr style="--i:${i}"><td><b>${T(...nm[n.id])}</b></td><td>${n.id==='theater'?T('Dropdown lists the published Theater Solutions services','القائمة المنسدلة تعرض خدمات حلول المسارح المنشورة'):''}</td><td><div class="sw"><button class="${n.show?'on':''}" data-n="${n.id}" aria-label="${T(...nm[n.id])}"></button></div></td></tr>`).join('')}</tbody></table></div></div><div class="card"><div class="ch"><h3>${T('Footer','الفوتر')}</h3></div><div class="cb" style="color:var(--steel)">${T('Footer columns follow the header links, the published services and Global Settings. Privacy and Terms text is edited here once final wording is supplied.','أعمدة الفوتر تتبع روابط الهيدر والخدمات المنشورة والإعدادات العامة. تُحرَّر نصوص الخصوصية والشروط هنا بعد اعتماد الصياغة النهائية.')}</div></div>`;
    c.onclick=e=>{const b=e.target.closest('[data-n]');if(!b)return;b.classList.toggle('on');DB.nav.find(x=>x.id===b.dataset.n).show=b.classList.contains('on');log('Toggled nav: '+b.dataset.n);save();toast(T('Saved','تم الحفظ'))};
  },
  account(){
    const c=$('#cont'),a=DB.admins.find(x=>x.email===A.email)||DB.admins[0];
    c.innerHTML=`<form class="card" id="accountForm"><div class="ch"><h3>${T('Administrator account','حساب المسؤول')}</h3></div><div class="cb form"><div class="fld"><label for="accountEmail">${T('Account email','البريد الإلكتروني للحساب')}</label><input id="accountEmail" type="email" dir="ltr" value="${esc(a.email)}" required></div><div class="frow"><div class="fld"><label for="accountLang">${T('Dashboard language','لغة لوحة التحكم')}</label><select id="accountLang"><option value="en" ${lang==='en'?'selected':''}>English</option><option value="ar" ${lang==='ar'?'selected':''}>العربية</option></select></div><div class="fld"><label>${T('Password','كلمة المرور')}</label><button class="btn s" id="accountPassword" type="button">${T('Change password','تغيير كلمة المرور')}</button></div></div><div><button class="btn p" type="submit">${T('Save account settings','حفظ إعدادات الحساب')}</button></div></div></form>`;
    $('#accountLang',c).onchange=e=>{lang=e.target.value;ls.set('shoman_lang',lang);renderShell()};
    $('#accountPassword',c).onclick=()=>pwDialog(a);
    $('#accountForm',c).onsubmit=e=>{
      e.preventDefault();const email=$('#accountEmail',c).value.trim().toLowerCase();
      if(!/^\S+@\S+\.\S+$/.test(email))return toast(T('Enter a valid email address','أدخل بريدًا إلكترونيًا صحيحًا'));
      if(DB.admins.some(x=>x!==a&&x.email.toLowerCase()===email))return toast(T('This email is already in use','هذا البريد مستخدم بالفعل'));
      a.email=email;A.email=email;ls.set('shoman_sess',a.email+'|'+a.pw);log('Updated administrator account');save();
      $('#me .nm').textContent=email;$('#me .av').textContent=email[0].toUpperCase();toast(T('Account settings saved','تم حفظ إعدادات الحساب'));
    };
  },
  admins(){
    const c=$('#cont');
    const draw=()=>{$('#at').innerHTML=DB.admins.map((a,i)=>`<tr data-id="${a.id}" style="--i:${i}"><td dir="ltr"><b>${esc(a.email)}</b></td><td style="color:var(--steel)">${fmtT(a.last)}</td><td>${a.active?`<span class="badge pub">${T('Active','نشط')}</span>`:`<span class="badge hid">${T('Disabled','معطّل')}</span>`}</td><td><div class="ac"><button class="btn s sm" data-a="tog">${a.active?T('Disable','تعطيل'):T('Enable','تفعيل')}</button><button class="btn s sm" data-a="rst">${T('Reset password','إعادة تعيين')}</button><button class="btn danger sm" data-a="del" ${a.email===A.email?'disabled':''}>${T('Delete','حذف')}</button></div></td></tr>`).join('')};
    c.innerHTML=`<div class="card"><div class="ch"><h3>${T('Admins','المسؤولون')}</h3><button class="btn p sm" id="aadd">+ Add Admin</button></div><div class="tw"><table class="t"><thead><tr><th>${T('Email','البريد')}</th><th>${T('Last sign-in','آخر دخول')}</th><th>${T('Status','الحالة')}</th><th></th></tr></thead><tbody id="at"></tbody></table></div></div><div class="card"><div class="cb" style="color:var(--steel)">${T('All admins have the same full access. Passwords are stored encrypted and nobody can read them.','كل المسؤولين بنفس الصلاحيات الكاملة. كلمات المرور مخزّنة مشفّرة ولا يستطيع أحد قراءتها.')}</div></div>`;draw();
    c.onclick=e=>{
      if(e.target.closest('#aadd')){
        const d=dlg({title:'Add Admin',body:`<div class="form"><div class="fld"><label for="ne">${T('Email','البريد الإلكتروني')}</label><input id="ne" type="email" dir="ltr"></div><div class="fld"><label for="np">${T('Temporary password','كلمة مرور مؤقتة')}</label><input id="np" type="text" dir="ltr" value="Temp-${uid()}"></div></div>`,foot:`<button class="btn s sm" data-x>${T('Cancel','إلغاء')}</button><button class="btn p sm" id="nok">${T('Add','إضافة')}</button>`});
        $('#nok',d.el).onclick=()=>{const em=$('#ne',d.el).value.trim().toLowerCase(),pw=$('#np',d.el).value;if(!/^\S+@\S+\.\S+$/.test(em)||pw.length<8)return toast(T('Enter a valid email and 8+ characters','أدخل بريدًا صحيحًا وكلمة مرور 8 أحرف على الأقل'));if(DB.admins.some(x=>x.email===em))return toast(T('This email is already an admin','هذا البريد مسجّل بالفعل'));DB.admins.push({id:'a'+uid(),email:em,pw:hsh(pw),active:true,last:0});log('Added admin: '+em);save();d.close();draw();toast(T('Admin added','تمت إضافة المسؤول'))};
        return;
      }
      const b=e.target.closest('[data-a]');if(!b)return;const tr=b.closest('tr'),a=DB.admins.find(x=>x.id===tr.dataset.id);
      if(b.dataset.a==='tog'){a.active=!a.active;log((a.active?'Enabled ':'Disabled ')+'admin: '+a.email);save();draw();toast(T('Updated','تم التحديث'))}
      if(b.dataset.a==='rst'){const d=dlg({title:T('Reset password','إعادة تعيين كلمة المرور'),body:`<div class="fld"><label for="rp">${T('New temporary password','كلمة مرور مؤقتة جديدة')}</label><input id="rp" dir="ltr" value="Temp-${uid()}"></div>`,foot:`<button class="btn s sm" data-x>${T('Cancel','إلغاء')}</button><button class="btn p sm" id="rok">${T('Save','حفظ')}</button>`});$('#rok',d.el).onclick=()=>{const v=$('#rp',d.el).value;if(v.length<8)return toast(T('Use at least 8 characters','استخدم 8 أحرف على الأقل'));a.pw=hsh(v);log('Reset password: '+a.email);save();d.close();toast(T('Password reset','تمت إعادة التعيين'))}}
      if(b.dataset.a==='del'){const d=dlg({title:T('Delete admin?','حذف المسؤول؟'),body:`<p>${esc(a.email)}</p>`,foot:`<button class="btn s sm" data-x>${T('Cancel','إلغاء')}</button><button class="btn danger sm" id="xok">${T('Delete','حذف')}</button>`});$('#xok',d.el).onclick=()=>{d.close();tr.classList.add('gone');setTimeout(()=>{DB.admins=DB.admins.filter(x=>x.id!==a.id);log('Deleted admin: '+a.email);save();draw();toast(T('Deleted','تم الحذف'))},360)}}
    };
  },
  langs(){
    const c=$('#cont');const colls=[['hero',['Hero','الهيرو'],['title','sub']],['products',['Products','المنتجات'],['desc']],['services',['Theater Solutions','حلول المسارح'],['title','desc']],['options',['Options','الخيارات'],['title','desc']],['tabs',['Telescopic','المدرجات'],['title','desc']],['projects',['Projects','المشاريع'],['title']],['downloads',['Downloads','التحميلات'],['title']]];
    c.innerHTML=`<div class="card"><div class="ch"><h3>${T('Translation coverage','اكتمال الترجمة')}</h3></div><div class="tw"><table class="t"><thead><tr><th>${T('Content','المحتوى')}</th><th>EN</th><th>AR</th></tr></thead><tbody>${colls.map((x,i)=>{let tot=0,en=0,ar=0;DB[x[0]].forEach(it=>x[2].forEach(k=>{tot++;if(it[k+'En'])en++;if(it[k+'Ar'])ar++}));const p=v=>{const r=tot?Math.round(v/tot*100):100;return `<span class="badge ${r===100?'pub':'drf'}">${r}%</span>`};return `<tr style="--i:${i}"><td><b>${T(...x[1])}</b></td><td>${p(en)}</td><td>${p(ar)}</td></tr>`}).join('')}</tbody></table></div></div><div class="card"><div class="ch"><h3>${T('Default language','اللغة الافتراضية')}</h3></div><div class="cb tools"><div class="fld"><select id="dl" aria-label="${T('Default language','اللغة الافتراضية')}"><option value="en" ${DB.settings.defLang==='en'?'selected':''}>English</option><option value="ar" ${DB.settings.defLang==='ar'?'selected':''}>العربية</option></select></div><button class="btn p sm" id="dls">${T('Save','حفظ')}</button></div></div>`;
    $('#dls',c).onclick=()=>{DB.settings.defLang=$('#dl',c).value;log('Changed default language');save();toast(T('Saved','تم الحفظ'))};
  },
  audit(){
    const c=$('#cont');
    c.innerHTML=`<div class="card"><div class="ch"><h3>${T('Every change, by who and when','كل تعديل، ومن قام به ومتى')}</h3><button class="btn s sm" id="rs">${T('Reset demo data','إعادة بيانات العرض')}</button></div><div class="tw"><table class="t"><thead><tr><th>${T('Change','التعديل')}</th><th>${T('Admin','المسؤول')}</th><th>${T('When','متى')}</th></tr></thead><tbody>${DB.audit.map((a,i)=>`<tr style="--i:${Math.min(i,10)}"><td>${esc(a.msg)}</td><td dir="ltr" style="color:var(--steel)">${esc(a.by)}</td><td style="white-space:nowrap;color:var(--muted)">${fmtT(a.ts)}</td></tr>`).join('')||`<tr><td colspan="3"><div class="empty">${T('No changes yet.','لا توجد تعديلات بعد.')}</div></td></tr>`}</tbody></table></div></div>`;
    $('#rs',c).onclick=()=>{const d=dlg({title:T('Reset demo data?','إعادة بيانات العرض؟'),body:`<p>${T('All edits made in this prototype are cleared and the original sample content is restored.','سيتم مسح كل التعديلات في هذا النموذج واسترجاع المحتوى التجريبي الأصلي.')}</p>`,foot:`<button class="btn s sm" data-x>${T('Cancel','إلغاء')}</button><button class="btn danger sm" id="rok">${T('Reset','إعادة')}</button></div>`});$('#rok',d.el).onclick=()=>{const keep=ls.get('shoman_sess');DB=seed();save();shown=0;d.close();toast(T('Demo data restored','تم استرجاع بيانات العرض'));go('audit')}};
  }
};

function setBT(b,t){if(b.firstChild)b.firstChild.textContent=t}

/* ---------- infinite slider: ease to a slow speed on hover ---------- */
const slS=new Map();
function slTick(){let live=false;slS.forEach((o,el)=>{o.r+=(o.t-o.r)*.08;if(Math.abs(o.t-o.r)<.002)o.r=o.t;else live=true;el.getAnimations().forEach(a=>a.playbackRate=o.r)});if(live)requestAnimationFrame(slTick)}
function slSet(e,t){const el=e.target.closest&&e.target.closest('.sl-track');if(!el)return;if(e.relatedTarget&&el.contains(e.relatedTarget))return;const o=slS.get(el)||{r:1,t:1};o.t=t;slS.set(el,o);requestAnimationFrame(slTick)}
document.addEventListener('pointerover',e=>{if(e.pointerType!=='touch')slSet(e,.25)});
document.addEventListener('pointerout',e=>slSet(e,1));

/* ---------- spotlight-card pointer lighting ---------- */
document.addEventListener('pointermove',e=>{
  if(mode!=='site'||reduced||e.pointerType==='touch'||!e.target.closest)return;
  const c=e.target.closest('.spotlight-card');
  if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}
});

/* Shoman button ripple. */
document.addEventListener('pointerdown',e=>{
  if(mode!=='admin'||reduced||!e.target.closest)return;
  const b=e.target.closest('.btn,.ib,.chip,.sw button,.mb-btn,.side nav button,.me>button');
  if(!b||b.disabled)return;
  const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,i=document.createElement('i');
  i.className='shoman-rp';i.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
  b.appendChild(i);setTimeout(()=>i.remove(),750);
},{passive:true});


/* =================== ROUTER =================== */
function route(){
  const isAdm=true;
  mode=isAdm?'admin':'site';
  closeOverlay(true,true);openOv=null;$('#scrim').classList.remove('on');document.body.style.overflow='';
  const site=$('#site'),ad=adm();
  if(isAdm){
    killLenis();site.hidden=true;ad.hidden=false;$('#prog').style.transform='scaleX(0)';
    document.title='shoman Admin Dashboard';
    $('#proto').innerHTML=protoHTML();
    if(sessOK())renderShell();else renderLogin();
  }else{
    ad.hidden=true;ad.innerHTML='';site.hidden=false;initLenis();
    if(!ls.get('shoman_lang')&&DB.settings.defLang)lang=DB.settings.defLang;
    shown=0;renderSite(true);
    const h=location.hash.slice(1);if(h&&/^[a-z-]+$/.test(h)&&h!=='admin')setTimeout(()=>goTo(h,/^svc-/.test(h)),100);
    else{if(lenis)lenis.scrollTo(0,{immediate:true});window.scrollTo(0,0)}
  }
  $('#proto').innerHTML=protoHTML();
}
addEventListener('hashchange',route);
route();
})();

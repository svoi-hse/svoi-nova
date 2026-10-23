'use strict';
/* GitHub Pages edition: an explicitly local, interactive preview.
   No backend, no password handling, and no claim of real messages or matches. */
(() => {
  const STORAGE_KEY = 'svoi_nova_pages_preview_v1';
  const PAGES = ['home', 'discover', 'studio', 'events', 'about'];
  const SKINS = { lime:'#bdff83', violet:'#bca5ff', rose:'#ffb9d1', sky:'#a0c7ff', amber:'#ffd29b', mint:'#9bf0d2' };
  const BACKGROUNDS = {
    cosmic:'radial-gradient(ellipse at 20% 10%,#7775b1,transparent 52%),linear-gradient(145deg,#383867,#1e254b)',
    aurora:'radial-gradient(ellipse at 20% 15%,#3c9884,transparent 59%),radial-gradient(ellipse at 82% 83%,#6659aa,transparent 62%),#171f43',
    ink:'radial-gradient(ellipse at 73% 15%,#4c477b,transparent 61%),linear-gradient(145deg,#11152c,#222747)',
    rose:'radial-gradient(ellipse at 68% 20%,#b96b93,transparent 58%),linear-gradient(145deg,#4b305f,#252849)',
    dusk:'radial-gradient(ellipse at 15% 66%,#8f6a93,transparent 60%),linear-gradient(155deg,#333264,#705480)'
  };
  const BG_LABELS = {cosmic:'Космос',aurora:'Аврора',ink:'Чернила',rose:'Розовый свет',dusk:'Сумерки'};
  const ICON_PATHS = {
    search:'<circle cx="11" cy="11" r="7.4"/><path d="m16.5 16.5 4.5 4.5"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m15.8 8.3-2.2 5.3-5.4 2.2 2.2-5.4z"/>',
    chat:'<path d="M20 11.5a8 8 0 0 1-8.5 8 8.4 8.4 0 0 1-3.4-.9L3 20l1.3-4.5A8 8 0 0 1 12 3.5a8 8 0 0 1 8 8z"/>',
    user:'<circle cx="12" cy="8.5" r="4"/><path d="M4 21c.7-4.5 3.4-6.7 8-6.7s7.3 2.2 8 6.7"/>',
    sliders:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="8" cy="18" r="2" fill="currentColor" stroke="none"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v5M17 3v5M3 10h18"/>',
    arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
    heart:'<path d="M20.5 8.4c0 4.7-8.5 10.6-8.5 10.6S3.5 13.1 3.5 8.4A4.5 4.5 0 0 1 12 6.5a4.5 4.5 0 0 1 8.5 1.9z"/>',
    x:'<path d="M5 5l14 14M19 5 5 19"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    bolt:'<path d="m14 2-9 11h7l-2 9 9-12h-7z"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.5"/>',
    shield:'<path d="M12 2 20 6v6c0 5.5-3.5 8-8 10-4.5-2-8-4.5-8-10V6z"/><path d="m8 12 3 3 5-5"/>',
    spark:'<path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/>',
    message:'<path d="M4 5h16v12H8l-4 3z"/>',
    upload:'<path d="M12 16V3m-4 4 4-4 4 4M4 15v5h16v-5"/>',
    eye:'<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.5"/>',
    close:'<path d="M5 5l14 14M19 5 5 19"/>'
  };
  const icon = (name, cls='') => `<svg aria-hidden="true" class="ico ${cls}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS[name] || ICON_PATHS.info}</svg>`;
  const faces = [
    {id:1,name:'Анна',age:20,faculty:'ФКН',year:2,quote:'Люблю разговаривать до закрытия кофейни.',about:'Пишу маленькие программы, собираю плейлисты под разные дни и не пропускаю хорошее кино. Ценю чувство юмора и лёгкость в общении.',interests:['Кино','Музыка','Технологии','Кофейни'],color:'#7367b0',photo:'assets/images/anna_demo.webp'},
    {id:2,name:'Соня',age:19,faculty:'Дизайн',year:2,quote:'Красивые города лучше всего узнавать пешком.',about:'Замечаю вывески, рисунки и странные детали. Люблю маленькие выставки, фотографию и когда планы рождаются за пять минут.',interests:['Фото','Искусство','Прогулки','Архитектура'],color:'#a57593',photo:'assets/images/sonya_demo.webp'},
    {id:3,name:'Маша',age:21,faculty:'ФЭСН',year:3,quote:'Хорошая встреча начинается с искреннего вопроса.',about:'Ищу новые книжные магазины и собираю рецепты завтраков. Мне интересно, как люди выбирают свой путь и что их по-настоящему радует.',interests:['Книги','Путешествия','Еда','Языки'],color:'#8169aa'},
    {id:4,name:'Лиза',age:20,faculty:'МИЭМ',year:2,quote:'Мне нравится, когда можно быть немного смешной.',about:'В свободное время играю в настолки, собираю небольшие электронные штуки и бесконечно спорю о лучших сериалах.',interests:['Настолки','Сериалы','Технологии','Спорт'],color:'#667baf'},
    {id:5,name:'Варя',age:22,faculty:'ФГН',year:4,quote:'Самые хорошие разговоры — без спешки.',about:'Люблю старые библиотеки, керамику, театр и поздние прогулки. Думаю, что людей лучше узнавать не по списку фактов, а по мелочам.',interests:['Театр','Книги','Искусство','Прогулки'],color:'#8d648f'},
    {id:6,name:'Даша',age:19,faculty:'ФКН',year:1,quote:'Люблю открывать для себя что-то новое.',about:'Бегаю по утрам, изучаю веб-дизайн и иногда готовлю сложные десерты. Нравятся спокойные люди, с которыми можно смеяться.',interests:['Бег','Дизайн','Еда','Музыка'],color:'#568da0'},
    {id:7,name:'Полина',age:21,faculty:'Бизнес',year:3,quote:'Я за смелые идеи и обычные человеческие разговоры.',about:'Увлекаюсь предпринимательством и современным искусством. Люблю слушать чужие истории и танцевать, когда никто не смотрит.',interests:['Бизнес','Искусство','Танцы','Кофейни'],color:'#af7782'},
    {id:8,name:'Катя',age:20,faculty:'Право',year:2,quote:'Каждую субботу нужен новый маршрут.',about:'Обычно у меня в рюкзаке книга и наушники. Люблю большие парки, длинные разговоры и соревнования по квизам.',interests:['Прогулки','Квиз','Книги','Музыка'],color:'#677eac'},
    {id:9,name:'Алина',age:22,faculty:'Экономика',year:4,quote:'Серьёзно отношусь только к важному.',about:'Люблю велосипеды, камерные концерты и фильмы, которые хочется обсуждать. Мне нравятся люди, которые умеют удивляться.',interests:['Велосипед','Музыка','Кино','Прогулки'],color:'#9c6b94'},
    {id:10,name:'Ника',age:21,faculty:'Социология',year:3,quote:'Хочу, чтобы рядом можно было быть собой.',about:'Учусь слушать людей, выращиваю растения и собираю необычные открытки. Мой идеальный выходной — случайная прогулка.',interests:['Социология','Растения','Фото','Прогулки'],color:'#6c928b'}
  ];
  const DEFAULT = {page:'home',cursor:0,active:null,messages:[],profile:{name:'',age:'',faculty:'',year:'',about:'',quote:'',interests:'',accent:'lime',background:'cosmic',layout:'cover',font:'default',photo:''}};
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const urlIsDataPhoto = v => typeof v==='string' && /^data:image\/(jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(v) && v.length<1000000;
  function load(){
    try{
      const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
      if(!saved||typeof saved!=='object')return structuredClone(DEFAULT);
      const p=saved.profile&&typeof saved.profile==='object'?saved.profile:{};
      const n={...structuredClone(DEFAULT),...saved,profile:{...DEFAULT.profile,...p}};
      if(!Number.isInteger(n.cursor)||n.cursor<0||n.cursor>faces.length)n.cursor=0;
      if(!faces.some(f=>f.id===n.active))n.active=null;
      if(!PAGES.includes(n.page))n.page='home';
      if(!Array.isArray(n.messages))n.messages=[];
      n.messages=n.messages.slice(-80).filter(m=>m&&typeof m.text==='string').map(m=>({text:m.text.slice(0,1000),time:String(m.time||'').slice(0,12)}));
      n.profile.photo=urlIsDataPhoto(n.profile.photo)?n.profile.photo:'';
      return n;
    }catch{return structuredClone(DEFAULT);}
  }
  let state=load();
  let modal=null;
  let serial=0;
  const save=()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch{notify('Браузеру не хватило места для сохранения. Попробуй удалить фото.');return false;}};
  let toastTimer;
  function notify(msg){document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.textContent=msg;document.body.append(el);clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.remove(),3600);}
  const currentFace=()=>faces[state.cursor]||null;
  const activeFace=()=>faces.find(x=>x.id===state.active)||null;
  function route(page){
    if(!PAGES.includes(page))page='home';
    state.page=page;modal=null;save();
    history.replaceState(null,'',`#${page}`);render();window.scrollTo({top:0,behavior:'instant'});
  }
  function navButton(page,label,name,mobile=false){
    const active=state.page===page;
    let ico=name==='morph'?`<span class="morph-icon ${state.active?'is-chat':''}">${icon('heart','icon-search')}${icon('chat','icon-chat')}</span>`:icon(name);
    return `<button type="button" class="${mobile?'':'side-link '}${active?'active':''}" data-action="nav" data-page="${page}" aria-current="${active?'page':'false'}">${ico}<span class="label">${esc(label)}</span></button>`;
  }
  function shell(content){
    const oneLabel=state.active?'OneLove · Чат':'OneLove · Анкеты';
    const pageLabel={home:'Открытие',discover:oneLabel,studio:'Моя анкета',events:'Встречи',about:'О проекте'}[state.page];
    const menu=`${navButton('home','Открытие','compass')}${navButton('discover',oneLabel,'morph')}${navButton('studio','Моя анкета','user')}${navButton('events','Встречи','calendar')}${navButton('about','Как это работает','info')}`;
    return `<div class="app-shell"><aside class="sidebar"><a href="#home" class="brand" data-action="nav" data-page="home"><span class="brand-mark">s<i>✳</i></span><span class="brand-copy"><span class="brand-name">свои.</span><span class="brand-caption">В ВЫШКЕ / MOSCOW</span></span></a><div class="nav-title">ТВОЁ ПРОСТРАНСТВО</div><nav class="side-links" aria-label="Основная навигация">${menu}</nav><div class="side-bottom"><button class="sidebar-note" data-action="nav" data-page="about"><span class="asterisk">✳</span><span><b>Как работают «Свои»</b><small>Один человек. Один выбор.</small></span>${icon('arrow')}</button><div class="sidebar-status"><span class="status-dot"></span><span>ПУБЛИЧНОЕ ДЕМО · NOVA</span></div></div></aside><div class="workarea"><header class="topbar"><div class="topbar-meta"><span class="status-dot"></span><b>СВОИ / МОСКВА</b><span class="top-divider"></span><span class="crumb">${esc(pageLabel)}</span></div><div class="top-actions"><span class="clock-label">ONELOVE · ONE CONNECTION</span><span class="demo-tag">Демонстрация</span></div></header><main id="main-content" class="page">${content}${footer()}</main></div><nav class="mobile-nav" aria-label="Мобильная навигация">${navButton('home','Главная','compass',true)}${navButton('discover',state.active?'Чат':'Анкеты','morph',true)}${navButton('studio','Моя анкета','user',true)}${navButton('events','Встречи','calendar',true)}</nav></div>${modalView()}`;
  }
  function footer(){return `<footer class="footer"><span>© СВОИ / 2026 · НЕЗАВИСИМЫЙ ПРОЕКТ</span><span>ЭТО ДЕМО · ДАННЫЕ ТОЛЬКО В БРАУЗЕРЕ</span></footer>`;}
  function notice(title='Это демонстрация',detail='Здесь можно проверить дизайн и механику OneLove. Реальных аккаунтов, подбора и отправки сообщений другим людям в GitHub Pages нет.'){
    return `<div class="notice">${icon('info')}<div><strong>${esc(title)}</strong>${esc(detail)}</div></div>`;
  }
  function home(){return `<div class="hero-grid"><section><div class="eyebrow">ЗНАКОМСТВА В ВЫШКЕ · ONELOVE</div><h1 class="hero-title">Нравится<br>кто-то <em>один.</em></h1><p class="lead">Знакомства без бесконечной ленты. Ты видишь одного человека, принимаешь решение и отдаёшь разговору своё внимание.</p><div class="btn-row" style="margin-top:32px"><button class="btn btn-primary btn-large" data-action="nav" data-page="discover">Попробовать OneLove ${icon('arrow')}</button><button class="btn btn-outline btn-large" data-action="nav" data-page="studio">Создать анкету ${icon('user')}</button></div><div class="top-rule fine"><b class="text-lime">Важное уточнение.</b> Это открытая версия-превью. Действия сохраняются только на этом устройстве, реальных знакомств пока нет.</div></section><section class="hero-visual" aria-label="Демонстрационная карточка"><div class="orb orb-a"></div><div class="orb orb-b"></div><div class="hero-card"><img src="assets/images/sonya_demo.webp" alt="Вымышленная тестовая анкета Сони" decoding="async" fetchpriority="high"><div class="hero-card-label"><span class="signature">ONE PERSON · ONE CHOICE</span><strong>Соня, 19</strong><p>Одна рекомендация вместо ленты.</p></div><div class="float-stamp"><strong>NO ENDLESS SWIPING</strong><small>Либо дальше, либо один разговор.</small></div><div class="float-bloom" aria-hidden="true">✳</div></div></section></div><div class="intro-features"><article class="feature"><div class="feature-number">01 / ВЫБОР</div><strong>Один человек.</strong><span>На экране только одна анкета. Никакого каталога из сотен лиц.</span></article><article class="feature"><div class="feature-number">02 / ДИАЛОГ</div><strong>Одно общение.</strong><span>Выбрал человека — OneLove превращается в единственный чат.</span></article><article class="feature"><div class="feature-number">03 / ОСОЗНАННОСТЬ</div><strong>Без запасных.</strong><span>Другие анкеты вернутся только после завершения текущего знакомства.</span></article></div>`;}
  function discover(){
    if(state.active)return chat();
    const face=currentFace();
    let top=`<div class="section-head"><div><div class="eyebrow">ONELOVE / ОДИН ЧЕЛОВЕК ЗА РАЗ</div><h2>Твой следующий<br>знакомый человек.</h2><p>Сейчас — одна анкета. Отклоняешь — появляется следующая. Нравится — открывается один разговор.</p></div><div class="step-counter">${String(Math.min(state.cursor+1,faces.length)).padStart(2,'0')} / ${faces.length}</div></div>`;
    if(!face)return top+`<div class="panel empty-card"><div class="empty-symbol">✳</div><h3>Ты просмотрел все десять.</h3><p class="lead" style="margin:0 auto 22px">Это вымышленные анкеты для проверки сценария. Можно начать новый демоцикл.</p><button class="btn btn-primary" data-action="reset-candidates">Повторить демо ${icon('arrow')}</button></div><div style="margin-top:22px">${notice()}</div>`;
    const image=face.photo?`<img src="${esc(face.photo)}" alt="Демо-портрет: ${esc(face.name)}" decoding="async">`:`<div class="cover-letters" aria-hidden="true">${esc(face.name[0])}</div>`;
    return top+`<section class="panel person-stage" aria-label="Текущая демонстрационная анкета"><div class="person-cover" style="background:linear-gradient(145deg,${face.color},#292c55 68%,#272340)">${image}<div class="cover-top"><span class="pill">✳ Анкета из демо</span><span class="pill">${String(state.cursor+1).padStart(2,'0')} / 10</span></div><div class="cover-bottom"><div class="eyebrow">МОСКВА · СТУДЕНЧЕСКОЕ ЗНАКОМСТВО</div><h3>${esc(face.name)}, ${face.age}</h3><p>${esc(face.faculty)} · ${face.year} курс</p></div></div><div class="person-detail"><div class="detail-caption">Знакомься</div><h3>«${esc(face.quote)}»</h3><p class="about">${esc(face.about)}</p><div class="detail-sub">ЕЁ ИНТЕРЕСЫ</div><div class="chips">${face.interests.map(s=>`<span class="chip">${esc(s)}</span>`).join('')}</div><div class="person-actions"><div class="btn-row"><button class="btn btn-outline btn-large" data-action="decline">Не моё ${icon('x')}</button><button class="btn btn-primary btn-large" data-action="like">Выбрать ${icon('heart')}</button></div><div class="progress-track" role="progressbar" aria-label="Просмотренные демо-анкеты" aria-valuenow="${state.cursor}" aria-valuemax="${faces.length}"><div style="width:${state.cursor/faces.length*100}%"></div></div><p class="micro" style="margin:15px 0 0">После выбора другие анкеты закроются. Вернуться к ним можно только завершив этот диалог.</p></div></div></section><div style="margin-top:22px">${notice()}</div>`;
  }
  function chat(){
    const face=activeFace();if(!face){state.active=null;save();return discover();}
    const messages=state.messages.map(m=>`<div class="message">${esc(m.text)}<small>${esc(m.time)}</small></div>`).join('');
    return `<div class="eyebrow">ONELOVE / ТВОЙ ЕДИНСТВЕННЫЙ ДИАЛОГ</div><div class="section-head"><div><h2>Только вы двое.</h2><p>Ты выбрал ${esc(face.name)}. Пока этот разговор активен, другие анкеты недоступны.</p></div></div><div class="notice" style="margin-bottom:24px">${icon('shield')}<div><strong>Другие анкеты закрыты</strong>Это локальная имитация чата. Сообщения не отправляются ${esc(face.name)} или другим пользователям.</div></div><section class="panel chat-panel" aria-label="Демонстрационный чат"><div class="chat-top"><div class="chat-person"><div class="mini-avatar" aria-hidden="true">${esc(face.name[0])}</div><div><b>${esc(face.name)}</b><small>Демо-собеседник · ${esc(face.faculty)}</small></div></div><button class="btn btn-danger" data-action="show-end" aria-label="Завершить этот разговор">${icon('x')}<span>Завершить</span></button></div><div class="chat-body" id="chat-body">${messages || `<div class="chat-welcome"><div class="empty-symbol">✳</div><h3>Начни разговор.</h3><p>Это интерактивный пример интерфейса. Здесь остаются только твои сообщения.</p></div>`}</div><form id="message-form" class="chat-compose"><input type="text" name="message" id="message-input" aria-label="Сообщение" maxlength="1000" autocomplete="off" placeholder="Попробуй написать сообщение…"><button class="btn btn-primary" type="submit">Отправить ${icon('arrow')}</button></form><div class="chat-disclaimer">Демо: текст сохраняется только в этом браузере. Другой человек его не получит.</div></section>`;
  }
  function profileCard(){
    const p=state.profile;
    const accent=SKINS[p.accent]||SKINS.lime;
    const bg=BACKGROUNDS[p.background]||BACKGROUNDS.cosmic;
    const layout=['cover','magazine','poster'].includes(p.layout)?p.layout:'cover';
    const font=['default','serif','mono','rounded'].includes(p.font)?p.font:'default';
    const name=esc(String(p.name||'Твоё имя').trim().slice(0,60));
    const age=String(p.age||'—');
    const faculty=esc(String(p.faculty||'Факультет').slice(0,80));
    const year=p.year?` · ${esc(String(p.year))} курс`:'';
    const quote=esc(String(p.quote||'Твоя история начинается с тебя.').slice(0,300));
    const about=esc(String(p.about||'Расскажи о себе: что ценишь, чем увлекаешься и что тебе важно в общении.').slice(0,1000));
    const tags=String(p.interests||'').split(',').map(x=>x.trim()).filter(Boolean).slice(0,7);
    const photo=urlIsDataPhoto(p.photo)?`<img src="${p.photo}" alt="Твоё загруженное фото">`:`<div class="bg-glyph" aria-hidden="true">✳</div>`;
    return `<article class="profile-art ${layout} font-${font}" style="--pa:${accent};--pb:${bg}"><div class="profile-cover">${photo}<span class="photo-hint">СВОИ / ЛИЧНАЯ АНКЕТА</span></div><div class="profile-body"><h3>${name}, ${esc(age)}</h3><div class="profile-info">${faculty}${year}</div><p class="profile-quote">«${quote}»</p><p class="profile-desc">${about}</p><div class="profile-stats">${tags.length?tags.map(t=>`<span>${esc(t)}</span>`).join(''):'<span>Твои интересы</span>'}</div></div></article>`;
  }
  function studio(){
    const p=state.profile;
    const field=(key,label,placeholder,textarea=false)=>`<div class="field"><label for="profile-${key}">${label}</label>${textarea?`<textarea id="profile-${key}" data-profile="${key}" placeholder="${esc(placeholder)}">${esc(p[key])}</textarea>`:`<input id="profile-${key}" data-profile="${key}" value="${esc(p[key])}" placeholder="${esc(placeholder)}" maxlength="${key==='name'?60:130}">`}</div>`;
    const accents=Object.entries(SKINS).map(([k,col])=>`<button class="swatch ${p.accent===k?'is-selected':''}" style="--sw:${col}" data-action="accent" data-value="${k}" aria-label="Цвет ${k}" aria-pressed="${p.accent===k}"></button>`).join('');
    const bgs=Object.entries(BACKGROUNDS).map(([k,val])=>`<button class="theme-btn ${p.background===k?'selected':''}" data-action="background" data-value="${k}" style="--theme:${val}" aria-pressed="${p.background===k}">${BG_LABELS[k]}</button>`).join('');
    const layouts={cover:'Обложка',magazine:'Журнал',poster:'Постер'};
    const layoutButtons=Object.entries(layouts).map(([k,v])=>`<button class="layout-btn ${p.layout===k?'selected':''}" data-action="layout" data-value="${k}" aria-pressed="${p.layout===k}">${v}</button>`).join('');
    const fontButtons={default:'Современный',serif:'Контрастный',mono:'Моно',rounded:'Мягкий'};
    const fonts=Object.entries(fontButtons).map(([k,v])=>`<button class="layout-btn ${p.font===k?'selected':''}" data-action="font" data-value="${k}" aria-pressed="${p.font===k}">${v}</button>`).join('');
    return `<div class="eyebrow">МОЯ АНКЕТА / LIVE PREVIEW</div><h2>Собери себя<br>по-своему.</h2><p class="lead">Не заполняй безликую форму — создавай то, что человек увидит первым. Все изменения появятся на карточке сразу.</p><div class="studio"><section class="panel editor"><h3 style="font-size:25px">Твоя история</h3><div class="field-grid">${field('name','Как тебя зовут','Например, Слава')}${field('age','Возраст','18')}</div><div class="field-grid">${field('faculty','Факультет','Например, ФКН')}${field('year','Курс','Например, 2')}</div>${field('quote','Одна фраза о тебе','Что хотелось бы сказать первым?',true)}${field('about','Расскажи о себе','Интересы, привычки, как проводишь свободное время…',true)}${field('interests','Интересы через запятую','Музыка, искусство, прогулки',true)}<div class="studio-group"><h3>Твоё фото</h3><label class="photo-input">${icon('upload')} Выбрать фотографию (только на этом устройстве)<input id="photo-input" type="file" accept="image/jpeg,image/png,image/webp" aria-label="Загрузить своё фото"></label><div class="micro" style="margin-top:9px">Фото уменьшится для быстрого предпросмотра. На сервер оно не передаётся.</div>${p.photo?`<button class="btn btn-ghost" data-action="remove-photo" style="margin-top:11px">Убрать фото ${icon('x')}</button>`:''}</div><div class="studio-group"><h3>Цвет</h3><div class="swatches">${accents}</div></div><div class="studio-group"><h3>Фон</h3><div class="theme-grid">${bgs}</div></div><div class="studio-group"><h3>Композиция</h3><div class="layout-grid">${layoutButtons}</div></div><div class="studio-group"><h3>Типографика</h3><div class="layout-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">${fonts}</div></div></section><aside class="sticky-preview"><div class="preview-head"><strong>${icon('eye')} Как другие увидят тебя</strong><span>ПРЕДПРОСМОТР</span></div><div id="profile-preview">${profileCard()}</div><div class="save-indicator" id="save-status">Сохранено в этом браузере</div>${notice('Демо-профиль', 'Карточка хранится на этом устройстве и не видна другим посетителям. Не указывай здесь личные контакты.')}</aside></div>`;
  }
  const eventData=[
    {id:1,title:'Прогулка без плана',desc:'Небольшой маршрут по Москве и разговоры без формальностей.',tag:'Пример формата',symbol:'↗',bg:'linear-gradient(125deg,#6a558d,#293864)'},
    {id:2,title:'Кино после пар',desc:'Смотрим хорошую картину и обсуждаем её за столиком.',tag:'Пример формата',symbol:'✳',bg:'linear-gradient(130deg,#4a6b8e,#302c67)'},
    {id:3,title:'Вечер знакомств',desc:'Живое пространство, где знакомиться легче, чем писать первым.',tag:'Пример формата',symbol:'◌',bg:'linear-gradient(130deg,#725082,#494060)'}
  ];
  function events(){return `<div class="eyebrow">СВОИ / ВСТРЕЧИ</div><h2>Из чата —<br>в настоящую жизнь.</h2><p class="lead">Здесь могут появиться студенческие встречи. Пока мы показываем варианты форматов, а не объявляем реальные события.</p><div class="events-grid" style="margin-top:27px">${eventData.map(e=>`<article class="panel event"><div class="event-art" style="--ev-bg:${e.bg}">${e.symbol}<small>${esc(e.tag)}</small></div><div class="event-content"><h3>${esc(e.title)}</h3><p>${esc(e.desc)}</p><button class="btn btn-outline" data-action="event" data-value="${e.id}">Подробнее ${icon('arrow')}</button></div></article>`).join('')}</div><div style="margin-top:24px">${notice('Встречи ещё не запущены','В этом статическом демо нельзя зарегистрироваться на мероприятие. Не считай карточки действующими анонсами.')}</div>`;}
  function about(){return `<div class="eyebrow">ИДЕЯ / ONELOVE</div><h2>Меньше выбора.<br>Больше внимания.</h2><p class="lead">Обычные приложения превращают знакомство в бесконечный просмотр. «Свои» предлагают более простой маршрут: один человек, одно решение, один разговор.</p><div class="info-rows"><article class="panel"><div class="feature-number">01 / АНКЕТА</div><h3>Сначала расскажи о себе.</h3><p>Развёрнутая история и визуальная карточка, которую ты создаёшь самостоятельно.</p></article><article class="panel"><div class="feature-number">02 / ВЫБОР</div><h3>Смотри одного человека.</h3><p>Отклоняй и переходи дальше или выбирай человека и останавливай подбор.</p></article><article class="panel"><div class="feature-number">03 / РАЗГОВОР</div><h3>Никаких запасных диалогов.</h3><p>Когда начинаешь один разговор, новые анкеты недоступны до его завершения.</p></article><article class="panel"><div class="feature-number">04 / ЖИВАЯ ВСТРЕЧА</div><h3>Сайт — только начало.</h3><p>Настоящая цель — дать повод пообщаться в жизни, а не удержать человека в приложении.</p></article></div><div class="panel panel-pad" style="margin-top:24px"><div class="eyebrow">ЧТО РАБОТАЕТ В ПУБЛИЧНОМ ДЕМО</div><h3 style="margin:14px 0">Честно о возможностях</h3><p class="text-muted">Эта версия открывается с любого устройства через GitHub Pages. Можно просматривать десять вымышленных анкет, сохранять изменения собственной карточки, проверять переключение OneLove в чат, писать локальные тестовые сообщения и завершать диалог с подтверждением.</p><p class="text-muted">Но GitHub Pages не выполняет сервер. Поэтому зарегистрироваться для общения с реальными людьми, получить сообщения на другом устройстве или участвовать в настоящих встречах здесь нельзя. Для этого потребуется отдельный сервер и база данных. При очистке памяти браузера демоданные исчезнут.</p><button class="btn btn-primary" data-action="nav" data-page="discover">Открыть OneLove ${icon('arrow')}</button></div>`;}
  function modalView(){if(!modal)return '';
    if(modal==='end')return `<div class="modal-shade" data-action="outside"><div role="dialog" aria-modal="true" aria-labelledby="modal-title" class="modal"><div class="eyebrow">ONELOVE / ЗАВЕРШЕНИЕ</div><h3 id="modal-title">Закончить этот разговор?</h3><p>После завершения переписка в демо удалится, а OneLove снова откроет анкеты. Это действие нельзя отменить.</p><div class="btn-row"><button class="btn btn-outline" data-action="cancel-modal">Остаться</button><button class="btn btn-danger" data-action="end">Да, завершить ${icon('x')}</button></div></div></div>`;
    if(modal.startsWith('event:')){
      const e=eventData.find(x=>x.id===Number(modal.split(':')[1]));
      return `<div class="modal-shade" data-action="outside"><div role="dialog" aria-modal="true" aria-labelledby="modal-title" class="modal"><div class="eyebrow">ВСТРЕЧИ / ИДЕЯ</div><h3 id="modal-title">${esc(e?.title||'Событие')}</h3><p>${esc(e?.desc||'')} Это образец будущего мероприятия, не реальный анонс. У него пока нет даты и регистрации.</p><div class="btn-row"><button class="btn btn-primary" data-action="cancel-modal">Понятно ${icon('check')}</button></div></div></div>`;
    }return '';
  }
  function render(){
    document.getElementById('app').innerHTML=shell(({home,discover,studio,events,about}[state.page]||home)());
    if(state.page==='discover'&&state.active){const chatBody=document.getElementById('chat-body');if(chatBody)chatBody.scrollTop=chatBody.scrollHeight;}
  }
  function redrawProfilePreview(){const el=document.getElementById('profile-preview');if(el)el.innerHTML=profileCard();const saved=document.getElementById('save-status');if(saved)saved.textContent='Сохранено в этом браузере';}
  function closeModal(){modal=null;render();}
  function onClick(e){
    const node=e.target.closest('[data-action]');if(!node)return;
    if(node.matches('a'))e.preventDefault();
    const a=node.dataset.action;
    if(a==='nav'){route(node.dataset.page);return;}
    if(a==='decline'&&!state.active){state.cursor=Math.min(state.cursor+1,faces.length);save();render();return;}
    if(a==='like'&&!state.active){
      const candidate=currentFace();if(!candidate)return;
      state.active=candidate.id;state.messages=[];save();
      document.querySelectorAll('.morph-icon').forEach(el=>el.classList.add('is-chat'));
      node.classList.add('beating');setTimeout(()=>{render();notify('OneLove открыт. Другие анкеты теперь закрыты.');},510);
      return;
    }
    if(a==='reset-candidates'&&!state.active){state.cursor=0;save();render();return;}
    if(a==='show-end'&&state.active){modal='end';render();document.querySelector('.modal [data-action="cancel-modal"]')?.focus();return;}
    if(a==='end'&&state.active){state.active=null;state.messages=[];state.cursor=Math.min(state.cursor+1,faces.length);modal=null;save();render();notify('Разговор завершён. Можно смотреть следующие анкеты.');return;}
    if(a==='cancel-modal'){closeModal();return;}
    if(a==='outside'&&e.target===node){closeModal();return;}
    if(a==='event'){modal=`event:${node.dataset.value}`;render();return;}
    if(a==='remove-photo'){state.profile.photo='';save();render();return;}
    if(['accent','background','layout','font'].includes(a)){
      const key=a==='accent'?'accent':a;
      const allowed=a==='accent'?SKINS:a==='background'?BACKGROUNDS:a==='layout'?{cover:1,magazine:1,poster:1}:{default:1,serif:1,mono:1,rounded:1};
      if(Object.hasOwn(allowed,node.dataset.value)){state.profile[key]=node.dataset.value;save();const y=window.scrollY;render();window.scrollTo(0,y);}return;
    }
  }
  function onInput(e){const key=e.target.dataset.profile;if(!key||!Object.hasOwn(DEFAULT.profile,key))return;const value=e.target.value;
    state.profile[key]=value.slice(0,key==='about'?1000:key==='quote'?300:key==='interests'?300:100);
    save();redrawProfilePreview();
  }
  function onSubmit(e){if(e.target.id!=='message-form')return;e.preventDefault();if(!state.active)return;
    const input=e.target.elements.message;const value=String(input.value||'').trim().slice(0,1000);if(!value)return;
    state.messages.push({text:value,time:new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})});state.messages=state.messages.slice(-80);save();render();document.getElementById('message-input')?.focus();
  }
  function onKeydown(e){if(e.key==='Escape'&&modal)closeModal();}
  async function onPhoto(e){if(e.target.id!=='photo-input')return;
    const file=e.target.files?.[0];if(!file)return;
    if(!/^image\/(jpeg|png|webp)$/.test(file.type)||file.size>5*1024*1024){notify('Нужно изображение JPG, PNG или WebP до 5 МБ.');return;}
    const objectUrl=URL.createObjectURL(file);
    try{
      const img=new Image();img.src=objectUrl;await img.decode();
      const max=760,ratio=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
      const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*ratio));canvas.height=Math.max(1,Math.round(img.naturalHeight*ratio));
      const ctx=canvas.getContext('2d');if(!ctx)throw new Error('canvas');ctx.drawImage(img,0,0,canvas.width,canvas.height);
      const data=canvas.toDataURL('image/jpeg',.69);if(data.length>960000){notify('Фото слишком большое для памяти браузера. Выбери другое.');return;}
      state.profile.photo=data;if(!save()){state.profile.photo='';return;}render();notify('Фото сохранено в браузере.');
    }catch{notify('Не удалось прочитать фото. Попробуй другое изображение.');}finally{URL.revokeObjectURL(objectUrl);}
  }
  const initialHash=location.hash.slice(1);
  if(PAGES.includes(initialHash))state.page=initialHash;
  document.addEventListener('click',onClick);
  document.addEventListener('input',onInput);
  document.addEventListener('submit',onSubmit);
  document.addEventListener('keydown',onKeydown);
  document.addEventListener('change',onPhoto);
  addEventListener('hashchange',()=>{const page=location.hash.slice(1);if(PAGES.includes(page)&&page!==state.page){state.page=page;save();render();}});
  render();
  window.__svoiDemoTest={getState:()=>({page:state.page,cursor:state.cursor,active:state.active,profile:{...state.profile,photo:Boolean(state.profile.photo)},messages:state.messages.map(x=>({...x}))}),reset:()=>{localStorage.removeItem(STORAGE_KEY);state=structuredClone(DEFAULT);modal=null;render();}};
})();

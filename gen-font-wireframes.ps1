$basePath = "C:\Users\ann_drooid\Desktop\Kurs-Claude-Code\legal-projekt\context"

# num, heading name, body name, heading GF param, body GF param, heading weight
$pairs = @(
  @("1","Roboto Condensed","Cabin","Roboto+Condensed:wght@300;400;700","Cabin:wght@400;500;600","700"),
  @("2","Raleway","Open Sans","Raleway:wght@300;400;500;600;700","Open+Sans:wght@300;400;500;600","300"),
  @("3","Playfair Display","Source Sans 3","Playfair+Display:ital,wght@0,400;0,700;1,700","Source+Sans+3:wght@300;400;500;600","700"),
  @("4","Roboto","Lora","Roboto:wght@300;400;500;700","Lora:wght@400;500;600;700","700"),
  @("5","Abril Fatface","Poppins","Abril+Fatface","Poppins:wght@300;400;500;600","400"),
  @("6","Ruda","Roboto Slab","Ruda:wght@400;500;600;700","Roboto+Slab:wght@300;400;500;700","400"),
  @("7","Cormorant Garamond","Fira Sans","Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700","Fira+Sans:wght@300;400;500;600","700"),
  @("8","PT Sans","Playfair Display","PT+Sans:wght@400;700","Playfair+Display:wght@400;500;600;700","700"),
  @("9","Roboto","Cambo","Roboto:wght@300;400;500;700","Cambo","300"),
  @("10","Oxygen","Noto Serif","Oxygen:wght@300;400;700","Noto+Serif:wght@400;500;600;700","300"),
  @("11","Arvo","Lato","Arvo:wght@400;700","Lato:wght@300;400;700","400"),
  @("12","Lato","Catamaran","Lato:ital,wght@0,300;0,400;0,700;1,400","Catamaran:wght@300;400;500;600","400"),
  @("13","Merriweather","Mulish","Merriweather:wght@300;400;700","Mulish:wght@300;400;500;600","400"),
  @("14","PT Sans","Bitter","PT+Sans:ital,wght@0,400;0,700;1,400","Bitter:wght@300;400;500;600","400"),
  @("15","Cinzel","Fauna One","Cinzel:wght@400;600;700","Fauna+One","700"),
  @("16","Old Standard TT","Rubik","Old+Standard+TT:ital,wght@0,400;0,700;1,400","Rubik:wght@300;400;500;600","400"),
  @("17","Work Sans","Open Sans","Work+Sans:wght@300;400;500;600;700","Open+Sans:wght@300;400;500;600","300"),
  @("18","Questrial","Alegreya","Questrial","Alegreya:ital,wght@0,400;0,500;0,700;1,400","400"),
  @("19","Oswald","Quattrocento","Oswald:wght@300;400;500;600;700","Quattrocento:wght@400;700","400"),
  @("20","Nunito","PT Sans","Nunito:wght@300;400;500;600;700","PT+Sans:wght@400;700","300"),
  @("21","Unica One","Crimson Text","Unica+One","Crimson+Text:ital,wght@0,400;0,600;1,400","400"),
  @("22","Julius Sans One","Monda","Julius+Sans+One","Monda:wght@400;700","400"),
  @("23","Varela Round","Noto Serif","Varela+Round","Noto+Serif:wght@400;500;600;700","400"),
  @("24","Vollkorn","Raleway","Vollkorn:ital,wght@0,400;0,700;1,400;1,700","Raleway:wght@300;400;500;600","400"),
  @("25","Ovo","Quattrocento Sans","Ovo","Quattrocento+Sans:ital,wght@0,400;0,700;1,400","400"),
  @("26","Permanent Marker","Overpass","Permanent+Marker","Overpass:wght@300;400;500;600","400"),
  @("27","Ubuntu","Open Sans","Ubuntu:wght@300;400;500;700","Open+Sans:wght@300;400;500;600","700"),
  @("28","Source Sans 3","Sintony","Source+Sans+3:wght@400;500;600;700;900","Sintony:wght@400;700","900"),
  @("29","Slabo 27px","Lato","Slabo+27px","Lato:wght@300;400;700","400"),
  @("30","Rufina","PT Serif","Rufina:wght@400;700","PT+Serif:ital,wght@0,400;0,700;1,400","700"),
  @("31","Dosis","Titillium Web","Dosis:wght@300;400;500;600;700","Titillium+Web:wght@300;400;600;700","400"),
  @("32","Oswald","Esteban","Oswald:wght@300;400;500;600;700","Esteban","300"),
  @("33","Playfair Display","Source Sans 3","Playfair+Display:wght@400;500;600;700;900","Source+Sans+3:wght@300;400;500;600","900"),
  @("34","Libre Baskerville","Nunito","Libre+Baskerville:ital,wght@0,400;0,700;1,400","Nunito:wght@300;400;500;600","700"),
  @("35","Catamaran","Merriweather Sans","Catamaran:wght@300;400;500;600;700","Merriweather+Sans:wght@300;400;500;600;700","600"),
  @("36","Bree Serif","Alegreya","Bree+Serif","Alegreya:ital,wght@0,400;0,500;0,700;1,400","400"),
  @("37","Cardo","Libre Franklin","Cardo:ital,wght@0,400;0,700;1,400","Libre+Franklin:wght@300;400;500;600","400"),
  @("38","Istok Web","Average","Istok+Web:ital,wght@0,400;0,700;1,400","Average","400"),
  @("39","Roboto","Libre Baskerville","Roboto:wght@300;400;500;700","Libre+Baskerville:ital,wght@0,400;0,700;1,400","500"),
  @("40","Goudy Bookletter 1911","Average Sans","Goudy+Bookletter+1911","Average+Sans","400"),
  @("41","Alfa Slab One","Gentium Book Plus","Alfa+Slab+One","Gentium+Book+Plus:ital,wght@0,400;0,700;1,400","400"),
  @("42","Raleway","Frank Ruhl Libre","Raleway:wght@300;400;500;600;700","Frank+Ruhl+Libre:wght@300;400;500;700","300"),
  @("43","Prata","Lato","Prata","Lato:wght@300;400;700","400"),
  @("44","Shrikhand","Fanwood Text","Shrikhand","Fanwood+Text","400"),
  @("45","Eczar","Merriweather","Eczar:wght@400;500;600;700","Merriweather:wght@300;400;700","600"),
  @("46","Chivo","Crimson Text","Chivo:wght@300;400;500;600;700","Crimson+Text:ital,wght@0,400;0,600;1,400","300"),
  @("47","Patua One","Maven Pro","Patua+One","Maven+Pro:wght@400;500;600;700","400"),
  @("48","Rubik","Karla","Rubik:wght@300;400;500;600;700","Karla:wght@300;400;500;600;700","400"),
  @("49","Neuton","Work Sans","Neuton:ital,wght@0,400;0,700;1,400","Work+Sans:wght@300;400;500;600","400"),
  @("50","Anton","Signika","Anton","Signika:wght@300;400;500;600;700","400")
)

$tpl = @'
<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>XLABELX -- BLSK Legal</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="XHREFX" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:16px;scroll-behavior:smooth}
body{font-family:XBFX,sans-serif;background:#fff;color:#333333;font-size:1.125rem;font-weight:400;line-height:1.65;-webkit-font-smoothing:antialiased}
:root{--crimson:#8C0002;--dark:#333333;--navy:#1a2440;--border:#e8e8e8;--text-muted:#1a2440}
.wrap{max-width:1600px;margin:0 auto;padding:0 3rem}
.h2-sec{font-family:XHFX,serif;font-size:clamp(2.25rem,4vw,4rem);font-weight:XHWX;color:var(--navy);letter-spacing:-.035em;line-height:1.08}
.lead{font-size:clamp(1rem,1.3vw,1.375rem);color:var(--text-muted);line-height:1.7}
.label{font-family:XHFX,sans-serif;font-size:1.2rem;font-weight:300;letter-spacing:.14em;color:var(--crimson);display:block;margin-bottom:.75rem;opacity:.7}
nav.topnav{position:fixed;top:0;left:0;right:0;z-index:200;background:#fff;box-shadow:0 1px 0 rgba(26,36,64,.3)}
.nav-inner{max-width:1600px;margin:0 auto;padding:2rem 3rem;display:flex;align-items:center;justify-content:space-between;gap:2rem}
.nav-logo-link{flex-shrink:0;text-decoration:none}
.nav-logo{width:100px;height:30px;background:#d8d8d8;border-radius:3px}
.nav-links{display:flex;gap:2.5rem;list-style:none;align-items:center;flex:1;justify-content:center}
.nav-links a{font-family:XHFX,sans-serif;font-size:1rem;font-weight:400;color:var(--navy);text-decoration:none;transition:color .2s}
.nav-links a.active{font-weight:600;color:var(--crimson)}
.nav-phone{flex-shrink:0;text-align:right}
.nav-phone-label{display:block;font-size:.6rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);line-height:1;margin-bottom:.2rem}
.nav-phone-num{display:block;font-size:1.05rem;font-weight:700;color:var(--crimson);text-decoration:none}
.page-header{margin-top:90px;background:#fff}
.page-header-inner{max-width:1600px;margin:0 auto;padding:10vw 3rem;display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start}
.ph-back{display:inline-flex;align-items:center;gap:.45rem;font-size:1.2rem;font-weight:300;color:var(--navy);text-decoration:none;margin-bottom:1.5rem;transition:color .2s}
.ph-back:hover{color:var(--crimson)}
.ph-title{font-family:XHFX,serif;font-size:clamp(3rem,7.5vw,6.5rem);font-weight:XHWX;color:var(--navy);letter-spacing:-.04em;line-height:1.02}
.ph-desc{font-size:clamp(1rem,1.3vw,1.375rem);color:var(--text-muted);line-height:1.7;max-width:580px}
.ph-tags{display:flex;gap:.9rem;flex-wrap:wrap;margin-top:2rem}
.ph-tag{display:inline-block;padding:.3rem 1.3rem;border-radius:1.4rem;font-size:.9rem;font-weight:400;background:rgba(26,36,64,.03);color:rgba(26,36,64,.8);border:1.5px solid rgba(26,36,64,.6)}
.nav-phone-num{display:block;font-size:2rem;font-weight:400;color:var(--crimson);text-decoration:none}
.services-section{padding:10vw 0;background:#1a2440}
.services-section .h2-sec{color:#fff;font-size:5rem}
.services-section .label{color:rgba(255,255,255,.35);opacity:1}
.services-list{margin-top:4rem}
.srv-divider{height:1px;background:rgba(255,255,255,.1)}
.service-row{display:grid;grid-template-columns:600px 1fr 48px;gap:4rem;align-items:center;padding:3.25rem 0}
.srv-num{font-family:XHFX,serif;font-size:2rem;font-weight:300;letter-spacing:.18em;color:rgba(255,255,255,.3);line-height:1;flex-shrink:0}
.service-row > div{display:flex;align-items:baseline;gap:.75rem}
.srv-title{font-family:XHFX,serif;font-size:2rem;font-weight:500;color:#fff;line-height:1.2;letter-spacing:-.01em}
.srv-desc{font-size:1rem;color:rgba(255,255,255,.7);line-height:1.78;max-width:600px}
.srv-circle{width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;flex-shrink:0;justify-self:end;color:rgba(255,255,255,.5);transition:transform .35s cubic-bezier(.25,.8,.25,1),border-color .2s;cursor:default}
.srv-circle .arr{display:block;width:16px;height:9px;font-size:0;position:relative}
.srv-circle .arr::before{content:'';position:absolute;top:50%;left:0;right:0;height:1px;background:currentColor;transform:translateY(-50%)}
.srv-circle .arr::after{content:'';position:absolute;top:50%;right:0;width:6px;height:6px;border-top:1px solid currentColor;border-right:1px solid currentColor;transform:translateY(-50%) rotate(45deg)}
.srv-circle:hover{transform:rotate(45deg);border-color:rgba(255,255,255,.5)}
.services-intro{margin-bottom:4rem;white-space:nowrap}
.row-between{display:flex;align-items:flex-end;justify-content:space-between;gap:2rem}
.kierunek-label{background:var(--crimson);color:#fff;font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;text-align:center;padding:.5rem 1rem}
@media(max-width:1200px){.nav-links{display:none}.page-header-inner{grid-template-columns:1fr;gap:3rem}.service-row{grid-template-columns:1fr 48px;gap:2rem}.srv-desc{display:none}}
@media(max-width:768px){.wrap,.page-header-inner{padding-left:1.5rem;padding-right:1.5rem}.page-header-inner{padding-top:5rem;padding-bottom:4rem}.service-row{padding:2.25rem 0}}
</style>
</head>
<body>
<div class="kierunek-label">XLABELX</div>
<nav class="topnav">
  <div class="nav-inner">
    <a href="wireframe-home.html" class="nav-logo-link"><div class="nav-logo"></div></a>
    <ul class="nav-links">
      <li><a href="wireframe-nasz-zespol.html">Nasz Zesp&oacute;&lstrok;</a></li>
      <li><a href="wireframe-life-sciences.html" class="active">Praktyki</a></li>
      <li><a href="wireframe-corpo-snap.html">Corpo Snap</a></li>
      <li><a href="wireframe-aktualnosci.html">Aktualno&#347;ci</a></li>
      <li><a href="wireframe-faq.html">FAQ</a></li>
      <li><a href="wireframe-kontakt.html">Kontakt</a></li>
    </ul>
    <div class="nav-phone">
      <span class="nav-phone-label">Zadzwo&#324; teraz</span>
      <a href="tel:+48224159800" class="nav-phone-num">+48 22 415 98 00</a>
    </div>
  </div>
</nav>
<div class="page-header">
  <div class="page-header-inner">
    <div>
      <a href="wireframe-home.html" class="ph-back">Praktyki</a>
      <h1 class="ph-title">Life Sciences</h1>
    </div>
    <div>
      <p class="ph-desc">Przek&#322;adamy z&#322;o&#380;one regulacje farmaceutyczne i &#380;ywno&#347;ciowe na praktyczne rozwi&#261;zania. Wspieramy klient&oacute;w na ka&#380;dym etapie dzia&#322;alno&#347;ci od planowania i uzyskiwania zezwole&#324; po certyfikacje i audyty.</p>
      <p class="ph-desc" style="margin-top:1.5rem">Identyfikujemy potencjalne ryzyka i skutecznie je minimalizujemy w codziennej dzia&#322;alno&#347;ci i w sytuacjach kryzysowych.</p>
      <div class="ph-tags">
        <span class="ph-tag">Produkty lecznicze</span>
        <span class="ph-tag">Suplementy diety</span>
        <span class="ph-tag">Audyty GMP</span>
        <span class="ph-tag">Rejestracja produkt&oacute;w</span>
        <span class="ph-tag">Prawo farmaceutyczne</span>
      </div>
    </div>
  </div>
</div>
<div class="services-section">
  <div class="wrap">
    <div class="services-intro">
      <div>
        <span class="label">Zakres us&#322;ug</span>
        <h2 class="h2-sec">Jak mo&#380;emy pom&oacute;c</h2>
      </div>
    </div>
    <div class="services-list">
      <div class="srv-divider"></div>
      <div class="service-row">
        <div><span class="srv-num">01</span><p class="srv-title">Doradztwo Strategiczne</p></div>
        <p class="srv-desc">Wsparcie w kr&oacute;tko- i d&#322;ugoterminowym planowaniu zarz&#261;dzania przedsi&#281;biorstwem i rozwojem produkt&oacute;w. Modele dystrybucji lek&oacute;w w Polsce i na rynkach globalnych.</p>
        <span class="srv-circle"><span class="arr"></span></span>
      </div>
      <div class="srv-divider"></div>
      <div class="service-row">
        <div><span class="srv-num">02</span><p class="srv-title">Analizy i Opinie Prawne</p></div>
        <p class="srv-desc">Szczeg&oacute;&#322;owe analizy legislacyjne i raporty dotycz&#261;ce praktyki organ&oacute;w regulacyjnych w Polsce. Opinie prawne analizuj&#261;ce regulacje na tle konkretnych stan&oacute;w faktycznych.</p>
        <span class="srv-circle"><span class="arr"></span></span>
      </div>
      <div class="srv-divider"></div>
      <div class="service-row">
        <div><span class="srv-num">03</span><p class="srv-title">Produkty Lecznicze</p></div>
        <p class="srv-desc">Doradztwo regulacyjne na ka&#380;dym etapie: badania kliniczne, procedury rejestracyjne, wprowadzenie do obrotu, zmiany porejestracyjne i monitoring compliance.</p>
        <span class="srv-circle"><span class="arr"></span></span>
      </div>
      <div class="srv-divider"></div>
      <div class="service-row">
        <div><span class="srv-num">04</span><p class="srv-title">Audyty GMP</p></div>
        <p class="srv-desc">Audyty jako&#347;ciowe w wytw&oacute;rniach farmaceutycznych i hurtowniach &mdash; w Polsce, UE, Azji i Ameryce P&oacute;&#322;nocnej. Przeprowadzane u klienta lub w jego imieniu u podwykonawc&oacute;w.</p>
        <span class="srv-circle"><span class="arr"></span></span>
      </div>
      <div class="srv-divider"></div>
      <div class="service-row">
        <div><span class="srv-num">05</span><p class="srv-title">Post&#281;powania Prawne</p></div>
        <p class="srv-desc">Reprezentacja klient&oacute;w w s&#261;dach administracyjnych i powszechnych. Sprawy dotycz&#261;ce dzia&#322;alno&#347;ci regulowanej, zezwole&#324;, licencji i post&#281;powaniach porejestracyjnych.</p>
        <span class="srv-circle"><span class="arr"></span></span>
      </div>
      <div class="srv-divider"></div>
      <div class="service-row">
        <div><span class="srv-num">06</span><p class="srv-title">&#379;ywno&#347;&#263; i Suplementy Diety</p></div>
        <p class="srv-desc">Wsparcie podmiot&oacute;w wprowadzaj&#261;cych &#380;ywno&#347;&#263; lub suplementy diety do obrotu. Przegl&#261;dy sk&#322;adu produkt&oacute;w i post&#281;powania przed organami inspekcji sanitarnej.</p>
        <span class="srv-circle"><span class="arr"></span></span>
      </div>
      <div class="srv-divider"></div>
    </div>
  </div>
</div>
</body>
</html>
'@

$enc = [System.Text.UTF8Encoding]::new($false)
$count = 0

foreach ($p in $pairs) {
    $num = $p[0]; $hName = $p[1]; $bName = $p[2]
    $hGF = $p[3];  $bGF = $p[4];  $hW = $p[5]

    $label = "Kierunek 6-$num -- $hName / $bName"
    $href  = "https://fonts.googleapis.com/css2?family=$hGF&family=$bGF&display=swap"

    $h = $tpl
    $h = $h.Replace('XLABELX',  $label)
    $h = $h.Replace('XHREFX',   $href)
    $h = $h.Replace('XHFX',     "'$hName'")
    $h = $h.Replace('XBFX',     "'$bName'")
    $h = $h.Replace('XHWX',     $hW)

    [System.IO.File]::WriteAllText("$basePath\wireframe-kierunek-nr6-$num.html", $h, $enc)
    $count++
}

Write-Host "Wygenerowano $count plikow."

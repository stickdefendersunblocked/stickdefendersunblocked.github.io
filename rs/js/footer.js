$(document).ready(function () {
        $(".icon-menu-mobile").on('click', function () {
                $(".mobile-dropdown").slideToggle();
        });

        const footer = document.querySelector('footer');
        if (footer && !footer.querySelector('.site-footer')) {
                footer.insertAdjacentHTML('afterbegin', `
        <div class="site-footer">
          <div class="footer-grid">
            <div class="footer-column">
              <a class="footer-logo" href="/">StickDefendersUnblocked</a>
              <p class="footer-text">Play classroom-safe browser games without downloads and discover new unblocked hits every week.</p>
            </div>
            <div class="footer-column">
              <h2>Popular Categories</h2>
              <ul>
                <li><a href="/categogy/New.html">New Releases</a></li>
                <li><a href="/categogy/Car.html">Racing Games</a></li>
                <li><a href="/categogy/Shotting.html">Shooting Games</a></li>
                <li><a href="/categogy/Sport.html">Sports Games</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h2>Player Resources</h2>
              <ul>
                <li><a href="/sitemap.xml">XML Sitemap</a></li>
                <li><a href="/sitemap.txt">Plain Sitemap</a></li>
                <li><a href="/robots.txt">Robots.txt</a></li>
                <li><a href="https://github.com/stickdefendersunblocked/stickdefendersunblocked.github.io/issues" target="_blank" rel="noopener">Request a Game</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h2>Stay Updated</h2>
              <p class="footer-text">Bookmark this hub or follow our GitHub project to get notified when new unblocked games go live.</p>
              <a class="footer-cta" href="https://github.com/stickdefendersunblocked/stickdefendersunblocked.github.io" target="_blank" rel="noopener">Follow on GitHub</a>
            </div>
          </div>
          <div class="footer-meta">
            <p>© 2025 StickDefendersUnblocked. Curated browser games for students and office breaks.</p>
          </div>
        </div>
        `);
        }
        async function logJSONData() {
                const response = await fetch("data/config.json");
                const jsonData = await response.json();
                renderHtmlConfig(jsonData);
	}
	// logJSONData();
})
function renderHtmlConfig(data = []) {
	if (!data.length) return;
	let html = "";
	for (let game of data) {
		html += '<div class="game-flex-item">';
		html += `<a class="flex-item" href="/${repository}/${game.slug}">`;
		html += `<img width="180" height="180" src="rs/imgs/${game.image}" title="${game.image}" alt="${game.image}">`
		html += `<div class="header-flex-item"><a class="text-overflow header-game-title" href="/${repository}/${game.slug}">${game.name}</a></div>`;
		html += '</a>';
		html += '</div>';
	}
	$("#ajax-append").html(html);
}
function theaterMode() {
	let iframe = document.querySelector("#iframehtml5");
	if (iframe.classList.contains("force_half_full_screen")) {
		iframe.classList.remove("force_half_full_screen");
		document.body.style.overflow = "unset";
		document.querySelector(".header-game").classList.remove("header_game_enable_half_full_screen");
		document.querySelector('body').setAttribute('style', '');
	} else {
		let above = 0;
		let left = 0;
		let below = document.querySelector(".header-game").clientHeight;
		let right = 0;
		// let width = window.innerWidth;
		// let height = window.innerHeight;
		if (!document.querySelector("#style-append")) {
			let styleElement = document.createElement("style");
			styleElement.type = "text/css";
			styleElement.setAttribute('id', "style-append");
			let cssCode = `
		.force_half_full_screen{
		position: fixed!important;
		top: 0!important;
		left: 0!important;
		z-index: 887;
		top:${above}px!important;
		left:${left}px!important;
		width:calc(100% - ${left}px)!important;
		height:calc(100% - ${above + below}px)!important;
		background-color:#000;
		}
		.header_game_enable_half_full_screen{
			position:fixed;
			left:${left}px!important;
			bottom:0!important;
			right:0!important;
			z-index:887!important;
			width:calc(100% - ${left}px)!important;
			padding-left:10px;
			padding-right:10px;
		}
		@media (max-width: 1364px){
			.force_half_full_screen{
				left:0!important;
				width:100%!important;
			}
			.header_game_enable_half_full_screen{
				width:100%!important;
				left:0!important;
			}
		}`
			styleElement.innerHTML = cssCode;
			document.querySelector('head').appendChild(styleElement);
		}
		document.querySelector('body').setAttribute('style', 'overflow:hidden');
		iframe.classList.add("force_half_full_screen")
		document.querySelector(".header-game").classList.add("header_game_enable_half_full_screen")
	}
}
$("#expand").on('click', function () {
	$("#iframehtml5").addClass("force_full_screen");
	$("#_exit_full_screen").removeClass('hidden');
	requestFullScreen(document.body);
});
$("#_exit_full_screen").on('click', cancelFullScreen);
function requestFullScreen(element) {
	$("#iframehtml5").removeClass("force_half_full_screen");
	$(".header-game").removeClass("header_game_enable_half_full_screen");
	// Supports most browsers and their versions.
	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
	if (requestMethod) { // Native full screen.
		requestMethod.call(element);
	} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
}

function cancelFullScreen() {
	$("#_exit_full_screen").addClass('hidden');
	$("#iframehtml5").removeClass("force_full_screen");
	$("#iframehtml5").removeClass("force_half_full_screen");
	$(".header-game").removeClass("header_game_enable_half_full_screen");
	document.querySelector('body').setAttribute('style', '');
	document.body.style.overflow = "unset";
	var requestMethod = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.exitFullScreenBtn;
	if (requestMethod) { // cancel full screen.
		requestMethod.call(document);
	} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
}

if (document.addEventListener) {
	document.addEventListener('webkitfullscreenchange', exitHandler, false);
	document.addEventListener('mozfullscreenchange', exitHandler, false);
	document.addEventListener('fullscreenchange', exitHandler, false);
	document.addEventListener('MSFullscreenChange', exitHandler, false);
}

function exitHandler() {
	if (document.webkitIsFullScreen === false ||
		document.mozFullScreen === false ||
		document.msFullscreenElement === false) {
		cancelFullScreen();
	}
}
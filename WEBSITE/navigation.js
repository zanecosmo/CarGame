const element = {
    navBar: {html:
        `
        <div class="navBar">
            <div id="fullLogo">                
                <span class="logoText" class="logoText">ZANECOSMO</span>
                <span class="logoBackground"></span>                    
            </div>
            <div class="navButtons">
                <span id="aboutButton" class="button">ABOUT</span>
                <span id="artButton" class="button">ART/GRAPHICS</span>
                <span id="webDevButton" class="button">WEB DESIGN</span>
                <span id="socialButton" class="button">ONLINE/SOCIAL</span>
            </div>
            <div class="miniMenu">
                <div id="upper" class="miniBar"></div>
                <div id="middle" class="miniBar"></div>
                <div id="lower" class="miniBar"></div>
            </div>
        </div>
        
        <div id="partial"></div>
        `
    },
        
    partial: {
        homePage: {html: 
        `
        <div class="homePage">homeStuff</div>
        `},
        
        artPage: {html:
        `
        <div>artStuff</div>
        `},
        
        webDesignPage: {html:
        `
        <div>webDesignStuff</div>
        `},
        
        socialPage: {html:
        `
        <div>socialStuff</div>
        `}
            
    }
};

const reRender = (partial) => {
    document.getElementById("shell").innerHTML = element.navBar.html;
    // document.getElementById("partial").innerHTML = partial;
};

reRender(element.partial.homePage.html);
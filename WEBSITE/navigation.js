const element = {
    navBar: {html:
        `
        <div class="navBar">
            <div id="fullLogo">                
                <span class="logoText" class="logoText">ZANECOSMO</span>
                <span class="logoBackground"></span>                    
            </div>
            <div class="navButtons">
                <span id="aboutButton" class="button">About</span>
                <span id="artButton" class="button">Art + Graphics</span>
                <span id="webDevButton" class="button">Web Design</span>
                <span id="socialButton" class="button">Online + Social</span>
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
    document.getElementById("partial").innerHTML = partial;
};

reRender(element.partial.homePage.html);

const displayLocation = () => {
    console.log(window.location);    
}
const aboutButton = document.getElementById("artButton");
aboutButton.onclick = displayLocation

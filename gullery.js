window.addEventListener('load', (event) => {
    console.log('Page has loaded');
    let figs = document.querySelectorAll('figure');
    // let images = document.querySelectorAll('img');
    console.log('Found ' + figs.length + ' figures');
    document.querySelector('header>h1').innerText = 'Family pictures';
    // document.querySelector('article').style.display = 'block';

    [...figs]
        .forEach( fig => {
            fig.className ='thumb'; // reveal
            fig.addEventListener('click', function(e) {
                console.log('Clicked on ' + e.target.tagName);
                console.log('Handler running on ' + this.tagName);
                let open = this.className == 'thumb'; // clicked thumbnail
                [...figs]
                    .forEach( fig => {
                        switch( fig.className ) {
                            case 'selected': // revert to thumb
                                fig.style.maxHeight = '250px';
                                fig.style.maxWidth = '150px';
                                let img = fig.querySelector('img');
                                img.style.maxHeight = '230px';
                                img.style.maxWidth = '140px';
                            case 'hidden':
                                fig.className = 'thumb';
                                break;
                            default: // hide thumb
                                fig.className = 'hidden';
                        }
                    });
                if( open ) {
                    this.className = 'selected';
                    let img = this.querySelector('img');
                    img.style.maxHeight = Math.floor(.8 * window.innerHeight);
                    img.style.maxWidth = Math.floor(.8 * window.innerWidth);
                    this.style.width = img.offsetWidth+20;
                }
            });
        });

});
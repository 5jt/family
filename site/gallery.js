/*
    Javascript library for family.5jt.com sjt@5jt.com 6feb2023
 */
///////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav ul li').forEach( (btn) => {
        btn.addEventListener('click', (e) => {
            // show selected button
            document.querySelectorAll('nav ul li').forEach( (btn) => {
                btn.className = 'tocoff'
            });
            e.target.className = 'tocon';
            // show only selected figures
            let pid = e.target.getAttribute('data-pid');
            document.querySelectorAll('figure').forEach( (fig) => {
                fig.style.display = (pid==='all')||fig.getAttribute('data-people').includes(pid) ? 'block' : 'none';
            });
        });
    });
    // begin with viewer hidden, grid showing
    document.getElementById('viewer').style.display = 'none';
    document.getElementById('grid').style.display = 'block';
    // click on Viewer to hide it
    document.getElementById('viewer').addEventListener('click', () => {
        document.getElementById('viewer').style.display = 'none';
        document.getElementById('grid').style.display = 'block';
    });
    // click on an image to show it in viewer
    document.querySelectorAll('figure').forEach( (fig) => {
        fig.addEventListener('click', (e) => {
            let viewer = document.getElementById('viewer');
            viewer.replaceChildren();
            viewer.appendChild(e.currentTarget.cloneNode(true));
            viewer.style.display = 'block';
            document.getElementById('grid').style.display = 'none';
        });
    });
});

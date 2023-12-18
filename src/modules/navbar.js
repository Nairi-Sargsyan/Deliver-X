
function navBar() {
    // Open Navbar Toggle \\

    const navbarBtn = document.querySelector('.navbar__toggler'),
        navbarMenu = document.querySelector('.navbar'),
        body = document.querySelector('body'),
        navLink = document.querySelectorAll('.nav-link'),
        checkBox = document.querySelector('.mode__control'),
        mode = document.querySelector('.mode');

    // Open Navbar Checkbox Toggle \\

    if (localStorage.getItem('darkMode') === ('change')) {
        mode.classList.add('anim__checkbox');
        body.classList.add('anim__mode');
    }

    checkBox.addEventListener('click', (e) => {
        e.preventDefault();
        if (localStorage.getItem('darkMode') === ('change')) {
            localStorage.removeItem('darkMode');
            mode.classList.remove('anim__checkbox');
            body.classList.remove('anim__mode');
        } else {
            localStorage.setItem('darkMode', 'change');
            mode.classList.add('anim__checkbox');
            body.classList.add('anim__mode');
        }
    })

    // Close Navbar Checkbox Toggle \\

    navbarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navbarMenu.classList.toggle('active__toggler_menu');
        body.classList.toggle('lock');
        navLink.forEach(item => {
            item.classList.toggle('anim_border');
        })
    })

    // Close Navbar Toggle \\
}

module.exports = navBar;
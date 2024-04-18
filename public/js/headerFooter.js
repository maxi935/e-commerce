document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.querySelector('.toggle-btn');
    var menu = document.getElementById('menu');

    if (window.innerWidth < 768) {
        toggleBtn.addEventListener('click', function () {
            menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';

            if (toggleBtn.classList.contains('fa-ellipsis')) {
                toggleBtn.classList.remove('fa-ellipsis');
                toggleBtn.classList.add('fa-ellipsis-vertical');
            } else if (toggleBtn.classList.contains('fa-ellipsis-vertical')) {
                toggleBtn.classList.remove('fa-ellipsis-vertical');
                toggleBtn.classList.add('fa-ellipsis');
            }
        });

        document.addEventListener('click', function (event) {
            if (!menu.contains(event.target) && event.target !== toggleBtn) {
                menu.style.display = 'none';
            }
        });
    }
});
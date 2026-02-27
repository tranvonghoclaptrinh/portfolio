document.addEventListener('DOMContentLoaded', () => {
    const avatarBtn = document.getElementById('avatarBtn');
    const avatarImg = document.getElementById('currentNavAvatar');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const themeToggle = document.getElementById('themeToggle');

    // Load theme từ localStorage hoặc mặc định dark theme
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.replace('dark-theme', 'light-theme');
            if (themeToggle) themeToggle.checked = true;
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            if (themeToggle) themeToggle.checked = false;
        }
    };

    // Gọi loadTheme khi trang load
    loadTheme();

    // Mở/Đóng Dropdown + Hiệu ứng Avatar
    avatarBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Thêm hiệu ứng pulse cho avatar
        if (avatarImg) {
            avatarImg.classList.remove('pulse');
            // Trigger reflow để animation chạy lại
            void avatarImg.offsetWidth;
            avatarImg.classList.add('pulse');
        }
        
        dropdownMenu.classList.toggle('show');
    });

    // Chuyển đổi Theme (Sáng/Tối) + Lưu vào localStorage
    themeToggle?.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Đóng menu khi click ra ngoài
    window.onclick = (e) => {
        if (!dropdownMenu.contains(e.target) && !avatarBtn.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    };
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');

    // Xử lý sự kiện Logout
    logoutBtn?.addEventListener('click', () => {
        // 1. Xác nhận với người dùng
        const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");
        
        if (confirmLogout) {
            // Hiệu ứng chuyển cảnh hoặc thông báo
            alert("Đang đăng xuất...");
            
            // Chuyển hướng trang (Ví dụ về trang chủ hoặc trang đăng nhập)
            window.location.reload(); // Ở bản demo này mình sẽ load lại trang
        }
    });
});

// Skills Carousel - Center Scale Effect
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('center-item');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('center-item');
        });
    });
});
document.querySelectorAll(".project-card").forEach(card=>{
    card.addEventListener("click",()=>{
        card.classList.toggle("open");
    });
});
const cards = document.querySelectorAll(".language-card");
const overlay = document.getElementById("languageOverlay");

cards.forEach(card => {

    card.addEventListener("click", e => {

        if(card.classList.contains("active")) return;

        cards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");
        overlay.classList.add("show");

        e.stopPropagation();
    });

});

overlay.addEventListener("click", () => {

    document
        .querySelectorAll(".language-card.active")
        .forEach(c => c.classList.remove("active"));

    overlay.classList.remove("show");

});

// js/app.js
import { ELECTION_DATA } from './data.js';

const roleSelector = document.getElementById('roleSelector');
const phaseNav = document.getElementById('phaseNav');
const contentDisplay = document.getElementById('contentDisplay');

// 1. Initialize: สร้าง Dropdown Roles
function initApp() {
    let options = "";
    for (let key in ELECTION_DATA.roles) {
        options += `<option value="${key}">${ELECTION_DATA.roles[key].name}</option>`;
    }
    roleSelector.innerHTML = options;

    // โหลดข้อมูลตัวแรกทันที
    updatePhases(roleSelector.value);
}

// 2. สร้างปุ่ม Phase ตามบทบาทที่เลือก
function updatePhases(roleKey) {
    const role = ELECTION_DATA.roles[roleKey];
    let navHtml = "";
    
    role.phases.forEach((phase, index) => {
        const activeClass = index === 0 ? 'active' : '';
        navHtml += `
            <button class="phase-btn ${activeClass} px-6 py-4 whitespace-nowrap text-sm border-r border-blue-700 min-w-[120px]" 
                    onclick="window.changePhase('${roleKey}', ${index}, this)">
                ${phase.title.split(':')[0]}
            </button>
        `;
    });
    
    phaseNav.innerHTML = navHtml;
    renderContent(role.phases[0]); // แสดง Phase แรกเริ่มต้น
}

// 3. แสดงเนื้อหาลงในหน้าเว็บ
function renderContent(phase) {
    const stepsHtml = phase.steps.map(step => `<li>✅ ${step}</li>`).join('');
    const imagesHtml = phase.images.map(img => `
        <div class="mb-4">
            <img src="${img}" class="step-img" alt="Step Image" onerror="this.src='https://via.placeholder.com/400x300?text=รอรูปภาพประกอบ'">
        </div>
    `).join('');

    contentDisplay.innerHTML = `
        <div class="instruction-card animate-fadeIn">
            <span class="badge">ขั้นตอนการปฏิบัติงาน</span>
            <h2 class="text-2xl font-bold mb-4 text-blue-900">${phase.title}</h2>
            <p class="text-gray-600 mb-6 font-medium">${phase.desc}</p>
            
            <ul class="space-y-3 mb-8 text-lg">
                ${stepsHtml}
            </ul>

            <div class="space-y-4">
                <p class="font-bold text-blue-800">📸 ภาพตัวอย่าง/แบบฟอร์ม:</p>
                ${imagesHtml}
            </div>
        </div>
    `;
}

// Global functions สำหรับผูกกับ HTML
window.changePhase = (roleKey, index, btn) => {
    // ลบ class active จากปุ่มอื่น
    document.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const phase = ELECTION_DATA.roles[roleKey].phases[index];
    renderContent(phase);
    window.scrollTo(0, 0);
};

roleSelector.addEventListener('change', (e) => {
    updatePhases(e.target.value);
});

// เริ่มการทำงาน
initApp();
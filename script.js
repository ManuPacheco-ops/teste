const featureList = [
  'Login social',
  'Chat em tempo real',
  'Push notifications',
  'Assinatura e planos',
  'Geolocalização',
  'Integração com ERP',
  'Dashboard analítico',
  'Marketplace interno',
  'Pagamentos in-app',
  'Suporte por tickets',
  'Biblioteca de conteúdo',
  'Agendamento de serviços'
];

const featureGrid = document.getElementById('featureGrid');
const featureCount = document.getElementById('featureCount');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const projectForm = document.getElementById('projectForm');
const dialog = document.getElementById('dialog');
const scheduleCallBtn = document.getElementById('scheduleCallBtn');
const closeDialog = document.getElementById('closeDialog');
const contactBtn = document.getElementById('contactBtn');
const faqList = document.getElementById('faqList');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

featureList.forEach((feature, index) => {
  const label = document.createElement('label');
  label.className = 'feature';
  label.innerHTML = `
    <input type="checkbox" name="features" value="${feature}" />
    <span>${feature}</span>
  `;
  label.querySelector('input').addEventListener('change', () => {
    label.classList.toggle('selected', label.querySelector('input').checked);
    updateFeatureCount();
  });
  featureGrid.appendChild(label);
});

function updateFeatureCount() {
  const checked = document.querySelectorAll('input[name="features"]:checked');
  featureCount.textContent = `${checked.length} funcionalidade${checked.length === 1 ? '' : 's'} selecionada${
    checked.length === 1 ? '' : 's'
  }`;
}

uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  uploadArea.classList.add('dragging');
});
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragging'));
uploadArea.addEventListener('drop', (event) => {
  event.preventDefault();
  uploadArea.classList.remove('dragging');
  fileInput.files = event.dataTransfer.files;
  renderPreview();
});

fileInput.addEventListener('change', renderPreview);

function renderPreview() {
  preview.innerHTML = '';
  Array.from(fileInput.files).forEach((file) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target.result;
      img.alt = file.name;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

projectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  projectForm.reset();
  preview.innerHTML = '';
  updateFeatureCount();
  alert('Onboarding enviado! Nossa equipe retornará em até 24h.');
});

scheduleCallBtn.addEventListener('click', () => dialog.classList.add('show'));
contactBtn.addEventListener('click', () => dialog.classList.add('show'));
closeDialog.addEventListener('click', () => dialog.classList.remove('show'));
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.classList.remove('show');
});

faqList.querySelectorAll('.accordion-item').forEach((item) => {
  const header = item.querySelector('header');
  header.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

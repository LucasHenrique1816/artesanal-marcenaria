// Micro-interações: Processo Artesanal (hover/reveal)
document.querySelectorAll('.step-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('active'));
  card.addEventListener('mouseleave', () => card.classList.remove('active'));
  card.addEventListener('focus', () => card.classList.add('active'));
  card.addEventListener('blur', () => card.classList.remove('active'));
});

// Galeria: Lightbox customizado
const galeriaItems = document.querySelectorAll('.galeria-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
if (galeriaItems && lightbox && lightboxImg && lightboxCaption) {
  galeriaItems.forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.getAttribute('data-img');
      lightboxImg.alt = item.querySelector('.galeria-img').alt;
      lightboxCaption.textContent = item.getAttribute('data-caption');
      lightbox.classList.add('active');
    });
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        item.click();
      }
    });
  });
  document.querySelector('.lightbox-close').onclick = () => lightbox.classList.remove('active');
  lightbox.onclick = e => { if (e.target === lightbox) lightbox.classList.remove('active'); };
}

// Depoimentos: Carousel suave
const depoimentos = [
  {
    foto: './assets/relato-cozinha.jpeg',
    texto: '"Minha filha brinca na cozinhinha todos os dias. Quando vejo ela \'cozinhando\' para suas bonecas, sei que escolhi certo. É uma peça que vai durar gerações."',
    nome: 'Maria, mãe da Sophie',
    alt: 'Sophie brincando na cozinha artesanal'
  },
  {
    foto: './assets/relato-penteadeira.jpeg',
    texto: '"A penteadeira virou o cantinho favorito da minha filha. Ela se sente uma princesa e guarda seus segredos nas gavetinhas."',
    nome: 'Fernanda, mãe da Ana',
    alt: 'Ana usando a penteadeira artesanal'
  },
  {
    foto: './assets/relato-oficina.jpeg',
    texto: '"O atendimento foi tão acolhedor quanto o móvel. Sentimos que fizemos parte da criação. Recomendo de olhos fechados!"',
    nome: 'Carlos, pai do Lucas',
    alt: 'Família recebendo móvel artesanal'
  }
];
const carousel = document.getElementById('carousel');
if (carousel) {
  const foto = carousel.querySelector('.depoimento-foto');
  const texto = carousel.querySelector('.depoimento-texto');
  const nome = carousel.querySelector('.depoimento-nome');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let idx = 0;
  function updateCarousel() {
    foto.src = depoimentos[idx].foto;
    foto.alt = depoimentos[idx].alt;
    texto.textContent = depoimentos[idx].texto;
    nome.textContent = depoimentos[idx].nome;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      idx = i;
      updateCarousel();
    });
  });
  setInterval(() => {
    idx = (idx + 1) % depoimentos.length;
    updateCarousel();
  }, 100000);
}

// Formulário: Validação humanizada
const form = document.getElementById('form-contato');
const feedback = document.getElementById('form-feedback');
if (form && feedback) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input, textarea').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = 'var(--terracota)';
        valid = false;
      } else {
        field.style.borderColor = 'var(--madeira-clara)';
      }
    });
    if (!valid) {
      feedback.textContent = "Ops, parece que faltou algo. Pode nos ajudar?";
      feedback.style.display = 'block';
      feedback.style.color = 'var(--terracota)';
      return;
    }
    feedback.textContent = "Recebido com carinho! Logo conversaremos ♥";
    feedback.style.display = 'block';
    feedback.style.color = 'var(--verde-musgo)';
    form.reset();
  });
}

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
    }
  });
});

// Função para enviar mensagem pelo WhatsApp
function enviarWhatsApp(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Captura os valores dos campos do formulário
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const quarto = document.getElementById('quarto').value;
  const tipo = document.getElementById('tipo').value;
  const telefone = document.getElementById('telefone').value;

  // Monta a mensagem para o WhatsApp
  const mensagem = `Olá, meu nome é ${nome}. Gostaria de criar um móvel dos sonhos para meu pequeno tesouro de ${idade} anos. 
  Sobre o quarto: ${quarto}. 
  Tipo de móvel: ${tipo}. 
  Meu telefone para contato: ${telefone}.`;

  // Codifica a mensagem para ser usada na URL
  const mensagemCodificada = encodeURIComponent(mensagem);

  // Número do WhatsApp (substitua pelo número correto)
  const numeroWhatsApp = '5511979655995'; // Exemplo: código do país + código da cidade + número

  // Redireciona para o WhatsApp com a mensagem
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`, '_blank');
}
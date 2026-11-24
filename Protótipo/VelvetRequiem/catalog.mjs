export const benefits = {
  game: { title: 'Jogo digital', label: 'Uma cópia digital no lançamento' },
  journal: { title: 'Diário de desenvolvimento', label: 'Diário de desenvolvimento' },
  art: { title: 'Artes conceituais', label: 'Galeria de artes conceituais' },
  credits: { title: 'Nome nos créditos', label: 'Nome nos créditos de apoiadores' }
};

export const plans = [
  { id: 'vigilia', title: 'Vigília', cents: 2990, symbol: 'flame', tagline: 'Para quem quer atravessar o portão.', benefits: ['game'] },
  { id: 'sentinela', title: 'Sentinela', cents: 4990, symbol: 'eye', tagline: 'Para quem quer olhar por trás da cortina.', benefits: ['game', 'journal', 'art'] },
  { id: 'requiem', title: 'Réquiem', cents: 7990, symbol: 'crown', tagline: 'Para deixar seu nome nesta história.', benefits: ['game', 'journal', 'art', 'credits'] }
];

export const published = {
  journal: {
    title: 'Diário de desenvolvimento',
    subtitle: 'Entrada de demonstração · Atmosfera',
    paragraphs: [
      'O estudo visual do protótipo usa uma luz vermelha como ponto de orientação no cenário. Na imagem da fachada, ela chama a atenção para uma única janela. No corredor, a mesma cor sugere o que existe atrás da porta.',
      'As texturas granuladas e as formas simplificadas remetem aos jogos de terror do PlayStation 1. Este diário ilustra como as atualizações poderão ser apresentadas aos apoiadores.'
    ]
  },
  art: {
    title: 'Artes conceituais',
    subtitle: 'Estudo visual de demonstração · Corredor',
    image: '/api/content/art-image',
    alt: 'Corredor escuro com uma porta iluminada em vermelho ao fundo',
    paragraphs: ['Estudo de iluminação e perspectiva para representar a estética de terror retrô no protótipo.']
  }
};

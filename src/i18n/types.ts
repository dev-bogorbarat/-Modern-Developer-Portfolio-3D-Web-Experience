export type SupportedLanguage = 'id' | 'en' | 'ja';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  flag: string;
}

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    projects: string;
    faq: string;
    contact: string;
    hireMe: string;
    soundOn: string;
    soundOff: string;
  };
  hero: {
    badge: string;
    titleMain: string;
    titleGradient: string;
    subtitle: string;
    statsFps: string;
    statsFpsSub: string;
    statsThree: string;
    statsThreeSub: string;
    statsInteractive: string;
    statsInteractiveSub: string;
    btnViewWork: string;
    btnInspect: string;
    btnContact: string;
    collectionTitle: string;
    btnEnlarge: string;
    shapes: {
      diamond: { label: string; desc: string };
      star: { label: string; desc: string };
      torusknot: { label: string; desc: string };
      icosahedron: { label: string; desc: string };
      torus: { label: string; desc: string };
      octahedron: { label: string; desc: string };
      dodecahedron: { label: string; desc: string };
      sphere: { label: string; desc: string };
    };
  };
  focus: {
    back: string;
    bounce: string;
    bounceHint: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filter3D: string;
    filterWeb: string;
    filterDesign: string;
    understanding: string;
    statsProjects: string;
    statsProjectsLabel: string;
    statsCode: string;
    statsCodeLabel: string;
    statsTime: string;
    statsTimeLabel: string;
    statsSatisfaction: string;
    statsSatisfactionLabel: string;
    toolsHeading: string;
    toolsSubtitle: string;
    levelExpert: string;
    levelIntermediate: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterWebGL: string;
    filterWeb: string;
    filterDesign: string;
    btnViewDetails: string;
    featuresLabel: string;
    techStackLabel: string;
    btnModalClose: string;
    btnOpenDemo: string;
    btnSourceCode: string;
    emptyState: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    directContact: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    tabStory: string;
    tabProject: string;
    formName: string;
    formEmail: string;
    formTitle: string;
    formCategory: string;
    formMessage: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderTitle: string;
    placeholderMessage: string;
    btnSend: string;
    btnSending: string;
    sentSuccess: string;
    autoHideNotice: string;
    sendAnother: string;
    directEmailLabel: string;
    copied: string;
    copyEmail: string;
  };
  footer: {
    copyright: string;
    licenseBtn: string;
    licenseDetails: string;
    backToTop: string;
    fps: string;
  };
  controls: {
    title: string;
    subtitle: string;
    shapeLabel: string;
    wireframeLabel: string;
    speedLabel: string;
    particlesLabel: string;
    colorLabel: string;
    wireframeOn: string;
    wireframeOff: string;
    reset: string;
  };
  licenseModal: {
    title: string;
    subtitle: string;
    verifiedCreator: string;
    codeTitle: string;
    artTitle: string;
    clientTitle: string;
    thirdPartyTitle: string;
    copyCitation: string;
    citationCopied: string;
    close: string;
  };
}

import { translations } from '../i18n/translations'

type Lang = 'es' | 'en'

const langMeta: Record<Lang, { label: string;}> = {
  es: { label: 'ES'},
  en: { label: 'EN'},
}

function triggerAnimations() {
  // Reinicia el fade in del hero
  const hero = document.getElementById('hero')
  if (hero) {
    hero.style.animation = 'none'
    hero.style.opacity = '0'
    // Fuerza reflow para que el browser registre el reset
    void hero.offsetHeight
    hero.style.animation = ''
  }
}

function applyLanguage(lang: Lang) {
  // Textos con data-i18n
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n as keyof typeof translations.es
    if (translations[lang][key]) {
      el.textContent = translations[lang][key]
    }
  })

  // Links del navbar
  document.querySelectorAll<HTMLElement>('[data-label-es]').forEach(el => {
    el.textContent = lang === 'es'
      ? el.dataset.labelEs!
      : el.dataset.labelEn!
  })
  // Descripciones de proyectos
    document.querySelectorAll<HTMLElement>('[data-desc-es]').forEach(el => {
    el.textContent = lang === 'es' ? el.dataset.descEs! : el.dataset.descEn!
  })

  // Actualizar botón
  const btn = document.getElementById('lang-label')
  if (btn) {
    const {label } = langMeta[lang]
    btn.textContent = `${label}`
  }

  localStorage.setItem('lang', lang)
  triggerAnimations()
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = (localStorage.getItem('lang') as Lang) || 'es'
  applyLanguage(saved)

  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    const current = (localStorage.getItem('lang') as Lang) || 'es'
    applyLanguage(current === 'es' ? 'en' : 'es')
  })
})
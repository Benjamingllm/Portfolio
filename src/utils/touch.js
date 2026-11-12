// pointer: coarse = le pointeur principal est un doigt.
// Plus fiable que la largeur d'écran : une tablette en paysage est large mais tactile.
export function isTouch() {
  return window.matchMedia('(pointer: coarse)').matches
}

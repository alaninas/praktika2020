function setTargetStyleField ({ target, field, attr = '' }: { target: EventTarget | null; field: 'background' | 'opacity'; attr?: string }) {
  if (target && (target as HTMLElement).style) (target as HTMLElement).style[field] = attr
}

function setTargetText ({ target, attr = '' }: { target: EventTarget | null; attr?: string }) {
  if (target) (target as HTMLElement).innerHTML = attr
}

function setEventTargetDisplay ({ target, opacity = undefined, background = undefined, text = undefined }: { target: EventTarget | null; opacity?: string; background?: string; text?: string }) {
  if (opacity === '' || opacity?.length) setTargetStyleField({ target, field: 'opacity', attr: opacity })
  if (background === '' || background?.length) setTargetStyleField({ target, field: 'background', attr: background })
  if (text === '' || text?.length) setTargetText({ target, attr: text })
}

export {
  setTargetStyleField,
  setEventTargetDisplay
}

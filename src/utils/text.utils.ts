export function copyToClipboard(text: string) {
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = "fixed";
  textarea.style.top = '0px';
  textarea.style.left = '-100px';

  const success = document.body.appendChild(textarea)
  if (success) {
    textarea.focus()
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  return success
}
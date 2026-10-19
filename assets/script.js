'use strict';
// Número mantido exatamente como fornecido pelo responsável pelo escritório.
const WHATSAPP_NUMBER = '555592310662';
function buildWhatsAppUrl({name, area, process, message}) {
  const text = ['Olá, Dr. Isaías Cabreira.', `Meu nome é ${name.trim()}.`, `Assunto: ${area}.`, `Já existe processo: ${process}.`, message.trim() ? `Breve descrição: ${message.trim()}` : '', 'Gostaria de informações sobre o atendimento.'].filter(Boolean).join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#menu');
function closeMenu(){menu.classList.remove('open'); menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const opened=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(opened));menuButton.setAttribute('aria-label',opened?'Fechar menu':'Abrir menu');});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape' && menu.classList.contains('open')){closeMenu();menuButton.focus();}});
document.querySelectorAll('[data-area]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#area').value=link.dataset.area;}));
const form=document.querySelector('#contact-form');
form.addEventListener('submit',event=>{
  event.preventDefault();
  const name=document.querySelector('#name');
  name.setCustomValidity(name.value.trim() ? '' : 'Informe seu nome.');
  if(!form.reportValidity())return;
  const data=Object.fromEntries(new FormData(form));
  const url=buildWhatsAppUrl(data);
  const status=document.querySelector('#form-status');
  status.textContent='Mensagem preparada. Confirme o envio no WhatsApp. ';
  const retry=document.createElement('a');retry.href=url;retry.textContent='Abrir a conversa';retry.style.textDecoration='underline';status.append(retry);
  window.location.assign(url);
});
document.querySelector('#name').addEventListener('input',event=>event.target.setCustomValidity(''));
document.querySelector('#year').textContent=new Date().getFullYear();

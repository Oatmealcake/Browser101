'use strict';

const shopList = document.querySelector('.shop_list');
const input = document.querySelector('.text_input');
const addBtn = document.querySelector('.btn_add');
delItem();
addBtn.addEventListener('click', () => {
  if (input.value === '') return;
  addItem();
  delItem();
})
input.addEventListener('keyup', (ev) => {
  if (ev.keyCode === 13) {
    if (input.value === '') return;
    addItem();
    delItem();
  }
})
function addItem() {
  let li = document.createElement('li');
  li.innerHTML = `<span>${input.value}</span><button type="button" class="btn_del"><i class="fas fa-trash-alt"></i></button>`;
  shopList.append(li);
  input.value = '';
}
function delItem() {
  let delBtn = document.querySelectorAll('.btn_del');
  let lis = shopList.querySelectorAll('li');
  for (let i = 0; i < lis.length; i++) {
    delBtn[i].addEventListener('click', () => {
      shopList.removeChild(lis[i])
    })
  }
}

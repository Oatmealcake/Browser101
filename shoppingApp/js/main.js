'use strict';

const shopList = document.querySelector('.shop_list');
const input = document.querySelector('.text_input');
const addBtn = document.querySelector('.btn_add');

addBtn.addEventListener('click', () => {
  addItem();
})
input.addEventListener('keyup', (ev) => {
  if (ev.key === 'Enter') {
    addItem();
  }
})
function addItem() {
  const text = input.value;
  if (input.value === '') {
    input.focus(); // 포커스는 유지될 수 있도록
    return;
  }
  const item = createItem(text);
  shopList.appendChild(item);
  item.scrollIntoView({block: 'center'}) // 새로 추가된 아이템으로 스크롤링
  input.value = '';
  input.focus();
}
function createItem(text) {
  const li = document.createElement('li');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const name = document.createElement('span');
  name.setAttribute('class', 'item_name');
  name.innerText = text;

  const delBtn = document.createElement('button');
  delBtn.setAttribute('class', 'btn_del');
  delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  delBtn.addEventListener('click', () => {
    shopList.removeChild(li);
  })

  item.appendChild(name);
  item.appendChild(delBtn);
  li.appendChild(item);
  return li;
}

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
let id = 0; // 고유 id 지정
function createItem(text) {
  const li = document.createElement('li');
  li.setAttribute('data-id', id)
  li.innerHTML = `
    <div class="item">
      <span class="item_name">${text}</span>
      <button class="btn_del"><i class="fas fa-trash-alt" data-id=${id}></i></button>
    </div>`;
  id++;
  return li;
}

shopList.addEventListener('click', ev => {
  const id = ev.target.dataset.id
  if (id) {
    const toBeDeleted = document.querySelector(`li[data-id='${id}']`);
    toBeDeleted.remove();
  }
})

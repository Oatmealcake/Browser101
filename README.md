# Browser101

## Day 1
- **Web APIs - Scroll, MouseEvent**
- **EventTarget ← Node ← Element**
<br>Element는 Node를, Node는 EventTarget를 상속받기 때문에 DOM 노드들에서 이벤트를 사용 할 수 있다.
- **Critical Rendering Path**
  1. HTML파일을 읽으며 DOM트리 구축
  2. CSS파일을 읽으며 CSSOM트리 구축
  3. DOM트리와 CSSOM트리를 결합해 Render트리구축 (head, display: block; 등 눈에 보이지 않으며 레이아웃에도 포함되지 않는 요소들은 제외)
  4. 레이아웃단계로 요소의 위치와 크기를 계산하며 배치
  5. 페인트 단계로 각 노드를 실제 픽셀로 변환 (스타일이 복잡할수록 시간이 오래 소요. 레이어 층별로 나뉘어져 색칠)
  6. 레이어들을 합쳐 최종 페이지를 완성

## Day 2
- **MouseEvnet 성능개선**
<br>top, left사용으로 layout이 계속 일어나던 것을 transform으로 변경
- **DOM 조작**
  - innerHTML / Element
<br>동적으로 바뀌는 경우엔 createElement로 해당 element를 생성해 조작하는 것이 효율적. 한 번만 수정되는 것이라면 innerHTML을 사용해도 무관
  - innerHTML / innerText / textContent
    - innerHTML
    <br>요소 내에 포함된 마크업을 출력
    <br>입력시 모든 자손이 제거되고, 지정된 HTML을 파싱 후 생성된 노드로 대체
    <br>사용자에게 입력을 받아온 데이터를 innerHTML로 설정할 경우 보안 문제가 있어 input등으로 입력받을 경우엔 textContent를 사용해야한다.
    - innerText
    <br>렌더링된 텍스트 콘텐츠 출력. 스타일링이 적용된 모습이며 사람이 읽을 수 있는 요소만 처리
    <br>입력시에도 스타일링이 적용
    <br>레이아웃이 일어나며 ie에 특화 된 API로 추천X
    - textContent
    <br>모든 자식 요소의 콘텐츠를 하나의 문자열로 출력
    <br>HTML을 분석하지 않는 단순 작업으로 성능이 좋음
    <br>입력시 안의 모든 노드가 삭제되기때문에 주로 말단에서 사용
    <br>XSS공격의 위험이 없다
    
    <br>출력시
    ```html
    <div class="text">
      <style>.text {color: #fff}</style>
      안녕하세요. <br>테스트문장입니다.
      <span style="display:none">숨겨진 글</span>
    </div>
    ```
    ```js
    const text = document.querySelector('.text');
    console.log(text.innerHTML)
    //     <style>.text {color: #fff}</style>
    //     안녕하세요. <br>테스트문장입니다.
    //     <span style="display:none">숨겨진 글</span>
    console.log(text.innerText)
    // 안녕하세요.
    // 테스트문장입니다.
    console.log(text.textContent)
    //     .text {color: #fff}
    //     안녕하세요. 테스트문장입니다.
    //     숨겨진 글
    ```
    <br>입력시
    ```html
    <div class="input"></div>
    ```
    ```js
    const input = document.querySelector('.input');
    const inputText = `<h1>입력된 테스트 
    문장입니다.</h1>`;
    input.innerHTML = inputText;
    // 입력된 테스트 문장입니다.
    input.innerText = inputText;
    // <h1>입력된 테스트 
    // 문장입니다.</h1>
    input.textContent = inputText;
    // <h1>입력된 테스트 문장입니다.</h1>
    ```

## Day 3
- **Shopping List 만들기**
  - `removeChild()` 오류 발생
  <br>Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
  <br>정상 작동하나 콘솔창에 위와 같은 오류가 출력되었다. 삭제하는 기능을 만들 때 목록이 추가될때마다 btn_del과 li를 읽어와 클릭된 것의 인덱스를 찾아 삭제하려고 했다. 이 때 remove는 정상작동하는 것으로 보아 삭제한 노드를 반환하는 과정에서 오류를 일으킨 것이 아닐까 추측했지만, 반환작업도 이상이 없었다. fontawsome과의 충돌때문이라는 사람도 있지만 내 경우는 아닌 것 같고, 이부분에 관해서는 추후 자세히 알아 볼 필요가 있을 것 같다.

## Day 4
- **Event**
  - `$0.dispatchEvent(new Event('click'));`
  <br>인공적으로 클릭 이벤트를 전달해 동작시킬 수 있다
  - 이벤트 발생시 콜백함수 작동
  ```js
  const listener = () => {console.log('clicked')};
  $0.addEventListener('click', listener);
  ```
  - 버블링과 캡처링
  <br>반복되어지는 이벤트는 버블링을 적극 활용!(각각의 li보다 ul에 적용)
  - 전파 방지
  <br>stopImmediatePropagation, stopPropagation은 다른 필수적인 이벤트를 종료시킬 가능성이 있어 위험 ➝ event.target, event.currentTarget을 비교하며 제어
  - 쇼핑리스트 수정
  <br>이벤트 위임 활용
  <br>data-id를 이용해 li와 del_btn에 고유 넘버를 지정 후 이것을 이용해 삭제

## Task lists
- [ ] 렌더링과정의 이해
- [ ] removeChild, remove
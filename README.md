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
    <br>보안 문제가 있어 일반 텍스트를 삽입할 경우에는 사용하지 않는것이 좋다.
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

## Task lists
- [ ] 렌더링과정의 이해
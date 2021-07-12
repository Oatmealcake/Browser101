# Browser101

## Day 1
- Web APIs - Scroll, MouseEvent<br>
- EventTarget ← Node ← Element<br>
Element는 Node를, Node는 EventTarget를 상속받기 때문에 DOM 노드들에서 이벤트를 사용 할 수 있다.<br>
- Critical Rendering Path
<br>1. HTML파일을 읽으며 DOM트리 구축
<br>2. CSS파일을 읽으며 CSSOM트리 구축
<br>3. DOM트리와 CSSOM트리를 결합해 Render트리구축 (head, display: block; 등 눈에 보이지 않으며 레이아웃에도 포함되지 않는 요소들은 제외)
<br>4. 레이아웃단계로 요소의 위치와 크기를 계산하며 배치
<br>5. 페인트 단계로 각 노드를 실제 픽셀로 변환 (스타일이 복잡할수록 시간이 오래 소요. 이때 레이어 층별로 나뉘어서 색칠)
<br>6. 레이어들을 합쳐 최종 페이지를 완성


## Task lists
- [ ] 렌더링과정의 이해
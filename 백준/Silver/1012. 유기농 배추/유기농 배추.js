const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n'); //한줄씩
const T = Number(input.shift()); // 숫자로 바꾸고
const ds = [
  [-1, 0], // 좌
  [1, 0], //우
  [0, 1], // 상
  [0, -1], //하
];
function bfs(startX, startY) {
  //시작 좌표 기준으로 시작
  const queue = [[startX, startY]];
  //   console.log('큐는 ->', queue);
  while (queue.length) {
    const [x, y] = queue.shift();
    // queue의 값을 하나씩 빼서 xy로 저장
    // xy좌표가 0 이면 다시, 1이면 0으로 만들어준다.
    // 인접한 1들 다 0으로 만들기
    if (!graph[x][y]) continue;
    else graph[x][y] = 0; //방문처리

    // 상하좌우 탐색하여 1이 있다면 queue에 push 해준다.
    for (let i = 0; i < 4; i++) {
      const xPos = x + ds[i][0];
      const yPos = y + ds[i][1];

      if (xPos < 0 || yPos < 0 || xPos >= M || yPos >= N) continue;
      if (graph[xPos][yPos]) queue.push([xPos, yPos]);
    }
  }
}

for (let i = 0; i < T; i++) {
  let worm = 0;
  var [M, N, K] = input.shift().split(' ').map(Number);
  //0 먼저 채워주기
  var graph = Array.from(Array(M), () => new Array(N).fill(0));
  for (let j = 0; j < K; j++) {
    //배추의 갯수만큼 돌면서
    let xy = input.shift().split(' '); //[ '0', '0' ]
    // console.log('배추가 있는 곳의 좌표는 -> ', xy);
    graph[xy[0]][xy[1]] = 1; //배추가 있는 곳에 1로 채워주기
  }

  for (let k = 0; k < M; k++) {
    for (let l = 0; l < N; l++) {
      //만약 그 좌표가 1이라면 worm을 늘려주고 상하좌우 탐색하여 전부 0으로 만들어준다.
      if (graph[k][l]) {
        bfs(k, l);
        worm++;
      }
    }
  }
     console.log(worm);
}
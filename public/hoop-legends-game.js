'use strict';
// ═══════════════════════════════════════════════════════════════
//  HOOP LEGENDS – The Lost Court  |  game.js
// ═══════════════════════════════════════════════════════════════

const TILE        = 48;
const HUD_H       = 96;
const COLS        = 27;
const ROWS        = 19;
const FOG_R       = 3.8;
const ENEMY_SPEED = 1.6;
const PLAYER_SPEED= 4.2;   // slightly faster feel
const ACCEL       = 0.72;  // acceleration factor (0-1, lower = more slide)
const FRICTION    = 0.78;  // friction when no key held
const T_WALL  = 0;
const T_FLOOR = 1;
const T_DOOR  = 2;
const T_STAIR = 3;

// ──────────────────────────────────────────────────────────────
// QUIZ DATABASE
// ──────────────────────────────────────────────────────────────
const QUIZ_DB = [
  { id:1,  cat:'LUẬT CHƠI',   q:'Một trận NBA có bao nhiêu hiệp?',                                         opts:['2 hiệp','3 hiệp','4 hiệp','5 hiệp'],                                                 ans:2, exp:'NBA có 4 hiệp, mỗi hiệp 12 phút.' },
  { id:2,  cat:'LUẬT CHƠI',   q:'Shot clock trong NBA là bao nhiêu giây?',                                 opts:['14 giây','20 giây','24 giây','30 giây'],                                              ans:2, exp:'Shot clock NBA là 24 giây.' },
  { id:3,  cat:'LUẬT CHƠI',   q:'Ném từ ngoài vạch 3 điểm ghi được bao nhiêu điểm?',                      opts:['1 điểm','2 điểm','3 điểm','4 điểm'],                                                 ans:2, exp:'Ném 3 điểm ghi 3 điểm.' },
  { id:4,  cat:'HUYỀN THOẠI', q:"Ai được mệnh danh là 'His Airness'?",                                     opts:['LeBron James','Kobe Bryant','Michael Jordan','Magic Johnson'],                        ans:2, exp:"Michael Jordan – 'His Airness' vì khả năng nhảy phi thường." },
  { id:5,  cat:'HUYỀN THOẠI', q:'Kobe Bryant mang số áo nào tại Lakers?',                                  opts:['Chỉ số 8','Chỉ số 24','Số 8 và 24','Số 23'],                                         ans:2, exp:'Kobe mang số 8 (1996-2006) và số 24 (2006-2016).' },
  { id:6,  cat:'HUYỀN THOẠI', q:'LeBron James vô địch NBA bao nhiêu lần (đến 2023)?',                      opts:['2 lần','3 lần','4 lần','5 lần'],                                                     ans:2, exp:'LeBron vô địch 4 lần: 2012, 2013, 2016, 2020.' },
  { id:7,  cat:'ĐỘI BÓNG',    q:'Đội nào có nhiều chức vô địch NBA nhất lịch sử?',                         opts:['LA Lakers','Chicago Bulls','Boston Celtics','Golden State Warriors'],                 ans:2, exp:'Boston Celtics có 17 chức vô địch NBA.' },
  { id:8,  cat:'ĐỘI BÓNG',    q:"Golden State Warriors có biệt danh là gì?",                               opts:['The Heat','The Dubs','The Bulls','The Nets'],                                         ans:1, exp:"Warriors được gọi là 'The Dubs'." },
  { id:9,  cat:'ĐỘI BÓNG',    q:"Đội nào được gọi là 'Showtime Lakers'?",                                  opts:['Lakers 2000s','Lakers 1980s','Lakers 1990s','Lakers 2010s'],                         ans:1, exp:'Showtime Lakers là Lakers thập niên 1980 với Magic Johnson.' },
  { id:10, cat:'KỸ THUẬT',    q:'Slam Dunk là kỹ thuật gì?',                                               opts:['Ném từ xa','Nhảy đập bóng vào rổ','Chuyền qua đầu','Dribble qua người'],            ans:1, exp:'Slam Dunk: nhảy lên và đập bóng trực tiếp vào rổ.' },
  { id:11, cat:'KỸ THUẬT',    q:'Kỹ thuật nào cho phép di chuyển mà không dribble?',                       opts:['Pivot','Slam dunk','Alley-oop','Crossover'],                                          ans:0, exp:'Pivot: xoay người quanh chân trụ mà không bị lỗi.' },
  { id:12, cat:'KỸ THUẬT',    q:'Stephen Curry nổi tiếng với kỹ năng gì?',                                 opts:['Slam Dunk','Ném 3 điểm','Phòng thủ','Rebound'],                                      ans:1, exp:'Curry là xạ thủ 3 điểm vĩ đại nhất lịch sử NBA.' },
  { id:13, cat:'LỊCH SỬ',     q:'Ai ghi 100 điểm trong một trận NBA?',                                     opts:['Michael Jordan','Kobe Bryant','Wilt Chamberlain','LeBron James'],                    ans:2, exp:'Wilt Chamberlain ghi 100 điểm ngày 2/3/1962.' },
  { id:14, cat:'LỊCH SỬ',     q:'NBA được thành lập năm nào?',                                             opts:['1940','1946','1950','1960'],                                                          ans:1, exp:'NBA thành lập năm 1946 với tên BAA, đổi tên 1949.' },
  { id:15, cat:'LỊCH SỬ',     q:'Cầu thủ nào được gọi là "The Big Dipper"?',                               opts:["Shaquille O'Neal",'Kareem Abdul-Jabbar','Wilt Chamberlain','Bill Russell'],           ans:2, exp:'Wilt Chamberlain có biệt danh "The Big Dipper".' },
  { id:16, cat:'LUẬT CHƠI',   q:'Cầu thủ NBA bị loại khi phạm bao nhiêu lỗi?',                             opts:['4 lỗi','5 lỗi','6 lỗi','7 lỗi'],                                                     ans:2, exp:'NBA: 6 lỗi cá nhân thì bị loại.' },
  { id:17, cat:'LUẬT CHƠI',   q:'Backcourt violation xảy ra khi nào?',                                     opts:['Bóng ra ngoài','Đưa bóng về sân nhà sau khi qua giữa','Dẫm vạch','Ném không vào'],  ans:1, exp:'Backcourt: đưa bóng về phần sân nhà sau khi đã qua vạch giữa.' },
  { id:18, cat:'LUẬT CHƠI',   q:'Free throw được thực hiện từ đâu?',                                       opts:['Vạch 3 điểm','Vạch phạt đền','Giữa sân','Góc sân'],                                 ans:1, exp:'Free throw từ vạch phạt đền, cách rổ 4.57m.' },
  { id:19, cat:'TỔNG HỢP',    q:'Cầu thủ nào giữ kỷ lục ghi điểm cao nhất mùa giải NBA?',                 opts:['Michael Jordan','Wilt Chamberlain','Elgin Baylor','LeBron James'],                   ans:1, exp:'Wilt Chamberlain trung bình 50.4 điểm/trận mùa 1961-62.' },
  { id:20, cat:'TỔNG HỢP',    q:'Magic Johnson chơi vị trí nào?',                                          opts:['Shooting Guard','Small Forward','Point Guard','Center'],                             ans:2, exp:'Magic Johnson là Point Guard huyền thoại của Lakers.' },
  { id:21, cat:'TỔNG HỢP',    q:'Chiều cao tối thiểu để chơi vị trí Center thường là bao nhiêu?',          opts:['1m90','2m00','2m08','2m15'],                                                          ans:2, exp:'Center thường cao từ 2m08 trở lên.' },
  { id:22, cat:'HUYỀN THOẠI', q:'Michael Jordan vô địch NBA bao nhiêu lần?',                                opts:['4 lần','5 lần','6 lần','7 lần'],                                                     ans:2, exp:'Jordan vô địch 6 lần với Chicago Bulls (1991-93, 1996-98).' },
  { id:23, cat:'ĐỘI BÓNG',    q:'Đội nào thắng NBA Championship 2023?',                                    opts:['Boston Celtics','Miami Heat','Denver Nuggets','LA Lakers'],                          ans:2, exp:'Denver Nuggets vô địch NBA 2023 lần đầu tiên trong lịch sử.' },
  { id:24, cat:'LỊCH SỬ',     q:'Bóng rổ được phát minh bởi ai?',                                          opts:['Michael Jordan','James Naismith','Larry Bird','Bill Russell'],                       ans:1, exp:'James Naismith phát minh bóng rổ năm 1891 tại Springfield, MA.' },
];

// ──────────────────────────────────────────────────────────────
// COLLECTIBLE ITEMS
// ──────────────────────────────────────────────────────────────
const ITEM_DEFS = [
  { id:'jersey23', icon:'👕', name:'Áo Số 23',           desc:'Chiếc áo huyền thoại của Michael Jordan',   floor:1, pts:150 },
  { id:'sneaker',  icon:'👟', name:'Giày Air Jordan',     desc:'Đôi giày đã thay đổi lịch sử bóng rổ',     floor:1, pts:150 },
  { id:'whistle',  icon:'📯', name:'Còi Trọng Tài',       desc:'Còi bạc từ trận chung kết huyền thoại',    floor:1, pts:100 },
  { id:'ball1',    icon:'🏀', name:'Bóng Ký Tên',         desc:'Quả bóng có chữ ký của 5 huyền thoại',     floor:1, pts:200 },
  { id:'trophy1',  icon:'🥇', name:'Huy Chương Vàng',     desc:'Huy chương Olympic bóng rổ 1992',          floor:1, pts:200 },
  { id:'ring',     icon:'💍', name:'Nhẫn Vô Địch',        desc:'Nhẫn vô địch NBA từ mùa giải 1996',        floor:2, pts:250 },
  { id:'headband', icon:'🎽', name:'Băng Đầu Kobe',       desc:'Băng đầu Kobe Bryant mùa 2006',            floor:2, pts:200 },
  { id:'trophy2',  icon:'🏆', name:"Cúp Larry O'Brien",   desc:'Bản sao cúp vô địch NBA',                  floor:2, pts:300 },
  { id:'playbook', icon:'📋', name:'Sách Chiến Thuật',    desc:'Cuốn sách chiến thuật của Phil Jackson',   floor:2, pts:200 },
  { id:'ticket',   icon:'🎫', name:'Vé Trận Chung Kết',   desc:'Vé trận chung kết NBA 1998 – Game 6',      floor:2, pts:150 },
  { id:'crown',    icon:'👑', name:'Vương Miện Huyền Thoại',desc:'Vương miện của vua bóng rổ',             floor:3, pts:400 },
  { id:'scroll',   icon:'📜', name:'Cuộn Bí Mật',         desc:'Cuộn giấy chứa bí mật của Legends Arena', floor:3, pts:350 },
  { id:'crystal',  icon:'💎', name:'Pha Lê Huyền Bí',     desc:'Pha lê chứa linh hồn huyền thoại',        floor:3, pts:500 },
  { id:'key',      icon:'🗝️', name:'Chìa Khóa Vàng',     desc:'Chìa khóa mở Cổng Huyền Thoại cuối cùng', floor:3, pts:300 },
  { id:'flame',    icon:'🔥', name:'Ngọn Lửa Bất Diệt',   desc:'Ngọn lửa tinh thần của các huyền thoại',  floor:3, pts:400 },
];

const POWERUP_DEFS = [
  { type:'speed',  icon:'⚡',  name:'Tốc Độ',    color:'#FFD700', duration:5000 },
  { type:'shield', icon:'🛡️', name:'Bất Tử',    color:'#00D4FF', duration:4000 },
  { type:'reveal', icon:'👁️', name:'Lộ Bản Đồ', color:'#9B59B6', duration:6000 },
];

// ──────────────────────────────────────────────────────────────
// FLOOR META
// ──────────────────────────────────────────────────────────────
const FLOOR_META = [
  { num:1, name:'Phòng Thay Đồ',       icon:'🏟️', bgColor:'#1a0f05', wallColor:'#5C3A1E', floorColor:'#8B5E3C', enemyCount:2, gateCount:2, itemCount:5 },
  { num:2, name:'Sân Đấu Huyền Thoại', icon:'🏀', bgColor:'#050f1a', wallColor:'#1A3A5C', floorColor:'#2C5F8A', enemyCount:3, gateCount:2, itemCount:5 },
  { num:3, name:'Đại Sảnh Huyền Thoại',icon:'👑', bgColor:'#0f0a1a', wallColor:'#3A1A5C', floorColor:'#5C2A8A', enemyCount:4, gateCount:2, itemCount:5 },
];

// ──────────────────────────────────────────────────────────────
// MAZE GENERATOR (Recursive Backtracker)
// ──────────────────────────────────────────────────────────────
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateMaze(cols, rows) {
  // ── Step 1: Start with all walls ──────────────────────────
  const grid = Array.from({ length: rows }, () => new Array(cols).fill(T_WALL));

  // ── Step 2: Recursive Backtracker on odd-coord cells ──────
  // Cells live at odd (c, r); walls between them at even coords
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));

  function inBounds(c, r) { return c > 0 && c < cols - 1 && r > 0 && r < rows - 1; }

  function carve(c, r) {
    visited[r][c] = true;
    grid[r][c] = T_FLOOR;
    const dirs = shuffle([[-2,0],[2,0],[0,-2],[0,2]]);
    for (const [dc, dr] of dirs) {
      const nc = c + dc, nr = r + dr;
      if (inBounds(nc, nr) && !visited[nr][nc]) {
        grid[r + dr/2][c + dc/2] = T_FLOOR;
        carve(nc, nr);
      }
    }
  }
  carve(1, 1);

  // ── Step 3: Enforce solid border ──────────────────────────
  for (let r = 0; r < rows; r++) { grid[r][0] = T_WALL; grid[r][cols-1] = T_WALL; }
  for (let c = 0; c < cols; c++) { grid[0][c] = T_WALL; grid[rows-1][c] = T_WALL; }

  // ── Step 4: Remove extra walls to create loops & junctions ─
  // This is the key fix: a "perfect maze" has only 1 path between
  // any two points. By removing ~30% of interior walls we create
  // multiple routes, dead-end shortcuts, and open areas.
  const removalRate = 0.30;  // 30% of removable walls get knocked down

  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      if (grid[r][c] !== T_WALL) continue;

      // Only remove walls that have floor on BOTH sides (horizontal or vertical)
      // This avoids creating isolated floor islands or destroying structure
      const horizOk = c > 1 && c < cols - 2 &&
                      grid[r][c-1] === T_FLOOR && grid[r][c+1] === T_FLOOR;
      const vertOk  = r > 1 && r < rows - 2 &&
                      grid[r-1][c] === T_FLOOR && grid[r+1][c] === T_FLOOR;

      if ((horizOk || vertOk) && Math.random() < removalRate) {
        grid[r][c] = T_FLOOR;
      }
    }
  }

  // ── Step 5: Widen corridors — carve extra floor tiles ──────
  // For every floor tile, give its diagonal neighbours a chance
  // to also become floor, creating wider open areas near junctions
  const widened = Array.from({ length: rows }, (_, r) => [...grid[r]]);
  for (let r = 2; r < rows - 2; r++) {
    for (let c = 2; c < cols - 2; c++) {
      if (grid[r][c] !== T_FLOOR) continue;
      // Count adjacent floors
      let adj = 0;
      for (const [dc, dr] of [[0,1],[0,-1],[1,0],[-1,0]]) {
        if (grid[r+dr]?.[c+dc] === T_FLOOR) adj++;
      }
      // If this is a junction (3+ floor neighbours), widen diagonals
      if (adj >= 3 && Math.random() < 0.4) {
        for (const [dc, dr] of [[1,1],[1,-1],[-1,1],[-1,-1]]) {
          const nr = r+dr, nc = c+dc;
          if (nr > 0 && nr < rows-1 && nc > 0 && nc < cols-1) {
            widened[nr][nc] = T_FLOOR;
          }
        }
      }
    }
  }
  // Apply widening (copy back, keep border walls)
  for (let r = 1; r < rows - 1; r++)
    for (let c = 1; c < cols - 1; c++)
      grid[r][c] = widened[r][c];

  // Re-enforce border
  for (let r = 0; r < rows; r++) { grid[r][0] = T_WALL; grid[r][cols-1] = T_WALL; }
  for (let c = 0; c < cols; c++) { grid[0][c] = T_WALL; grid[rows-1][c] = T_WALL; }

  // ── Step 6: Guarantee connectivity via flood-fill ──────────
  // Find the largest connected floor region and wall off any
  // isolated floor tiles that aren't reachable from (1,1)
  const reachable = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const queue = [];
  // Find a valid start
  let startC = 1, startR = 1;
  outer: for (let r = 1; r < rows-1; r++)
    for (let c = 1; c < cols-1; c++)
      if (grid[r][c] === T_FLOOR) { startC=c; startR=r; break outer; }

  queue.push([startC, startR]);
  reachable[startR][startC] = true;
  while (queue.length) {
    const [c, r] = queue.shift();
    for (const [dc, dr] of [[0,1],[0,-1],[1,0],[-1,0]]) {
      const nc = c+dc, nr = r+dr;
      if (nc<0||nc>=cols||nr<0||nr>=rows) continue;
      if (reachable[nr][nc] || grid[nr][nc] !== T_FLOOR) continue;
      reachable[nr][nc] = true;
      queue.push([nc, nr]);
    }
  }
  // Wall off unreachable floor tiles
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === T_FLOOR && !reachable[r][c])
        grid[r][c] = T_WALL;

  return grid;
}

function floorTiles(grid) {
  const tiles = [];
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[r].length; c++)
      if (grid[r][c] === T_FLOOR) tiles.push({ c, r });
  return tiles;
}

function pickSpread(tiles, n, minDist = 3) {
  const picked = [];
  const pool = shuffle([...tiles]);
  for (const t of pool) {
    if (picked.length >= n) break;
    const ok = picked.every(p => Math.abs(p.c - t.c) + Math.abs(p.r - t.r) >= minDist);
    if (ok) picked.push(t);
  }
  return picked;
}

// ──────────────────────────────────────────────────────────────
// CANVAS & MINIMAP
// ──────────────────────────────────────────────────────────────
const canvas  = document.getElementById('gameCanvas');
const ctx     = canvas.getContext('2d');
const miniCvs = document.getElementById('miniMap');
const mctx    = miniCvs.getContext('2d');
const MINI_SCALE = 7;
miniCvs.width  = COLS * MINI_SCALE;
miniCvs.height = ROWS * MINI_SCALE;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight - HUD_H;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function camOffset() {
  // Smooth camera: lerp toward player position
  const targetX = canvas.width  / 2 - G.player.wx;
  const targetY = canvas.height / 2 - G.player.wy;
  G.camX += (targetX - G.camX) * 0.12;
  G.camY += (targetY - G.camY) * 0.12;
  return { ox: G.camX, oy: G.camY };
}

// ──────────────────────────────────────────────────────────────
// GAME STATE
// ──────────────────────────────────────────────────────────────
const G = {
  floor:0, score:0, lives:3, combo:1,
  correctCount:0, totalAnswered:0,
  startTime:0, elapsed:0,
  bestScore: parseInt(localStorage.getItem('hl_best') || '0', 10),
  inventory:[], powerups:{}, keys:{},
  quizActive:false, gameRunning:false,
  particles:[], floatingTexts:[],
  maze:null, fogMap:null,
  player:null, enemies:[], items:[],
  gates:[], stairs:null, finalGate:null,
  powerupSpawns:[],
  activeGate:null, quizQueue:[], quizIndex:0,
  animFrame:null, timerInterval:null,
  quizTimeLeft:15, invincibleUntil:0,
  _floorCache:[],
  // Smooth camera
  camX: 0, camY: 0,
  // Wrong answer streak per gate
  wrongStreaks: {},
};

// ──────────────────────────────────────────────────────────────
// FOG OF WAR
// ──────────────────────────────────────────────────────────────
function revealFog(cc, cr, radius) {
  const r = Math.ceil(radius);
  for (let dr = -r; dr <= r; dr++) {
    for (let dc = -r; dc <= r; dc++) {
      if (dc*dc + dr*dr <= radius*radius) {
        const nr = cr+dr, nc = cc+dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS)
          G.fogMap[nr][nc] = true;
      }
    }
  }
}

// ──────────────────────────────────────────────────────────────
// BFS PATHFINDING
// ──────────────────────────────────────────────────────────────
function bfsPath(maze, sc, sr, ec, er) {
  if (sc === ec && sr === er) return [];
  const queue   = [{ c:sc, r:sr, path:[] }];
  const visited = new Set([`${sc},${sr}`]);
  const dirs    = [[0,1],[0,-1],[1,0],[-1,0]];
  while (queue.length) {
    const { c, r, path } = queue.shift();
    for (const [dc, dr] of dirs) {
      const nc = c+dc, nr = r+dr;
      const key = `${nc},${nr}`;
      if (nc<0||nc>=COLS||nr<0||nr>=ROWS||visited.has(key)) continue;
      const tile = maze[nr][nc];
      if (tile === T_WALL) continue;
      const newPath = [...path, { c:nc, r:nr }];
      if (nc===ec && nr===er) return newPath;
      visited.add(key);
      queue.push({ c:nc, r:nr, path:newPath });
    }
  }
  return [];
}

// ──────────────────────────────────────────────────────────────
// COLLISION
// ──────────────────────────────────────────────────────────────
function tileAt(wx, wy) {
  return { c: Math.floor(wx / TILE), r: Math.floor(wy / TILE) };
}

function isGateUnlocked(c, r) {
  const gate = [...G.gates, G.finalGate].filter(Boolean).find(g => g.c===c && g.r===r);
  return gate ? gate.unlocked : false;
}

function isSolid(c, r) {
  if (c<0||c>=COLS||r<0||r>=ROWS) return true;
  const t = G.maze[r][c];
  return t === T_WALL || (t === T_DOOR && !isGateUnlocked(c, r));
}

function moveEntity(entity, dx, dy) {
  // Use a smaller radius so player doesn't snag on wall corners
  const rad = TILE * 0.32;

  // Try full move first
  let nx = entity.wx + dx;
  let ny = entity.wy + dy;

  // Check X axis with 3 probe points (top, mid, bottom of entity)
  const xBlocked =
    isSolid(Math.floor((nx - rad) / TILE), Math.floor((entity.wy - rad + 2) / TILE)) ||
    isSolid(Math.floor((nx + rad) / TILE), Math.floor((entity.wy - rad + 2) / TILE)) ||
    isSolid(Math.floor((nx - rad) / TILE), Math.floor((entity.wy + rad - 2) / TILE)) ||
    isSolid(Math.floor((nx + rad) / TILE), Math.floor((entity.wy + rad - 2) / TILE));

  if (xBlocked) {
    nx = entity.wx;
    // Kill velocity on blocked axis for smooth wall-slide
    entity.vx = 0;
  }

  // Check Y axis with 3 probe points (left, mid, right of entity)
  const yBlocked =
    isSolid(Math.floor((nx - rad + 2) / TILE), Math.floor((ny - rad) / TILE)) ||
    isSolid(Math.floor((nx + rad - 2) / TILE), Math.floor((ny - rad) / TILE)) ||
    isSolid(Math.floor((nx - rad + 2) / TILE), Math.floor((ny + rad) / TILE)) ||
    isSolid(Math.floor((nx + rad - 2) / TILE), Math.floor((ny + rad) / TILE));

  if (yBlocked) {
    ny = entity.wy;
    entity.vy = 0;
  }

  entity.wx = nx;
  entity.wy = ny;
}

// ──────────────────────────────────────────────────────────────
// FLOOR INIT
// ──────────────────────────────────────────────────────────────
function initFloor(floorIdx) {
  _mazeCache = null;  // invalidate tile cache for new floor
  const meta = FLOOR_META[floorIdx];
  const maze = generateMaze(COLS, ROWS);
  G.maze    = maze;
  G.floor   = floorIdx;
  G.fogMap  = Array.from({ length: ROWS }, () => new Array(COLS).fill(false));

  const floors = floorTiles(maze);
  G._floorCache = floors; // cache for enemy patrol

  // Player start
  const startTile = floors.find(t => t.c <= 3 && t.r <= 3) || floors[0];
  G.player = { wx: startTile.c*TILE+TILE/2, wy: startTile.r*TILE+TILE/2, vx:0, vy:0, dir:1 };
  // Snap camera to player start position (no lerp lag)
  G.camX = canvas.width  / 2 - G.player.wx;
  G.camY = canvas.height / 2 - G.player.wy;

  // Stairs (floors 0 & 1 only) — random position far from player start
  G.stairs = null;
  if (floorIdx < 2) {
    // Pick from floor tiles that are far from the start tile (distance > 8)
    const stairPool = floors.filter(t =>
      maze[t.r][t.c] === T_FLOOR &&
      Math.abs(t.c - startTile.c) + Math.abs(t.r - startTile.r) > 8
    );
    const stairCandidates = shuffle([...stairPool]);
    const stairTile = stairCandidates[0] || floors[floors.length - 1];
    maze[stairTile.r][stairTile.c] = T_STAIR;
    G.stairs = { c: stairTile.c, r: stairTile.r, locked: true };
  }

  // Gates — placed far from player start, near map edges/corners
  G.gates = [];
  const mapCenterC = COLS / 2;
  const mapCenterR = ROWS / 2;

  // Score each floor tile: higher = better gate candidate
  // Criteria: far from player start + far from map center + near edges
  const gatePool = floors
    .filter(t => maze[t.r][t.c] === T_FLOOR)
    .map(t => {
      const distFromStart  = Math.abs(t.c - startTile.c) + Math.abs(t.r - startTile.r);
      const distFromCenter = Math.abs(t.c - mapCenterC)  + Math.abs(t.r - mapCenterR);
      // Bonus for being near a corner/edge
      const edgeBonus = Math.min(t.c, COLS-1-t.c, t.r, ROWS-1-t.r) < 4 ? 8 : 0;
      const score = distFromStart * 1.5 + distFromCenter * 0.8 + edgeBonus;
      return { ...t, score };
    })
    .filter(t => t.score > 18)          // must be reasonably far
    .sort((a, b) => b.score - a.score); // best candidates first

  // Pick from top 40% of candidates, spread apart
  const topPool = gatePool.slice(0, Math.max(meta.gateCount * 4, Math.floor(gatePool.length * 0.4)));
  const gatePositions = pickSpread(topPool, meta.gateCount, 8);

  const gateQuizSets = [
    [floorIdx*6+1, floorIdx*6+2, floorIdx*6+3],
    [floorIdx*6+4, floorIdx*6+5, floorIdx*6+6],
  ];
  gatePositions.forEach((pos, i) => {
    maze[pos.r][pos.c] = T_DOOR;
    G.gates.push({
      c: pos.c, r: pos.r,
      id: `gate_${floorIdx}_${i}`,
      label: `Cổng ${String.fromCharCode(65+i)} – Tầng ${floorIdx+1}`,
      icon: ['🚪','⛩️'][i % 2],
      quizIds: gateQuizSets[i] || [1,2,3],
      unlocked: false,
      questionsAnswered: 0,
      order: i,                        // 0 = first, 1 = second, must open in order
      requiredItems: i === 0 ? 1 : 3,
    });
  });

  // Final gate (floor 3 only) — deepest corner, far from start
  G.finalGate = null;
  if (floorIdx === 2) {
    const fgPool = floors
      .filter(t => maze[t.r][t.c] === T_FLOOR)
      .map(t => ({
        ...t,
        score: Math.abs(t.c - startTile.c) + Math.abs(t.r - startTile.r)
      }))
      .sort((a, b) => b.score - a.score);
    const fgTile = fgPool[0] || floors[floors.length - 2];
    maze[fgTile.r][fgTile.c] = T_DOOR;
    G.finalGate = {
      c: fgTile.c, r: fgTile.r,
      id: 'final_gate',
      label: '🌟 Cổng Huyền Thoại',
      icon: '🌟',
      quizIds: [19,20,21,22,23,24],
      unlocked: false,
      questionsAnswered: 0,
      requiredItems: 5,
      isFinal: true,
    };
  }

  // Items
  const itemDefs = ITEM_DEFS.filter(d => d.floor === floorIdx+1);
  const itemPool = floors.filter(t =>
    maze[t.r][t.c] === T_FLOOR &&
    !(t.c === startTile.c && t.r === startTile.r)
  );
  const itemTiles = pickSpread(itemPool, itemDefs.length, 4);
  G.items = itemDefs.map((def, i) => ({
    ...def,
    c: itemTiles[i]?.c ?? 2,
    r: itemTiles[i]?.r ?? 2,
    collected: false,
    bobOffset: Math.random() * Math.PI * 2,
  }));

  // Enemies
  const enemyPool = floors.filter(t =>
    maze[t.r][t.c] === T_FLOOR &&
    Math.abs(t.c - startTile.c) + Math.abs(t.r - startTile.r) > 6
  );
  const enemyTiles = pickSpread(enemyPool, meta.enemyCount, 5);
  G.enemies = enemyTiles.map((et, i) => ({
    wx: et.c*TILE+TILE/2, wy: et.r*TILE+TILE/2,
    vx:0, vy:0, path:[], pathTimer:0, pathIdx:0,
    state:'patrol', stunnedUntil:0,
    id:i, color:['#E74C3C','#C0392B','#922B21','#7B241C'][i%4],
  }));

  // Power-ups
  const puPool = floors.filter(t => maze[t.r][t.c] === T_FLOOR);
  const puTiles = pickSpread(puPool, 3, 5);
  G.powerupSpawns = puTiles.map((pt, i) => ({
    c: pt.c, r: pt.r,
    type: POWERUP_DEFS[i % POWERUP_DEFS.length].type,
    collected: false,
    bobOffset: Math.random() * Math.PI * 2,
  }));

  revealFog(startTile.c, startTile.r, 2);  // tight initial reveal — player must explore
}

// ──────────────────────────────────────────────────────────────
// DRAWING HELPERS
// ──────────────────────────────────────────────────────────────
function shadeColor(hex, amt) {
  const n = parseInt(hex.replace('#',''), 16);
  const r = Math.max(0, Math.min(255, (n>>16)+amt));
  const g = Math.max(0, Math.min(255, ((n>>8)&0xff)+amt));
  const b = Math.max(0, Math.min(255, (n&0xff)+amt));
  return `rgb(${r},${g},${b})`;
}

// ──────────────────────────────────────────────────────────────
// MAZE TILE CACHE  — bake static tiles once per floor
// ──────────────────────────────────────────────────────────────
let _mazeCache = null;   // offscreen canvas with baked tiles

function bakeMazeCache() {
  const meta = FLOOR_META[G.floor];
  const W = COLS * TILE, H = ROWS * TILE;
  _mazeCache = document.createElement('canvas');
  _mazeCache.width  = W;
  _mazeCache.height = H;
  const bctx = _mazeCache.getContext('2d');

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const sx = c * TILE, sy = r * TILE;
      const tile = G.maze[r][c];

      if (tile === T_WALL) {
        // Bake gradient once
        const grd = bctx.createLinearGradient(sx, sy, sx + TILE, sy + TILE);
        grd.addColorStop(0, meta.wallColor);
        grd.addColorStop(1, shadeColor(meta.wallColor, -35));
        bctx.fillStyle = grd;
        bctx.fillRect(sx, sy, TILE, TILE);
        // Subtle top-left highlight
        bctx.strokeStyle = 'rgba(255,255,255,0.07)';
        bctx.lineWidth = 1;
        bctx.strokeRect(sx + 0.5, sy + 0.5, TILE - 1, TILE - 1);
        // Inner shadow bottom-right
        bctx.strokeStyle = 'rgba(0,0,0,0.25)';
        bctx.beginPath();
        bctx.moveTo(sx + TILE, sy + 1);
        bctx.lineTo(sx + TILE, sy + TILE);
        bctx.lineTo(sx + 1, sy + TILE);
        bctx.stroke();
      } else {
        // Floor base
        bctx.fillStyle = meta.floorColor;
        bctx.fillRect(sx, sy, TILE, TILE);
        // Subtle tile grid
        bctx.strokeStyle = 'rgba(0,0,0,0.12)';
        bctx.lineWidth = 0.5;
        bctx.strokeRect(sx, sy, TILE, TILE);
        // Slight inner highlight for depth
        bctx.fillStyle = 'rgba(255,255,255,0.03)';
        bctx.fillRect(sx + 1, sy + 1, TILE - 2, 3);
      }
    }
  }
}

function drawMaze(ox, oy) {
  if (!_mazeCache) bakeMazeCache();

  const now    = Date.now();

  // Viewport culling — only draw tiles on screen
  const startC = Math.max(0, Math.floor(-ox / TILE));
  const endC   = Math.min(COLS, Math.ceil((canvas.width  - ox) / TILE));
  const startR = Math.max(0, Math.floor(-oy / TILE));
  const endR   = Math.min(ROWS, Math.ceil((canvas.height - oy) / TILE));

  for (let r = startR; r < endR; r++) {
    for (let c = startC; c < endC; c++) {
      const sx   = c * TILE + ox;
      const sy   = r * TILE + oy;
      const tile = G.maze[r][c];

      // All tiles always drawn — fog overlay handles dimming
      if (tile === T_WALL || tile === T_FLOOR) {
        ctx.drawImage(_mazeCache, c * TILE, r * TILE, TILE, TILE, sx, sy, TILE, TILE);

      } else if (tile === T_STAIR) {
        ctx.drawImage(_mazeCache, c * TILE, r * TILE, TILE, TILE, sx, sy, TILE, TILE);
        const locked = G.stairs && G.stairs.locked;
        // Tinted floor overlay
        ctx.fillStyle = locked ? 'rgba(180,40,20,0.35)' : 'rgba(30,180,80,0.35)';
        ctx.fillRect(sx, sy, TILE, TILE);
        // Draw stair steps
        ctx.save();
        const stepColor = locked ? '#FF6B6B' : '#5EFF9E';
        const steps = 4;
        const stepH = TILE * 0.12;
        const stepW = TILE * 0.7;
        for (let i = 0; i < steps; i++) {
          const sw = stepW * (1 - i * 0.15);
          const stepX = sx + TILE/2 - sw/2;
          const stepY = sy + TILE*0.2 + i * (stepH + 2);
          ctx.fillStyle = stepColor;
          ctx.globalAlpha = 0.85 - i * 0.1;
          ctx.beginPath();
          ctx.roundRect(stepX, stepY, sw, stepH, 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        // Arrow icon
        ctx.font = `bold ${TILE * 0.28}px "Segoe UI",sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = locked ? '#FF4444' : '#00FF88';
        ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 4;
        ctx.fillText(locked ? '🔒' : '▲', sx + TILE/2, sy + TILE*0.82);
        ctx.shadowBlur = 0;
        ctx.restore();

      } else if (tile === T_DOOR) {
        ctx.drawImage(_mazeCache, c * TILE, r * TILE, TILE, TILE, sx, sy, TILE, TILE);
        const gate = [...G.gates, G.finalGate].filter(Boolean).find(g => g.c === c && g.r === r);
        if (!gate) continue;
        if (gate.unlocked) {
          ctx.font = `${TILE * 0.58}px serif`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('✅', sx + TILE / 2, sy + TILE / 2);
        } else {
          const pulse = Math.sin(now / 380) * 0.3 + 0.7;
          ctx.fillStyle = gate.isFinal
            ? `rgba(255,215,0,${0.45 * pulse})`
            : `rgba(255,107,0,${0.45 * pulse})`;
          ctx.fillRect(sx, sy, TILE, TILE);
          ctx.strokeStyle = gate.isFinal ? '#FFD700' : '#FF6B00';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(sx + 1, sy + 1, TILE - 2, TILE - 2);
          ctx.font = `${TILE * 0.62}px serif`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillStyle = '#fff';
          ctx.fillText(gate.icon, sx + TILE / 2, sy + TILE / 2);
        }
      }
    }
  }
}

// ──────────────────────────────────────────────────────────────
// CUSTOM ITEM RENDERERS
// ──────────────────────────────────────────────────────────────
function drawBasketball(cx, cy, r) {
  // Ball base — orange gradient
  const ballGrd = ctx.createRadialGradient(cx - r*0.3, cy - r*0.3, r*0.05, cx, cy, r);
  ballGrd.addColorStop(0,   '#FF9A3C');
  ballGrd.addColorStop(0.6, '#E85D00');
  ballGrd.addColorStop(1,   '#A33A00');
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = ballGrd; ctx.fill();

  // Black seam lines
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.75)';
  ctx.lineWidth = r * 0.09;
  ctx.lineCap = 'round';

  // Vertical seam
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.bezierCurveTo(cx + r*0.5, cy - r*0.3, cx + r*0.5, cy + r*0.3, cx, cy + r);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.bezierCurveTo(cx - r*0.5, cy - r*0.3, cx - r*0.5, cy + r*0.3, cx, cy + r);
  ctx.stroke();

  // Horizontal seam
  ctx.beginPath();
  ctx.moveTo(cx - r, cy);
  ctx.bezierCurveTo(cx - r*0.3, cy - r*0.5, cx + r*0.3, cy - r*0.5, cx + r, cy);
  ctx.stroke();

  ctx.restore();

  // Shine highlight
  const shine = ctx.createRadialGradient(cx - r*0.35, cy - r*0.35, 0, cx - r*0.2, cy - r*0.2, r*0.55);
  shine.addColorStop(0,   'rgba(255,255,255,0.35)');
  shine.addColorStop(0.5, 'rgba(255,255,255,0.08)');
  shine.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = shine; ctx.fill();

  // Outline
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
}

function drawSneaker(cx, cy, size) {
  const s = size;
  ctx.save();
  ctx.translate(cx, cy);

  // Sole
  ctx.beginPath();
  ctx.ellipse(0, s*0.28, s*0.72, s*0.22, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#E8E8E8'; ctx.fill();
  ctx.strokeStyle = '#999'; ctx.lineWidth = 1; ctx.stroke();

  // Sole bottom stripe (red)
  ctx.beginPath();
  ctx.ellipse(0, s*0.32, s*0.68, s*0.14, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#CC2200'; ctx.fill();

  // Upper shoe body
  ctx.beginPath();
  ctx.moveTo(-s*0.68, s*0.18);
  ctx.lineTo(-s*0.68, -s*0.05);
  ctx.quadraticCurveTo(-s*0.55, -s*0.38, -s*0.1, -s*0.42);
  ctx.quadraticCurveTo(s*0.3, -s*0.44, s*0.55, -s*0.18);
  ctx.quadraticCurveTo(s*0.72, s*0.0, s*0.68, s*0.18);
  ctx.closePath();
  const shoeGrd = ctx.createLinearGradient(0, -s*0.44, 0, s*0.18);
  shoeGrd.addColorStop(0, '#CC2200');
  shoeGrd.addColorStop(0.5, '#E83000');
  shoeGrd.addColorStop(1, '#AA1A00');
  ctx.fillStyle = shoeGrd; ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 1; ctx.stroke();

  // Toe cap
  ctx.beginPath();
  ctx.moveTo(s*0.38, -s*0.28);
  ctx.quadraticCurveTo(s*0.72, -s*0.1, s*0.68, s*0.18);
  ctx.lineTo(s*0.3, s*0.18);
  ctx.quadraticCurveTo(s*0.45, -s*0.05, s*0.38, -s*0.28);
  ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fill();

  // Laces area (white panel)
  ctx.beginPath();
  ctx.moveTo(-s*0.25, -s*0.38);
  ctx.quadraticCurveTo(s*0.05, -s*0.46, s*0.35, -s*0.3);
  ctx.lineTo(s*0.28, -s*0.12);
  ctx.quadraticCurveTo(s*0.0, -s*0.22, -s*0.2, -s*0.18);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fill();

  // Lace dots
  ctx.fillStyle = '#fff';
  for (let i = 0; i < 3; i++) {
    const lx = -s*0.1 + i * s*0.18;
    const ly = -s*0.28 + i * s*0.06;
    ctx.beginPath(); ctx.arc(lx, ly, s*0.04, 0, Math.PI*2); ctx.fill();
  }

  // Swoosh-like stripe
  ctx.beginPath();
  ctx.moveTo(-s*0.45, -s*0.02);
  ctx.quadraticCurveTo(-s*0.05, -s*0.28, s*0.35, -s*0.18);
  ctx.quadraticCurveTo(s*0.15, -s*0.08, -s*0.3, s*0.08);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.fill();

  // Heel tab
  ctx.beginPath();
  ctx.moveTo(-s*0.62, -s*0.05);
  ctx.lineTo(-s*0.68, -s*0.22);
  ctx.lineTo(-s*0.52, -s*0.22);
  ctx.lineTo(-s*0.55, -s*0.05);
  ctx.fillStyle = '#AA1A00'; ctx.fill();

  ctx.restore();
}

function drawItems(ox, oy) {
  const now = Date.now();
  G.items.forEach(item => {
    if (item.collected) return;
    const sx  = item.c * TILE + TILE / 2 + ox;
    const sy  = item.r * TILE + TILE / 2 + oy;
    const bob = Math.sin(now / 600 + item.bobOffset) * 4;
    const r   = TILE * 0.34;

    // Glow aura
    const glowColor = item.id === 'ball1' ? '255,150,30' : item.id === 'sneaker' ? '255,80,0' : '255,215,0';
    const grd = ctx.createRadialGradient(sx, sy + bob, 0, sx, sy + bob, TILE * 0.75);
    grd.addColorStop(0, `rgba(${glowColor},0.45)`);
    grd.addColorStop(1, `rgba(${glowColor},0)`);
    ctx.beginPath(); ctx.arc(sx, sy + bob, TILE * 0.75, 0, Math.PI * 2);
    ctx.fillStyle = grd; ctx.fill();

    // Custom render for special items, emoji for others
    if (item.id === 'ball1') {
      // Shadow
      ctx.beginPath(); ctx.ellipse(sx, sy + bob + r + 3, r * 0.7, r * 0.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fill();
      drawBasketball(sx, sy + bob, r);
    } else if (item.id === 'sneaker') {
      // Shadow
      ctx.beginPath(); ctx.ellipse(sx, sy + bob + r * 0.5, r * 0.8, r * 0.18, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fill();
      drawSneaker(sx, sy + bob, r * 1.4);
    } else {
      // Default: emoji with drop shadow
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur  = 6;
      ctx.font = `${TILE * 0.72}px serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(item.icon, sx, sy + bob);
      ctx.restore();
    }
  });
}

function drawPowerups(ox, oy) {
  const now = Date.now();
  G.powerupSpawns.forEach(pu => {
    if (pu.collected) return;
    const def = POWERUP_DEFS.find(d => d.type === pu.type);
    const sx  = pu.c * TILE + TILE / 2 + ox;
    const sy  = pu.r * TILE + TILE / 2 + oy;
    const bob = Math.sin(now / 400 + pu.c) * 5;
    const pulse = Math.sin(now / 300) * 0.4 + 0.6;
    const grd = ctx.createRadialGradient(sx, sy + bob, 0, sx, sy + bob, TILE * 0.6);
    grd.addColorStop(0, def.color + '88');
    grd.addColorStop(1, def.color + '00');
    ctx.beginPath(); ctx.arc(sx, sy + bob, TILE * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = grd; ctx.fill();
    ctx.globalAlpha = pulse;
    ctx.font = `${TILE * 0.62}px serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(def.icon, sx, sy + bob);
    ctx.globalAlpha = 1;
  });
}

function drawEnemies(ox, oy) {
  const now = Date.now();
  G.enemies.forEach(e => {
    const sx = e.wx + ox, sy = e.wy + oy;
    const stunned = e.stunnedUntil > now;
    ctx.globalAlpha = stunned ? 0.4 : 1;

    const bob = Math.sin(now/500+e.id)*3;
    // Glow
    const grd = ctx.createRadialGradient(sx, sy+bob, 0, sx, sy+bob, 28);
    grd.addColorStop(0, e.color+'AA'); grd.addColorStop(1, e.color+'00');
    ctx.beginPath(); ctx.arc(sx, sy+bob, 28, 0, Math.PI*2);
    ctx.fillStyle = grd; ctx.fill();
    // Shadow
    ctx.beginPath(); ctx.ellipse(sx, sy+14, 12, 4, 0, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fill();
    // Ghost body
    ctx.beginPath();
    ctx.arc(sx, sy+bob-4, 14, Math.PI, 0);
    ctx.lineTo(sx+14, sy+bob+8);
    for (let i=3; i>=0; i--) {
      ctx.lineTo(sx-14+(28/3)*i, sy+bob+8-(i%2===0?5:0));
    }
    ctx.closePath();
    ctx.fillStyle = e.color; ctx.fill();
    // Eyes
    ctx.fillStyle='#fff';
    ctx.beginPath(); ctx.arc(sx-5, sy+bob-5, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(sx+5, sy+bob-5, 4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle='#000';
    ctx.beginPath(); ctx.arc(sx-4, sy+bob-5, 2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(sx+6, sy+bob-5, 2, 0, Math.PI*2); ctx.fill();
    if (stunned) {
      ctx.font='16px serif'; ctx.textAlign='center';
      ctx.fillText('💫', sx, sy+bob-22);
    }
    ctx.globalAlpha = 1;
  });
}

function drawPlayer(ox, oy) {
  const p   = G.player;
  const sx  = p.wx + ox;
  const sy  = p.wy + oy;
  const now = Date.now();
  const shield = G.powerups['shield'] && G.powerups['shield'] > now;
  const speed  = G.powerups['speed']  && G.powerups['speed']  > now;

  // Movement speed for animations
  const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
  const moving = spd > 0.3;

  // Bob animation when moving
  const bobY = moving ? Math.sin(now / 120) * 2.5 : 0;
  // Squash/stretch: lean in direction of movement
  const scaleX = moving ? 1 + Math.abs(p.vx) * 0.012 : 1;
  const scaleY = moving ? 1 - Math.abs(p.vy) * 0.008 : 1;

  ctx.save();
  ctx.translate(sx, sy + bobY);

  // Shadow (scales with height)
  ctx.beginPath();
  ctx.ellipse(0, 16, 13 * scaleX, 4, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fill();

  // Shield aura
  if (shield) {
    const pulse = Math.sin(now / 180) * 0.3 + 0.7;
    ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,212,255,${pulse})`; ctx.lineWidth = 3; ctx.stroke();
    // Inner glow
    const sg = ctx.createRadialGradient(0, 0, 10, 0, 0, 30);
    sg.addColorStop(0, 'rgba(0,212,255,0.08)');
    sg.addColorStop(1, 'rgba(0,212,255,0)');
    ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fillStyle = sg; ctx.fill();
  }

  // Speed trail particles
  if (speed && moving) {
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(-p.vx * i * 2.5, -p.vy * i * 2.5, 8 - i * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,215,0,${0.25 - i * 0.07})`;
      ctx.fill();
    }
  }

  // Invincibility flash
  const invFlash = G.invincibleUntil > now && Math.floor(now / 100) % 2 === 0;
  if (invFlash) { ctx.restore(); return; }

  ctx.scale(scaleX, scaleY);

  // Body (jersey)
  ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2);
  const bodyGrd = ctx.createRadialGradient(-4, -4, 2, 0, 0, 16);
  bodyGrd.addColorStop(0, '#FF8C38');
  bodyGrd.addColorStop(1, '#CC4400');
  ctx.fillStyle = bodyGrd; ctx.fill();
  ctx.strokeStyle = '#AA3300'; ctx.lineWidth = 2; ctx.stroke();

  // Jersey number
  ctx.font = 'bold 11px "Segoe UI",sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 2;
  ctx.fillText('23', 0, 1);
  ctx.shadowBlur = 0;

  ctx.restore();
  ctx.save();
  ctx.translate(sx, sy + bobY);

  // Head (drawn after body restore to avoid scale distortion)
  const headY = -20 + bobY * 0.3;
  ctx.beginPath(); ctx.arc(0, headY, 9, 0, Math.PI * 2);
  ctx.fillStyle = '#FDBCB4'; ctx.fill();
  ctx.strokeStyle = '#CC9988'; ctx.lineWidth = 1.5; ctx.stroke();

  // Eye direction
  ctx.beginPath(); ctx.arc(p.dir * 3, headY, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = '#333'; ctx.fill();

  ctx.restore();
}

// Offscreen canvas for fog (avoids Safari compositing bugs)
const _fogCanvas = document.createElement('canvas');
const _fogCtx    = _fogCanvas.getContext('2d');

function drawFogOverlay(ox, oy) {
  const revealAll = G.powerups['reveal'] && G.powerups['reveal'] > Date.now();
  if (revealAll) return;

  if (_fogCanvas.width !== canvas.width || _fogCanvas.height !== canvas.height) {
    _fogCanvas.width  = canvas.width;
    _fogCanvas.height = canvas.height;
  }

  const px   = G.player.wx + ox;
  const py   = G.player.wy + oy;
  const fogR = FOG_R * TILE;

  // ── Offscreen: dark overlay with hole punched around player ──
  _fogCtx.clearRect(0, 0, _fogCanvas.width, _fogCanvas.height);

  // Darker outside
  _fogCtx.fillStyle = 'rgba(0, 0, 10, 0.93)';
  _fogCtx.fillRect(0, 0, _fogCanvas.width, _fogCanvas.height);

  // Punch transparent hole using destination-out
  _fogCtx.save();
  _fogCtx.globalCompositeOperation = 'destination-out';

  // Wide gradient zone = smooth transition from bright → dark
  const holeGrd = _fogCtx.createRadialGradient(px, py, 0, px, py, fogR * 2.2);
  holeGrd.addColorStop(0,    'rgba(0,0,0,1)');    // core: fully bright
  holeGrd.addColorStop(0.30, 'rgba(0,0,0,1)');    // still fully bright
  holeGrd.addColorStop(0.55, 'rgba(0,0,0,0.75)'); // smooth start of fade
  holeGrd.addColorStop(0.75, 'rgba(0,0,0,0.35)'); // mid fade
  holeGrd.addColorStop(0.90, 'rgba(0,0,0,0.10)'); // nearly dark
  holeGrd.addColorStop(1,    'rgba(0,0,0,0)');    // full dark overlay

  _fogCtx.beginPath();
  _fogCtx.arc(px, py, fogR * 2.2, 0, Math.PI * 2);
  _fogCtx.fillStyle = holeGrd;
  _fogCtx.fill();
  _fogCtx.restore();

  // Blit fog onto main canvas
  ctx.drawImage(_fogCanvas, 0, 0);

  // ── Warm torch glow at player ──────────────────────────────
  const torchGrd = ctx.createRadialGradient(px, py, 0, px, py, fogR * 0.65);
  torchGrd.addColorStop(0,   'rgba(255,160,50,0.16)');
  torchGrd.addColorStop(0.5, 'rgba(255,100,20,0.06)');
  torchGrd.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.arc(px, py, fogR * 0.65, 0, Math.PI * 2);
  ctx.fillStyle = torchGrd;
  ctx.fill();

  // ── Blue-purple mist ring at fog boundary ─────────────────
  const mistGrd = ctx.createRadialGradient(px, py, fogR * 0.9, px, py, fogR * 1.6);
  mistGrd.addColorStop(0,   'rgba(30,15,80,0)');
  mistGrd.addColorStop(0.5, 'rgba(30,15,80,0.14)');
  mistGrd.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.arc(px, py, fogR * 1.6, 0, Math.PI * 2);
  ctx.fillStyle = mistGrd;
  ctx.fill();
}

function drawGateHints(ox, oy) {
  const allGates = [...G.gates, G.finalGate].filter(Boolean);
  allGates.forEach(gate => {
    if (gate.unlocked) return;
    const sx = gate.c * TILE + TILE/2 + ox;
    const sy = gate.r * TILE + TILE/2 + oy;
    const dx = gate.c*TILE+TILE/2 - G.player.wx;
    const dy = gate.r*TILE+TILE/2 - G.player.wy;
    if (Math.sqrt(dx*dx+dy*dy) > TILE*3) return;

    const prevOk  = isPrevGatesUnlocked(gate);
    const itemsOk = G.inventory.length >= gate.requiredItems;
    const canOpen = prevOk && itemsOk;

    // Determine hint message and color
    let msg, color;
    if (!prevOk) {
      // Find which gate blocks this one
      const blocking = G.gates
        .filter(g => g.order < gate.order && !g.unlocked)
        .map(g => g.label.split('–')[0].trim())
        .join(', ');
      msg   = `🔐 Mở ${blocking} trước!`;
      color = '#FF6B6B';
    } else if (!itemsOk) {
      msg   = `🎒 Cần ${gate.requiredItems} vật phẩm (${G.inventory.length}/${gate.requiredItems})`;
      color = '#E74C3C';
    } else {
      msg   = '❓ Tiếp cận để trả lời!';
      color = '#FFD700';
    }

    ctx.save();
    ctx.font = 'bold 12px "Segoe UI",sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 5;
    const floatY = sy - TILE - 8 + Math.sin(Date.now()/300)*4;
    ctx.fillText(msg, sx, floatY);
    ctx.restore();

    // Dim the gate icon when locked by ordering
    if (!prevOk) {
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(gate.c*TILE+ox, gate.r*TILE+oy, TILE, TILE);
      ctx.restore();
    }
  });
}

function drawParticles(ox, oy) {
  for (let i = G.particles.length-1; i >= 0; i--) {
    const p = G.particles[i];
    p.x+=p.vx; p.y+=p.vy; p.vy+=0.15; p.vx*=0.95; p.life-=0.025;
    if (p.life <= 0) { G.particles.splice(i,1); continue; }
    ctx.save(); ctx.globalAlpha = p.life;
    ctx.beginPath(); ctx.arc(p.x+ox, p.y+oy, p.size*p.life, 0, Math.PI*2);
    ctx.fillStyle = p.color; ctx.fill(); ctx.restore();
  }
}

function drawFloatingTexts() {
  for (let i = G.floatingTexts.length-1; i >= 0; i--) {
    const ft = G.floatingTexts[i];
    ft.y -= 1.5; ft.life -= 0.02;
    if (ft.life <= 0) { G.floatingTexts.splice(i,1); continue; }
    ctx.save(); ctx.globalAlpha = ft.life;
    ctx.font = `bold ${ft.size||20}px "Segoe UI",sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = ft.color;
    ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 6;
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.restore();
  }
}

function drawMiniMap() {
  const meta = FLOOR_META[G.floor];
  const MS   = MINI_SCALE;

  mctx.fillStyle = 'rgba(0,0,0,0.85)';
  mctx.fillRect(0, 0, miniCvs.width, miniCvs.height);

  // Only walls and floors — nothing else
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      mctx.fillStyle = G.maze[r][c] === T_WALL ? meta.wallColor : meta.floorColor;
      mctx.fillRect(c * MS, r * MS, MS, MS);
    }
  }

  // Player dot only
  const { c: pc, r: pr } = tileAt(G.player.wx, G.player.wy);
  const pulse = Math.sin(Date.now() / 300) * 0.5 + 0.5;
  mctx.fillStyle = `rgba(255,107,0,${0.75 + pulse * 0.25})`;
  mctx.beginPath();
  mctx.arc(pc * MS + MS / 2, pr * MS + MS / 2, 3.5, 0, Math.PI * 2);
  mctx.fill();
  mctx.strokeStyle = '#fff';
  mctx.lineWidth = 1;
  mctx.beginPath();
  mctx.arc(pc * MS + MS / 2, pr * MS + MS / 2, 4.5, 0, Math.PI * 2);
  mctx.stroke();
}

// ──────────────────────────────────────────────────────────────
// GAME LOOP  (delta-time capped for frame-rate independence)
// ──────────────────────────────────────────────────────────────
let _lastTime = 0;

function gameLoop(timestamp) {
  if (!G.gameRunning) return;

  // Delta time in seconds, capped at 50ms to avoid spiral-of-death
  const dt = Math.min((timestamp - _lastTime) / 1000, 0.05);
  _lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = FLOOR_META[G.floor].bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const { ox, oy } = camOffset();
  drawMaze(ox, oy);
  drawItems(ox, oy);
  drawPowerups(ox, oy);
  drawParticles(ox, oy);
  drawEnemies(ox, oy);
  // Fog drawn BEFORE player so player is always visible
  drawFogOverlay(ox, oy);
  drawPlayer(ox, oy);
  drawFloatingTexts();
  drawGateHints(ox, oy);
  drawMiniMap();

  if (!G.quizActive) {
    updatePlayer();
    updateEnemies();
    checkItemPickup();
    checkPowerupPickup();
    checkGateProximity();
    checkStairProximity();
    checkEnemyCollision();
  }
  updateHUD();
  G.animFrame = requestAnimationFrame(gameLoop);
}

// ──────────────────────────────────────────────────────────────
// UPDATE PLAYER  (acceleration + friction for smooth feel)
// ──────────────────────────────────────────────────────────────
function updatePlayer() {
  const p    = G.player;
  const spd  = G.powerups['speed'] && G.powerups['speed'] > Date.now()
    ? PLAYER_SPEED * 1.75 : PLAYER_SPEED;

  const up    = G.keys['w'] || G.keys['arrowup'];
  const down  = G.keys['s'] || G.keys['arrowdown'];
  const left  = G.keys['a'] || G.keys['arrowleft'];
  const right = G.keys['d'] || G.keys['arrowright'];

  // Accelerate toward target velocity
  const targetVx = right ? spd : left ? -spd : 0;
  const targetVy = down  ? spd : up   ? -spd : 0;

  // Diagonal normalise
  const diagScale = (targetVx !== 0 && targetVy !== 0) ? 0.707 : 1;

  p.vx += (targetVx * diagScale - p.vx) * ACCEL;
  p.vy += (targetVy * diagScale - p.vy) * ACCEL;

  // Apply friction when no input
  if (!left && !right) p.vx *= FRICTION;
  if (!up   && !down)  p.vy *= FRICTION;

  // Dead-zone snap to zero (avoids infinite micro-drift)
  if (Math.abs(p.vx) < 0.05) p.vx = 0;
  if (Math.abs(p.vy) < 0.05) p.vy = 0;

  // Direction for eye rendering
  if (p.vx > 0.5)       p.dir =  1;
  else if (p.vx < -0.5) p.dir = -1;

  moveEntity(p, p.vx, p.vy);

  // Reveal fog
  const { c, r } = tileAt(p.wx, p.wy);
  revealFog(c, r, FOG_R);
}

// ──────────────────────────────────────────────────────────────
// UPDATE ENEMIES  (smooth steering, cached floor list)
// ──────────────────────────────────────────────────────────────
function updateEnemies() {
  const now = Date.now();
  const { c:pc, r:pr } = tileAt(G.player.wx, G.player.wy);

  G.enemies.forEach(e => {
    if (e.stunnedUntil > now) return;

    const { c:ec, r:er } = tileAt(e.wx, e.wy);
    const dist = Math.abs(ec - pc) + Math.abs(er - pr);

    // State transitions
    if (dist <= 8)                        e.state = 'chase';
    else if (e.state==='chase'&&dist>12)  { e.state='patrol'; e.path=[]; e.pathIdx=0; }

    // Recalculate path periodically
    e.pathTimer--;
    if (e.pathTimer <= 0) {
      e.pathTimer = e.state === 'chase' ? 20 : 45;
      if (e.state === 'chase') {
        e.path = bfsPath(G.maze, ec, er, pc, pr);
      } else {
        // Pick random floor tile from cached list
        const pool = G._floorCache;
        const tgt  = pool[Math.floor(Math.random() * pool.length)];
        e.path = bfsPath(G.maze, ec, er, tgt.c, tgt.r);
      }
      e.pathIdx = 0;
    }

    // Follow path with smooth steering
    if (e.path && e.pathIdx < e.path.length) {
      const next = e.path[e.pathIdx];
      const tx = next.c * TILE + TILE / 2;
      const ty = next.r * TILE + TILE / 2;
      const dx = tx - e.wx;
      const dy = ty - e.wy;
      const d  = Math.sqrt(dx * dx + dy * dy);
      const spd = e.state === 'chase' ? ENEMY_SPEED * 1.35 : ENEMY_SPEED;

      if (d < 3) {
        // Snap to waypoint and advance
        e.wx = tx; e.wy = ty;
        e.pathIdx++;
      } else {
        // Smooth velocity steering
        const nx = (dx / d) * spd;
        const ny = (dy / d) * spd;
        e.vx += (nx - e.vx) * 0.25;
        e.vy += (ny - e.vy) * 0.25;
        moveEntity(e, e.vx, e.vy);
      }
    }
  });
}

// ──────────────────────────────────────────────────────────────
// COLLISION CHECKS
// ──────────────────────────────────────────────────────────────
function checkEnemyCollision() {
  const now    = Date.now();
  const shield = G.powerups['shield'] && G.powerups['shield'] > now;
  if (shield || now < G.invincibleUntil) return;
  G.enemies.forEach(e => {
    const dx = e.wx - G.player.wx, dy = e.wy - G.player.wy;
    if (Math.sqrt(dx*dx+dy*dy) < 24) {
      G.lives--;
      G.invincibleUntil = now + 2000;
      Audio.enemyHit();
      G.combo = 1;
      spawnParticles(G.player.wx, G.player.wy, '#E74C3C', 20);
      addFloatingText('💀 -1 MẠNG', G.player.wx, G.player.wy-30, '#E74C3C', 22);
      e.stunnedUntil = now + 1500;
      e.path = [];
      if (G.lives <= 0) setTimeout(showGameOver, 500);
    }
  });
}

function checkItemPickup() {
  G.items.forEach(item => {
    if (item.collected) return;
    const dx = item.c*TILE+TILE/2 - G.player.wx;
    const dy = item.r*TILE+TILE/2 - G.player.wy;
    if (Math.sqrt(dx*dx+dy*dy) < TILE*0.7) {
      item.collected = true;
      G.inventory.push(item.id);
      G.score += item.pts;
      Audio.collectItem();
      spawnParticles(G.player.wx, G.player.wy, '#FFD700', 18);
      addFloatingText(`+${item.pts} ✨`, G.player.wx, G.player.wy-30, '#FFD700', 20);
      showItemPopup(item);
      updateInventoryBar();
      updateStairsLock();
    }
  });
}

function checkPowerupPickup() {
  const now = Date.now();
  G.powerupSpawns.forEach(pu => {
    if (pu.collected) return;
    const dx = pu.c*TILE+TILE/2 - G.player.wx;
    const dy = pu.r*TILE+TILE/2 - G.player.wy;
    if (Math.sqrt(dx*dx+dy*dy) < TILE*0.7) {
      pu.collected = true;
      const def = POWERUP_DEFS.find(d => d.type===pu.type);
      G.powerups[pu.type] = now + def.duration;
      Audio.powerupPickup();
      spawnParticles(G.player.wx, G.player.wy, def.color, 15);
      addFloatingText(`${def.icon} ${def.name}!`, G.player.wx, G.player.wy-30, def.color, 18);
    }
  });
}

// Returns true if all gates with lower order are already unlocked
function isPrevGatesUnlocked(gate) {
  if (gate.isFinal) return G.gates.every(g => g.unlocked);
  return G.gates.filter(g => g.order < gate.order).every(g => g.unlocked);
}

function checkGateProximity() {
  const allGates = [...G.gates, G.finalGate].filter(Boolean);
  allGates.forEach(gate => {
    if (gate.unlocked) return;
    const dx = gate.c*TILE+TILE/2 - G.player.wx;
    const dy = gate.r*TILE+TILE/2 - G.player.wy;
    if (Math.sqrt(dx*dx+dy*dy) < TILE*1.1) triggerGate(gate);
  });
}

function checkStairProximity() {
  if (!G.stairs || G.stairs.locked) return;
  const dx = G.stairs.c*TILE+TILE/2 - G.player.wx;
  const dy = G.stairs.r*TILE+TILE/2 - G.player.wy;
  if (Math.sqrt(dx*dx+dy*dy) < TILE*0.8) goNextFloor();
}

function updateStairsLock() {
  if (!G.stairs) return;
  G.stairs.locked = !G.gates.every(g => g.unlocked);
}

// ──────────────────────────────────────────────────────────────
// QUIZ SYSTEM
// ──────────────────────────────────────────────────────────────
function triggerGate(gate) {
  if (G.quizActive) return;
  // Check ordering: previous gates must be unlocked first
  if (!isPrevGatesUnlocked(gate)) return;
  // Check item requirement
  if (G.inventory.length < gate.requiredItems) return;
  G.quizActive = true;
  G.activeGate = gate;
  G.quizQueue  = gate.quizIds.map(id => QUIZ_DB.find(q => q.id===id)).filter(Boolean);
  G.quizIndex  = gate.questionsAnswered || 0;
  if (G.quizIndex >= G.quizQueue.length) {
    gate.unlocked = true;
    G.quizActive  = false;
    updateStairsLock();
    return;
  }
  showQuizModal(gate, G.quizQueue[G.quizIndex]);
}

function showQuizModal(gate, q) {
  document.getElementById('qGateIcon').textContent = gate.icon;
  document.getElementById('qGateName').textContent = gate.label;
  document.getElementById('qCat').textContent      = q.cat;
  document.getElementById('qText').textContent     = q.q;
  const streak = G.wrongStreaks[gate.id] || 0;
  const streakDisplay = streak > 0
    ? ` &nbsp;|&nbsp; ⚠️ Sai: <strong style="color:#FF4444">${streak}/3</strong>`
    : '';
  document.getElementById('qReq').innerHTML =
    `🎒 Vật phẩm: <strong>${G.inventory.length}</strong> &nbsp;|&nbsp; ` +
    `📊 Câu ${G.quizIndex+1}/${G.quizQueue.length} &nbsp;|&nbsp; ` +
    `⭐ Combo: <strong>x${G.combo}</strong>` + streakDisplay;
  const optsEl = document.getElementById('qOpts');
  optsEl.innerHTML = '';
  // Shuffle options, giữ đúng đáp án
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const shuffledOpts = indices.map(i => q.opts[i]);
  const newAns = indices.indexOf(q.ans);
  shuffledOpts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className   = 'opt-btn';
    btn.textContent = `${['A','B','C','D'][i]}. ${opt}`;
    btn.addEventListener('click', () => selectAnswer(i, { ...q, ans: newAns }));
    optsEl.appendChild(btn);
  });
  // Lưu newAns để timeout highlight đúng
  q._shuffledAns = newAns;
  document.getElementById('qFb').className   = 'quiz-fb hidden';
  document.getElementById('qClue').className = 'quiz-clue hidden';
  document.getElementById('quizModal').classList.remove('hidden');
  startQuizTimer(15);
}

function startQuizTimer(secs) {
  clearInterval(G.timerInterval);
  G.quizTimeLeft = secs;
  const ring = document.getElementById('qtRing');
  const num  = document.getElementById('qtNum');
  const circ = 106.8;
  num.textContent = secs;
  ring.style.strokeDashoffset = '0';
  ring.style.stroke = '#FF6B00';
  num.style.color   = '#fff';
  G.timerInterval = setInterval(() => {
    G.quizTimeLeft--;
    num.textContent = G.quizTimeLeft;
    ring.style.strokeDashoffset = `${circ*(1-G.quizTimeLeft/secs)}`;
    if (G.quizTimeLeft <= 5) { ring.style.stroke='#E74C3C'; num.style.color='#E74C3C'; }
    if (G.quizTimeLeft <= 0) { clearInterval(G.timerInterval); onTimeout(); }
  }, 1000);
}

function onTimeout() {
  const q = G.quizQueue[G.quizIndex];
  disableOpts();
  document.querySelectorAll('.opt-btn')[q._shuffledAns ?? q.ans]?.classList.add('correct');
  G.score = Math.max(0, G.score-20);
  G.combo = 1; G.totalAnswered++;
  Audio.wrongAnswer();

  // Count timeout as a wrong answer for streak
  const gateId = G.activeGate?.id || 'unknown';
  G.wrongStreaks[gateId] = (G.wrongStreaks[gateId] || 0) + 1;
  const streak = G.wrongStreaks[gateId];

  if (streak >= 3) {
    G.wrongStreaks[gateId] = 0;
    showQuizFb(false, `⏰ Hết giờ! Sai 3 lần – Vật phẩm bị thu hồi & cổng dịch chuyển!`);
    addFloatingText('⚠️ MẤT VẬT PHẨM!', G.player.wx, G.player.wy-50, '#FF4444', 22);
    spawnParticles(G.player.wx, G.player.wy, '#E74C3C', 30);
    setTimeout(() => { closeQuizAndPenalize(); }, 2500);
  } else {
    const remaining = 3 - streak;
    showQuizFb(false, `⏰ Hết giờ! Còn ${remaining} lần trước khi mất vật phẩm. ${q.exp}`);
    addFloatingText(`-20 ⚠️${streak}/3`, G.player.wx, G.player.wy-30, '#E74C3C', 20);
    setTimeout(advanceQuiz, 2200);
  }
}

function selectAnswer(idx, q) {
  clearInterval(G.timerInterval);
  disableOpts();
  const correct = idx === q.ans;
  const btns = document.querySelectorAll('.opt-btn');
  btns[idx].classList.add(correct ? 'correct' : 'wrong');
  if (!correct) btns[q.ans].classList.add('correct');
  G.totalAnswered++;
  if (correct) {
    // Reset wrong streak for this gate on correct answer
    if (G.activeGate) G.wrongStreaks[G.activeGate.id] = 0;
    const bonus  = G.quizTimeLeft * 6;
    const gained = (120 + bonus) * G.combo;
    G.score += gained; G.combo = Math.min(G.combo+1, 6); G.correctCount++;
    Audio.correctAnswer();
    showQuizFb(true, `✅ Chính xác! +${gained} điểm. ${q.exp}`);
    addFloatingText(`+${gained} 🔥`, G.player.wx, G.player.wy-30, '#2ECC71', 22);
    spawnParticles(G.player.wx, G.player.wy, '#2ECC71', 18);
    if (G.activeGate?.isFinal) {
      document.getElementById('qClueText').textContent = `Manh mối: ${q.exp}`;
      document.getElementById('qClue').classList.remove('hidden');
    }
    setTimeout(advanceQuiz, 2200);
  } else {
    G.score = Math.max(0, G.score-20); G.combo = 1;
    Audio.wrongAnswer();

    // Track wrong streak per gate
    const gateId = G.activeGate?.id || 'unknown';
    G.wrongStreaks[gateId] = (G.wrongStreaks[gateId] || 0) + 1;
    const streak = G.wrongStreaks[gateId];

    if (streak >= 3) {
      // Penalty: reset inventory + teleport gate
      G.wrongStreaks[gateId] = 0;
      showQuizFb(false, `❌ Sai 3 lần! Vật phẩm bị thu hồi & cổng dịch chuyển! ${q.exp}`);
      addFloatingText('⚠️ MẤT VẬT PHẨM!', G.player.wx, G.player.wy-50, '#FF4444', 22);
      spawnParticles(G.player.wx, G.player.wy, '#E74C3C', 30);
      setTimeout(() => {
        closeQuizAndPenalize();
      }, 2500);
    } else {
      const remaining = 3 - streak;
      showQuizFb(false, `❌ Sai! Còn ${remaining} lần trước khi mất vật phẩm. ${q.exp}`);
      addFloatingText(`-20 ⚠️${streak}/3`, G.player.wx, G.player.wy-30, '#E74C3C', 20);
      spawnParticles(G.player.wx, G.player.wy, '#E74C3C', 12);
      setTimeout(advanceQuiz, 2200);
    }
  }
}

function closeQuizAndPenalize() {
  const gate = G.activeGate;
  if (!gate) return;

  // Close quiz modal
  document.getElementById('quizModal').classList.add('hidden');
  G.quizActive = false;

  // Reset gate progress
  gate.questionsAnswered = 0;
  gate.unlocked = false;

  // Reset inventory for current floor
  G.inventory = [];
  G.items.forEach(item => { item.collected = false; });
  updateInventoryBar();
  updateStairsLock();

  // Teleport gate to a new random floor tile far from player
  teleportGate(gate);

  G.activeGate = null;
  Audio.enemyHit();
  addFloatingText('🚪 CỔNG DI CHUYỂN!', G.player.wx, G.player.wy - 60, '#FF6B00', 22);
  spawnParticles(gate.c * TILE + TILE / 2, gate.r * TILE + TILE / 2, '#FF6B00', 25);
}

function teleportGate(gate) {
  const { c: pc, r: pr } = tileAt(G.player.wx, G.player.wy);

  // Remove old door tile
  if (G.maze[gate.r][gate.c] === T_DOOR) {
    G.maze[gate.r][gate.c] = T_FLOOR;
  }

  // Find a new floor tile far from player and far from current gate position
  const candidates = G._floorCache.filter(t =>
    G.maze[t.r][t.c] === T_FLOOR &&
    Math.abs(t.c - pc) + Math.abs(t.r - pr) > 8 &&
    Math.abs(t.c - gate.c) + Math.abs(t.r - gate.r) > 6
  );

  if (candidates.length === 0) return; // fallback: don't move

  const newPos = candidates[Math.floor(Math.random() * candidates.length)];

  // Place door at new position
  G.maze[newPos.r][newPos.c] = T_DOOR;
  gate.c = newPos.c;
  gate.r = newPos.r;

  // Invalidate maze cache so new door renders
  _mazeCache = null;
}

function disableOpts() {
  document.querySelectorAll('.opt-btn').forEach(b => b.disabled=true);
}

function showQuizFb(ok, text) {
  const fb = document.getElementById('qFb');
  fb.textContent = text;
  fb.className   = `quiz-fb ${ok?'ok':'bad'}`;
}

function advanceQuiz() {
  const gate = G.activeGate;
  gate.questionsAnswered = (gate.questionsAnswered||0)+1;
  G.quizIndex++;
  if (G.quizIndex < G.quizQueue.length) {
    showQuizModal(gate, G.quizQueue[G.quizIndex]);
  } else {
    gate.unlocked = true;
    document.getElementById('quizModal').classList.add('hidden');
    G.quizActive = false; G.activeGate = null;
    updateStairsLock();
    Audio.gateOpen();
    spawnParticles(gate.c*TILE+TILE/2, gate.r*TILE+TILE/2, '#FFD700', 25);
    addFloatingText('🚪 CỔNG MỞ!', G.player.wx, G.player.wy-40, '#FFD700', 24);
    if (gate.isFinal) setTimeout(showVictory, 800);
  }
}

// ──────────────────────────────────────────────────────────────
// FLOOR TRANSITION
// ──────────────────────────────────────────────────────────────
function goNextFloor() {
  if (G.floor >= 2) return;
  G.gameRunning = false;
  cancelAnimationFrame(G.animFrame);
  Audio.floorTransition();
  const nextFloor = G.floor+1;
  const meta = FLOOR_META[nextFloor];
  const ft = document.getElementById('floorTransition');
  document.getElementById('ftIcon').textContent  = meta.icon;
  document.getElementById('ftTitle').textContent = `TẦNG ${meta.num}`;
  document.getElementById('ftSub').textContent   = meta.name;
  ft.classList.remove('hidden');
  setTimeout(() => {
    ft.classList.add('hidden');
    _mazeCache = null;
    G.wrongStreaks = {};
    initFloor(nextFloor);
    updateInventoryBar();
    Audio.startBgMusic(nextFloor);
    G.gameRunning = true;
    G.animFrame   = requestAnimationFrame(gameLoop);
  }, 2500);
}

// ──────────────────────────────────────────────────────────────
// AUDIO ENGINE  (Web Audio API — no external files needed)
// ──────────────────────────────────────────────────────────────
const Audio = (() => {
  let _ctx = null;
  let _masterGain = null;
  let _bgNode = null;
  let _bgGain = null;
  let _muted = false;

  function _getCtx() {
    if (!_ctx) {
      _ctx = new (window.AudioContext || window.webkitAudioContext)();
      _masterGain = _ctx.createGain();
      _masterGain.gain.value = 0.7;
      _masterGain.connect(_ctx.destination);
    }
    // Resume if suspended (browser autoplay policy)
    if (_ctx.state === 'suspended') _ctx.resume();
    return _ctx;
  }

  // Play a simple synthesized sound
  function _play(fn) {
    if (_muted) return;
    try { fn(_getCtx(), _masterGain); } catch(e) {}
  }

  // ── Sound effects ──────────────────────────────────────────

  function footstep() {
    _play((ac, out) => {
      const buf = ac.createBuffer(1, ac.sampleRate * 0.06, ac.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3) * 0.18;
      }
      const src = ac.createBufferSource();
      src.buffer = buf;
      const filter = ac.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 180 + Math.random() * 60;
      filter.Q.value = 0.8;
      src.connect(filter); filter.connect(out);
      src.start();
    });
  }

  function collectItem() {
    _play((ac, out) => {
      const g = ac.createGain();
      g.gain.setValueAtTime(0.4, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.5);
      g.connect(out);
      // Ascending arpeggio
      [523, 659, 784, 1047].forEach((freq, i) => {
        const osc = ac.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ac.currentTime + i * 0.07);
        osc.connect(g);
        osc.start(ac.currentTime + i * 0.07);
        osc.stop(ac.currentTime + i * 0.07 + 0.15);
      });
    });
  }

  function correctAnswer() {
    _play((ac, out) => {
      const g = ac.createGain();
      g.gain.setValueAtTime(0.35, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.6);
      g.connect(out);
      // Bright chord
      [523, 659, 784].forEach(freq => {
        const osc = ac.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        osc.connect(g);
        osc.start(ac.currentTime);
        osc.stop(ac.currentTime + 0.6);
      });
      // Sparkle high note
      const hi = ac.createOscillator();
      hi.type = 'sine';
      hi.frequency.setValueAtTime(1568, ac.currentTime + 0.1);
      hi.frequency.exponentialRampToValueAtTime(2093, ac.currentTime + 0.4);
      const hg = ac.createGain();
      hg.gain.setValueAtTime(0.2, ac.currentTime + 0.1);
      hg.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.5);
      hi.connect(hg); hg.connect(out);
      hi.start(ac.currentTime + 0.1);
      hi.stop(ac.currentTime + 0.5);
    });
  }

  function wrongAnswer() {
    _play((ac, out) => {
      const g = ac.createGain();
      g.gain.setValueAtTime(0.3, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.5);
      g.connect(out);
      // Descending dissonant tones
      [330, 277].forEach((freq, i) => {
        const osc = ac.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ac.currentTime + i * 0.12);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.7, ac.currentTime + i * 0.12 + 0.3);
        const og = ac.createGain();
        og.gain.setValueAtTime(0.25, ac.currentTime + i * 0.12);
        og.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.12 + 0.35);
        osc.connect(og); og.connect(out);
        osc.start(ac.currentTime + i * 0.12);
        osc.stop(ac.currentTime + i * 0.12 + 0.4);
      });
    });
  }

  function gateOpen() {
    _play((ac, out) => {
      const g = ac.createGain();
      g.gain.setValueAtTime(0.0, ac.currentTime);
      g.gain.linearRampToValueAtTime(0.4, ac.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 1.2);
      g.connect(out);
      // Majestic rising sweep
      const osc = ac.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ac.currentTime + 0.8);
      osc.connect(g);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 1.2);
      // Harmony
      const osc2 = ac.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(330, ac.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1320, ac.currentTime + 0.8);
      const g2 = ac.createGain();
      g2.gain.setValueAtTime(0.2, ac.currentTime);
      g2.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 1.0);
      osc2.connect(g2); g2.connect(out);
      osc2.start(ac.currentTime);
      osc2.stop(ac.currentTime + 1.0);
    });
  }

  function enemyHit() {
    _play((ac, out) => {
      // Impact thud + distorted buzz
      const buf = ac.createBuffer(1, ac.sampleRate * 0.15, ac.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 1.5) * 0.6;
      }
      const src = ac.createBufferSource();
      src.buffer = buf;
      const filter = ac.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 300;
      const g = ac.createGain();
      g.gain.value = 0.5;
      src.connect(filter); filter.connect(g); g.connect(out);
      src.start();
      // Pitch drop
      const osc = ac.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ac.currentTime + 0.2);
      const og = ac.createGain();
      og.gain.setValueAtTime(0.3, ac.currentTime);
      og.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.25);
      osc.connect(og); og.connect(out);
      osc.start(); osc.stop(ac.currentTime + 0.25);
    });
  }

  function powerupPickup() {
    _play((ac, out) => {
      const g = ac.createGain();
      g.gain.setValueAtTime(0.3, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.7);
      g.connect(out);
      // Magical shimmer
      [800, 1000, 1200, 1600, 2000].forEach((freq, i) => {
        const osc = ac.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const og = ac.createGain();
        og.gain.setValueAtTime(0, ac.currentTime + i * 0.05);
        og.gain.linearRampToValueAtTime(0.15, ac.currentTime + i * 0.05 + 0.04);
        og.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.05 + 0.3);
        osc.connect(og); og.connect(out);
        osc.start(ac.currentTime + i * 0.05);
        osc.stop(ac.currentTime + i * 0.05 + 0.35);
      });
    });
  }

  function floorTransition() {
    _play((ac, out) => {
      // Whoosh + deep boom
      const buf = ac.createBuffer(1, ac.sampleRate * 0.4, ac.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const t = i / ac.sampleRate;
        data[i] = (Math.random() * 2 - 1) * Math.sin(t * 8) * Math.pow(1 - t / 0.4, 2) * 0.4;
      }
      const src = ac.createBufferSource();
      src.buffer = buf;
      const filter = ac.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 600;
      filter.Q.value = 0.5;
      src.connect(filter); filter.connect(out);
      src.start();
      // Deep bass hit
      const osc = ac.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ac.currentTime + 0.5);
      const og = ac.createGain();
      og.gain.setValueAtTime(0.5, ac.currentTime);
      og.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.6);
      osc.connect(og); og.connect(out);
      osc.start(); osc.stop(ac.currentTime + 0.6);
    });
  }

  function victory() {
    _play((ac, out) => {
      // Fanfare — ascending notes
      const notes = [523, 659, 784, 1047, 1319, 1047, 784, 1047, 1319, 1568];
      const durations = [0.12, 0.12, 0.12, 0.2, 0.12, 0.1, 0.1, 0.1, 0.1, 0.5];
      let t = ac.currentTime;
      notes.forEach((freq, i) => {
        const osc = ac.createOscillator();
        osc.type = i < 3 ? 'square' : 'triangle';
        osc.frequency.value = freq;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.25, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + durations[i]);
        osc.connect(g); g.connect(out);
        osc.start(t); osc.stop(t + durations[i] + 0.05);
        t += durations[i] * 0.9;
      });
    });
  }

  function gameOver() {
    _play((ac, out) => {
      // Wah-wah trombone "womp womp" + cartoon slide down
      const t0 = ac.currentTime;

      // Classic "wah wah wah wahhh" — 3 short stabs + long slide
      const stabs = [
        { freq: 440, dur: 0.18, delay: 0 },
        { freq: 440, dur: 0.18, delay: 0.22 },
        { freq: 440, dur: 0.18, delay: 0.44 },
      ];
      stabs.forEach(s => {
        const osc = ac.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(s.freq, t0 + s.delay);
        // Wah filter
        const wah = ac.createBiquadFilter();
        wah.type = 'bandpass';
        wah.frequency.setValueAtTime(800, t0 + s.delay);
        wah.frequency.linearRampToValueAtTime(300, t0 + s.delay + s.dur);
        wah.Q.value = 3;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.28, t0 + s.delay);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + s.delay + s.dur + 0.05);
        osc.connect(wah); wah.connect(g); g.connect(out);
        osc.start(t0 + s.delay);
        osc.stop(t0 + s.delay + s.dur + 0.1);
      });

      // Long "wahhhhhh" slide down
      const slide = ac.createOscillator();
      slide.type = 'sawtooth';
      slide.frequency.setValueAtTime(440, t0 + 0.66);
      slide.frequency.exponentialRampToValueAtTime(110, t0 + 1.4);
      const slideWah = ac.createBiquadFilter();
      slideWah.type = 'bandpass';
      slideWah.frequency.setValueAtTime(600, t0 + 0.66);
      slideWah.frequency.exponentialRampToValueAtTime(150, t0 + 1.4);
      slideWah.Q.value = 4;
      const slideG = ac.createGain();
      slideG.gain.setValueAtTime(0.3, t0 + 0.66);
      slideG.gain.exponentialRampToValueAtTime(0.001, t0 + 1.5);
      slide.connect(slideWah); slideWah.connect(slideG); slideG.connect(out);
      slide.start(t0 + 0.66);
      slide.stop(t0 + 1.6);

      // Cartoon boing at the end
      const boing = ac.createOscillator();
      boing.type = 'sine';
      boing.frequency.setValueAtTime(800, t0 + 1.5);
      boing.frequency.exponentialRampToValueAtTime(60, t0 + 2.0);
      const boingG = ac.createGain();
      boingG.gain.setValueAtTime(0.2, t0 + 1.5);
      boingG.gain.exponentialRampToValueAtTime(0.001, t0 + 2.1);
      boing.connect(boingG); boingG.connect(out);
      boing.start(t0 + 1.5);
      boing.stop(t0 + 2.2);
    });
  }

  // ── Background Music Engine ────────────────────────────────
  // Full procedural music: bass, melody, chords, percussion
  // Different theme per floor, loops seamlessly

  const FLOOR_THEMES = [
    {
      // Floor 1 — Locker Room: upbeat funky pop, major key
      bpm: 108,
      key: 261.6,     // C4 root (major = bright & happy)
      bassPattern:    [0, 0, 12, 0, 7, 0, 5, 7],
      melodyPattern:  [12, 16, 19, 16, 12, 14, 16, 12],
      chordPattern:   [0, 7, 12, 5],
      kickPattern:    [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,1,0],
      snarePattern:   [0,0,0,0, 1,0,0,1, 0,0,0,0, 1,0,0,0],
      hihatPattern:   [1,0,1,1, 1,0,1,0, 1,1,1,0, 1,0,1,1],
      bgColor: [255, 107, 0],
    },
    {
      // Floor 2 — Court: energetic dance, major key
      bpm: 128,
      key: 293.7,     // D4 root
      bassPattern:    [0, 0, 0, 7, 0, 5, 7, 0],
      melodyPattern:  [19, 17, 19, 21, 19, 17, 14, 17],
      chordPattern:   [0, 7, 12, 4],
      kickPattern:    [1,0,0,0, 1,0,1,0, 1,0,0,0, 1,0,1,0],
      snarePattern:   [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,1],
      hihatPattern:   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
      bgColor: [0, 212, 255],
    },
    {
      // Floor 3 — Hall of Fame: triumphant march, major key
      bpm: 96,
      key: 246.9,     // B3 root
      bassPattern:    [0, 0, 7, 0, 5, 0, 7, 12],
      melodyPattern:  [24, 21, 19, 17, 19, 21, 24, 26],
      chordPattern:   [0, 4, 7, 12],
      kickPattern:    [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,1,0,0],
      snarePattern:   [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0],
      hihatPattern:   [1,0,1,0, 1,1,1,0, 1,0,1,0, 1,1,0,1],
      bgColor: [255, 215, 0],
    },
  ];

  // Convert semitone offset to frequency
  function _semitone(root, semi) {
    return root * Math.pow(2, semi / 12);
  }

  // Create a reverb convolver for ambience
  function _makeReverb(ac, duration = 1.5, decay = 2.0) {
    const len    = ac.sampleRate * duration;
    const buf    = ac.createBuffer(2, len, ac.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    const conv = ac.createConvolver();
    conv.buffer = buf;
    return conv;
  }

  function startBgMusic(floorIdx) {
    stopBgMusic();
    if (_muted) return;
    try {
      const ac    = _getCtx();
      const theme = FLOOR_THEMES[floorIdx] || FLOOR_THEMES[0];
      const bps   = theme.bpm / 60;          // beats per second
      const step  = 1 / (bps * 4);           // 16th note duration
      const loopLen = step * 16;             // 1 bar = 16 steps

      // Master bg gain
      _bgGain = ac.createGain();
      _bgGain.gain.value = 0;
      _bgGain.connect(_masterGain);
      // Fade in
      _bgGain.gain.linearRampToValueAtTime(0.55, ac.currentTime + 2.0);

      // Reverb for ambience
      const reverb    = _makeReverb(ac, 1.8, 2.5);
      const reverbGain = ac.createGain();
      reverbGain.gain.value = 0.18;
      reverb.connect(reverbGain);
      reverbGain.connect(_bgGain);

      // ── Drone / pad layer ──────────────────────────────────
      const droneGain = ac.createGain();
      droneGain.gain.value = 0.12;
      droneGain.connect(_bgGain);

      const drone1 = ac.createOscillator();
      drone1.type = 'sine';
      drone1.frequency.value = theme.key / 2;
      drone1.connect(droneGain);
      drone1.start();

      const drone2 = ac.createOscillator();
      drone2.type = 'sine';
      drone2.frequency.value = theme.key / 2 * 1.004; // slight detune for beating
      const d2g = ac.createGain(); d2g.gain.value = 0.7;
      drone2.connect(d2g); d2g.connect(droneGain);
      drone2.start();

      // Pad chord (stacked fifths)
      const padGain = ac.createGain();
      padGain.gain.value = 0.07;
      padGain.connect(_bgGain);
      padGain.connect(reverb);
      [0, 7, 12, 19].forEach(semi => {
        const osc = ac.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = _semitone(theme.key, semi);
        const og = ac.createGain(); og.gain.value = 0.25;
        osc.connect(og); og.connect(padGain);
        osc.start();
      });

      // LFO for pad tremolo
      const lfo = ac.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.3 + floorIdx * 0.1;
      const lfoG = ac.createGain(); lfoG.gain.value = 0.03;
      lfo.connect(lfoG); lfoG.connect(padGain.gain);
      lfo.start();

      // ── Sequencer: bass + melody + chords + drums ──────────
      let _stopped = false;
      let step16   = 0;

      // Bass synth
      function scheduleBass(t, note) {
        if (note < 0) return;
        const freq = _semitone(theme.key / 2, note);
        const osc  = ac.createOscillator();
        osc.type   = 'sawtooth';
        osc.frequency.value = freq;
        const filt = ac.createBiquadFilter();
        filt.type  = 'lowpass';
        filt.frequency.setValueAtTime(800, t);
        filt.frequency.exponentialRampToValueAtTime(200, t + step * 0.8);
        const g = ac.createGain();
        g.gain.setValueAtTime(0.0, t);
        g.gain.linearRampToValueAtTime(0.28, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.001, t + step * 0.85);
        osc.connect(filt); filt.connect(g); g.connect(_bgGain);
        osc.start(t); osc.stop(t + step);
      }

      // Melody synth — square wave = bright & punchy
      function scheduleMelody(t, note) {
        if (note < 0) return;
        const freq = _semitone(theme.key, note);
        const osc  = ac.createOscillator();
        osc.type   = 'square';
        osc.frequency.value = freq;
        // Slight pitch vibrato for liveliness
        const vib = ac.createOscillator();
        vib.type = 'sine'; vib.frequency.value = 6;
        const vibG = ac.createGain(); vibG.gain.value = freq * 0.008;
        vib.connect(vibG); vibG.connect(osc.frequency);
        vib.start(t); vib.stop(t + step * 2 + 0.05);
        const filt = ac.createBiquadFilter();
        filt.type = 'lowpass'; filt.frequency.value = 2200;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.0, t);
        g.gain.linearRampToValueAtTime(0.11, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, t + step * 1.6);
        osc.connect(filt); filt.connect(g);
        g.connect(reverb);
        g.connect(_bgGain);
        osc.start(t); osc.stop(t + step * 2);
      }

      // Chord stab
      function scheduleChord(t, rootSemi) {
        [rootSemi, rootSemi + 3, rootSemi + 7].forEach(semi => {
          const osc = ac.createOscillator();
          osc.type  = 'triangle';
          osc.frequency.value = _semitone(theme.key, semi);
          const g = ac.createGain();
          g.gain.setValueAtTime(0.0, t);
          g.gain.linearRampToValueAtTime(0.06, t + 0.01);
          g.gain.exponentialRampToValueAtTime(0.001, t + step * 3);
          osc.connect(g);
          g.connect(reverb);
          g.connect(_bgGain);
          osc.start(t); osc.stop(t + step * 4);
        });
      }

      // Kick drum
      function scheduleKick(t) {
        const osc = ac.createOscillator();
        osc.type  = 'sine';
        osc.frequency.setValueAtTime(160, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.08);
        const g = ac.createGain();
        g.gain.setValueAtTime(0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(g); g.connect(_bgGain);
        osc.start(t); osc.stop(t + 0.15);
      }

      // Snare drum
      function scheduleSnare(t) {
        const buf  = ac.createBuffer(1, ac.sampleRate * 0.12, ac.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
        }
        const src  = ac.createBufferSource();
        src.buffer = buf;
        const filt = ac.createBiquadFilter();
        filt.type  = 'bandpass';
        filt.frequency.value = 1800;
        filt.Q.value = 0.7;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.22, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        src.connect(filt); filt.connect(g); g.connect(_bgGain);
        src.start(t);
      }

      // Hi-hat
      function scheduleHihat(t, open = false) {
        const buf  = ac.createBuffer(1, ac.sampleRate * (open ? 0.18 : 0.04), ac.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);
        }
        const src  = ac.createBufferSource();
        src.buffer = buf;
        const filt = ac.createBiquadFilter();
        filt.type  = 'highpass';
        filt.frequency.value = 8000;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.08, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + (open ? 0.15 : 0.03));
        src.connect(filt); filt.connect(g); g.connect(_bgGain);
        src.start(t);
      }

      // Schedule one bar ahead, loop
      function scheduleBar(startTime) {
        if (_stopped) return;
        for (let i = 0; i < 16; i++) {
          const t = startTime + i * step;
          const bassNote   = theme.bassPattern[i % theme.bassPattern.length];
          const melodyNote = theme.melodyPattern[i % theme.melodyPattern.length];
          const chordNote  = theme.chordPattern[i % theme.chordPattern.length];

          // Bass on every step
          scheduleBass(t, bassNote);

          // Melody on every 2nd step
          if (i % 2 === 0) scheduleMelody(t, melodyNote);

          // Chord stab on beat 1 and 3 (steps 0, 8)
          if (i === 0 || i === 8) scheduleChord(t, chordNote);

          // Drums
          if (theme.kickPattern[i])  scheduleKick(t);
          if (theme.snarePattern[i]) scheduleSnare(t);
          if (theme.hihatPattern[i]) scheduleHihat(t, i % 8 === 7);
        }
        // Schedule next bar
        setTimeout(() => scheduleBar(startTime + loopLen), (loopLen - 0.1) * 1000);
      }

      // Start slightly in the future to avoid glitches
      scheduleBar(ac.currentTime + 0.1);

      _bgNode = { drone1, drone2, lfo, _stop: () => { _stopped = true; } };
    } catch(e) { console.warn('Audio error:', e); }
  }

  function stopBgMusic() {
    if (_bgNode) {
      try {
        if (_bgNode._stop) _bgNode._stop();
        ['drone1','drone2','lfo'].forEach(k => {
          try { _bgNode[k]?.stop(); } catch(e) {}
        });
      } catch(e) {}
      _bgNode = null;
    }
    if (_bgGain) {
      try {
        _bgGain.gain.linearRampToValueAtTime(0, _getCtx().currentTime + 0.3);
      } catch(e) {}
      _bgGain = null;
    }
  }

  function toggleMute() {
    _muted = !_muted;
    if (_masterGain) _masterGain.gain.value = _muted ? 0 : 0.7;
    return _muted;
  }

  return { footstep, collectItem, correctAnswer, wrongAnswer, gateOpen,
           enemyHit, powerupPickup, floorTransition, victory, gameOver,
           startBgMusic, stopBgMusic, toggleMute };
})();

// ──────────────────────────────────────────────────────────────
// PARTICLES & FLOATING TEXT
// ──────────────────────────────────────────────────────────────
function spawnParticles(wx, wy, color, count=12) {
  for (let i=0; i<count; i++) {
    const angle = (Math.PI*2*i)/count + Math.random()*0.5;
    const spd   = 2 + Math.random()*4;
    G.particles.push({ x:wx, y:wy, vx:Math.cos(angle)*spd, vy:Math.sin(angle)*spd, life:1, color, size:4+Math.random()*5 });
  }
}

function addFloatingText(text, wx, wy, color, size=20) {
  const { ox, oy } = camOffset();
  G.floatingTexts.push({ text, color, size, x:wx+ox, y:wy+oy, life:1 });
}

// ──────────────────────────────────────────────────────────────
// HUD & UI  (throttled — only update DOM when values change)
// ──────────────────────────────────────────────────────────────
const _hudCache = { floor:'', score:'', combo:'', lives:'', time:'', hints:'' };

function updateHUD() {
  const floor = `${G.floor+1}/3`;
  const score = G.score.toLocaleString('vi-VN');
  const combo = `x${G.combo}`;
  const lives = '❤️'.repeat(G.lives) + '🖤'.repeat(Math.max(0, 3 - G.lives));

  G.elapsed = Math.floor((Date.now() - G.startTime) / 1000);
  const m   = String(Math.floor(G.elapsed / 60)).padStart(2, '0');
  const s   = String(G.elapsed % 60).padStart(2, '0');
  const time = `${m}:${s}`;

  const now = Date.now();
  const hArr = [];
  if (G.powerups['speed']  && G.powerups['speed']  > now) hArr.push(`⚡${Math.ceil((G.powerups['speed'] -now)/1000)}s`);
  if (G.powerups['shield'] && G.powerups['shield'] > now) hArr.push(`🛡️${Math.ceil((G.powerups['shield']-now)/1000)}s`);
  if (G.powerups['reveal'] && G.powerups['reveal'] > now) hArr.push(`👁️${Math.ceil((G.powerups['reveal']-now)/1000)}s`);
  const hints = hArr.join('  ');

  if (floor !== _hudCache.floor) { document.getElementById('hudFloor').textContent = floor; _hudCache.floor = floor; }
  if (score !== _hudCache.score) { document.getElementById('hudScore').textContent = score; _hudCache.score = score; }
  if (combo !== _hudCache.combo) { document.getElementById('hudCombo').textContent = combo; _hudCache.combo = combo; }
  if (lives !== _hudCache.lives) { document.getElementById('hudLives').textContent = lives; _hudCache.lives = lives; }
  if (time  !== _hudCache.time)  { document.getElementById('hudTime').textContent  = time;  _hudCache.time  = time;  }
  if (hints !== _hudCache.hints) { document.getElementById('invHint').textContent  = hints; _hudCache.hints = hints; }
}

function updateInventoryBar() {
  const slots = document.getElementById('inv-slots');
  slots.innerHTML = '';
  const floorItems = ITEM_DEFS.filter(d => d.floor === G.floor+1);
  floorItems.forEach(def => {
    const div = document.createElement('div');
    div.className = 'inv-slot' + (G.inventory.includes(def.id) ? ' filled' : '');
    div.textContent = G.inventory.includes(def.id) ? def.icon : '';
    div.title = def.name;
    slots.appendChild(div);
  });
}

function showItemPopup(item) {
  const popup = document.getElementById('itemPopup');
  document.getElementById('ipIcon').textContent = item.icon;
  document.getElementById('ipName').textContent = item.name;
  document.getElementById('ipDesc').textContent = item.desc;
  popup.classList.remove('hidden');
  setTimeout(() => popup.classList.add('hidden'), 2500);
}

// ──────────────────────────────────────────────────────────────
// GAME OVER / VICTORY
// ──────────────────────────────────────────────────────────────
function showGameOver() {
  G.gameRunning = false;
  cancelAnimationFrame(G.animFrame);
  clearInterval(G.timerInterval);
  Audio.stopBgMusic();
  Audio.gameOver();
  document.getElementById('quizModal').classList.add('hidden');
  document.getElementById('goScore').textContent = G.score.toLocaleString('vi-VN');
  document.getElementById('goFloor').textContent = G.floor+1;
  document.getElementById('goItems').textContent = `${G.inventory.length}/15`;
  document.getElementById('goMsg').textContent   = 'Bạn đã bị bóng ma bắt! Hãy thử lại!';
  showScreen('screen-gameover');
}

function showVictory() {
  G.gameRunning = false;
  cancelAnimationFrame(G.animFrame);
  clearInterval(G.timerInterval);
  Audio.stopBgMusic();
  Audio.victory();
  const acc = G.totalAnswered > 0 ? Math.round((G.correctCount/G.totalAnswered)*100) : 0;
  if (G.score > G.bestScore) { G.bestScore=G.score; localStorage.setItem('hl_best',G.bestScore); }
  const m = String(Math.floor(G.elapsed/60)).padStart(2,'0');
  const s = String(G.elapsed%60).padStart(2,'0');
  document.getElementById('vicScore').textContent = G.score.toLocaleString('vi-VN');
  document.getElementById('vicTime').textContent  = `${m}:${s}`;
  document.getElementById('vicAcc').textContent   = `${acc}%`;
  document.getElementById('vicBest').textContent  = G.bestScore.toLocaleString('vi-VN');
  document.getElementById('vicRank').textContent  =
    acc>=90&&G.score>=5000 ? '👑 HUYỀN THOẠI TUYỆT ĐỐI' :
    acc>=75                ? '🌟 NGÔI SAO NBA' :
    acc>=60                ? '🏀 CẦU THỦ CHUYÊN NGHIỆP' :
                             '💪 TÂN BINH TIỀM NĂNG';
  showScreen('screen-victory');
}

// ──────────────────────────────────────────────────────────────
// SCREEN MANAGEMENT
// ──────────────────────────────────────────────────────────────
const ALL_SCREENS = ['screen-menu','screen-story','screen-how','screen-game','screen-gameover','screen-victory'];
function showScreen(id) {
  ALL_SCREENS.forEach(sid => document.getElementById(sid)?.classList.toggle('active', sid===id));
}

// ──────────────────────────────────────────────────────────────
// START GAME
// ──────────────────────────────────────────────────────────────
function startGame() {
  G.score=0; G.lives=3; G.combo=1;
  G.correctCount=0; G.totalAnswered=0;
  G.startTime=Date.now(); G.elapsed=0;
  G.inventory=[]; G.powerups={}; G.keys={};
  G.quizActive=false; G.particles=[]; G.floatingTexts=[];
  G.wrongStreaks={};
  // Reset HUD cache so all values re-render
  Object.keys(_hudCache).forEach(k => _hudCache[k] = '');
  _mazeCache = null;
  initFloor(0);
  updateInventoryBar();
  updateHUD();
  showScreen('screen-game');
  if (G.animFrame) cancelAnimationFrame(G.animFrame);
  G.gameRunning = true;
  G.animFrame   = requestAnimationFrame(gameLoop);
  Audio.startBgMusic(0);
  // Floor 1 intro
  const meta = FLOOR_META[0];
  const ft   = document.getElementById('floorTransition');
  document.getElementById('ftIcon').textContent  = meta.icon;
  document.getElementById('ftTitle').textContent = `TẦNG ${meta.num}`;
  document.getElementById('ftSub').textContent   = meta.name;
  ft.classList.remove('hidden');
  setTimeout(() => ft.classList.add('hidden'), 2000);
}

// ──────────────────────────────────────────────────────────────
// INPUT
// ──────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => { G.keys[e.key.toLowerCase()]=true; });
document.addEventListener('keyup',   e => { G.keys[e.key.toLowerCase()]=false; });

document.querySelectorAll('.dp[data-k]').forEach(btn => {
  const k = btn.dataset.k;
  const press   = () => { G.keys[`arrow${k}`]=true; };
  const release = () => { G.keys[`arrow${k}`]=false; };
  btn.addEventListener('touchstart', e => { e.preventDefault(); press(); },   { passive:false });
  btn.addEventListener('touchend',   e => { e.preventDefault(); release(); }, { passive:false });
  btn.addEventListener('mousedown',  press);
  btn.addEventListener('mouseup',    release);
  btn.addEventListener('mouseleave', release);
});

// ──────────────────────────────────────────────────────────────
// MENU WIRING
// ──────────────────────────────────────────────────────────────
document.getElementById('btnStart').addEventListener('click',    startGame);
document.getElementById('btnStory').addEventListener('click',    () => showScreen('screen-story'));
document.getElementById('btnHow').addEventListener('click',      () => showScreen('screen-how'));
document.getElementById('btnStoryBack').addEventListener('click',() => showScreen('screen-menu'));
document.getElementById('btnHowBack').addEventListener('click',  () => showScreen('screen-menu'));
document.getElementById('btnRetry').addEventListener('click',    startGame);
document.getElementById('btnGoMenu').addEventListener('click',   () => showScreen('screen-menu'));
document.getElementById('btnVicPlay').addEventListener('click',  startGame);
document.getElementById('btnVicMenu').addEventListener('click',  () => showScreen('screen-menu'));

document.getElementById('btnMute').addEventListener('click', () => {
  const muted = Audio.toggleMute();
  document.getElementById('btnMute').textContent = muted ? '🔇' : '🔊';
});

// ──────────────────────────────────────────────────────────────
// MENU PARTICLES (decorative)
// ──────────────────────────────────────────────────────────────
const _style = document.createElement('style');
_style.textContent = `
@keyframes menuFloat {
  from { transform:translateY(0) rotate(0deg); opacity:0.6; }
  to   { transform:translateY(-110vh) rotate(360deg); opacity:0; }
}`;
document.head.appendChild(_style);

(function spawnMenuParticles() {
  const container = document.getElementById('menuParticles');
  if (!container) return;
  setInterval(() => {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;left:${Math.random()*100}%;top:${100+Math.random()*10}%;`+
      `font-size:${16+Math.random()*24}px;opacity:${0.3+Math.random()*0.5};`+
      `animation:menuFloat ${4+Math.random()*4}s linear forwards;pointer-events:none;`;
    el.textContent = ['🏀','⭐','🏆','💫','🔥'][Math.floor(Math.random()*5)];
    container.appendChild(el);
    setTimeout(() => el.remove(), 8000);
  }, 600);
})();

// ──────────────────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────────────────
(function init() {
  const best = parseInt(localStorage.getItem('hl_best')||'0', 10);
  const rec  = document.getElementById('menuRecord');
  if (rec) rec.textContent = best>0 ? `🏆 Kỷ lục: ${best.toLocaleString('vi-VN')} điểm` : '';
  showScreen('screen-menu');
})();

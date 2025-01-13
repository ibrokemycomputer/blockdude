export class LevelEditor {
  #canvas;
  #ctx;
  #grid = [];
  #currentTool = '#';
  #cellSize = 30;
  #isDragging = false;
  #sprites = {
    '#': new Image(),
    'B': new Image(),
    'D': new Image(),
    'U': new Image()
  };

  constructor() {
    this.#canvas = document.querySelector('main canvas');
    this.#ctx = this.#canvas.getContext('2d');

    // Load sprites
    this.#sprites['#'].src = './images/brick.svg';
    this.#sprites['B'].src = './images/block.svg';
    this.#sprites['D'].src = './images/door.svg';
    this.#sprites['U'].src = './images/dudeLeft.svg';

    this.#initializeEventListeners();

    // Wait for sprites to load then init
    Promise.all(Object.values(this.#sprites).map(img => {
      return new Promise((resolve) => img.onload = resolve);
    })).then(() => {
      this.initGrid(18, 12);
      this.selectTool('#');
    });
  }

  #initializeEventListeners() {
    // Canvas events
    this.#canvas.addEventListener('mousedown', (e) => {
      this.#isDragging = true;
      this.#handleCanvasClick(e);
    });

    this.#canvas.addEventListener('mousemove', (e) => {
      if (this.#isDragging) this.#handleCanvasClick(e);
    });

    this.#canvas?.addEventListener('mouseup', () => this.#isDragging = false);
    this.#canvas?.addEventListener('mouseleave', () => this.#isDragging = false);

    // Button events
    document.getElementById('resizeBtn')?.addEventListener('click', () => this.#resizeGrid());
    document.getElementById('exportBtn')?.addEventListener('click', () => this.#exportLevel());
    document.getElementById('importBtn')?.addEventListener('click', () => this.#importLevel());
    document.getElementById('generateBtn')?.addEventListener('click', () => this.#generatePassword());
    document.getElementById('urlImportBtn')?.addEventListener('click', () => this.#importFromUrl());

    // Generate a password on load
    this.#generatePassword();

    // Tool selection
    const toolButtons = document.querySelectorAll('[data-tool]');
    toolButtons.forEach(button => {
      button.addEventListener('click', () => this.selectTool(button.dataset.tool));
    });
  }

  initGrid(width, height) {
    this.#grid = Array(height).fill().map(() => Array(width).fill(' '));
    this.#canvas.width = width * this.#cellSize;
    this.#canvas.height = height * this.#cellSize;
    this.#drawGrid();
  }

  #drawGrid() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    for (let y = 0; y < this.#grid.length; y++) {
      for (let x = 0; x < this.#grid[0].length; x++) {
        this.#ctx.strokeStyle = '#ccc';
        this.#ctx.strokeRect(x * this.#cellSize, y * this.#cellSize, this.#cellSize, this.#cellSize);

        const cell = this.#grid[y][x];
        if (cell !== ' ' && this.#sprites[cell]) {
          this.#ctx.drawImage(this.#sprites[cell],
            x * this.#cellSize,
            y * this.#cellSize,
            this.#cellSize,
            this.#cellSize
          );
        }
      }
    }
  }

  selectTool(tool) {
    this.#currentTool = tool;
    document.querySelectorAll('button')?.forEach(btn => btn.classList.remove('selected'));
    document.getElementById(tool + 'Btn')?.classList.add('selected');
  }

  #handleCanvasClick(e) {
    const rect = this.#canvas?.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / this.#cellSize);
    const y = Math.floor((e.clientY - rect.top) / this.#cellSize);

    if (x >= 0 && x < this.#grid[0].length && y >= 0 && y < this.#grid.length) {
      if (this.#currentTool === 'U') {
        for (let i = 0; i < this.#grid.length; i++) {
          for (let j = 0; j < this.#grid[0].length; j++) {
            if (this.#grid[i][j] === 'U') this.#grid[i][j] = ' ';
          }
        }
        this.#grid[y][x] = 'U';
      } else {
        this.#grid[y][x] = this.#currentTool === 'empty' ? ' ' : this.#currentTool;
      }
      this.#drawGrid();
    }
  }

  #exportLevel() {
    const levelText = this.#generateLevelText();
    const output = document.getElementById('output');
    output.value = levelText;

    // Find player position
    const start = this.#findStartPosition();

    // Generate URL-friendly format
    const levelData = {
      map: this.#generateLevelArray(),
      start: start,
      door: this.#findDoorPosition()
    };

    const urlParam = encodeURIComponent(JSON.stringify(levelData));
    const baseUrl = window.location.origin + window.location.pathname.replace('editor', '');
    const urlOutput = document.getElementById('urlOutput');
    urlOutput.value = `${baseUrl}?level=${urlParam}`;
  }

  #generateLevelText() {
    let text = '';
    for (let y = 0; y < this.#grid.length; y++) {
      for (let x = 0; x < this.#grid[y].length; x++) {
        text += this.#grid[y][x];
      }
      if (y < this.#grid.length - 1) {
        text += '\n';
      }
    }
    return text;
  }

  #generateLevelArray() {
    const array = [];
    for (let y = 0; y < this.#grid.length; y++) {
      const row = [];
      for (let x = 0; x < this.#grid[0].length; x++) {
        const cell = this.#grid[y][x];
        row.push(cell === ' ' ? ' ' : cell);
      }
      array.push(row);
    }
    return array;
  }

  #findStartPosition() {
    for (let y = 0; y < this.#grid.length; y++) {
      for (let x = 0; x < this.#grid[0].length; x++) {
        if (this.#grid[y][x] === 'U') {
          return { x, y };
        }
      }
    }
    return { x: 0, y: 0 };
  }

  #findDoorPosition() {
    for (let y = 0; y < this.#grid.length; y++) {
      for (let x = 0; x < this.#grid[0].length; x++) {
        if (this.#grid[y][x] === 'D') {
          return { x, y };
        }
      }
    }
    return null;
  }

  #resizeGrid() {
    const width = parseInt(document.getElementById('widthInput').value);
    const height = parseInt(document.getElementById('heightInput').value);
    this.initGrid(width, height);
  }

  #importLevel() {
    const importText = document.getElementById('import').value.trim();
    if (!importText) {
      alert('Please paste a level first');
      return;
    }

    const rows = importText.split('\n');
    if (rows.length === 0) {
      alert('Invalid level format');
      return;
    }

    const width = Math.max(...rows.map(row => row.length));
    const height = rows.length;
    const validChars = new Set([' ', '#', 'B', 'D', 'U']);

    let hasDude = false;
    let hasDoor = false;

    for (const row of rows) {
      for (const char of row) {
        if (!validChars.has(char)) {
          alert('Invalid character found: ' + char);
          return;
        }
        if (char === 'U') hasDude = true;
        if (char === 'D') hasDoor = true;
      }
    }

    if (!hasDude || !hasDoor) {
      alert('Level must contain both a Dude (U) and a Door (D)');
      return;
    }

    document.getElementById('widthInput').value = width;
    document.getElementById('heightInput').value = height;

    this.initGrid(width, height);

    for (let y = 0; y < rows.length; y++) {
      const chars = rows[y].split('');
      for (let x = 0; x < chars.length; x++) {
        this.#grid[y][x] = chars[x];
      }
    }

    this.#drawGrid();
  }

  #importFromUrl() {
    const urlInput = document.getElementById('urlImport');
    const url = urlInput.value.trim();
    
    if (!url) {
      alert('Please enter a level URL');
      return;
    }

    try {
      const urlObj = new URL(url);
      const levelParam = urlObj.searchParams.get('level');
      
      if (!levelParam) {
        alert('Invalid level URL');
        return;
      }

      const levelData = JSON.parse(decodeURIComponent(levelParam));
      
      if (!levelData.map || !levelData.start || !levelData.door) {
        alert('Invalid level data in URL');
        return;
      }

      const width = levelData.map[0].length;
      const height = levelData.map.length;

      document.getElementById('widthInput').value = width;
      document.getElementById('heightInput').value = height;

      this.initGrid(width, height);
      this.#grid = levelData.map;
      this.#drawGrid();
      
      urlInput.value = '';
    } catch (error) {
      alert('Error importing level from URL: ' + error.message);
    }
  }

  #generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 3; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('passwordDisplay')?.textContent = password;
  }
}

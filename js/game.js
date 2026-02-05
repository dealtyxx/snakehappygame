/**
 * 蛇年接福 - 2025新春H5小游戏
 * 湖南信息学院计算机科学与工程学院
 * 完整版 - 3D视觉 + 声光电反馈 + 丰富游戏系统
 */

// ==================== 游戏配置 ====================
const CONFIG = {
    // 基础设置
    GAME_DURATION: 60,
    BASE_SPAWN_INTERVAL: 1200,
    MIN_SPAWN_INTERVAL: 400,
    BASE_FALL_SPEED: 2.5,
    MAX_FALL_SPEED: 6,
    PLAYER_SPEED: 10,

    // 难度递进
    LEVEL_DURATION: 10,
    SPEED_INCREMENT: 0.4,
    SPAWN_DECREMENT: 100,

    // 连击系统
    COMBO_TIMEOUT: 1500,
    COMBO_MULTIPLIERS: [1, 1.2, 1.5, 2, 2.5, 3],

    // 技能系统
    SKILL_MAGNET_DURATION: 5000,
    SKILL_SLOW_DURATION: 4000,
    SKILL_FEVER_DURATION: 6000,
    SKILL_CHARGE_ITEMS: 5,

    // Buff持续时间
    BUFF_INVINCIBLE: 4000,
    BUFF_DOUBLE: 5000,

    // 特殊事件
    GOLD_RAIN_CHANCE: 0.03,
    GOLD_RAIN_DURATION: 5000,

    // 🐍 小蛇角色图标 (icons/0/ 文件夹，1-15.png)
    PLAYER_ICONS: Array.from({ length: 15 }, (_, i) => `icons/0/${i + 1}.png`),

    // 物品配置 (icons/1/ 文件夹，i1-i9.png)
    ITEMS: {
        HONGBAO:     { emoji: '🧧', img: 'icons/1/i1.png', score: 10,  prob: 0.32, name: '红包' },
        YUANBAO:     { emoji: '💰', img: 'icons/1/i2.png', score: 20,  prob: 0.23, name: '元宝' },
        BIANPAO:     { emoji: '🧨', img: 'icons/1/i3.png', score: 30,  prob: 0.13, name: '鞭炮' },
        FUZI:        { emoji: '🀄', img: 'icons/1/i4.png', score: 50,  prob: 0.06, name: '福字', buff: 'invincible' },
        STAR:        { emoji: '⭐', img: 'icons/1/i5.png', score: 25,  prob: 0.06, name: '星星', buff: 'double' },
        TANGHULU:    { emoji: '🍡', img: 'icons/1/i6.png', score: 15,  prob: 0.05, name: '糖葫芦' },
        COLLEGE:     { emoji: '🎓', img: 'icons/1/i7.png', score: 40,  prob: 0.04, name: '学院徽章', buff: 'double' },
        FIRECRACKER: { emoji: '🎆', img: 'icons/1/i8.png', score: 35,  prob: 0.03, name: '烟花' },
        QIONGSHEN:   { emoji: '👻', img: 'icons/1/i9.png', score: -30, prob: 0.08, name: '穷神', negative: true }
    },

    // 祝福语 - 蛇年传统文化版
    BLESSINGS: [
        { min: 0,    max: 150,  text: '🐍 灵蛇初醒，蓄势待发，来年再接福运！', rank: 'D' },
        { min: 151,  max: 350,  text: '🧧 金蛇献瑞，红包满堂，恭喜发财！', rank: 'C' },
        { min: 351,  max: 600,  text: '💰 灵蛇衔珠，财源广进，蛇年大吉大利！', rank: 'B' },
        { min: 601,  max: 900,  text: '🎆 瑞蛇呈祥，福星高照，万事如意顺心！', rank: 'A' },
        { min: 901,  max: 1200, text: '🏆 金蛇狂舞迎春到，福禄寿喜财神到！', rank: 'S' },
        { min: 1201, max: Infinity, text: '👑 龙蛇腾跃紫气来，五福临门贺新春！恭祝蛇年鸿运当头！', rank: 'SS' }
    ],

    // 成就 (icons/3/ 文件夹，s1-s7.png)
    ACHIEVEMENTS: {
        FIRST_BLOOD:  { name: '初次接福',   desc: '首次得分',           icon: '🎯', img: 'icons/3/s1.png' },
        SNAKE_GUARD:  { name: '蛇年守护者', desc: '完成一局游戏',       icon: '🐍', img: 'icons/3/s2.png' },
        COMBO_10:     { name: '连击大师',   desc: '达成10连击',         icon: '💥', img: 'icons/3/s3.png' },
        SCORE_500:    { name: '小有所成',   desc: '单局500分',          icon: '⭐', img: 'icons/3/s4.png' },
        SCORE_1000:   { name: '财运亨通',   desc: '单局1000分',         icon: '🌟', img: 'icons/3/s4.png' },
        FU_COLLECTOR: { name: '集福达人',   desc: '收集5个福字',        icon: '🀄', img: 'icons/3/s5.png' },
        SURVIVOR:     { name: '金蛇护体',   desc: '无敌状态躲避穷神',   icon: '🛡️', img: 'icons/3/s6.png' },
        COLLEGE_FAN:  { name: '学院之星',   desc: '收集3个学院徽章',    icon: '🎓', img: 'icons/3/s7.png' }
    },

    // 音效配置
    SOUNDS: {
        BGM_VOLUME: 0.3,
        SFX_VOLUME: 0.5
    },

    // 🎁 盲盒系统配置
    LUCKY_BOX: {
        // 盲盒等级（根据分数解锁）
        LEVELS: [
            { min: 0,    max: 200,  name: '铜福盲盒', color: '#CD7F32', multiplier: 1 },
            { min: 201,  max: 500,  name: '银福盲盒', color: '#C0C0C0', multiplier: 1.5 },
            { min: 501,  max: 800,  name: '金福盲盒', color: '#FFD700', multiplier: 2 },
            { min: 801,  max: 1100, name: '紫气盲盒', color: '#9400D3', multiplier: 3 },
            { min: 1101, max: Infinity, name: '鸿运盲盒', color: '#FF4500', multiplier: 5 }
        ],
        // 奖励池 - 蛇年主题彩蛋 (icons/2/ 文件夹，g1-g7.png)
        REWARDS: [
            // 红包类
            { type: 'hongbao', icon: '🧧', img: 'icons/2/g1.png', title: '新年红包',
              descs: ['恭喜获得 {amount} 元虚拟红包！', '蛇年红包送到，财运滚滚来！'],
              blessings: ['愿您蛇年财运亨通！', '红包拿来，好运自来！', '蛇年发大财！'],
              amounts: [66, 88, 168, 288, 388, 666, 888, 1888], weight: 25 },
            // 金元宝
            { type: 'yuanbao', icon: '💰', img: 'icons/2/g2.png', title: '金蛇献宝',
              descs: ['获得 {amount} 两黄金元宝！', '金蛇吐珠，宝藏无数！'],
              blessings: ['招财进宝，富贵盈门！', '金玉满堂！', '财源广进！'],
              amounts: [1, 3, 5, 8, 10, 18, 28, 88], weight: 20 },
            // 福字
            { type: 'fu', icon: '🀄', img: 'icons/2/g3.png', title: '五福临门',
              descs: ['集齐【{fu}】福！', '恭喜获得稀有福字！'],
              blessings: ['五福临门，万事如意！', '福气满满！', '福星高照！'],
              fus: ['长寿福', '富贵福', '康宁福', '好德福', '善终福'], weight: 15 },
            // 生肖签
            { type: 'sign', icon: '🐍', img: 'icons/2/g4.png', title: '蛇年灵签',
              descs: ['抽得【{sign}】！', '蛇仙赐签：{sign}'],
              blessings: ['蛇年大吉，心想事成！', '灵蛇护佑，诸事顺遂！'],
              signs: ['上上签·鸿运当头', '上签·步步高升', '中上签·平安喜乐',
                      '中签·稳中求进', '吉签·柳暗花明'], weight: 15 },
            // 学业祝福（学院特色）
            { type: 'study', icon: '🎓', img: 'icons/2/g5.png', title: '学业有成',
              descs: ['获得学霸BUFF！', '学神附体！'],
              blessings: ['逢考必过，科科满分！', '学业进步，前程似锦！', '金榜题名！'],
              amounts: [100], weight: 10 },
            // 爱情桃花
            { type: 'love', icon: '💕', img: 'icons/2/g6.png', title: '桃花运来',
              descs: ['桃花指数 +{amount}！', '月老牵线，姻缘天定！'],
              blessings: ['愿得一心人，白首不相离！', '桃花朵朵开！', '脱单成功！'],
              amounts: [80, 90, 95, 99, 100], weight: 8 },
            // 健康祝福
            { type: 'health', icon: '💪', img: 'icons/2/g7.png', title: '龙马精神',
              descs: ['获得健康加持！', '生命值 +{amount}！'],
              blessings: ['身体健康，万事如意！', '龙马精神，活力满满！'],
              amounts: [100, 200, 500, 999], weight: 7 }
        ]
    }
};

// ==================== 游戏状态 ====================
const state = {
    // 运行状态
    isRunning: false,
    isPaused: false,

    // 分数与时间
    score: 0,
    timeLeft: CONFIG.GAME_DURATION,
    highScore: 0,

    // 难度系统
    level: 1,
    fallSpeed: CONFIG.BASE_FALL_SPEED,
    spawnInterval: CONFIG.BASE_SPAWN_INTERVAL,

    // 连击系统
    combo: 0,
    maxCombo: 0,
    comboTimer: null,

    // 统计
    itemsCaught: 0,
    fuCollected: 0,
    collegeCollected: 0,

    // Buff状态
    buffs: {
        invincible: false,
        double: false,
        magnet: false,
        slow: false,
        fever: false
    },
    buffTimers: {},

    // 技能
    skills: {
        magnet: { charges: 0, maxCharges: CONFIG.SKILL_CHARGE_ITEMS },
        slow: { charges: 0, maxCharges: CONFIG.SKILL_CHARGE_ITEMS },
        fever: { charges: 0, maxCharges: 8 }
    },

    // 特殊事件
    specialEvent: null,
    eventTimer: null,

    // 成就
    unlockedAchievements: new Set(),

    // 音效
    soundEnabled: true,

    // 定时器
    timers: {
        game: null,
        spawn: null,
        animation: null
    }
};

// ==================== 🖼️ 图片加载系统 ====================
const ImageLoader = {
    images: {},       // 缓存已加载的图片
    loaded: false,    // 是否全部加载完成
    loadCount: 0,     // 已加载数量
    totalCount: 0,    // 总数量

    // 预加载所有图片
    preloadAll() {
        return new Promise((resolve) => {
            const imagePaths = [];

            // 小蛇角色图标 (15个)
            CONFIG.PLAYER_ICONS.forEach(path => imagePaths.push(path));

            // 掉落物品图标 (9个)
            Object.values(CONFIG.ITEMS).forEach(item => {
                if (item.img) imagePaths.push(item.img);
            });

            // 盲盒奖励图标 (7个)
            CONFIG.LUCKY_BOX.REWARDS.forEach(reward => {
                if (reward.img) imagePaths.push(reward.img);
            });

            // 成就图标 (7个)
            Object.values(CONFIG.ACHIEVEMENTS).forEach(achievement => {
                if (achievement.img) imagePaths.push(achievement.img);
            });

            this.totalCount = imagePaths.length;

            if (this.totalCount === 0) {
                this.loaded = true;
                resolve();
                return;
            }

            imagePaths.forEach(path => {
                const img = new Image();
                img.onload = () => {
                    this.loadCount++;
                    this.images[path] = img;
                    if (this.loadCount >= this.totalCount) {
                        this.loaded = true;
                        console.log(`✅ 图片加载完成: ${this.loadCount}/${this.totalCount}`);
                        resolve();
                    }
                };
                img.onerror = () => {
                    this.loadCount++;
                    console.warn(`⚠️ 图片加载失败: ${path}`);
                    if (this.loadCount >= this.totalCount) {
                        this.loaded = true;
                        resolve();
                    }
                };
                img.src = path;
            });
        });
    },

    // 获取图片（如果已加载）
    get(path) {
        return this.images[path] || null;
    },

    // 获取随机小蛇图标
    getRandomPlayerIcon() {
        const icons = CONFIG.PLAYER_ICONS;
        const randomPath = icons[Math.floor(Math.random() * icons.length)];
        return this.get(randomPath);
    },

    // 获取物品图片
    getItemImage(itemType) {
        const item = CONFIG.ITEMS[itemType];
        return item && item.img ? this.get(item.img) : null;
    },

    // 获取盲盒奖励图片
    getRewardImage(rewardType) {
        const reward = CONFIG.LUCKY_BOX.REWARDS.find(r => r.type === rewardType);
        return reward && reward.img ? this.get(reward.img) : null;
    },

    // 获取成就图片
    getAchievementImage(achievementKey) {
        const achievement = CONFIG.ACHIEVEMENTS[achievementKey];
        return achievement && achievement.img ? this.get(achievement.img) : null;
    }
};

// ==================== 音效系统 ====================
const AudioSystem = {
    context: null,
    bgm: null,
    bgmGain: null,
    sounds: {},
    bgmLoaded: false,
    currentBgmIndex: -1,

    // 可用的BGM文件列表（放在assets文件夹中）
    // 添加新音乐时，只需在此数组中添加文件路径即可
    bgmList: [
        'assets/1.mp3',
        'assets/2.mp3'
    ],

    init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            // 初始化BGM
            this.initBGM();
        } catch (e) {
            console.warn('Web Audio API 不支持');
        }
    },

    // 初始化背景音乐（随机选择）
    initBGM() {
        this.bgm = document.getElementById('bgm');
        if (this.bgm) {
            this.bgm.volume = 0.3;
            this.bgm.loop = true;

            // 随机选择一个BGM
            this.loadRandomBGM();

            this.bgm.addEventListener('canplaythrough', () => {
                this.bgmLoaded = true;
                console.log('BGM加载成功:', this.bgmList[this.currentBgmIndex]);
            });

            this.bgm.addEventListener('error', () => {
                console.warn('BGM加载失败，尝试下一个...');
                this.bgmLoaded = false;
                // 尝试加载下一个BGM
                this.tryNextBGM();
            });
        }
    },

    // 随机选择并加载BGM
    loadRandomBGM() {
        if (this.bgmList.length === 0) return;

        // 随机选择一个索引
        this.currentBgmIndex = Math.floor(Math.random() * this.bgmList.length);
        const bgmSrc = this.bgmList[this.currentBgmIndex];

        // 设置音频源
        this.bgm.src = bgmSrc;
        this.bgm.load();
        console.log('尝试加载BGM:', bgmSrc);
    },

    // 尝试加载下一个可用的BGM
    tryNextBGM() {
        // 从列表中移除失败的BGM
        if (this.currentBgmIndex >= 0 && this.currentBgmIndex < this.bgmList.length) {
            this.bgmList.splice(this.currentBgmIndex, 1);
        }

        // 如果还有可用的BGM，继续尝试
        if (this.bgmList.length > 0) {
            this.loadRandomBGM();
        } else {
            console.warn('所有BGM加载失败');
        }
    },

    // 切换到下一首BGM（可供用户手动切换）
    nextBGM() {
        if (this.bgmList.length <= 1) return;

        const wasPlaying = !this.bgm.paused;
        this.currentBgmIndex = (this.currentBgmIndex + 1) % this.bgmList.length;
        this.bgm.src = this.bgmList[this.currentBgmIndex];
        this.bgm.load();

        if (wasPlaying && state.soundEnabled) {
            this.bgm.play().catch(() => {});
        }
    },

    // 播放背景音乐
    playBGM() {
        if (!state.soundEnabled) return;

        if (this.bgm) {
            // 关键：在用户交互时立即尝试播放，解锁Chrome自动播放限制
            // 即使音频还没加载完，也要调用play()来解锁音频元素
            this.bgm.currentTime = 0;

            // 立即尝试播放（解锁音频元素）
            const playPromise = this.bgm.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('BGM开始播放');
                }).catch(e => {
                    // 如果还没加载完，这里会失败，但音频元素已经被解锁了
                    console.log('首次播放尝试:', e.message);

                    // 如果是因为没加载完，设置加载完成后自动播放
                    if (!this.bgmLoaded) {
                        console.log('BGM尚未加载完成，等待加载后播放...');
                        const playOnLoad = () => {
                            if (state.isRunning && state.soundEnabled) {
                                this.bgm.currentTime = 0;
                                this.bgm.play().then(() => {
                                    console.log('BGM加载完成后开始播放');
                                }).catch(err => {
                                    console.warn('BGM播放失败:', err);
                                });
                            }
                            this.bgm.removeEventListener('canplaythrough', playOnLoad);
                        };
                        this.bgm.addEventListener('canplaythrough', playOnLoad);
                    }
                });
            }
        }
    },

    // 停止背景音乐
    stopBGM() {
        if (this.bgm) {
            this.bgm.pause();
            this.bgm.currentTime = 0;
        }
    },

    // 暂停背景音乐
    pauseBGM() {
        if (this.bgm) {
            this.bgm.pause();
        }
    },

    // 恢复背景音乐
    resumeBGM() {
        if (this.bgm && state.soundEnabled) {
            this.bgm.play().catch(() => {});
        }
    },

    // 设置BGM音量
    setBGMVolume(volume) {
        if (this.bgm) {
            this.bgm.volume = volume;
        }
    },

    // 播放音符（合成音效）
    playNote(frequency, duration = 0.1, type = 'sine', volume = 0.3) {
        if (!this.context || !state.soundEnabled) return;

        try {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(volume, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + duration);
        } catch (e) {
            // 忽略音效错误
        }
    },

    // 接住物品音效
    playCatch(isPositive, isBonus = false) {
        if (!state.soundEnabled) return;

        if (isBonus) {
            // 特殊物品：上行琶音
            this.playNote(523, 0.1, 'sine', 0.4);
            setTimeout(() => this.playNote(659, 0.1, 'sine', 0.4), 50);
            setTimeout(() => this.playNote(784, 0.15, 'sine', 0.4), 100);
            setTimeout(() => this.playNote(1047, 0.2, 'sine', 0.3), 150);
        } else if (isPositive) {
            // 普通物品：清脆叮声
            const freqs = [523, 587, 659, 698, 784];
            this.playNote(freqs[Math.floor(Math.random() * freqs.length)], 0.15, 'sine', 0.3);
        } else {
            // 负面物品：低沉警告
            this.playNote(220, 0.2, 'sawtooth', 0.3);
            setTimeout(() => this.playNote(165, 0.3, 'sawtooth', 0.2), 100);
        }
    },

    // 连击音效
    playCombo(comboCount) {
        if (!state.soundEnabled) return;

        const baseFreq = 400 + comboCount * 50;
        this.playNote(baseFreq, 0.1, 'square', 0.2);
        setTimeout(() => this.playNote(baseFreq * 1.25, 0.1, 'square', 0.2), 50);
        setTimeout(() => this.playNote(baseFreq * 1.5, 0.15, 'square', 0.15), 100);
    },

    // 技能激活音效
    playSkill() {
        if (!state.soundEnabled) return;

        this.playNote(440, 0.1, 'sine', 0.3);
        setTimeout(() => this.playNote(554, 0.1, 'sine', 0.3), 80);
        setTimeout(() => this.playNote(659, 0.15, 'sine', 0.3), 160);
        setTimeout(() => this.playNote(880, 0.2, 'sine', 0.25), 240);
    },

    // 成就解锁音效
    playAchievement() {
        if (!state.soundEnabled) return;

        const melody = [523, 659, 784, 1047, 784, 1047];
        melody.forEach((freq, i) => {
            setTimeout(() => this.playNote(freq, 0.15, 'sine', 0.3), i * 100);
        });
    },

    // 升级音效
    playLevelUp() {
        if (!state.soundEnabled) return;

        this.playNote(392, 0.1, 'square', 0.25);
        setTimeout(() => this.playNote(523, 0.1, 'square', 0.25), 100);
        setTimeout(() => this.playNote(659, 0.15, 'square', 0.25), 200);
        setTimeout(() => this.playNote(784, 0.2, 'square', 0.2), 300);
    },

    // 特殊事件音效
    playSpecialEvent() {
        if (!state.soundEnabled) return;

        const notes = [523, 659, 784, 880, 1047, 880, 784, 659];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playNote(freq, 0.12, 'sine', 0.25), i * 80);
        });
    },

    // 游戏结束音效
    playGameEnd() {
        if (!state.soundEnabled) return;

        const melody = [784, 659, 523, 392, 523, 659, 784, 1047];
        melody.forEach((freq, i) => {
            setTimeout(() => this.playNote(freq, 0.2, 'sine', 0.3), i * 150);
        });
    },

    // 按钮点击音效
    playClick() {
        if (!state.soundEnabled) return;
        this.playNote(800, 0.05, 'sine', 0.2);
    },

    // 切换音效状态
    toggle() {
        state.soundEnabled = !state.soundEnabled;
        if (state.soundEnabled) {
            if (state.isRunning && !state.isPaused) {
                this.resumeBGM();
            }
        } else {
            this.pauseBGM();
        }
        return state.soundEnabled;
    }
};

// ==================== 🎁 盲盒系统 ====================
const LuckyBoxSystem = {
    currentLevel: null,
    currentReward: null,
    isOpened: false,

    // 根据分数获取盲盒等级
    getBoxLevel(score) {
        return CONFIG.LUCKY_BOX.LEVELS.find(l => score >= l.min && score <= l.max)
            || CONFIG.LUCKY_BOX.LEVELS[0];
    },

    // 随机选择奖励（加权随机）
    selectReward(level) {
        const rewards = CONFIG.LUCKY_BOX.REWARDS;
        const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
        let random = Math.random() * totalWeight;

        for (const reward of rewards) {
            random -= reward.weight;
            if (random <= 0) {
                return this.generateRewardContent(reward, level);
            }
        }
        return this.generateRewardContent(rewards[0], level);
    },

    // 生成奖励具体内容
    generateRewardContent(rewardTemplate, level) {
        const reward = { ...rewardTemplate };

        // 根据盲盒等级调整数值
        const multiplier = level.multiplier;

        switch (reward.type) {
            case 'hongbao':
                const baseAmount = reward.amounts[Math.floor(Math.random() * reward.amounts.length)];
                reward.amount = Math.floor(baseAmount * multiplier);
                reward.desc = reward.descs[Math.floor(Math.random() * reward.descs.length)]
                    .replace('{amount}', reward.amount);
                break;
            case 'yuanbao':
                reward.amount = reward.amounts[Math.floor(Math.random() * reward.amounts.length)] * multiplier;
                reward.desc = reward.descs[Math.floor(Math.random() * reward.descs.length)]
                    .replace('{amount}', Math.floor(reward.amount));
                break;
            case 'fu':
                reward.fu = reward.fus[Math.floor(Math.random() * reward.fus.length)];
                reward.desc = reward.descs[Math.floor(Math.random() * reward.descs.length)]
                    .replace('{fu}', reward.fu);
                break;
            case 'sign':
                // 高分更容易获得好签
                const signIndex = Math.max(0, Math.floor(Math.random() * reward.signs.length) - Math.floor(multiplier / 2));
                reward.sign = reward.signs[signIndex];
                reward.desc = reward.descs[Math.floor(Math.random() * reward.descs.length)]
                    .replace('{sign}', reward.sign);
                break;
            case 'study':
            case 'health':
                reward.amount = reward.amounts[Math.floor(Math.random() * reward.amounts.length)];
                reward.desc = reward.descs[Math.floor(Math.random() * reward.descs.length)]
                    .replace('{amount}', reward.amount);
                break;
            case 'love':
                reward.amount = reward.amounts[Math.floor(Math.random() * reward.amounts.length)];
                reward.desc = reward.descs[Math.floor(Math.random() * reward.descs.length)]
                    .replace('{amount}', reward.amount);
                break;
            default:
                reward.desc = reward.descs[0];
        }

        reward.blessing = reward.blessings[Math.floor(Math.random() * reward.blessings.length)];
        return reward;
    },

    // 初始化盲盒（游戏结束时调用）
    init(score) {
        this.isOpened = false;
        this.currentLevel = this.getBoxLevel(score);
        this.currentReward = this.selectReward(this.currentLevel);

        // 更新UI
        const boxLevelText = document.getElementById('box-level-text');
        if (boxLevelText) {
            boxLevelText.textContent = `当前福运等级：${this.currentLevel.name}`;
            boxLevelText.style.color = this.currentLevel.color;
        }

        // 重置盲盒状态
        const luckyBox = document.getElementById('lucky-box');
        const boxReward = document.getElementById('box-reward');
        if (luckyBox) {
            luckyBox.classList.remove('opened', 'opening');
            luckyBox.style.display = 'block';
        }
        if (boxReward) {
            boxReward.classList.add('hidden');
        }

        // 设置盲盒颜色
        this.setBoxColor(this.currentLevel.color);
    },

    // 设置盲盒颜色
    setBoxColor(color) {
        const box = document.getElementById('lucky-box');
        if (box) {
            box.style.setProperty('--box-color', color);
        }
    },

    // 开启盲盒
    open() {
        if (this.isOpened) return;
        this.isOpened = true;

        const luckyBox = document.getElementById('lucky-box');
        const boxReward = document.getElementById('box-reward');

        // 播放开盒音效
        AudioSystem.playNote(440, 0.1, 'sine', 0.3);
        setTimeout(() => AudioSystem.playNote(554, 0.1, 'sine', 0.3), 100);
        setTimeout(() => AudioSystem.playNote(659, 0.1, 'sine', 0.3), 200);
        setTimeout(() => AudioSystem.playNote(880, 0.2, 'sine', 0.4), 300);

        // 开盒动画
        if (luckyBox) {
            luckyBox.classList.add('opening');

            setTimeout(() => {
                luckyBox.classList.add('opened');
                luckyBox.style.display = 'none';

                // 显示奖励
                if (boxReward) {
                    boxReward.classList.remove('hidden');
                    this.showReward();
                }

                // 触发特效
                VFX.flash('rgba(255, 215, 0, 0.8)', 300);
            }, 800);
        }
    },

    // 显示奖励内容
    showReward() {
        const reward = this.currentReward;
        if (!reward) return;

        // 🖼️ 显示奖励图片或emoji
        const imgEl = document.getElementById('reward-icon-img');
        const emojiEl = document.getElementById('reward-icon-emoji');

        if (reward.img && ImageLoader.get(reward.img)) {
            // 使用图片
            imgEl.src = reward.img;
            imgEl.style.display = 'block';
            emojiEl.style.display = 'none';
        } else {
            // 使用emoji
            imgEl.style.display = 'none';
            emojiEl.style.display = 'block';
            emojiEl.textContent = reward.icon;
        }

        document.getElementById('reward-title').textContent = reward.title;
        document.getElementById('reward-desc').textContent = reward.desc;
        document.getElementById('reward-blessing').textContent = reward.blessing;

        // 奖励出现动画音效
        setTimeout(() => {
            AudioSystem.playNote(1047, 0.3, 'sine', 0.3);
        }, 100);
    },

    // 获取当前奖励（用于分享）
    getRewardSummary() {
        if (!this.currentReward) return '';
        return `${this.currentReward.icon} ${this.currentReward.title}: ${this.currentReward.desc}`;
    }
};

// ==================== 📱 社交分享系统 ====================
const SocialSystem = {
    // 生成分享文案
    generateShareText() {
        const score = state.score;
        const blessing = CONFIG.BLESSINGS.find(b => score >= b.min && score <= b.max);
        const reward = LuckyBoxSystem.getRewardSummary();

        return `🐍 蛇年接福 🐍\n` +
               `我在「蛇年接福」游戏中获得了 ${score} 分！\n` +
               `${blessing?.text || ''}\n` +
               `${reward ? '还抽到了：' + reward + '\n' : ''}` +
               `🎓 湖南信息学院计算机科学与工程学院\n` +
               `快来挑战吧！`;
    },

    // 生成分享海报（Canvas绘制）
    async generatePoster() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 750;
        canvas.height = 1334;

        // 绘制背景渐变
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1a0a0a');
        gradient.addColorStop(0.5, '#3d0c0c');
        gradient.addColorStop(1, '#1a0a0a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制装饰性星星
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 3 + 1;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // 绘制标题
        ctx.font = 'bold 72px "Microsoft YaHei", sans-serif';
        ctx.fillStyle = '#FFD700';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#FF6B00';
        ctx.shadowBlur = 20;
        ctx.fillText('🐍 蛇年接福 🐍', canvas.width / 2, 150);

        // 绘制分数
        ctx.shadowBlur = 30;
        ctx.font = 'bold 120px "Microsoft YaHei", sans-serif';
        ctx.fillStyle = '#FFD700';
        ctx.fillText(state.score, canvas.width / 2, 400);

        ctx.shadowBlur = 0;
        ctx.font = '36px "Microsoft YaHei", sans-serif';
        ctx.fillStyle = '#FFA500';
        ctx.fillText('分', canvas.width / 2, 470);

        // 绘制评级
        const blessing = CONFIG.BLESSINGS.find(b => state.score >= b.min && state.score <= b.max);
        ctx.font = 'bold 48px "Microsoft YaHei", sans-serif';
        ctx.fillStyle = '#FF4500';
        ctx.fillText(`评级: ${blessing?.rank || 'D'}`, canvas.width / 2, 550);

        // 绘制祝福语
        ctx.font = '32px "Microsoft YaHei", sans-serif';
        ctx.fillStyle = '#FFECB3';
        const blessingText = blessing?.text || '';
        this.wrapText(ctx, blessingText, canvas.width / 2, 650, 650, 45);

        // 绘制盲盒奖励
        if (LuckyBoxSystem.isOpened && LuckyBoxSystem.currentReward) {
            const reward = LuckyBoxSystem.currentReward;
            ctx.font = '40px "Microsoft YaHei", sans-serif';
            ctx.fillStyle = '#FFD700';
            ctx.fillText('🎁 福运盲盒 🎁', canvas.width / 2, 800);

            ctx.font = '64px "Microsoft YaHei", sans-serif';
            ctx.fillText(reward.icon, canvas.width / 2, 880);

            ctx.font = '36px "Microsoft YaHei", sans-serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(reward.title, canvas.width / 2, 950);

            ctx.font = '28px "Microsoft YaHei", sans-serif';
            ctx.fillStyle = '#FFECB3';
            ctx.fillText(reward.desc, canvas.width / 2, 1000);
        }

        // 绘制学院信息
        ctx.font = '28px "Microsoft YaHei", sans-serif';
        ctx.fillStyle = '#FFD700';
        ctx.fillText('🎓 湖南信息学院', canvas.width / 2, 1150);
        ctx.fillText('计算机科学与工程学院', canvas.width / 2, 1190);

        // 绘制底部装饰
        ctx.font = '24px "Microsoft YaHei", sans-serif';
        ctx.fillStyle = '#FFA500';
        ctx.fillText('数智启新岁 · 创意绘年味', canvas.width / 2, 1280);

        return canvas.toDataURL('image/png');
    },

    // 文字换行辅助函数
    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const chars = text.split('');
        let line = '';
        let currentY = y;

        for (let i = 0; i < chars.length; i++) {
            const testLine = line + chars[i];
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && i > 0) {
                ctx.fillText(line, x, currentY);
                line = chars[i];
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, currentY);
    },

    // 下载海报
    async downloadPoster() {
        try {
            const dataUrl = await this.generatePoster();
            const link = document.createElement('a');
            link.download = `蛇年接福_${state.score}分_${Date.now()}.png`;
            link.href = dataUrl;
            link.click();

            this.showToast('海报已保存！');
        } catch (e) {
            console.error('生成海报失败:', e);
            this.showToast('生成海报失败，请重试');
        }
    },

    // 分享到微信/好友（模拟）
    shareToFriend() {
        const text = this.generateShareText();

        // 尝试使用Web Share API
        if (navigator.share) {
            navigator.share({
                title: '蛇年接福',
                text: text,
                url: window.location.href
            }).catch(e => {
                // 用户取消分享
                console.log('分享取消:', e);
            });
        } else {
            // 降级：复制到剪贴板
            this.copyToClipboard(text);
            this.showToast('分享内容已复制，快去粘贴给好友吧！');
        }
    },

    // 复制链接
    copyLink() {
        const url = window.location.href;
        this.copyToClipboard(url);
        this.showToast('链接已复制！');
    },

    // 复制到剪贴板
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    },

    // 显示提示
    showToast(message) {
        // 创建toast元素
        let toast = document.getElementById('share-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'share-toast';
            toast.className = 'share-toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    },

    // 当前排名（本次游戏）
    currentRank: 0,
    currentEntry: null,

    // 获取排行榜数据
    getLeaderboard() {
        const stored = localStorage.getItem('snakeGame_leaderboard');
        return stored ? JSON.parse(stored) : [];
    },

    // 保存排行榜
    saveLeaderboard(leaderboard) {
        localStorage.setItem('snakeGame_leaderboard', JSON.stringify(leaderboard));
    },

    // 更新排行榜（记录每次成绩）
    updateLeaderboard(score) {
        const leaderboard = this.getLeaderboard();
        const now = new Date();
        const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

        // 创建新记录
        const newEntry = {
            score: score,
            time: timeStr,
            id: Date.now()  // 唯一标识
        };

        // 添加新分数
        leaderboard.push(newEntry);

        // 按分数排序
        leaderboard.sort((a, b) => b.score - a.score);

        // 保留前10名
        const top10 = leaderboard.slice(0, 10);
        this.saveLeaderboard(top10);

        // 计算本次排名
        const rank = top10.findIndex(item => item.id === newEntry.id);
        if (rank !== -1) {
            this.currentRank = rank + 1;
            this.currentEntry = newEntry;
        } else {
            // 未进入前10
            this.currentRank = 0;
            this.currentEntry = newEntry;
        }

        return this.currentRank;
    },

    // 渲染排行榜（显示前10名）
    renderLeaderboard() {
        const list = document.getElementById('leaderboard-list');
        const rankInfo = document.getElementById('current-rank-info');
        if (!list) return;

        const leaderboard = this.getLeaderboard();
        const rankIcons = ['🥇', '🥈', '🥉', '4', '5', '6', '7', '8', '9', '10'];

        if (leaderboard.length === 0) {
            list.innerHTML = '<div class="lb-empty">暂无记录，快来挑战吧！</div>';
        } else {
            list.innerHTML = leaderboard.slice(0, 10).map((item, index) => {
                const isCurrentGame = this.currentEntry && item.id === this.currentEntry.id;
                const rankClass = index < 3 ? ['gold', 'silver', 'bronze'][index] : '';
                return `
                    <div class="lb-row ${rankClass} ${isCurrentGame ? 'current' : ''}">
                        <span class="lb-rank">${rankIcons[index]}</span>
                        <span class="lb-score-val">${item.score}</span>
                        <span class="lb-time">${item.time}</span>
                        ${isCurrentGame ? '<span class="lb-new">本次</span>' : ''}
                    </div>
                `;
            }).join('');
        }

        // 更新本次排名信息
        if (rankInfo) {
            if (this.currentRank > 0) {
                rankInfo.textContent = `🎉 本次排名: 第${this.currentRank}名`;
                rankInfo.className = 'rank-success';
            } else if (this.currentEntry) {
                rankInfo.textContent = `本次得分: ${this.currentEntry.score} (未进入前10)`;
                rankInfo.className = 'rank-normal';
            } else {
                rankInfo.textContent = '';
            }
        }
    }
};

// ==================== 视觉特效系统 ====================
const VFX = {
    // 屏幕闪光
    flash(color = 'rgba(255, 215, 0, 0.6)', duration = 150) {
        const flashEl = document.getElementById('screen-flash');
        if (!flashEl) return;

        flashEl.style.background = color;
        flashEl.classList.add('active');

        setTimeout(() => {
            flashEl.classList.remove('active');
        }, duration);
    },

    // 屏幕震动
    shake(intensity = 5, duration = 200) {
        const gameScreen = document.getElementById('game-screen');
        if (!gameScreen) return;

        gameScreen.classList.add('shake');
        gameScreen.style.setProperty('--shake-intensity', `${intensity}px`);

        setTimeout(() => {
            gameScreen.classList.remove('shake');
        }, duration);
    },

    // 正面物品特效
    positiveEffect(x, y) {
        this.flash('rgba(255, 215, 0, 0.3)', 100);
    },

    // 负面物品特效
    negativeEffect(x, y) {
        this.flash('rgba(255, 0, 0, 0.4)', 150);
        this.shake(8, 300);
    },

    // 特殊物品特效
    bonusEffect(x, y) {
        this.flash('rgba(255, 215, 0, 0.5)', 200);
        this.shake(3, 150);
    },

    // 技能激活特效
    skillEffect() {
        this.flash('rgba(138, 43, 226, 0.4)', 200);
        this.shake(4, 200);
    },

    // 连击特效
    comboEffect(combo) {
        if (combo >= 5) {
            this.flash('rgba(255, 100, 0, 0.3)', 100);
        }
        if (combo >= 10) {
            this.shake(3, 150);
        }
    },

    // 福运爆发特效
    feverEffect() {
        this.flash('rgba(255, 215, 0, 0.6)', 300);
        this.shake(6, 400);
    },

    // 升级特效
    levelUpEffect() {
        this.flash('rgba(0, 255, 255, 0.3)', 200);
    }
};

// ==================== DOM 元素缓存 ====================
const DOM = {};

// ==================== 游戏对象 ====================
let player = null;
let items = [];
let particles = [];
let bgParticles = [];
let fireworks = [];

// 输入状态
const input = {
    left: false,
    right: false,
    touchStartX: 0
};

function getViewportDimensions() {
    const viewport = window.visualViewport;
    const width = Math.max(
        320,
        Math.round(viewport?.width || window.innerWidth || document.documentElement.clientWidth || 320)
    );
    const height = Math.max(
        480,
        Math.round(viewport?.height || window.innerHeight || document.documentElement.clientHeight || 480)
    );

    return { width, height };
}

function getResponsiveFlags() {
    const { width } = getViewportDimensions();
    return {
        isMobile: width <= 768,
        isSmallMobile: width <= 480,
        isTinyMobile: width <= 360
    };
}

function drawImageContain(ctx, image, centerX, centerY, maxWidth, maxHeight, inset = 0) {
    if (!image) return;

    const safeWidth = Math.max(1, maxWidth - inset * 2);
    const safeHeight = Math.max(1, maxHeight - inset * 2);
    const imageRatio = image.width / image.height || 1;
    const boxRatio = safeWidth / safeHeight;

    let drawWidth = safeWidth;
    let drawHeight = safeHeight;

    if (imageRatio > boxRatio) {
        drawHeight = safeWidth / imageRatio;
    } else {
        drawWidth = safeHeight * imageRatio;
    }

    ctx.drawImage(
        image,
        centerX - drawWidth / 2,
        centerY - drawHeight / 2,
        drawWidth,
        drawHeight
    );
}

// ==================== 工具类 ====================
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    multiply(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    distance(v) {
        return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
    }
}

// ==================== 玩家类 ====================
class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 70;
        this.height = 70;
        this.x = 0;
        this.y = 0;
        this.bottomOffset = 20;
        this.edgePadding = 0;
        this.speed = CONFIG.PLAYER_SPEED;
        this.targetX = 0;
        this.updateResponsiveMetrics(true);

        // 🐍 随机选择小蛇图标
        this.image = ImageLoader.getRandomPlayerIcon();

        // 动画
        this.bobOffset = 0;
        this.bobSpeed = 0.1;
        this.glowIntensity = 0;
        this.feverGlow = 0;
    }

    updateResponsiveMetrics(centerOnScreen = false) {
        const { isMobile, isSmallMobile, isTinyMobile } = getResponsiveFlags();
        const previousCenter = centerOnScreen
            ? this.canvas.width / 2
            : (this.x + this.width / 2);

        this.width = isTinyMobile ? 40 : (isSmallMobile ? 45 : (isMobile ? 50 : 70));
        this.height = this.width;
        this.bottomOffset = isTinyMobile ? 62 : (isSmallMobile ? 72 : (isMobile ? 84 : 24));
        this.edgePadding = isTinyMobile ? 2 : (isSmallMobile ? 3 : (isMobile ? 4 : 0));
        this.speed = isMobile ? 9 : CONFIG.PLAYER_SPEED;

        const minX = this.edgePadding;
        const maxX = Math.max(minX, this.canvas.width - this.width - this.edgePadding);
        this.x = Math.max(minX, Math.min(maxX, previousCenter - this.width / 2));
        this.targetX = this.x;
        this.y = this.canvas.height - this.height - this.bottomOffset;
    }

    update(deltaTime) {
        // 平滑移动
        const diff = this.targetX - this.x;
        this.x += diff * 0.2;

        // 边界限制
        const minX = this.edgePadding;
        const maxX = Math.max(minX, this.canvas.width - this.width - this.edgePadding);
        this.x = Math.max(minX, Math.min(maxX, this.x));
        this.targetX = Math.max(minX, Math.min(maxX, this.targetX));

        // 上下浮动动画
        this.bobOffset = Math.sin(Date.now() * this.bobSpeed * 0.01) * 5;

        // 无敌发光效果
        if (state.buffs.invincible) {
            this.glowIntensity = 0.5 + Math.sin(Date.now() * 0.01) * 0.3;
        } else {
            this.glowIntensity *= 0.9;
        }

        // 福运爆发发光
        if (state.buffs.fever) {
            this.feverGlow = 0.6 + Math.sin(Date.now() * 0.015) * 0.4;
        } else {
            this.feverGlow *= 0.9;
        }

        // 更新y位置（使用保存的底部偏移）
        this.y = this.canvas.height - this.height - this.bottomOffset;
    }

    moveLeft() {
        this.targetX = Math.max(this.edgePadding, this.targetX - this.speed);
    }

    moveRight() {
        const maxX = Math.max(this.edgePadding, this.canvas.width - this.width - this.edgePadding);
        this.targetX = Math.min(maxX, this.targetX + this.speed);
    }

    draw(ctx) {
        ctx.save();

        const drawX = this.x + this.width / 2;
        const drawY = this.y + this.height / 2 + this.bobOffset;

        // 福运爆发光环
        if (this.feverGlow > 0.01) {
            const feverGradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, 80);
            feverGradient.addColorStop(0, `rgba(255, 100, 0, ${this.feverGlow})`);
            feverGradient.addColorStop(0.4, `rgba(255, 50, 0, ${this.feverGlow * 0.5})`);
            feverGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
            ctx.fillStyle = feverGradient;
            ctx.beginPath();
            ctx.arc(drawX, drawY, 80, 0, Math.PI * 2);
            ctx.fill();
        }

        // 无敌光环
        if (this.glowIntensity > 0.01) {
            const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, 60);
            gradient.addColorStop(0, `rgba(255, 215, 0, ${this.glowIntensity})`);
            gradient.addColorStop(0.5, `rgba(255, 165, 0, ${this.glowIntensity * 0.5})`);
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(drawX, drawY, 60, 0, Math.PI * 2);
            ctx.fill();
        }

        // 蛇身阴影
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 5;

        // 绘制蛇（优先使用图片，fallback到emoji）
        if (this.image) {
            drawImageContain(ctx, this.image, drawX, drawY, this.width, this.height, 2);
        } else {
            // 图片未加载时使用emoji
            ctx.font = `${this.width}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🐍', drawX, drawY);
        }

        ctx.restore();
    }

    getBounds() {
        return {
            x: this.x + 10,
            y: this.y + 10,
            width: this.width - 20,
            height: this.height - 20
        };
    }

    getCenter() {
        return new Vector2(
            this.x + this.width / 2,
            this.y + this.height / 2
        );
    }
}

// ==================== 物品类 ====================
class Item {
    constructor(canvas, type, config) {
        this.canvas = canvas;
        this.type = type;
        this.emoji = config.emoji;
        this.score = config.score;
        this.buff = config.buff || null;
        this.negative = config.negative || false;

        // 🖼️ 获取物品图片
        this.image = ImageLoader.getItemImage(type);

        // 📱 根据屏幕大小调整物品尺寸 - 移动端更小
        const { isMobile, isSmallMobile, isTinyMobile } = getResponsiveFlags();
        this.width = isTinyMobile ? 30 : (isSmallMobile ? 35 : (isMobile ? 38 : 50));
        this.height = this.width;
        this.spawnPadding = isTinyMobile ? 2 : (isSmallMobile ? 3 : (isMobile ? 4 : 8));
        const spawnRange = Math.max(1, canvas.width - this.width - this.spawnPadding * 2);
        this.x = this.spawnPadding + Math.random() * spawnRange;
        this.y = -this.height;

        // 速度
        this.baseSpeed = state.fallSpeed + Math.random() * 1.5;
        this.speed = this.baseSpeed;

        // 动画
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * (isMobile ? 0.04 : 0.08);
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = (0.03 + Math.random() * 0.02) * (isMobile ? 0.75 : 1);
        this.scale = 1;

        // 拖尾
        this.trail = [];
        this.trailLength = this.buff ? 8 : 4;

        // 3D效果参数
        this.zOffset = Math.random() * 20 - 10;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update(deltaTime) {
        // 缓时效果
        this.speed = state.buffs.slow ? this.baseSpeed * 0.4 : this.baseSpeed;

        // 磁铁效果（包括福运爆发时的强力吸引）
        if ((state.buffs.magnet || state.buffs.fever) && !this.negative) {
            const playerCenter = player.getCenter();
            const itemCenter = new Vector2(this.x + this.width/2, this.y + this.height/2);
            const dist = playerCenter.distance(itemCenter);
            const magnetRange = state.buffs.fever ? 300 : 200;
            const magnetStrength = state.buffs.fever ? 12 : 8;

            if (dist < magnetRange) {
                const attraction = (magnetRange - dist) / magnetRange * magnetStrength;
                const dx = playerCenter.x - itemCenter.x;
                const dy = playerCenter.y - itemCenter.y;
                const len = Math.sqrt(dx*dx + dy*dy) || 1;
                this.x += (dx / len) * attraction;
                this.y += (dy / len) * attraction;
            }
        }

        // 下落
        this.y += this.speed;

        // 左右摆动
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5;

        const minX = this.spawnPadding;
        const maxX = Math.max(minX, this.canvas.width - this.width - this.spawnPadding);
        this.x = Math.max(minX, Math.min(maxX, this.x));

        // 旋转
        this.rotation += this.rotationSpeed;

        // 脉冲动画
        this.pulsePhase += 0.1;
        if (this.buff) {
            this.scale = 1 + Math.sin(this.pulsePhase) * 0.1;
        }

        // 更新拖尾
        this.trail.unshift({ x: this.x + this.width/2, y: this.y + this.height/2 });
        if (this.trail.length > this.trailLength) {
            this.trail.pop();
        }
    }

    draw(ctx) {
        ctx.save();

        // 绘制拖尾
        if (this.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (let i = 1; i < this.trail.length; i++) {
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.strokeStyle = this.negative
                ? 'rgba(100, 100, 100, 0.3)'
                : this.buff
                    ? 'rgba(255, 215, 0, 0.5)'
                    : 'rgba(255, 100, 100, 0.3)';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.stroke();
        }

        // 物品发光
        if (this.buff || this.type === 'COLLEGE') {
            const glow = ctx.createRadialGradient(
                this.x + this.width/2, this.y + this.height/2, 0,
                this.x + this.width/2, this.y + this.height/2, 45
            );
            if (this.type === 'COLLEGE') {
                glow.addColorStop(0, 'rgba(138, 43, 226, 0.5)');
                glow.addColorStop(1, 'rgba(138, 43, 226, 0)');
            } else {
                glow.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
                glow.addColorStop(1, 'rgba(255, 215, 0, 0)');
            }
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, this.y + this.height/2, 45, 0, Math.PI * 2);
            ctx.fill();
        }

        // 绘制物品
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);

        // 阴影
        ctx.shadowColor = this.negative ? 'rgba(0,0,0,0.5)' : 'rgba(255,200,0,0.3)';
        ctx.shadowBlur = 10;

        // 🖼️ 优先使用图片绘制，fallback到emoji
        if (this.image) {
            drawImageContain(ctx, this.image, 0, 0, this.width, this.height, 1.5);
        } else {
            ctx.font = `${this.width}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.emoji, 0, 0);
        }

        ctx.restore();
    }

    getBounds() {
        return {
            x: this.x + 5,
            y: this.y + 5,
            width: this.width - 10,
            height: this.height - 10
        };
    }

    isOffScreen() {
        return this.y > this.canvas.height + 50;
    }
}

// ==================== 粒子系统 ====================
class Particle {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        this.vx = options.vx || (Math.random() - 0.5) * 8;
        this.vy = options.vy || -Math.random() * 6 - 2;
        this.gravity = options.gravity || 0.15;
        this.life = options.life || 1;
        this.decay = options.decay || 0.02;
        this.size = options.size || Math.random() * 8 + 4;
        this.color = options.color || '#FFD700';
        this.emoji = options.emoji || null;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life -= this.decay;
        this.size *= 0.98;
    }

    draw(ctx) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life;

        if (this.emoji) {
            ctx.font = `${this.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.emoji, this.x, this.y);
        } else {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    isDead() {
        return this.life <= 0;
    }
}

// 背景粒子
class BgParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = -10;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = ['#FFD700', '#FFA500', '#FF6B6B', '#FFF', '#FF69B4'][Math.floor(Math.random() * 5)];
        this.twinkle = Math.random() * Math.PI * 2;
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01) * 0.3;
        this.twinkle += 0.05;

        if (this.y > this.canvas.height + 10) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity * (0.7 + Math.sin(this.twinkle) * 0.3);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// 烟花
class Firework {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height * 0.5 + 50;
        this.speed = 8 + Math.random() * 4;
        this.exploded = false;
        this.particles = [];
        this.color = ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3', '#9C27B0', '#FF69B4'][Math.floor(Math.random() * 6)];
    }

    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.explode();
            }
        } else {
            this.particles.forEach(p => p.update());
            this.particles = this.particles.filter(p => !p.isDead());
        }
    }

    explode() {
        this.exploded = true;
        const count = 30 + Math.random() * 20;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = 3 + Math.random() * 3;
            this.particles.push(new Particle(this.x, this.y, {
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: this.color,
                life: 1,
                decay: 0.015,
                gravity: 0.05,
                size: 4
            }));
        }

        // 播放烟花音效
        AudioSystem.playNote(800 + Math.random() * 400, 0.1, 'sine', 0.15);
    }

    draw(ctx) {
        if (!this.exploded) {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        } else {
            this.particles.forEach(p => p.draw(ctx));
        }
    }

    isDead() {
        return this.exploded && this.particles.length === 0;
    }
}

// ==================== 碰撞检测 ====================
function checkCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// ==================== 物品生成 ====================
function getRandomItemType() {
    const rand = Math.random();
    let cumulative = 0;

    for (const [type, config] of Object.entries(CONFIG.ITEMS)) {
        cumulative += config.prob;
        if (rand < cumulative) {
            return { type, config };
        }
    }

    return { type: 'HONGBAO', config: CONFIG.ITEMS.HONGBAO };
}

function spawnItem() {
    if (!state.isRunning || state.isPaused) return;

    const { type, config } = getRandomItemType();
    items.push(new Item(DOM.gameCanvas, type, config));
}

// 金币雨特殊事件
function spawnGoldRain() {
    if (!state.isRunning || state.isPaused) return;

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            if (!state.isRunning) return;
            const goldItems = ['HONGBAO', 'YUANBAO', 'BIANPAO'];
            const type = goldItems[Math.floor(Math.random() * goldItems.length)];
            items.push(new Item(DOM.gameCanvas, type, CONFIG.ITEMS[type]));
        }, i * 200);
    }
}

// ==================== 特殊事件系统 ====================
function checkSpecialEvent() {
    if (state.specialEvent) return;

    if (Math.random() < CONFIG.GOLD_RAIN_CHANCE) {
        triggerGoldRain();
    }
}

function triggerGoldRain() {
    state.specialEvent = 'goldRain';

    // 显示事件横幅
    showEventBanner('🎉 金币雨来袭！ 🎉');

    // 播放特殊事件音效
    AudioSystem.playSpecialEvent();
    VFX.flash('rgba(255, 215, 0, 0.4)', 300);

    // 持续生成金币
    const rainInterval = setInterval(() => {
        if (!state.isRunning || state.isPaused) return;
        spawnGoldRain();
    }, 500);

    state.eventTimer = setTimeout(() => {
        clearInterval(rainInterval);
        state.specialEvent = null;
        hideEventBanner();
    }, CONFIG.GOLD_RAIN_DURATION);
}

function showEventBanner(text) {
    const banner = document.getElementById('event-banner');
    if (!banner) return;

    banner.querySelector('.event-text').textContent = text;
    banner.classList.remove('hidden');
    banner.classList.add('show');
}

function hideEventBanner() {
    const banner = document.getElementById('event-banner');
    if (!banner) return;

    banner.classList.remove('show');
    setTimeout(() => banner.classList.add('hidden'), 300);
}

// ==================== 粒子效果 ====================
function createCatchParticles(x, y, isPositive, isBonus) {
    const count = isBonus ? 25 : 15;
    const colors = isPositive
        ? ['#FFD700', '#FFA500', '#FF6B6B', '#FFFF00']
        : ['#666', '#444', '#888'];

    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, {
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 12,
            vy: -Math.random() * 10 - 3,
            size: isBonus ? 10 : 6,
            decay: 0.02
        }));
    }

    // Emoji粒子
    if (isBonus) {
        const emojis = ['✨', '⭐', '💫', '🌟'];
        for (let i = 0; i < 8; i++) {
            particles.push(new Particle(x, y, {
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                vx: (Math.random() - 0.5) * 8,
                vy: -Math.random() * 6 - 4,
                size: 25,
                decay: 0.015,
                gravity: 0.08
            }));
        }
    }
}

// ==================== 得分飘字 ====================
function showScorePopup(x, y, score, type = 'normal') {
    const popup = document.createElement('div');
    popup.className = `score-popup-3d ${score > 0 ? 'positive' : 'negative'} ${type}`;

    let text = score > 0 ? `+${score}` : `${score}`;
    if (type === 'combo') {
        text = `🔥 ${text}`;
    } else if (type === 'bonus') {
        text = `✨ ${text}`;
    } else if (type === 'fever') {
        text = `🌟 ${text}`;
    }

    popup.textContent = text;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    DOM.popupContainer.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

// ==================== 成就系统 ====================
function unlockAchievement(key) {
    if (state.unlockedAchievements.has(key)) return;

    const achievement = CONFIG.ACHIEVEMENTS[key];
    if (!achievement) return;

    state.unlockedAchievements.add(key);

    // 播放成就音效
    AudioSystem.playAchievement();
    VFX.flash('rgba(255, 215, 0, 0.3)', 200);

    // 显示成就提示
    const toast = DOM.achievementToast;
    if (toast) {
        toast.querySelector('.achievement-name').textContent = `${achievement.icon} ${achievement.name}`;
        toast.classList.remove('hidden');
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 2500);
    }
}

function checkAchievements() {
    if (state.score > 0 && !state.unlockedAchievements.has('FIRST_BLOOD')) {
        unlockAchievement('FIRST_BLOOD');
    }
    if (state.combo >= 5) unlockAchievement('COMBO_5');
    if (state.combo >= 10) unlockAchievement('COMBO_10');
    if (state.score >= 500) unlockAchievement('SCORE_500');
    if (state.score >= 1000) unlockAchievement('SCORE_1000');
    if (state.fuCollected >= 5) unlockAchievement('FU_COLLECTOR');
    if (state.collegeCollected >= 3) unlockAchievement('COLLEGE_FAN');
}

// ==================== Buff 系统 ====================
function activateBuff(buffType, duration) {
    state.buffs[buffType] = true;

    // 显示UI
    const buffEl = document.getElementById(`buff-${buffType}`);
    if (buffEl) {
        buffEl.classList.remove('hidden');
        const timerFill = buffEl.querySelector('.buff-timer-fill');
        if (timerFill) {
            timerFill.style.animation = 'none';
            timerFill.offsetHeight;
            timerFill.style.animation = `buff-timer ${duration}ms linear forwards`;
        }
    }

    // 清除旧计时器
    if (state.buffTimers[buffType]) {
        clearTimeout(state.buffTimers[buffType]);
    }

    // 设置新计时器
    state.buffTimers[buffType] = setTimeout(() => {
        state.buffs[buffType] = false;
        if (buffEl) buffEl.classList.add('hidden');
    }, duration);
}

// ==================== 技能系统 ====================
function useSkill(skillType) {
    const skill = state.skills[skillType];
    if (!skill || skill.charges < skill.maxCharges) return;

    skill.charges = 0;
    updateSkillUI();

    // 播放技能音效
    AudioSystem.playSkill();
    VFX.skillEffect();

    if (skillType === 'magnet') {
        activateBuff('magnet', CONFIG.SKILL_MAGNET_DURATION);
    } else if (skillType === 'slow') {
        activateBuff('slow', CONFIG.SKILL_SLOW_DURATION);
    } else if (skillType === 'fever') {
        activateFever();
    }
}

function activateFever() {
    activateBuff('fever', CONFIG.SKILL_FEVER_DURATION);
    VFX.feverEffect();
    AudioSystem.playSpecialEvent();
    showEventBanner('🌟 福运爆发！ 🌟');

    setTimeout(() => {
        hideEventBanner();
    }, CONFIG.SKILL_FEVER_DURATION);
}

function chargeSkills() {
    Object.values(state.skills).forEach(skill => {
        if (skill.charges < skill.maxCharges) {
            skill.charges++;
        }
    });
    updateSkillUI();
}

function updateSkillUI() {
    Object.entries(state.skills).forEach(([type, skill]) => {
        const btn = document.getElementById(`skill-${type}`);
        if (!btn) return;

        const ready = skill.charges >= skill.maxCharges;
        btn.disabled = !ready;
        btn.classList.toggle('ready', ready);

        // 更新充能环
        const chargeCircle = document.getElementById(`${type}-charge`);
        if (chargeCircle) {
            const circumference = 2 * Math.PI * 26;
            const progress = skill.charges / skill.maxCharges;
            chargeCircle.style.strokeDasharray = circumference;
            chargeCircle.style.strokeDashoffset = circumference * (1 - progress);
        }
    });
}

// ==================== 连击系统 ====================
function addCombo() {
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);

    // 更新UI
    if (state.combo >= 2) {
        const comboDisplay = document.getElementById('combo-display-3d');
        const comboCount = document.getElementById('combo-count');
        if (comboDisplay && comboCount) {
            comboDisplay.classList.remove('hidden');
            comboCount.textContent = `x${state.combo}`;
        }

        // 连击音效和特效
        AudioSystem.playCombo(state.combo);
        VFX.comboEffect(state.combo);
    }

    // 重置计时器
    clearTimeout(state.comboTimer);
    state.comboTimer = setTimeout(() => {
        state.combo = 0;
        const comboDisplay = document.getElementById('combo-display-3d');
        if (comboDisplay) comboDisplay.classList.add('hidden');
    }, CONFIG.COMBO_TIMEOUT);

    checkAchievements();
}

function getComboMultiplier() {
    const index = Math.min(state.combo, CONFIG.COMBO_MULTIPLIERS.length - 1);
    return CONFIG.COMBO_MULTIPLIERS[index];
}

function resetCombo() {
    state.combo = 0;
    const comboDisplay = document.getElementById('combo-display-3d');
    if (comboDisplay) comboDisplay.classList.add('hidden');
    clearTimeout(state.comboTimer);
}

// ==================== 难度系统 ====================
function updateDifficulty() {
    const newLevel = Math.floor((CONFIG.GAME_DURATION - state.timeLeft) / CONFIG.LEVEL_DURATION) + 1;

    if (newLevel > state.level) {
        state.level = newLevel;

        const levelNum = document.getElementById('current-level');
        if (levelNum) levelNum.textContent = state.level;

        // 增加难度
        state.fallSpeed = Math.min(
            CONFIG.BASE_FALL_SPEED + (state.level - 1) * CONFIG.SPEED_INCREMENT,
            CONFIG.MAX_FALL_SPEED
        );

        state.spawnInterval = Math.max(
            CONFIG.BASE_SPAWN_INTERVAL - (state.level - 1) * CONFIG.SPAWN_DECREMENT,
            CONFIG.MIN_SPAWN_INTERVAL
        );

        // 重新设置生成定时器
        clearInterval(state.timers.spawn);
        state.timers.spawn = setInterval(spawnItem, state.spawnInterval);

        // 显示波数提示
        showLevelUp();

        // 播放升级音效
        AudioSystem.playLevelUp();
        VFX.levelUpEffect();
    }

    // 检查特殊事件
    checkSpecialEvent();
}

function showLevelUp() {
    const indicator = document.getElementById('level-indicator');
    if (indicator) {
        indicator.classList.add('level-up');
        setTimeout(() => indicator.classList.remove('level-up'), 500);
    }
}

// ==================== 碰撞处理 ====================
function handleItemCollision(item) {
    // 无敌状态躲避负面物品
    if (item.negative && state.buffs.invincible) {
        unlockAchievement('SURVIVOR');
        createCatchParticles(item.x + item.width/2, item.y + item.height/2, true, false);
        AudioSystem.playCatch(true, false);
        VFX.positiveEffect(item.x, item.y);
        return;
    }

    // 计算分数
    let scoreGain = item.score;
    const isPositive = scoreGain > 0;
    const isBonus = !!item.buff || item.type === 'COLLEGE';

    if (isPositive) {
        // 连击加成
        addCombo();
        const multiplier = getComboMultiplier();

        // 双倍加成
        if (state.buffs.double) {
            scoreGain *= 2;
        }

        // 福运爆发加成
        if (state.buffs.fever) {
            scoreGain *= 1.5;
        }

        scoreGain = Math.floor(scoreGain * multiplier);

        // 充能技能
        chargeSkills();

        // 统计
        state.itemsCaught++;

        // 特殊物品统计
        if (item.type === 'FUZI') {
            state.fuCollected++;
        }
        if (item.type === 'COLLEGE') {
            state.collegeCollected++;
        }

        // 视觉和音效反馈
        AudioSystem.playCatch(true, isBonus);
        if (isBonus) {
            VFX.bonusEffect(item.x, item.y);
        } else {
            VFX.positiveEffect(item.x, item.y);
        }
    } else {
        // 负面物品重置连击
        resetCombo();
        AudioSystem.playCatch(false);
        VFX.negativeEffect(item.x, item.y);
    }

    // 更新分数
    state.score = Math.max(0, state.score + scoreGain);
    updateScoreDisplay();

    // 视觉反馈
    const popupType = state.buffs.fever ? 'fever' : (item.buff ? 'bonus' : (state.combo >= 3 ? 'combo' : 'normal'));
    showScorePopup(item.x, item.y, scoreGain, popupType);
    createCatchParticles(item.x + item.width/2, item.y + item.height/2, isPositive, isBonus);

    // 触发Buff
    if (item.buff === 'invincible') {
        activateBuff('invincible', CONFIG.BUFF_INVINCIBLE);
    } else if (item.buff === 'double') {
        activateBuff('double', CONFIG.BUFF_DOUBLE);
    }

    checkAchievements();
}

// ==================== UI 更新 ====================
function updateScoreDisplay() {
    if (DOM.score) DOM.score.textContent = state.score;
}

function updateTimeDisplay() {
    if (DOM.time) DOM.time.textContent = state.timeLeft;

    // 更新环形进度
    const progress = state.timeLeft / CONFIG.GAME_DURATION;
    const circumference = 2 * Math.PI * 42;
    if (DOM.timeProgress) {
        DOM.timeProgress.style.strokeDasharray = circumference;
        DOM.timeProgress.style.strokeDashoffset = circumference * (1 - progress);
    }

    // 颜色变化
    if (DOM.timeProgress) {
        DOM.timeProgress.classList.remove('warning', 'danger');
        if (state.timeLeft <= 10) {
            DOM.timeProgress.classList.add('danger');
        } else if (state.timeLeft <= 20) {
            DOM.timeProgress.classList.add('warning');
        }
    }
}

function updatePauseMenu() {
    const pauseScore = document.getElementById('pause-score');
    const pauseLevel = document.getElementById('pause-level');
    if (pauseScore) pauseScore.textContent = state.score;
    if (pauseLevel) pauseLevel.textContent = state.level;
}

// ==================== 背景渲染 ====================
function initBgCanvas() {
    const canvas = document.getElementById('bg-canvas-3d');
    if (!canvas) return;

    const viewport = getViewportDimensions();
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const ctx = canvas.getContext('2d');

    // 创建背景粒子
    const menuParticles = [];
    for (let i = 0; i < 60; i++) {
        menuParticles.push(new BgParticle(canvas));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        menuParticles.forEach(p => {
            p.update();
            p.draw(ctx);
        });
        requestAnimationFrame(animate);
    }

    animate();

    // 创建飘落的福字
    createFloatingFu();
}

function createFloatingFu() {
    const container = document.getElementById('floating-fu');
    if (!container) return;

    for (let i = 0; i < 8; i++) {
        const fu = document.createElement('div');
        fu.className = 'fu-char';
        fu.textContent = '福';
        fu.style.left = `${Math.random() * 100}%`;
        fu.style.animationDelay = `${Math.random() * 10}s`;
        fu.style.animationDuration = `${10 + Math.random() * 10}s`;
        container.appendChild(fu);
    }
}

// ==================== 烟花渲染 ====================
function initFireworkCanvas() {
    const canvas = DOM.fireworkCanvas;
    if (!canvas) return;

    const viewport = getViewportDimensions();
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const ctx = canvas.getContext('2d');

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 随机生成烟花
        if (Math.random() < 0.05) {
            fireworks.push(new Firework(canvas));
        }

        fireworks.forEach(f => {
            f.update();
            f.draw(ctx);
        });

        fireworks = fireworks.filter(f => !f.isDead());

        requestAnimationFrame(animate);
    }

    animate();
}

// ==================== 游戏循环 ====================
function gameLoop() {
    if (!state.isRunning || state.isPaused) return;

    update();
    render();

    state.timers.animation = requestAnimationFrame(gameLoop);
}

function update() {
    // 更新玩家
    if (input.left) player.moveLeft();
    if (input.right) player.moveRight();
    player.update();

    // 更新物品
    const playerBounds = player.getBounds();

    items = items.filter(item => {
        item.update();

        // 碰撞检测
        if (checkCollision(playerBounds, item.getBounds())) {
            handleItemCollision(item);
            return false;
        }

        return !item.isOffScreen();
    });

    // 更新粒子
    particles.forEach(p => p.update());
    particles = particles.filter(p => !p.isDead());

    // 更新背景粒子
    bgParticles.forEach(p => p.update());
}

function render() {
    const ctx = DOM.ctx;
    const canvas = DOM.gameCanvas;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(0.3, '#2d1b4e');
    gradient.addColorStop(0.7, '#3d1f5e');
    gradient.addColorStop(1, '#1a0a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 福运爆发时的背景特效
    if (state.buffs.fever) {
        const feverOverlay = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width
        );
        feverOverlay.addColorStop(0, 'rgba(255, 100, 0, 0.1)');
        feverOverlay.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = feverOverlay;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 绘制星空点点
    bgParticles.forEach(p => p.draw(ctx));

    // 绘制物品
    items.forEach(item => item.draw(ctx));

    // 绘制玩家
    player.draw(ctx);

    // 绘制粒子特效
    particles.forEach(p => p.draw(ctx));
}

// ==================== 页面切换 ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId)?.classList.add('active');
}

// ==================== 全屏控制 ====================
function requestFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) { // Safari/iOS
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function isFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

// ==================== 游戏控制 ====================
function startGame() {
    // 📱 请求全屏模式
    requestFullscreen();

    // 初始化音频（需要用户交互）
    if (!AudioSystem.context) {
        AudioSystem.init();
    }
    if (AudioSystem.context && AudioSystem.context.state === 'suspended') {
        AudioSystem.context.resume();
    }

    AudioSystem.playClick();

    // 重置状态
    state.isRunning = true;
    state.isPaused = false;
    state.score = 0;
    state.timeLeft = CONFIG.GAME_DURATION;
    state.level = 1;
    state.fallSpeed = CONFIG.BASE_FALL_SPEED;
    state.spawnInterval = CONFIG.BASE_SPAWN_INTERVAL;
    state.combo = 0;
    state.maxCombo = 0;
    state.itemsCaught = 0;
    state.fuCollected = 0;
    state.collegeCollected = 0;
    state.specialEvent = null;
    state.unlockedAchievements.clear();

    // 重置Buff
    Object.keys(state.buffs).forEach(key => {
        state.buffs[key] = false;
        if (state.buffTimers[key]) {
            clearTimeout(state.buffTimers[key]);
        }
    });

    // 重置技能
    Object.values(state.skills).forEach(skill => {
        skill.charges = 0;
    });

    // 隐藏所有Buff UI
    document.querySelectorAll('.buff-item-3d').forEach(el => el.classList.add('hidden'));

    const comboDisplay = document.getElementById('combo-display-3d');
    if (comboDisplay) comboDisplay.classList.add('hidden');

    // 清除定时器
    clearAllTimers();

    // 重置对象
    items = [];
    particles = [];
    input.left = false;
    input.right = false;

    // 初始化Canvas
    resizeGameCanvas();

    // 创建玩家
    player = new Player(DOM.gameCanvas);

    // 创建背景粒子
    bgParticles = [];
    for (let i = 0; i < 80; i++) {
        bgParticles.push(new BgParticle(DOM.gameCanvas));
    }

    // 更新UI
    updateScoreDisplay();
    updateTimeDisplay();
    updateSkillUI();

    const levelNum = document.getElementById('current-level');
    if (levelNum) levelNum.textContent = '1';

    // 切换页面
    showScreen('game-screen');

    // 启动定时器
    state.timers.game = setInterval(() => {
        if (state.isPaused) return;

        state.timeLeft--;
        updateTimeDisplay();
        updateDifficulty();

        if (state.timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    state.timers.spawn = setInterval(spawnItem, state.spawnInterval);

    // 播放背景音乐
    AudioSystem.playBGM();

    // 启动游戏循环
    gameLoop();
}

function pauseGame() {
    state.isPaused = true;
    updatePauseMenu();
    DOM.pauseMenu.classList.remove('hidden');
    AudioSystem.playClick();
    AudioSystem.pauseBGM();
}

function resumeGame() {
    state.isPaused = false;
    DOM.pauseMenu.classList.add('hidden');
    AudioSystem.playClick();
    AudioSystem.resumeBGM();
    gameLoop();
}

function quitGame() {
    state.isRunning = false;
    state.isPaused = false;
    clearAllTimers();
    AudioSystem.stopBGM();
    AudioSystem.playClick();
    showScreen('start-screen');
}

function endGame() {
    state.isRunning = false;
    clearAllTimers();

    // 停止BGM并播放结束音效
    AudioSystem.stopBGM();
    AudioSystem.playGameEnd();

    // 检查新纪录
    const isNewRecord = state.score > state.highScore;
    if (isNewRecord) {
        state.highScore = state.score;
        localStorage.setItem('snakeGame_highScore', state.highScore);
    }

    // 获取祝福语和评级
    const blessing = CONFIG.BLESSINGS.find(b => state.score >= b.min && state.score <= b.max);

    // 更新结束页面
    if (DOM.finalScore) DOM.finalScore.textContent = state.score;
    if (DOM.statItems) DOM.statItems.textContent = state.itemsCaught;
    if (DOM.statCombo) DOM.statCombo.textContent = state.maxCombo;
    if (DOM.statFu) DOM.statFu.textContent = state.fuCollected;
    if (DOM.statLevel) DOM.statLevel.textContent = state.level;
    if (DOM.blessingText) DOM.blessingText.textContent = blessing?.text || CONFIG.BLESSINGS[0].text;
    if (DOM.scoreRank) DOM.scoreRank.textContent = blessing?.rank || 'D';

    // 新纪录标识
    if (DOM.newRecord) DOM.newRecord.classList.toggle('hidden', !isNewRecord);

    // 🎁 初始化盲盒系统
    LuckyBoxSystem.init(state.score);

    // 🏆 更新排行榜（记录本次成绩）
    SocialSystem.updateLeaderboard(state.score);
    SocialSystem.renderLeaderboard();

    // 切换页面
    showScreen('end-screen');

    // 启动烟花
    fireworks = [];
    initFireworkCanvas();
}

function clearAllTimers() {
    clearInterval(state.timers.game);
    clearInterval(state.timers.spawn);
    cancelAnimationFrame(state.timers.animation);
    clearTimeout(state.comboTimer);
    clearTimeout(state.eventTimer);
    Object.values(state.buffTimers).forEach(t => clearTimeout(t));
}

// ==================== Canvas 尺寸 ====================
function resizeGameCanvas() {
    if (!DOM.gameCanvas) return;

    // 📱 移动端限制画布宽度，与开始/结束页面一致
    const viewport = getViewportDimensions();
    const isMobile = viewport.width <= 768;
    const maxWidth = isMobile ? Math.min(viewport.width, 420) : viewport.width;

    DOM.gameCanvas.width = maxWidth;
    DOM.gameCanvas.height = viewport.height;
    DOM.gameCanvas.style.width = `${maxWidth}px`;
    DOM.gameCanvas.style.height = `${viewport.height}px`;

    // 📱 移动端画布居中
    if (isMobile && viewport.width > maxWidth) {
        DOM.gameCanvas.style.marginLeft = ((viewport.width - maxWidth) / 2) + 'px';
    } else {
        DOM.gameCanvas.style.marginLeft = '0';
    }

    if (player) {
        player.canvas = DOM.gameCanvas;
        player.updateResponsiveMetrics();
    }

    items.forEach(item => {
        item.canvas = DOM.gameCanvas;
        const padding = item.spawnPadding || 0;
        const minX = padding;
        const maxX = Math.max(minX, DOM.gameCanvas.width - item.width - padding);
        item.x = Math.max(minX, Math.min(maxX, item.x));
    });
}

let viewportResizeRaf = null;

function handleViewportResize() {
    if (viewportResizeRaf) return;

    viewportResizeRaf = requestAnimationFrame(() => {
        viewportResizeRaf = null;

        if (state.isRunning) {
            resizeGameCanvas();
        }

        const viewport = getViewportDimensions();
        const bgCanvas = document.getElementById('bg-canvas-3d');
        if (bgCanvas) {
            bgCanvas.width = viewport.width;
            bgCanvas.height = viewport.height;
        }

        if (DOM.fireworkCanvas && DOM.endScreen?.classList.contains('active')) {
            DOM.fireworkCanvas.width = viewport.width;
            DOM.fireworkCanvas.height = viewport.height;
        }
    });
}

function bindViewportResizeEvents() {
    window.addEventListener('resize', handleViewportResize);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleViewportResize);
        window.visualViewport.addEventListener('scroll', handleViewportResize);
    }
}

// ==================== 事件绑定 ====================
function bindEvents() {
    // 开始按钮
    DOM.startBtn?.addEventListener('click', startGame);
    DOM.restartBtn?.addEventListener('click', startGame);
    DOM.homeBtn?.addEventListener('click', () => {
        AudioSystem.playClick();
        showScreen('start-screen');
    });

    // 暂停
    DOM.pauseBtn?.addEventListener('click', pauseGame);
    DOM.resumeBtn?.addEventListener('click', resumeGame);
    DOM.quitBtn?.addEventListener('click', quitGame);

    // 音效开关
    const soundBtn = document.getElementById('sound-btn');
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            const enabled = AudioSystem.toggle();
            soundBtn.classList.toggle('active', enabled);
            if (enabled) {
                AudioSystem.playClick();
            }
        });
    }

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (!state.isRunning) return;

        if (e.key === 'Escape') {
            if (state.isPaused) resumeGame();
            else pauseGame();
            return;
        }

        if (state.isPaused) return;

        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            input.left = true;
        }
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            input.right = true;
        }
        if (e.key === 'q' || e.key === 'Q') {
            useSkill('magnet');
        }
        if (e.key === 'e' || e.key === 'E') {
            useSkill('slow');
        }
        if (e.key === 'r' || e.key === 'R') {
            useSkill('fever');
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            input.left = false;
        }
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            input.right = false;
        }
    });

    // 📱 触摸控制 - 增强版
    // 方式1：左右区域触摸
    DOM.touchLeft?.addEventListener('touchstart', (e) => {
        e.preventDefault();
        input.left = true;
    });
    DOM.touchLeft?.addEventListener('touchend', () => input.left = false);
    DOM.touchLeft?.addEventListener('touchcancel', () => input.left = false);

    DOM.touchRight?.addEventListener('touchstart', (e) => {
        e.preventDefault();
        input.right = true;
    });
    DOM.touchRight?.addEventListener('touchend', () => input.right = false);
    DOM.touchRight?.addEventListener('touchcancel', () => input.right = false);

    // 方式2：在游戏画布上滑动控制（手指跟随）
    let isTouching = false;

    DOM.gameCanvas?.addEventListener('touchstart', (e) => {
        if (!state.isRunning || state.isPaused) return;
        e.preventDefault();
        isTouching = true;
        input.touchStartX = e.touches[0].clientX;

        // 直接将玩家移动到触摸位置
        if (player) {
            const canvasRect = DOM.gameCanvas.getBoundingClientRect();
            const touchX = e.touches[0].clientX - canvasRect.left;
            const minX = player.edgePadding || 0;
            const maxX = Math.max(minX, DOM.gameCanvas.width - player.width - minX);
            player.targetX = Math.max(minX, Math.min(maxX, touchX - player.width / 2));
        }
    }, { passive: false });

    DOM.gameCanvas?.addEventListener('touchmove', (e) => {
        if (!state.isRunning || state.isPaused || !isTouching) return;
        e.preventDefault();

        // 手指滑动，玩家跟随
        if (player) {
            const canvasRect = DOM.gameCanvas.getBoundingClientRect();
            const touchX = e.touches[0].clientX - canvasRect.left;
            const minX = player.edgePadding || 0;
            const maxX = Math.max(minX, DOM.gameCanvas.width - player.width - minX);
            player.targetX = Math.max(minX, Math.min(maxX, touchX - player.width / 2));
        }
    }, { passive: false });

    DOM.gameCanvas?.addEventListener('touchend', () => {
        isTouching = false;
        input.left = false;
        input.right = false;
    });

    DOM.gameCanvas?.addEventListener('touchcancel', () => {
        isTouching = false;
        input.left = false;
        input.right = false;
    });

    // 技能按钮
    document.getElementById('skill-magnet')?.addEventListener('click', () => useSkill('magnet'));
    document.getElementById('skill-slow')?.addEventListener('click', () => useSkill('slow'));
    document.getElementById('skill-fever')?.addEventListener('click', () => useSkill('fever'));

    bindViewportResizeEvents();

    // 🎁 盲盒点击事件
    const luckyBox = document.getElementById('lucky-box');
    if (luckyBox) {
        luckyBox.addEventListener('click', () => {
            AudioSystem.playClick();
            LuckyBoxSystem.open();
        });
    }

    // 📱 社交分享按钮事件
    const sharePosterBtn = document.getElementById('share-poster-btn');
    if (sharePosterBtn) {
        sharePosterBtn.addEventListener('click', () => {
            AudioSystem.playClick();
            SocialSystem.downloadPoster();
        });
    }

    const shareWechatBtn = document.getElementById('share-wechat-btn');
    if (shareWechatBtn) {
        shareWechatBtn.addEventListener('click', () => {
            AudioSystem.playClick();
            SocialSystem.shareToFriend();
        });
    }

    const copyLinkBtn = document.getElementById('copy-link-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            AudioSystem.playClick();
            SocialSystem.copyLink();
        });
    }
}

// ==================== 初始化 ====================
function init() {
    // 缓存DOM元素
    DOM.loadingScreen = document.getElementById('loading-screen');
    DOM.startScreen = document.getElementById('start-screen');
    DOM.gameScreen = document.getElementById('game-screen');
    DOM.endScreen = document.getElementById('end-screen');

    DOM.gameCanvas = document.getElementById('game-canvas');
    DOM.fireworkCanvas = document.getElementById('firework-canvas');
    DOM.ctx = DOM.gameCanvas?.getContext('2d');

    DOM.startBtn = document.getElementById('start-btn');
    DOM.restartBtn = document.getElementById('restart-btn');
    DOM.homeBtn = document.getElementById('home-btn');
    DOM.pauseBtn = document.getElementById('pause-btn');
    DOM.resumeBtn = document.getElementById('resume-btn');
    DOM.quitBtn = document.getElementById('quit-btn');

    DOM.score = document.getElementById('score');
    DOM.time = document.getElementById('time');
    DOM.timeProgress = document.getElementById('time-progress');

    DOM.popupContainer = document.getElementById('popup-container');
    DOM.achievementToast = document.getElementById('achievement-toast');
    DOM.pauseMenu = document.getElementById('pause-menu');

    DOM.finalScore = document.getElementById('final-score');
    DOM.statItems = document.getElementById('stat-items');
    DOM.statCombo = document.getElementById('stat-combo');
    DOM.statFu = document.getElementById('stat-fu');
    DOM.statLevel = document.getElementById('stat-level');
    DOM.blessingText = document.getElementById('blessing-text');
    DOM.scoreRank = document.getElementById('score-rank');
    DOM.newRecord = document.getElementById('new-record');
    DOM.highScore = document.getElementById('high-score');

    DOM.touchLeft = document.getElementById('touch-left');
    DOM.touchRight = document.getElementById('touch-right');

    // 加载最高分
    state.highScore = parseInt(localStorage.getItem('snakeGame_highScore')) || 0;
    if (DOM.highScore) DOM.highScore.textContent = state.highScore;

    // 初始化音频系统
    AudioSystem.init();

    // 绑定事件
    bindEvents();

    // 初始化背景
    initBgCanvas();

    // 🖼️ 预加载所有图片
    ImageLoader.preloadAll().then(() => {
        console.log('✅ 游戏资源加载完成');
        // 加载完成后显示开始页面
        showScreen('start-screen');
    }).catch(err => {
        console.warn('⚠️ 部分资源加载失败:', err);
        showScreen('start-screen');
    });
}

// 启动
document.addEventListener('DOMContentLoaded', init);

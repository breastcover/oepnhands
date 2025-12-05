// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initSnowfall();
    initControls();
    initGiftInteraction();
    initChristmasGreeting();
    
    // 播放欢迎音效
    playWelcomeSound();
});

// 雪花效果
function initSnowfall() {
    const snowflakesContainer = document.getElementById('snowflakes');
    const snowflakeSymbols = ['❄', '❅', '❆', '✻', '✼', '❋'];
    let snowflakesEnabled = true;
    
    function createSnowflake() {
        if (!snowflakesEnabled) return;
        
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
        
        // 随机位置和大小
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 0.8 + 0.8) + 'em';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        
        snowflakesContainer.appendChild(snowflake);
        
        // 动画结束后移除雪花
        snowflake.addEventListener('animationend', () => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        });
    }
    
    // 定期创建雪花
    const snowInterval = setInterval(createSnowflake, 300);
    
    // 雪花开关控制
    window.toggleSnow = function() {
        snowflakesEnabled = !snowflakesEnabled;
        const snowBtn = document.getElementById('snowBtn');
        
        if (snowflakesEnabled) {
            snowBtn.textContent = '❄️ 雪花开关';
            snowBtn.classList.remove('active');
        } else {
            snowBtn.textContent = '❄️ 雪花关闭';
            snowBtn.classList.add('active');
            // 清除现有雪花
            snowflakesContainer.innerHTML = '';
        }
    };
}

// 控制按钮功能
function initControls() {
    const musicBtn = document.getElementById('musicBtn');
    const snowBtn = document.getElementById('snowBtn');
    const lightsBtn = document.getElementById('lightsBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    let musicPlaying = false;
    let lightsOn = true;
    
    // 音乐控制
    musicBtn.addEventListener('click', function() {
        if (musicPlaying) {
            bgMusic.pause();
            musicBtn.textContent = '🎵 播放音乐';
            musicBtn.classList.remove('active');
            musicPlaying = false;
        } else {
            // 由于浏览器限制，需要用户交互才能播放音频
            bgMusic.play().catch(e => {
                console.log('音频播放失败:', e);
                playClickSound(); // 播放点击音效作为替代
            });
            musicBtn.textContent = '🎵 暂停音乐';
            musicBtn.classList.add('active');
            musicPlaying = true;
        }
    });
    
    // 雪花控制
    snowBtn.addEventListener('click', function() {
        toggleSnow();
        playClickSound();
    });
    
    // 彩灯控制
    lightsBtn.addEventListener('click', function() {
        const christmasTree = document.querySelector('.christmas-tree');
        
        if (lightsOn) {
            christmasTree.classList.add('lights-off');
            lightsBtn.textContent = '💡 开启彩灯';
            lightsBtn.classList.add('active');
            lightsOn = false;
        } else {
            christmasTree.classList.remove('lights-off');
            lightsBtn.textContent = '💡 关闭彩灯';
            lightsBtn.classList.remove('active');
            lightsOn = true;
        }
        playClickSound();
    });
}

// 礼物盒交互
function initGiftInteraction() {
    const gifts = document.querySelectorAll('.gift');
    const surprises = [
        '🎁 恭喜你获得了一个拥抱！',
        '🍪 恭喜你获得了圣诞饼干！',
        '🧸 恭喜你获得了可爱的泰迪熊！',
        '⭐ 恭喜你获得了一个愿望！',
        '🎈 恭喜你获得了彩色气球！',
        '🍭 恭喜你获得了圣诞糖果！'
    ];
    
    gifts.forEach((gift, index) => {
        gift.addEventListener('click', function() {
            // 播放音效
            playGiftSound();
            
            // 显示惊喜
            const surprise = surprises[Math.floor(Math.random() * surprises.length)];
            showSurprise(surprise);
            
            // 添加打开动画
            gift.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                gift.style.transform = '';
            }, 600);
        });
    });
}

// 显示惊喜消息
function showSurprise(message) {
    // 创建惊喜弹窗
    const surpriseDiv = document.createElement('div');
    surpriseDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b7a, #ff4757);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: surpriseAnimation 0.5s ease-out;
    `;
    surpriseDiv.textContent = message;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes surpriseAnimation {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(surpriseDiv);
    
    // 3秒后移除
    setTimeout(() => {
        if (surpriseDiv.parentNode) {
            surpriseDiv.style.animation = 'surpriseAnimation 0.3s ease-in reverse';
            setTimeout(() => {
                surpriseDiv.parentNode.removeChild(surpriseDiv);
                document.head.removeChild(style);
            }, 300);
        }
    }, 3000);
}

// 圣诞问候
function initChristmasGreeting() {
    const greetings = [
        '🎄 圣诞快乐！愿你的每一天都充满欢乐！',
        '🎅 圣诞老人说你今年表现很棒！',
        '⭐ 愿圣诞之星为你带来好运！',
        '🔔 听，圣诞钟声为你而响！',
        '❄️ 愿这个冬天温暖如春！'
    ];
    
    // 随机显示问候语
    setTimeout(() => {
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        showSurprise(randomGreeting);
    }, 3000);
}

// 音效函数
function playWelcomeSound() {
    // 创建简单的欢迎音效
    playTone(523.25, 200); // C5
    setTimeout(() => playTone(659.25, 200), 200); // E5
    setTimeout(() => playTone(783.99, 400), 400); // G5
}

function playClickSound() {
    playTone(800, 100);
}

function playGiftSound() {
    // 播放礼物打开音效
    playTone(523.25, 100);
    setTimeout(() => playTone(659.25, 100), 100);
    setTimeout(() => playTone(783.99, 100), 200);
    setTimeout(() => playTone(1046.50, 200), 300);
}

function playTone(frequency, duration) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
        console.log('音频播放不支持:', e);
    }
}

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    switch(e.key.toLowerCase()) {
        case 'm':
            document.getElementById('musicBtn').click();
            break;
        case 's':
            document.getElementById('snowBtn').click();
            break;
        case 'l':
            document.getElementById('lightsBtn').click();
            break;
        case ' ':
            e.preventDefault();
            // 空格键随机点击一个礼物
            const gifts = document.querySelectorAll('.gift');
            const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
            randomGift.click();
            break;
    }
});

// 添加鼠标跟随效果
document.addEventListener('mousemove', function(e) {
    // 创建跟随鼠标的星星效果
    if (Math.random() < 0.1) { // 10% 概率
        createMouseStar(e.clientX, e.clientY);
    }
});

function createMouseStar(x, y) {
    const star = document.createElement('div');
    star.innerHTML = '✨';
    star.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1000;
        font-size: 1rem;
        animation: starFade 1s ease-out forwards;
    `;
    
    // 添加星星动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes starFade {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            100% { transform: scale(1.5) rotate(180deg); opacity: 0; }
        }
    `;
    if (!document.querySelector('style[data-star-animation]')) {
        style.setAttribute('data-star-animation', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 1000);
}

// 添加滚动视差效果
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const christmasTree = document.querySelector('.christmas-tree');
    
    if (christmasTree) {
        christmasTree.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// 添加窗口大小改变时的响应
window.addEventListener('resize', function() {
    // 重新计算雪花位置
    const snowflakes = document.querySelectorAll('.snowflake');
    snowflakes.forEach(snowflake => {
        snowflake.style.left = Math.random() * 100 + '%';
    });
});

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    const bgMusic = document.getElementById('bgMusic');
    
    if (document.hidden) {
        // 页面隐藏时暂停音乐
        if (!bgMusic.paused) {
            bgMusic.pause();
        }
    } else {
        // 页面显示时恢复音乐（如果之前在播放）
        const musicBtn = document.getElementById('musicBtn');
        if (musicBtn.classList.contains('active')) {
            bgMusic.play().catch(e => console.log('音频恢复播放失败:', e));
        }
    }
});

console.log('🎄 圣诞快乐！页面已加载完成！');
console.log('💡 快捷键提示：');
console.log('   M - 音乐开关');
console.log('   S - 雪花开关');
console.log('   L - 彩灯开关');
console.log('   空格 - 随机打开礼物');
console.log('🎁 点击礼物盒获得惊喜！');
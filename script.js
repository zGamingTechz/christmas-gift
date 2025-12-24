let clickCount = 0;
let secretUnlocked = false;
let scratchProgress = 0;

const easterEggs = {
    candy: { emoji: '🍬', text: 'Sweet! You found a candy cane! There are more surprises hidden around...' },
    snowman: { emoji: '⛄', text: 'Brr! You built a snowman! He says hello!' },
    cookie: { emoji: '🍪', text: 'Yum! A Christmas cookie! Santa would be proud!' },
    reindeer: { emoji: '🦌', text: 'Look! A reindeer! Maybe Rudolph\'s cousin?' }
};

// Create snowflakes
function createSnow() {
    const snowContainer = document.querySelector('.snow-container');
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        snowContainer.appendChild(snowflake);
    }
}

// Create stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '✨';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Show message toast
function showMessage(text) {
    const toast = document.createElement('div');
    toast.className = 'message-toast show';
    toast.textContent = text;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Create confetti
function createConfetti() {
    const emojis = ['🎉', '🎊', '✨', '🎁', '⭐', '💝', '🎈'];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Track clicks for secret
function trackClick() {
    clickCount++;
    document.getElementById('secretCounter').textContent = clickCount;
    
    if (clickCount >= 50 && !secretUnlocked) {
        secretUnlocked = true;
        document.querySelector('.click-counter').classList.add('revealed');
        showMessage('🎉 SECRET UNLOCKED! You found the hidden counter! 🎉');
        createConfetti();
    }
}

// Intro screen click
document.getElementById('introScreen').addEventListener('click', function() {
    this.classList.remove('active');
    this.classList.add('hidden');
    document.getElementById('mainScene').classList.add('active');
    createSnow();
    createStars();
});

// Santa hat click
document.getElementById('santaHat').addEventListener('click', function(e) {
    e.stopPropagation();
    this.style.animation = 'spin 1s ease-in-out';
    setTimeout(() => {
        this.style.animation = 'float 3s ease-in-out infinite';
    }, 1000);
    showMessage('Ho Ho Ho! 🎅');
    trackClick();
});

// Music note click
document.getElementById('musicNote').addEventListener('click', function(e) {
    e.stopPropagation();
    const notes = ['🎵', '🎶', '🎼'];
    this.textContent = notes[Math.floor(Math.random() * notes.length)];
    
    // Create floating notes
    for (let i = 0; i < 5; i++) {
        const floatingNote = document.createElement('div');
        floatingNote.textContent = notes[Math.floor(Math.random() * notes.length)];
        floatingNote.style.position = 'fixed';
        floatingNote.style.left = this.offsetLeft + 'px';
        floatingNote.style.top = this.offsetTop + 'px';
        floatingNote.style.fontSize = '2em';
        floatingNote.style.pointerEvents = 'none';
        floatingNote.style.zIndex = '1000';
        floatingNote.style.animation = 'confettiFall 2s ease-out forwards';
        floatingNote.style.animationDelay = (i * 0.1) + 's';
        document.body.appendChild(floatingNote);
        
        setTimeout(() => floatingNote.remove(), 2200);
    }
    
    showMessage('♪ Jingle Bells! ♪');
    trackClick();
});

// Floating ornaments
document.querySelectorAll('.floating-ornament').forEach(ornament => {
    ornament.addEventListener('click', function(e) {
        e.stopPropagation();
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
        
        const colors = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'];
        this.textContent = colors[Math.floor(Math.random() * colors.length)];
        
        showMessage('Beautiful ornament! ✨');
        trackClick();
    });
});

// Christmas tree click
document.getElementById('tree').addEventListener('click', function(e) {
    e.stopPropagation();
    this.style.animation = 'bounce 0.5s ease-in-out';
    setTimeout(() => {
        this.style.animation = '';
    }, 500);
    
    const messages = [
        'This tree is decorated with love! 🎄',
        'Shake it! Presents might fall! 🎁',
        'The star on top is shining for you! ⭐',
        'O Christmas Tree! 🎶'
    ];
    showMessage(messages[Math.floor(Math.random() * messages.length)]);
    trackClick();
});

// Small presents (easter eggs)
document.querySelectorAll('.present:not(#mainGift)').forEach(present => {
    present.addEventListener('click', function(e) {
        e.stopPropagation();
        const eggType = this.getAttribute('data-easter-egg');
        
        if (eggType && easterEggs[eggType]) {
            showEasterEgg(eggType);
            
            // Special effect for snowman
            if (eggType === 'snowman') {
                const snowman = document.getElementById('snowman');
                snowman.classList.remove('hidden');
            }
        }
        
        trackClick();
    });
});

// Main gift click - FIXED
document.getElementById('mainGift').addEventListener('click', function(e) {
    e.stopPropagation();
    showMessage('Opening your special gift! 🎁');
    createConfetti();
    
    setTimeout(() => {
        document.getElementById('mainScene').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('mainScene').style.display = 'none';
            document.getElementById('unwrapScene').classList.remove('hidden');
            document.getElementById('unwrapScene').classList.add('active');
            
            // Initialize scratch card AFTER scene is visible
            setTimeout(() => {
                initScratchCard();
            }, 100);
        }, 1000);
    }, 1000);
    
    trackClick();
});

// Snowman click
document.getElementById('snowman').addEventListener('click', function(e) {
    e.stopPropagation();
    showMessage('⛄ "I\'m Frosty! Happy Holidays!" ⛄');
    trackClick();
});

// Fireplace interactions
document.querySelector('.fire').addEventListener('click', function(e) {
    e.stopPropagation();
    showMessage('Warm and cozy! 🔥');
    trackClick();
});

document.querySelectorAll('.stocking').forEach((stocking, index) => {
    stocking.addEventListener('click', function(e) {
        e.stopPropagation();
        const surprises = ['🍫', '🍭', '🎁', '💝'];
        showMessage(`You found: ${surprises[index % surprises.length]}`);
        trackClick();
    });
});

// Double click for confetti
document.body.addEventListener('dblclick', function(e) {
    if (!e.target.closest('.unwrap-scene') && !e.target.closest('.second-gift-scene')) {
        createConfetti();
        showMessage('✨ CONFETTI! ✨');
    }
});

// Background clicks
document.getElementById('mainScene').addEventListener('click', function(e) {
    if (e.target === this) {
        trackClick();
    }
});

// Show easter egg popup
function showEasterEgg(type) {
    const popup = document.getElementById('easterEggPopup');
    const egg = easterEggs[type];
    
    document.getElementById('popupEmoji').textContent = egg.emoji;
    document.getElementById('popupText').textContent = egg.text;
    
    popup.classList.remove('hidden');
    popup.classList.add('active');
}

// Close popup
document.getElementById('closePopup').addEventListener('click', function() {
    const popup = document.getElementById('easterEggPopup');
    popup.classList.remove('active');
    setTimeout(() => popup.classList.add('hidden'), 300);
});

// Next gift button
document.getElementById('nextGiftBtn').addEventListener('click', function() {
    createConfetti();
    showMessage('One more surprise! 🎁');
    
    setTimeout(() => {
        document.getElementById('unwrapScene').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('unwrapScene').classList.remove('active');
            document.getElementById('unwrapScene').classList.add('hidden');
            document.getElementById('secondGiftScene').classList.remove('hidden');
            document.getElementById('secondGiftScene').classList.add('active');
        }, 1000);
    }, 500);
});

// Second gift box click
document.getElementById('secondGiftBox').addEventListener('click', function() {
    this.classList.add('opening');
    createConfetti();
    showMessage('Opening your special gift! 🎁');
    
    setTimeout(() => {
        document.getElementById('tapInstruction').style.opacity = '0';
        document.getElementById('sareeReveal').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('sareeReveal').classList.add('active');
        }, 100);
    }, 600);
});

// Initialize scratch card - COMPLETELY FIXED
function initScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const wrapper = document.getElementById('scratchWrapper');
    
    // Get actual dimensions
    const rect = wrapper.getBoundingClientRect();
    
    // Set canvas to match container size exactly
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Create wrapping paper pattern
    ctx.fillStyle = '#ff0844';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add polka dot pattern
    ctx.strokeStyle = '#ffb199';
    ctx.lineWidth = 3;
    const patternSize = 30;
    for (let i = 0; i < canvas.width; i += patternSize) {
        for (let j = 0; j < canvas.height; j += patternSize) {
            ctx.beginPath();
            ctx.arc(i, j, 8, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    // Add ribbons
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(canvas.width / 2 - 20, 0, 40, canvas.height);
    ctx.fillRect(0, canvas.height / 2 - 20, canvas.width, 40);
    
    // Add bow
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎀', canvas.width / 2, canvas.height / 2);
    
    let isScratching = false;
    let lastX = null;
    let lastY = null;
    
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
    
    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        
        // Draw circle at current position
        ctx.beginPath();
        ctx.arc(x, y, 35, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw line from last position for smooth scratching
        if (lastX !== null && lastY !== null) {
            ctx.lineWidth = 70;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        
        lastX = x;
        lastY = y;
        
        checkProgress();
    }
    
    function checkProgress() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparent = 0;
        
        // Check every pixel's alpha channel
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] < 128) {
                transparent++;
            }
        }
        
        const totalPixels = pixels.length / 4;
        const percentScratched = (transparent / totalPixels) * 100;
        
        // When 40% is scratched, remove the canvas
        if (percentScratched > 40 && canvas.style.opacity !== '0') {
            canvas.style.transition = 'opacity 0.8s ease';
            canvas.style.opacity = '0';
            
            setTimeout(() => {
                canvas.style.display = 'none';
                createConfetti();
                showMessage('🎉 Gift Revealed! 🎉');
            }, 800);
        }
    }
    
    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
        isScratching = true;
        const pos = getPosition(e);
        scratch(pos.x, pos.y);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (isScratching) {
            const pos = getPosition(e);
            scratch(pos.x, pos.y);
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        isScratching = false;
        lastX = null;
        lastY = null;
    });
    
    canvas.addEventListener('mouseleave', () => {
        isScratching = false;
        lastX = null;
        lastY = null;
    });
    
    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isScratching = true;
        const pos = getPosition(e);
        scratch(pos.x, pos.y);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (isScratching) {
            const pos = getPosition(e);
            scratch(pos.x, pos.y);
        }
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        isScratching = false;
        lastX = null;
        lastY = null;
    });
    
    canvas.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        isScratching = false;
        lastX = null;
        lastY = null;
    });
}

// Initialize everything on load
window.addEventListener('load', function() {
    // Add sparkles to intro
    const sparklesContainer = document.querySelector('.sparkles');
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = `twinkle ${Math.random() * 2 + 1}s ease-in-out infinite`;
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparklesContainer.appendChild(sparkle);
    }
});
// Estado de la aplicación
let selectedCoupon = null;
let isRevealing = false;
let showingWelcome = true;

// Estado de la ruleta
let currentParticipant = null;
let isSpinning = false;
let wheelRotation = 0;

// Playlist de canciones (siempre empieza con Iris)
const playlist = [
    'media/The_Goo_Goo_Dolls_Iris_Acoustic.mp3',
    'media/The_Goo_Goo_Dolls_-_Before_It_s_Too_Late_(mp3.pm).mp3',
    'media/The_Goo_Goo_Dolls_-_Slide_Acoustic_(mp3.pm).mp3',
    'media/Airbag_-_Algo_en_mi_mente_(mp3.pm).mp3',
    'media/Paul_Alone_-_No_Valgo_Pa_Ciudad_(mp3.pm).mp3',
    'media/Paul_Alone_-_Vuela_(mp3.pm).mp3',
    'media/Alton_Jon_-_Can_you_feel_the_love_tonight_(mp3.pm).mp3',
    'media/As_Long_As_You_Love_Me_-_Backstreet_Boys_(mp3.pm).mp3',
    'media/Backstreet_Boys_-_All_I_Have_To_Give_(mp3.pm).mp3',
    'media/BACKSTREET_BOYS_-_I_Want_It_Thet_Way_(mp3.pm).mp3',
    'media/Backstreet_Boys_-_Quit_Playing_Games_With_My_Heart_(mp3.pm).mp3',
    'media/Backstreet_Boys_-_Show_Me_The_Meaning_of_Being._(mp3.pm).mp3',
    'media/Elton_Jhon_-_Circle_of_Life_(mp3.pm).mp3',
    'media/Elton_Jhon_-_Elton_John_-_Sacrifice_(mp3.pm).mp3',
    'media/Elton_Jhon_-_Rocket_Man_(mp3.pm).mp3',
    'media/Micahel_Jackson_ft._Akon_-_Hold_my_Hand_(mp3.pm).mp3',
    'media/Racine_A_Tribute_To_Michael_Jackson_-_You_Are_Not_Alone_(mp3.pm).mp3',
    'media/Richard_Max_-_Waiting_For_You_(mp3.pm).mp3'
];
let currentSongIndex = 0;

// Lista de fotos para el carrusel
const photos = [
    'imgs/20251010_161041.jpg',
    'imgs/IMG-20251118-WA0122.jpg',
    'imgs/IMG-20251206-WA0043.jpg',
    'imgs/IMG-20260206-WA0046.jpg',
    'imgs/IMG-20260207-WA0002.jpg'
];
let currentPhotoIndex = 0;
let carouselInterval = null;

// Preguntas para la ruleta del amor con emojis
const wheelQuestions = [
    {
        emoji: "💬",
        text: "¿Qué pensaste la primera vez que te escribió o te respondió tu pareja?"
    },
    {
        emoji: "🔥",
        text: "¿Cuándo fue la vez que más disfrutaste tener relaciones sexuales con tu pareja?"
    },
    {
        emoji: "💭",
        text: "Si pudieras elegir un adjetivo para describirl@, ¿cuál sería? ¿Por qué?"
    },
    {
        emoji: "📅",
        text: "¿Qué día empezaron a salir oficialmente?"
    },
    {
        emoji: "👀",
        text: "¿Qué pensaste la primera vez que l@ viste?"
    },
    {
        emoji: "🤝",
        text: "Si pudieras ayudar a tu pareja en algo, ¿en qué sería?"
    },
    {
        emoji: "✨",
        text: "¿Qué característica física y emocional te gusta más de tu pareja?"
    },
    {
        emoji: "🎯",
        text: "Si pudieras trasladar una habilidad tuya en la que eres muy bueno a tu pareja, ¿cuál sería?"
    },
    {
        emoji: "😍",
        text: "¿Qué gesto o caricia de tu pareja te hace sentir más deseado?"
    },
    {
        emoji: "⭐",
        text: "¿Qué momento ha sido el que más te ha gustado de los que has vivido con tu pareja hasta la fecha actual?"
    },
    {
        emoji: "🗺️",
        text: "¿Hay algún lugar en el que siempre has deseado tener un encuentro íntimo con tu pareja pero no lo han hecho aún?"
    },
    {
        emoji: "🎬",
        text: "Si nuestro amor fuera una película, ¿cómo se llamaría y qué género tendría?"
    }
];

// Definición de cupones
const cupones = [
    {
        id: 1,
        titulo: "Aprender a montar bici",
        subtitulo: "PD: saber doblar",
        emoji: "🚴‍♀️",
        color: "#ff9a9e",
        mensaje: "Como me habías contado que era tu 2do momento abejita, pues eso! a caerse un poco en el parque de 26! Let's go!",
        tipoFondo: "bees"
    },
    {
        id: 2,
        titulo: "Exploración de sentidos",
        subtitulo: "Una experiencia única",
        emoji: "👁️",
        color: "#e74c3c",
        mensaje: "Cuando sea su turno, su pareja debe vendarse los ojos, debes hacer algo a su pareja que involucre a alguno de los sentidos (olor, sabor, tacto, excepto la vista) y su pareja (el o la vendad@) debe describir con palabras sencillas como se siente, o que reacción provoca el estímulo, son 5 turnos.",
        tipoFondo: "hearts"
    },
    {
        id: 3,
        titulo: "Ir a la Playita de 16",
        subtitulo: "A ver el atardecer",
        emoji: "🌅",
        color: "#feca57",
        mensaje: "Un lugarcito especial para mi, que un día te dije que iba a enseñarte, quedamos pendiente de ver el atardecer ahí....",
        tipoFondo: "sunset"
    },
    {
        id: 4,
        titulo: "Juego de escritura",
        subtitulo: "Expresa tu corazón",
        emoji: "✍️",
        color: "#a29bfe",
        mensaje: "Bienvenida al juego de la escritura, debe coger un bolígrafo y una hoja de papel, en ella debe escribir durante un tiempo máximo de 10 minutos, qué momentos más le han gustado dentro de la relación, con detalles. Después, esa persona debe darle la tarjeta a su pareja y este debe leerle mirándole a los ojos (en lo posible pq estamos leyendo) lo que su pareja le escribió.",
        tipoFondo: "writing"
    },
    {
        id: 5,
        titulo: "We are Us",
        subtitulo: "Nuestros momentos juntos",
        emoji: "📷",
        color: "#74b9ff",
        mensaje: "De las pocas fotos que tenemos juntos, que tengo en mis manos, y alguna que otra que me gustó mucho extra...",
        tipoFondo: "photos"
    },
    {
        id: 6,
        titulo: "Ruleta del Amor",
        subtitulo: "Gira y responde",
        emoji: "🎯",
        color: "#ff6b9d",
        mensaje: "Un juego especial donde la ruleta decidirá qué pregunta profunda responderás sobre nuestra relación. ¡Cada uno tiene 3 giros!",
        tipoFondo: "wheel"
    }
];

// Función para renderizar la pantalla de bienvenida
function renderWelcomeView() {
    const root = document.getElementById('root');

    const html = `
        <div class="welcome-container">
            <div class="welcome-content">
                <h1 class="welcome-title">💝</h1>
                <div class="welcome-text">
                    <p>Hola señorita, a continuación verás un <strong>Juego de Cupones</strong>, le llamé <strong>"Cupones de Amor"</strong>, deberás elegir uno a uno a lo largo del día, cuando quieras, si quieres puedes elegirlos uno tras de otro, son actividades que haremos este día especial.</p>

                    <p>Aunque es una construcción capitalista para sacarle la plata a las parejas, lo cierto es que celebrarlo es muy bonito, y es una experiencia de esas que se te quedan grabadas, y desde mi humildad y mi trabajo te dedico esto como mi regalito digital.</p>

                    <p class="quote">Porque como dijo Honoré de Balzac:<br><em>"El amor es la poesía de los sentidos"</em></p>

                    <div class="welcome-input-container">
                        <p class="welcome-label">PD: Ingresa tu apodo en minúsculas en la siguiente casilla para poder continuar...</p>
                        <input type="text" id="nickname-input" class="nickname-input" placeholder="Tu apodo aquí">
                        <button id="continue-button" class="continue-button">Continuar 💕</button>
                        <p id="error-message" class="error-message"></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    root.innerHTML = html;

    // Event listeners
    const continueButton = document.getElementById('continue-button');
    const nicknameInput = document.getElementById('nickname-input');
    const errorMessage = document.getElementById('error-message');

    const handleContinue = () => {
        const nickname = nicknameInput.value.trim();
        if (nickname === 'señorita') {
            showingWelcome = false;
            transitionToMain();
        } else {
            errorMessage.textContent = '❌ Apodo incorrecto. Intenta de nuevo...';
            nicknameInput.value = '';
            nicknameInput.focus();
        }
    };

    continueButton.addEventListener('click', handleContinue);
    nicknameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleContinue();
        }
    });
}

// Transición a la vista principal
function transitionToMain() {
    const root = document.getElementById('root');
    root.classList.add('fade-out');

    setTimeout(() => {
        renderMainView();
        root.classList.remove('fade-out');
        root.classList.add('fade-in');

        // Iniciar la música después de la transición
        setupMusicPlaylist();

        setTimeout(() => {
            root.classList.remove('fade-in');
        }, 800);
    }, 500);
}

// Función para renderizar la vista principal
function renderMainView() {
    const root = document.getElementById('root');

    const html = `
        <div class="container">
            <header class="header">
                <h1 class="title">💝 Cupones de Amor 💝</h1>
                <p class="subtitle">Elige tu cupón especial</p>
            </header>

            <div class="coupons-grid" id="coupons-grid">
                ${cupones.map((cupon, index) => `
                    <div
                        class="coupon-card"
                        data-id="${cupon.id}"
                        style="animation-delay: ${index * 0.1}s; background: linear-gradient(135deg, ${cupon.color} 0%, ${cupon.color}dd 100%)"
                    >
                        <div class="coupon-emoji">${cupon.emoji}</div>
                        <h3 class="coupon-title">${cupon.titulo}</h3>
                        <p class="coupon-subtitle">${cupon.subtitulo}</p>
                        <div class="coupon-click-hint">Click para elegir</div>
                    </div>
                `).join('')}
            </div>

            <footer class="footer">
                <p>Con amor, para ti 💕</p>
                <p class="date">14 de Febrero 2026</p>
            </footer>
        </div>
    `;

    root.innerHTML = html;

    // Agregar event listeners a los cupones
    const couponCards = document.querySelectorAll('.coupon-card');
    couponCards.forEach(card => {
        card.addEventListener('click', () => {
            const cuponId = parseInt(card.dataset.id);
            handleCouponClick(cuponId);
        });
    });
}

// Función para renderizar la vista de cupón seleccionado
function renderSelectedView(cupon) {
    const root = document.getElementById('root');

    // Determinar qué fondo usar según el tipo
    let fondoHtml = '';

    if (cupon.tipoFondo === 'bees') {
        fondoHtml = `
            <div class="bees-bg">
                <span class="bee">🐝</span>
                <span class="bee">🐝</span>
                <span class="bee">🐝</span>
                <span class="bee">🐝</span>
                <span class="bee">🐝</span>
                <span class="bee">🐝</span>
                <span class="bee">🐝</span>
                <span class="bee">🐝</span>
            </div>
        `;
    } else if (cupon.tipoFondo === 'hearts') {
        fondoHtml = `
            <div class="hearts-bg">
                <span class="heart">💕</span>
                <span class="heart">💖</span>
                <span class="heart">💗</span>
                <span class="heart">💝</span>
                <span class="heart">❤️</span>
                <span class="heart">💗</span>
                <span class="heart">💓</span>
                <span class="heart">💞</span>
            </div>
        `;
    } else if (cupon.tipoFondo === 'sunset') {
        fondoHtml = `
            <div class="sunset-bg">
                <span class="sun">🌅</span>
                <span class="sun">☀️</span>
                <span class="wave">🌊</span>
                <span class="wave">🌊</span>
                <span class="wave">🌊</span>
                <span class="sun">🌇</span>
            </div>
        `;
    } else if (cupon.tipoFondo === 'writing') {
        fondoHtml = `
            <div class="writing-bg">
                <span class="paper">📄</span>
                <span class="pen">✒️</span>
                <span class="paper">📃</span>
                <span class="pen">🖊️</span>
                <span class="paper">📄</span>
                <span class="pen">✍️</span>
                <span class="paper">📝</span>
                <span class="pen">🖋️</span>
            </div>
        `;
    }

    // Layout especial para el cupón de la ruleta
    if (cupon.tipoFondo === 'wheel') {
        renderWheelView(cupon);
        return;
    } else if (cupon.tipoFondo === 'games') {
        // Este caso ya no se usa, pero lo mantengo por compatibilidad
        renderWheelView(cupon);
        return;
    }

    // Layout especial para el cupón de fotos
    let html;
    if (cupon.tipoFondo === 'photos') {
        html = `
            <div class="container photos-layout">
                <div class="photos-view">
                    <div class="carousel-section">
                        <div class="carousel-container" id="carousel-container">
                            <img src="${photos[0]}" class="carousel-image active" id="carousel-image" alt="Nuestras fotos">
                        </div>
                        <div class="carousel-dots" id="carousel-dots">
                            ${photos.map((_, index) => `
                                <span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="card-section">
                        <div class="selected-card" style="background: linear-gradient(135deg, ${cupon.color} 0%, ${cupon.color}dd 100%)">
                            <div class="selected-emoji">${cupon.emoji}</div>
                            <h2 class="selected-title">${cupon.titulo}</h2>
                            <p class="selected-subtitle">${cupon.subtitulo}</p>
                            <div class="selected-message">
                                ${cupon.mensaje}
                            </div>
                        </div>

                        <button class="reset-button" id="reset-button">
                            ← Volver a elegir
                        </button>
                    </div>
                </div>

                <footer class="footer">
                    <p>Con amor, para ti 💕</p>
                    <p class="date">14 de Febrero 2026</p>
                </footer>
            </div>
        `;
    } else {
        html = `
            <div class="container">
                <div class="selected-view">
                    ${fondoHtml}

                    <div class="selected-card" style="background: linear-gradient(135deg, ${cupon.color} 0%, ${cupon.color}dd 100%)">
                        <div class="selected-emoji">${cupon.emoji}</div>
                        <h2 class="selected-title">${cupon.titulo}</h2>
                        <p class="selected-subtitle">${cupon.subtitulo}</p>
                        <div class="selected-message">
                            ${cupon.mensaje}
                        </div>
                    </div>

                    <button class="reset-button" id="reset-button">
                        ← Volver a elegir
                    </button>
                </div>

                <footer class="footer">
                    <p>Con amor, para ti 💕</p>
                    <p class="date">14 de Febrero 2026</p>
                </footer>
            </div>
        `;
    }

    root.innerHTML = html;

    // Agregar event listener al botón de reset
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', handleReset);

    // Si es el cupón de fotos, iniciar el carrusel
    if (cupon.tipoFondo === 'photos') {
        startCarousel();
    }
}

// Manejar click en un cupón
function handleCouponClick(cuponId) {
    if (isRevealing || selectedCoupon) return;

    isRevealing = true;
    const grid = document.getElementById('coupons-grid');
    grid.classList.add('revealing');

    setTimeout(() => {
        selectedCoupon = cupones.find(c => c.id === cuponId);
        renderSelectedView(selectedCoupon);
        isRevealing = false;
    }, 600);
}

// Manejar reset
function handleReset() {
    selectedCoupon = null;
    // Detener carrusel si está activo
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
    currentPhotoIndex = 0;

    // Reiniciar contadores de la ruleta cuando se sale del cupón
    localStorage.removeItem('wheelSpins_andy');
    localStorage.removeItem('wheelSpins_mari');
    currentParticipant = null;

    renderMainView();
}

// Iniciar carrusel de fotos
function startCarousel() {
    currentPhotoIndex = 0;

    // Cambiar foto cada 5 segundos
    carouselInterval = setInterval(() => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updateCarousel();
    }, 5000);
}

// Actualizar imagen del carrusel
function updateCarousel() {
    const carouselImage = document.getElementById('carousel-image');
    const dots = document.querySelectorAll('.dot');

    if (carouselImage) {
        // Fade out
        carouselImage.classList.remove('active');

        setTimeout(() => {
            // Cambiar imagen
            carouselImage.src = photos[currentPhotoIndex];

            // Fade in
            setTimeout(() => {
                carouselImage.classList.add('active');
            }, 50);
        }, 300);

        // Actualizar dots
        dots.forEach((dot, index) => {
            if (index === currentPhotoIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Funciones de la ruleta del amor

// Obtener conteo de giros desde localStorage
function getSpinCount(participant) {
    const key = `wheelSpins_${participant}`;
    return parseInt(localStorage.getItem(key) || '0');
}

// Guardar conteo de giros en localStorage
function saveSpinCount(participant, count) {
    const key = `wheelSpins_${participant}`;
    localStorage.setItem(key, count.toString());
}

// Renderizar vista de la ruleta
function renderWheelView(cupon) {
    const root = document.getElementById('root');

    const html = `
        <div class="container">
            <div class="games-bg">
                <span class="game-item">🎲</span>
                <span class="game-item">🎰</span>
                <span class="game-item">🎲</span>
                <span class="game-item">🎰</span>
                <span class="game-item">🎲</span>
                <span class="game-item">🎰</span>
                <span class="game-item">🎲</span>
                <span class="game-item">🎰</span>
            </div>

            <div class="wheel-view">
                <div class="wheel-section">
                    <div class="participant-selector">
                        <button class="participant-button ${currentParticipant === 'andy' ? 'active' : ''}" data-participant="andy">
                            Andy
                        </button>
                        <button class="participant-button ${currentParticipant === 'mari' ? 'active' : ''}" data-participant="mari">
                            Mari
                        </button>
                    </div>

                    <div class="spin-counter" id="spin-counter">
                        ${currentParticipant ? `Giros restantes: ${3 - getSpinCount(currentParticipant)} / 3` : 'Selecciona quién girará'}
                    </div>

                    <div class="wheel-container">
                        <div class="wheel-arrow">👇</div>
                        <div class="wheel" id="wheel">
                            <div class="wheel-text">
                                ${wheelQuestions.map((q, i) => {
                                    const angle = (i * 30) - 90; // -90 para empezar desde arriba
                                    return `<div class="wheel-segment" style="transform: rotate(${angle}deg) translateX(60px);">${q.emoji}</div>`;
                                }).join('')}
                            </div>
                            <div class="wheel-center">🎯</div>
                        </div>
                    </div>

                    <div class="spin-instruction" id="spin-instruction">
                        ${currentParticipant
                            ? (getSpinCount(currentParticipant) < 3
                                ? 'Toca la ruleta para girar'
                                : '')
                            : 'Primero selecciona quién girará'}
                    </div>

                    <div id="limit-message"></div>
                </div>

                <div class="wheel-card-section">
                    <div id="wheel-card-content">
                        <div class="wheel-instruction">
                            <h3>🎯 ${cupon.titulo}</h3>
                            <p>${cupon.mensaje}</p>
                            <p style="margin-top: 20px; font-size: 1.1rem; color: #777;">
                                <strong>Reglas:</strong><br>
                                • Selecciona quién girará la ruleta<br>
                                • Cada persona tiene 3 giros máximo<br>
                                • Toca la ruleta para girar<br>
                                • Responde la pregunta que salga
                            </p>
                        </div>
                    </div>

                    <button class="reset-button wheel-reset-button" id="reset-button">
                        ← Volver a elegir
                    </button>
                </div>
            </div>

            <footer class="footer">
                <p>Con amor, para ti 💕</p>
                <p class="date">14 de Febrero 2026</p>
            </footer>
        </div>
    `;

    root.innerHTML = html;

    // Event listeners para botones de participantes
    const participantButtons = document.querySelectorAll('.participant-button');
    participantButtons.forEach(button => {
        button.addEventListener('click', () => {
            const participant = button.dataset.participant;
            selectParticipant(participant);
        });
    });

    // Event listener para la ruleta
    const wheel = document.getElementById('wheel');
    wheel.addEventListener('click', handleWheelClick);

    // Event listener para el botón de reset
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', handleReset);
}

// Seleccionar participante
function selectParticipant(participant) {
    currentParticipant = participant;

    // Actualizar botones
    const buttons = document.querySelectorAll('.participant-button');
    buttons.forEach(btn => {
        if (btn.dataset.participant === participant) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Actualizar contador
    updateSpinCounter();

    // Actualizar instrucción
    const spinInstruction = document.getElementById('spin-instruction');
    const spinsLeft = 3 - getSpinCount(participant);

    if (spinsLeft > 0) {
        spinInstruction.textContent = 'Toca la ruleta para girar';
        spinInstruction.style.display = 'block';

        // Limpiar mensaje de límite si existe
        const limitMessage = document.getElementById('limit-message');
        limitMessage.innerHTML = '';
    } else {
        spinInstruction.style.display = 'none';
        showLimitMessage();
    }
}

// Actualizar contador de giros
function updateSpinCounter() {
    if (!currentParticipant) return;

    const counter = document.getElementById('spin-counter');
    const spinsLeft = 3 - getSpinCount(currentParticipant);
    counter.textContent = `Giros restantes: ${spinsLeft} / 3`;
}

// Mostrar mensaje de límite alcanzado
function showLimitMessage() {
    const limitMessage = document.getElementById('limit-message');
    limitMessage.innerHTML = `
        <div class="limit-reached">
            <p>⛔ Has alcanzado el límite de 3 giros</p>
        </div>
    `;
}

// Manejar click en la ruleta
function handleWheelClick() {
    if (!currentParticipant) {
        alert('Primero selecciona quién girará la ruleta');
        return;
    }

    const spinsUsed = getSpinCount(currentParticipant);
    if (spinsUsed >= 3) {
        showLimitMessage();
        return;
    }

    if (isSpinning) return;

    spinWheel();
}

// Girar la ruleta
function spinWheel() {
    isSpinning = true;

    const wheel = document.getElementById('wheel');
    wheel.classList.add('spinning');

    // Ocultar instrucción
    const spinInstruction = document.getElementById('spin-instruction');
    spinInstruction.style.display = 'none';

    // Seleccionar pregunta aleatoria
    const questionIndex = Math.floor(Math.random() * wheelQuestions.length);

    // Calcular rotación final
    // Cada segmento es de 30 grados (360 / 12)
    // La flecha apunta arriba, así que queremos que la pregunta quede arriba
    const segmentAngle = 30;
    const targetAngle = questionIndex * segmentAngle;
    const extraRotations = 1080; // 3 vueltas completas
    const finalRotation = extraRotations + targetAngle;

    // Aplicar rotación
    wheel.style.setProperty('--final-rotation', `${finalRotation}deg`);

    // Después de 4 segundos, mostrar resultado
    setTimeout(() => {
        isSpinning = false;
        wheel.classList.remove('spinning');

        // Incrementar contador
        const newCount = getSpinCount(currentParticipant) + 1;
        saveSpinCount(currentParticipant, newCount);

        // Mostrar pregunta
        showQuestion(wheelQuestions[questionIndex].text);

        // Actualizar contador
        updateSpinCounter();

        // Si ya usó los 3 giros, mostrar mensaje
        if (newCount >= 3) {
            setTimeout(() => {
                showLimitMessage();
            }, 500);
        } else {
            // Mostrar instrucción de nuevo
            spinInstruction.textContent = 'Toca la ruleta para girar de nuevo';
            spinInstruction.style.display = 'block';
        }
    }, 4000);
}

// Mostrar pregunta seleccionada
function showQuestion(question) {
    const cardContent = document.getElementById('wheel-card-content');

    cardContent.innerHTML = `
        <div class="question-result">
            <h3>🎯 Tu pregunta es:</h3>
            <p class="question-text">${question}</p>
        </div>
    `;
}

// Configurar playlist automática
function setupMusicPlaylist() {
    const audio = document.getElementById('audio-player');

    // Configurar volumen
    audio.volume = 0.4;

    // Asegurarse de empezar desde Iris
    currentSongIndex = 0;
    audio.src = playlist[0];

    // Cuando termina una canción, reproducir la siguiente
    audio.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        audio.src = playlist[currentSongIndex];
        audio.play();
    });

    // Iniciar música inmediatamente
    setTimeout(() => {
        audio.play().catch(() => {
            // Si el navegador bloquea el autoplay, reproducir con la primera interacción
            document.body.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    }, 1000);
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderWelcomeView();
    // La música se iniciará solo después de ingresar la contraseña correctamente
});

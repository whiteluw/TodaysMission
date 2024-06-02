document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const completeBtn = document.getElementById('complete-btn');
    const completedCountElement = document.getElementById('completed-count');
    const missionElement = document.getElementById('mission');
    const progressRing = document.getElementById('progress-ring-fg');
    const totalLength = progressRing.getTotalLength();

    function wrapText(text, length) {
        const nonSymbolRegex = /[^\w\s]/;
        let result = '';
        let line = '';
        let count = 0;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (!nonSymbolRegex.test(char)) {
                count++;
            }
            line += char;
            if (count >= length) {
                result += line + '\n';
                line = '';
                count = 0;
            }
        }
        result += line;
        return result;
    }

    const missionText = missionElement.getAttribute('data-mission');
    missionElement.textContent = wrapText(missionText, 30);

    function updateCountdown() {
        const now = new Date();
        const nextDay = new Date();
        nextDay.setHours(24, 0, 0, 0);
        const diff = nextDay - now;

        if (diff > 0) {
            const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
            countdownElement.textContent = `${hours}:${minutes}:${seconds}`;

            const offset = totalLength - (totalLength * diff / (24 * 60 * 60 * 1000));
            progressRing.style.strokeDashoffset = offset;
        } else {
            countdownElement.textContent = "00:00:00";
            progressRing.style.strokeDashoffset = totalLength;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    completeBtn.addEventListener('click', () => {
        if (!localStorage.getItem('completedToday')) {
            let completedCount = parseInt(completedCountElement.textContent) + 1;
            fetch('update_count.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completedCount })
            }).then(response => response.json()).then(data => {
                if (data.success) {
                    completedCountElement.textContent = completedCount;
                    completeBtn.disabled = true;
                    localStorage.setItem('completedToday', 'true');
                }
            });
        }
    });

    if (localStorage.getItem('completedToday')) {
        completeBtn.disabled = true;
    }

    const now = new Date();
    const timeToMidnight = (24 - now.getHours()) * 3600000 - now.getMinutes() * 60000 - now.getSeconds() * 1000;
    setTimeout(() => {
        localStorage.clear();
        location.reload();
    }, timeToMidnight);

    let i = 0;
    missionElement.textContent = '';

    function typeWriter() {
        if (i < missionText.length) {
            missionElement.textContent += missionText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    const firstVisitToday = !document.cookie.split('; ').find(row => row.startsWith('visitedToday='));

    if (firstVisitToday) {
        document.cookie = 'visitedToday=true; expires=' + new Date(new Date().setHours(24,0,0,0)).toUTCString();
        typeWriter();
    } else {
        missionElement.textContent = wrapText(missionText, 30);
    }
});

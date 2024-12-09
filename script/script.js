document.addEventListener('DOMContentLoaded', () => {

    const timerAddBtn = document.getElementById('timer-add-btn')
    const appContainer = document.getElementById('app')
    let itemsElements = ''


    timerAddBtn.addEventListener('click', () => {
        const timerId = `timer-${Date.now()}`;


        const newTimerHTML = `
            <div class="row item">
                <div class="col-md-12 col-lg-6 timer-body" id="${timerId}">
                    <input class="timer-input" type="number" placeholder="Введите время в секундах">
                    <button class="start-btn">
                        <i class="fas fa-play timer-icon"></i>
                    </button>
                    <button class="delete-btn">
                        <i class="fas fa-trash-alt timer-icon"></i>
                    </button>
                </div>
                <div class="col-md-12 col-lg-6 timer-body">
                    <div class="playing"></div>
                </div>
            </div>
        `;


        appContainer.insertAdjacentHTML('beforeend', newTimerHTML);

        itemsElements = document.querySelectorAll('.item');
    });

    appContainer.addEventListener('click', async (event) => {
        const target = event.target;

        if (target.closest('.delete-btn')) {
            const timerElement = target.closest('.item');
            if (timerElement) timerElement.remove();
        }


        if (target.closest('.start-btn')) {
            const timerBody = target.closest('.timer-body');
            const itemElement = timerBody.closest('.item');
            const inputField = timerBody.querySelector('.timer-input');
            const playingField = itemElement.querySelector('.playing'); // Ищем в пределах всего таймера

            if (timerBody && inputField && playingField) {
                let seconds = parseInt(inputField.value, 10);

                
                inputField.disabled = true;
                timerBody.querySelector('.start-btn').disabled = true;

                
                startTimer(seconds, playingField, itemElement);
            }
        }
    });


    async function startTimer(seconds, playingField, itemElement) {
        for (let i = seconds; i > 0; i--) {
            playingField.innerHTML = `<p>${i}</p>`;
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        
        itemElement.remove();
    }

})

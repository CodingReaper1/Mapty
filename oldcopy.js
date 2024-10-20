'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    // this.date=...
    // this.id=...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
    // this.#setDescription();
  }

  setFullDescription() {
    this.#setDescription();
  }

  #setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this.setFullDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this.setFullDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1);
// console.log(cycling1);

/////////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

const containerWorkouts = document.querySelector('.workouts');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  #formExists = false;
  #modalExists = false;
  #form;
  #inputType;
  #inputDistance;
  #inputDuration;
  #inputCadence;
  #inputElevation;
  #editedWorkout;
  #allMarkers = [];

  constructor() {
    // localStorage.clear();
    // Get user's position
    this.#getPosition();

    // Get data from local storage
    this.#getLocalStorage();

    // Attack event handlers
    containerWorkouts.addEventListener('submit', e => {
      // EventListener for new workouts
      e.target.classList.contains('form') &&
        e.target.classList.contains('form__original') &&
        this.#newWorkout(e);

      // EventListener for editing workouts
      e.target.classList.contains('form') &&
        e.target.classList.contains('editing__form') &&
        this.#editWorkout(e);
    });

    containerWorkouts.addEventListener('click', e => {
      // KINDA STRANGE. For forms to create new workouts only deletes form, but for forms to edit deletes form and also submits form
      if (
        this.#form?.classList.contains('form__original') &&
        e.target.classList.contains('form__svg--close')
      ) {
        document.querySelector('.form').classList.add('slide-out');
        e.preventDefault();
        setTimeout(() => {
          e.target.closest('.form').remove();
          this.#formExists = false;
        }, 500);
      }
    });

    containerWorkouts.addEventListener(
      'change',
      e =>
        // EventListener for changing input types
        e.target.classList.contains('form__input--type') &&
        this.#toggleFormFields()
    );

    document.addEventListener('click', e => {
      // EventListener for deleting all workouts
      e.target.classList.contains('delete__all--workouts') &&
        this.#removeAllWorkouts(e);

      // EventListener for popup window remove workout or cancel
      e.target.classList.contains('workout__svg--close') && this.#showModal(e);

      // EventListener to cancel
      e.target.classList.contains('modal__cancel') && this.#modalCancel(e);

      // EventListener for removing one or all workouts
      e.target.classList.contains('modal__remove') && this.#removeWorkout(e);
    });

    containerWorkouts.addEventListener('click', this.#moveToPopup.bind(this));
    containerWorkouts.addEventListener('click', this.#editForm.bind(this));
  }

  #getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this.#loadMap.bind(this), () =>
        this.#warningPopUp(
          'We need your location to use application. Change your browser settings on this website and try again.',
          true
        )
      );
  }

  #loadMap(position) {
    const { latitude, longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    // console.log(map);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this.#mapClickForm.bind(this));

    this.#workouts.forEach(work => {
      this.#renderWorkoutMarker(work);
    });
  }

  #formHelper(type = 'running', editing = false) {
    return `
    ${
      editing === false
        ? `<form class="form form__original">`
        : `<form class="form inserted__form">`
    }
    <button class="form__btn--close">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="form__svg--close ${
      editing === false ? `form__svg--original` : ``
    }">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" class="stupid__path"/>
    </svg>
  </button>
    <div class="form__row">
      <label class="form__label">Type</label>
      <select class="form__input form__input--type">
        ${
          type === 'running'
            ? `
              <option value="running" selected>Running</option>
              <option value="cycling">Cycling</option>`
            : `
              <option value="running">Running</option>
              <option value="cycling" selected>Cycling</option>
            `
        }
      </select>
    </div>
    <div class="form__row">
      <label class="form__label">Distance</label>
      <input class="form__input form__input--distance" placeholder="km" />
    </div>
    <div class="form__row">
      <label class="form__label">Duration</label>
      <input
        class="form__input form__input--duration"
        placeholder="min"
      />
    </div>

    <div class="form__row ${type === `running` ? `` : `form__row--hidden`}">
      <label class="form__label">Cadence</label>
      <input
        class="form__input form__input--cadence"
        placeholder="step/min"
      />
    </div>
    <div class="form__row ${type === `running` ? `form__row--hidden` : ``} " >
      <label class="form__label">Elev Gain</label>
      <input
        class="form__input form__input--elevation"
        placeholder="meters"
      />
    </div>
  </form>
  `;
  }

  #formHelper2() {
    this.#inputType = this.#form.querySelector(`.form__input--type`);
    this.#inputDistance = this.#form.querySelector('.form__input--distance');
    this.#inputDuration = this.#form.querySelector('.form__input--duration');
    this.#inputCadence = this.#form.querySelector('.form__input--cadence');
    this.#inputElevation = this.#form.querySelector('.form__input--elevation');
    this.#inputDistance.focus();
  }

  #editForm(e) {
    // e.preventDefault(); AMIS DEDACMOVTYAN ES QMNIDA BAGEBS
    const workoutEdit = e.target.closest('.workout__edit');
    const workoutEl = e.target.closest('.workout');
    if (!workoutEdit) return;
    if (!workoutEl) return;
    if (this.#formExists) return this.#warningPopUp('Close first form please.');

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    const html = this.#formHelper(workout.type, true);

    workoutEl.insertAdjacentHTML('afterend', html);
    this.#form = workoutEl.nextElementSibling;
    workoutEl.style.display = 'none';
    this.#formExists = true;
    this.#editedWorkout = workout;

    this.#formHelper2();
    this.#inputType.value = workout.type;
    this.#inputDistance.value = workout.distance;
    this.#inputDuration.value = workout.duration;
    this.#inputCadence.value = workout.cadence || '';
    this.#inputElevation.value = workout.elevationGain || '';
    // this.#form.classList.add('slide-in');
  }

  #mapClickForm(mapE) {
    if (this.#formExists) return this.#warningPopUp('Close first form please.');

    this.#mapEvent = mapE;
    this.#formExists = true;

    containerWorkouts.insertAdjacentHTML('afterbegin', this.#formHelper());
    this.#form = containerWorkouts.firstElementChild;
    this.#formHelper2();

    // To add slide animation
    this.#form.classList.add('slide-in');
  }

  #hideForm() {
    // Empty inputs
    this.#inputDistance.value =
      this.#inputDuration.value =
      this.#inputCadence.value =
      this.#inputElevation.value =
        '';
    this.#form.remove();

    this.#formExists = false;
  }

  #toggleFormFields() {
    const isRunning = this.#inputType.value === 'running';

    if (isRunning) {
      this.#inputElevation
        .closest('.form__row')
        .classList.add('form__row--hidden');
      this.#inputCadence
        .closest('.form__row')
        .classList.remove('form__row--hidden');
    } else {
      this.#inputElevation
        .closest('.form__row')
        .classList.remove('form__row--hidden');
      this.#inputCadence
        .closest('.form__row')
        .classList.add('form__row--hidden');
    }
  }

  #newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = this.#inputType.value;
    const distance = +this.#inputDistance.value;
    const duration = +this.#inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +this.#inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return this.#warningPopUp('Form inputs must be positive numbers');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +this.#inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return this.#warningPopUp('Form inputs must be positive numbers');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render wourkout on map as marker
    this.#renderWorkoutMarker(workout);

    // Render workout on list
    this.#renderWorkout(workout);

    // Hide form + clear input fields
    this.#hideForm();

    // Set local storage to all workouts
    this.#setLocalStorage();
  }

  #editWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();

    // Get data from form
    const type = this.#inputType.value;
    const distance = +this.#inputDistance.value;
    const duration = +this.#inputDuration.value;
    const [lat, lng] = this.#editedWorkout.coords;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +this.#inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return this.#warningPopUp('Form inputs must be positive numbers');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +this.#inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return this.#warningPopUp('Form inputs must be positive numbers');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Delete old workout
    this.#workouts = this.#workouts.filter(
      work => work.id !== this.#editedWorkout.id
    );

    this.#editedWorkout = undefined;

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on list
    this.#renderWorkout(workout, true);

    // Hide form + clear input fields
    this.#hideForm();

    // Set local storage to all workouts
    this.#setLocalStorage();
  }

  #modalHtml() {
    return `
    <div class="remove__modal">
      <button class="modal__btn modal__remove">Remove</button>
      <button class="modal__btn modal__cancel">Cancel</button>
    </div>
      `;
  }

  #renderWorkoutMarker(workout) {
    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
    this.#allMarkers.push(marker);
  }

  #renderWorkout(workout, forEdited) {
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <div class="workout__title__div">
          <h2 class="workout__title">${workout.description}</h2>
          <button class="workout__edit">Edit</button>
          <button class="workout__btn__close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="workout__svg--close"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
                class="stupid__path"
              />
            </svg>
          </button>
        </div>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>        
    `;
    if (workout.type === 'running') {
      html += `
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;
    }

    if (workout.type === 'cycling') {
      html += `
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>
      `;
    }
    if (!forEdited) {
      document.querySelector('.no__use').insertAdjacentHTML('afterend', html);
    }
    if (forEdited) {
      this.#form.insertAdjacentHTML('afterend', html);
    }
  }

  #moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    const workoutTitle = e.target.closest('.workout__title');

    if (!workoutEl) return;
    if (!workoutTitle) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // Using the public interface
    // workout.click();
  }

  #setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  // #getLocalStorage() {
  //   const data = JSON.parse(localStorage.getItem('workouts')); // After converting to string and then converting back to normal object they lose prototype chain

  //   if (!data) return;

  //   this.#workouts.forEach(work => {
  //     this.#renderWorkout(work);
  //   });
  // }

  #getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts')); // After converting to string and then converting back to normal object they lose prototype chain
    if (!data) return;
    // console.log(data);
    this.#workouts = data.map(workoutData => {
      if (workoutData.type === 'running') {
        // Create a new Running instance with the prototype chain restored
        const workout = Object.setPrototypeOf(workoutData, Running.prototype);
        return workout;
      } else if (workoutData.type === 'cycling') {
        // Create a new Cycling instance with the prototype chain restored
        const workout = Object.setPrototypeOf(workoutData, Cycling.prototype);
        return workout;
      }
    });

    this.#workouts.forEach(work => {
      this.#renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }

  #showModal(e) {
    if (this.#modalExists) return;
    this.#modalExists = true;
    const workoutEl = e.target.closest('.workout');

    workoutEl.insertAdjacentHTML('afterbegin', this.#modalHtml());
    const workoutWidth = workoutEl.getBoundingClientRect().width;
    const workoutHeight = workoutEl.getBoundingClientRect().height;
    document.querySelector('.remove__modal').style.display = 'flex';

    // Set the width of the modal to match the workout element
    document.querySelector(`.remove__modal`).style.width = `${workoutWidth}px`;
    document.querySelector(
      `.remove__modal`
    ).style.height = `${workoutHeight}px`;
  }

  #modalCancel(e) {
    document.querySelector('.remove__modal').remove();
    this.#modalExists = false;
  }

  #removeMarker(workout) {
    const mark = this.#allMarkers.find(
      mark =>
        workout.coords[0] === mark._latlng.lat &&
        workout.coords[1] === mark._latlng.lng
    );
    mark.remove();
  }

  #removeWorkout(e) {
    // To delete all workouts
    if (
      e.target.classList.contains('modal__remove') &&
      e.target.classList.contains('modal__remove--all')
    ) {
      this.#workouts.splice(0, this.#workouts.length);
      this.#allMarkers.forEach(mark => mark.remove());
      document
        .querySelectorAll('.workout')
        .forEach(workout => workout.remove());
      document.querySelector('.remove__modal').remove();
      this.#setLocalStorage();
    }

    // For deleting one workout
    if (
      e.target.classList.contains('modal__remove') &&
      !e.target.classList.contains('modal__remove--all')
    ) {
      const workoutEl = e.target.closest('.workout');
      const workout = this.#workouts.find(
        work => work.id === workoutEl.dataset.id
      );
      this.#workouts = this.#workouts.filter(work => work.id !== workout.id);

      this.#setLocalStorage();
      workoutEl.remove();
      this.#modalExists = false;
      this.#removeMarker(workout);
    }
  }

  #removeAllWorkouts(e) {
    const el = e.target.parentElement.parentElement;
    el.insertAdjacentHTML('beforebegin', this.#modalHtml());
    const workoutStyles = window.getComputedStyle(el);
    const workoutWidth =
      el.offsetWidth +
      parseInt(workoutStyles.marginLeft) +
      parseInt(workoutStyles.marginRight);
    const workoutHeight =
      el.offsetHeight +
      parseInt(workoutStyles.marginTop) +
      parseInt(workoutStyles.marginBottom);

    const modal = document.querySelector('.remove__modal');
    modal.style.display = 'flex';
    modal.style.width = `${workoutWidth}px`;
    modal.style.height = `${workoutHeight}px`;
    modal.style.zIndex = `9999`;
    document
      .querySelector('.modal__remove')
      .classList.add('modal__remove--all');
  }

  #warningPopUp(
    text = `Oops, something went wrong try again or refresh page`,
    permanent = false
  ) {
    const html = `
    <div class="alert__box">
      <p>ERROR: ${text}</p>
    </div>
    `;
    const body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', html);

    const alert = document.querySelector(`.alert__box`);

    if (permanent) {
      return (document.querySelector('.overlay').style.display = 'block');
    }
    setTimeout(() => {
      alert.classList.add('fade__away');
    }, 2000);
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }
}
const app = new App();
